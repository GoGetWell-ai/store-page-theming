import { adaptLLMResponse } from '../utils'
import { usGenerativeChatStore } from '../store/generativeChatStore'
import { apiGetSuggestQuestion, apiPostChat } from '@/services/AiService'
import dayjs from 'dayjs'
import { useSearchParams } from 'react-router-dom'
import type {
    ConversationAPIResponse,
    LLMResponse,
    MessageSendResponse,
    PostAiChatResponse,
} from '../types'
import { apiCreateConversation } from '@/services/ConversationService'
import { apiSendMessage } from '@/services/MessageService'
import { useSessionUser } from '@/store/authStore'
import {
    apiAddSuggestChatForConversation,
    apiGetSuggestionQuestionV2,
} from '@/services/SuggestionQuestion'
import { fetchAiStream } from '@/services/AiFetchStreaming/indext'
import { useAppointmentListStore } from '@/views/Appointments/store/appointmentListStore'
import { useAuth } from '@/auth'

function formatDateToCustom(dateInput) {
    // Month names array
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]

    // Create a new Date object
    const date = new Date(dateInput)

    // Extract day, month, and year
    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    // Return formatted string
    return `${month} ${day}, ${year}`
}

// const appointmentBookedStatus = (doctorName,) => {
//     return `Your appointment with Dr. Mohammed Fazil A. has been successfully scheduled for Friday, December 20, 2024, at 01:27 AM (Bangladesh Standard Time). 🗓️
// We hope you found our service helpful! Your feedback is valuable to us. Would you recommend our Procedure Planning Assistant to others? Is there anything we could improve? 😊
// Thank you for using our Procedure Planning Assistant! We're here to help you throughout your procedure journey. Feel free to reach out if you have any questions or need further assistance. 🤗`
// }

const extractMessageFromEventStream = (line: string) => {
    if (line.startsWith('data: ')) {
        const rawData = line.slice(6).trim() // Remove 'data: ' prefix and trim whitespace

        if (rawData === '[DONE]') {
            console.log('Stream finished')
            return null // Signal the end of the stream
        }

        try {
            return JSON.parse(rawData) // Parse the JSON object
        } catch (error) {
            console.error('Failed to parse JSON:', rawData, error)
            return null // Return null for invalid JSON
        }
    }
    return null // Ignore lines that don't start with 'data: '
}

const handleSendMessageAI = async (
    data,
    pushConversation,
    messageId,
    setIsTyping,
) => {
    const response = await fetchAiStream(data)

    if (!response.body) {
        throw new Error('No response body')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let newResponse = ''

    try {
        while (true) {
            const { value, done } = await reader.read()

            if (done) break

            // Decode the chunk and split by newlines
            const chunk = decoder.decode(value, { stream: true })
            const messages = chunk.split('\n').filter((msg) => msg.trim())

            for (const message of messages) {
                if (message.includes('DONE')) {
                    return // End the stream processing
                }

                try {
                    const parsedMessage: any =
                        await extractMessageFromEventStream(message)

                    if (parsedMessage.type === 'token') {
                        newResponse += parsedMessage.content

                        // Push conversation immediately for each token
                        pushConversation({
                            id: messageId,
                            sender: {
                                id: 'ai',
                                name: 'Chat AI',
                                avatarImageUrl: '/img/thumbs/ai.png',
                            },
                            content: parsedMessage.content,
                            timestamp: dayjs().toDate(),
                            type: 'regular',
                            isMyMessage: false,
                            fresh: true,
                        })

                        setIsTyping(false) // Indicate typing status
                    }
                } catch (error) {
                    console.error('Error parsing message:', message, error)

                    // Push error message
                    pushConversation({
                        id: messageId,
                        sender: {
                            id: 'ai',
                            name: 'Chat AI',
                            avatarImageUrl: '/img/thumbs/ai.png',
                        },
                        content: 'Something went wrong. Please try again.',
                        timestamp: dayjs().toDate(),
                        type: 'regular',
                        isMyMessage: false,
                        fresh: true,
                    })

                    setIsTyping(false)
                }
            }
        }
    } catch (error) {
        console.error('Stream processing error:', error)

        // Push a fallback error message
        pushConversation({
            id: messageId,
            sender: {
                id: 'ai',
                name: 'Chat AI',
                avatarImageUrl: '/img/thumbs/ai.png',
            },
            content: 'An error occurred while processing the stream.',
            timestamp: dayjs().toDate(),
            type: 'regular',
            isMyMessage: false,
            fresh: true,
        })

        setIsTyping(false)
    }
    return newResponse
}

const useChatSend = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const user = useSessionUser((state) => state.user)
    const { authenticated, getUser } = useAuth()

    const {
        selectedConversation,
        setSelectedConversation,
        pushChatHistory,
        pushConversation,
        setIsTyping,
        selectedConversationMessages,
        addSelectedConversationMessage,
        setConversationMessages,
        setMedicalReportsUploadedStatus,
        setSuggestedQuestions,
        addConversationMessage,
    } = usGenerativeChatStore()

    const { setAppointmentList, appointmentList } = useAppointmentListStore()

    const creteMyMessage = (
        id: string,
        prompt: string,
        attachments: File[],
    ) => {
        const newAttachments: Array<{
            type: 'image' | 'video' | 'audio' | 'misc'
            source: File
            mediaUrl: string
        }> = attachments?.length
            ? attachments.map((data) => {
                  console.log('here is the existing data', data)
                  return !data?.mediaUrl
                      ? {
                            source: data,
                            type: 'misc',
                            mediaUrl: 'https://example.com',
                        }
                      : data
              })
            : []

        if (!attachments?.[0]?.mediaUrl) {
            pushConversation({
                id: id,
                sender: {
                    id: '1',
                    name: user?.userName || 'Patient',
                    avatarImageUrl: '/img/thumbs/thumb-1.png',
                },
                content: prompt,
                timestamp: dayjs().toDate(),
                type: 'regular',
                attachments: newAttachments,
                isMyMessage: true,
            })
        }
    }

    const addSuggestionApiToConversation = async (data, id) => {
        console.log('here is the data nad id', data, id)
        await apiAddSuggestChatForConversation({
            data: { suggestedQuestions: data },
            id,
        })
    }

    //: attachments?.length ? {answer: 'Hello world this is file', message: 'Success'}
    const sendMessage = async (
        conversationId: string,
        prompt: string,
        attachments?: File[],
        staticMessage?: string,
        chatMessageByHuman?: any,
    ) => {
        const messageId = Math.floor(
            Math.random() * 100000000000 + 80000000000,
        ).toString()

        try {
            const formData = new FormData()

            formData.append('content', prompt)
            formData.append('conversationId', conversationId)
            formData.append('language', 'english')
            formData.append('type', attachments?.length ? 'document' : 'text')

            for (let i = 0; i < attachments?.length; i++) {
                formData.append('files', attachments[i])
            }

            let aiData = ''

            if (!staticMessage) {
                await handleSendMessageAI(
                    formData,
                    pushConversation,
                    messageId,
                    setIsTyping,
                )
            } else {
                aiData = staticMessage
                await apiSendMessage<MessageSendResponse>({
                    by: 'human',
                    content: prompt,
                    type: 'text',
                    conversationId,
                })
                await apiSendMessage<MessageSendResponse>({
                    by: 'ai',
                    content: staticMessage,
                    type: 'text',
                    conversationId,
                })
                addConversationMessage({
                    id: Date.now().toString(),
                    sender: {
                        id: 'ai',
                        name: 'Chat AI',
                        avatarImageUrl: '/img/thumbs/ai.png',
                    },
                    content: staticMessage,
                    timestamp: dayjs().toDate(),
                    type: 'regular',
                    isMyMessage: false,
                    fresh: true,
                })
                setIsTyping(false)
            }

            addSelectedConversationMessage({
                ai: aiData,
                human: prompt,
            })

            if (prompt.includes('Please book an appointment')) {
                const appointmentData = JSON.parse(
                    localStorage.getItem('bookAppointmentDetails'),
                )
                setAppointmentList([
                    {
                        doctorName: appointmentData?.doctorName || '',
                        appointmentDateTime:
                            appointmentData?.appointmentDateTime || '',
                        status: 'pending',
                        doctorProfile: appointmentData?.doctorProfile || '',
                        hospitalName: appointmentData?.hospitalName || '',
                        hospitalProfile: appointmentData?.hospitalProfile || '',
                    },
                    ...appointmentList,
                ])
                // apiBookAppointment({
                //     ...appointmentData,
                //     conversation: conversationId
                // })
            }
            const suggest = await apiGetSuggestionQuestionV2({
                conversationId,
            })

            console.log('here is the new suggestion question', suggest)
            // const suggest = await apiGetSuggestQuestion({
            //     chat_history: selectedConversationMessages,
            //     number_of_questions: 3,
            // })
            // const questions = JSON.parse(suggest?.data || '[]')

            setSuggestedQuestions(suggest?.data || [])

            if (attachments?.length) {
                getUser?.()
            }

            addSuggestionApiToConversation(questions, conversationId)
            localStorage.setItem('suggestedQuestion', JSON.stringify(questions))
        } catch (err) {
            addSelectedConversationMessage({
                ai: 'Something went wrong. Please try again later',
                human: prompt,
            })

            pushConversation({
                id: messageId,
                sender: {
                    id: 'ai',
                    name: 'Chat AI',
                    avatarImageUrl: '/img/thumbs/ai.png',
                },
                content: 'Something went wrong. Please try again',
                timestamp: dayjs().toDate(),
                type: 'regular',
                isMyMessage: false,
                fresh: true,
            })
            setIsTyping(false)
        }
    }

    const sendUnAuthenticatedMessage = async (
        prompt,
        staticMessage,
        attachments,
    ) => {
        const messageId = Math.floor(
            Math.random() * 100000000000 + 80000000000,
        ).toString()

        const resp = staticMessage
            ? { answer: staticMessage, message: 'Successfully fetched' }
            : await apiPostChat<LLMResponse>({
                  question: prompt,
                  chat_history: selectedConversationMessages,
              })

        addSelectedConversationMessage({
            ai: resp.answer,
            human: prompt,
        })

        const formattedResponse: PostAiChatResponse = adaptLLMResponse(resp)
        pushConversation({
            id: messageId,
            sender: {
                id: 'ai',
                name: 'Chat AI',
                avatarImageUrl: '/img/thumbs/ai.png',
            },
            content: formattedResponse.choices[0].message.content || '',
            timestamp: dayjs().toDate(),
            type: 'regular',
            isMyMessage: false,
            fresh: true,
        })
        setIsTyping(false)
    }

    const handleSend = async (
        prompt: string,
        attachments?: File[],
        staticMessage?: string,
    ) => {
        setIsTyping(true)

        if (selectedConversation && authenticated) {
            const messageId = Math.floor(
                Math.random() * 100000000000 + 80000000000,
            ).toString()
            creteMyMessage(messageId, prompt, attachments)

            // if (authenticated) {
            //     handleMedicalReportUpdate()
            // }

            if (authenticated) {
                await sendMessage(
                    selectedConversation,
                    prompt,
                    attachments,
                    staticMessage,
                    '',
                )
            } else {
                await sendUnAuthenticatedMessage(
                    prompt,
                    staticMessage,
                    attachments,
                )
            }
        } else {
            if (!selectedConversation) {
                setConversationMessages([])
            }

            const conversationIdUid = Math.floor(
                Math.random() * 100000000000 + 80000000000,
            ).toString()
            const messageId = Math.floor(
                Math.random() * 100000000000 + 80000000000,
            ).toString()
            // Create Conversation
            let conversation = {}

            if (authenticated) {
                try {
                    conversation =
                        await apiCreateConversation<ConversationAPIResponse>()
                } catch (err) {
                    pushConversation({
                        id: messageId,
                        sender: {
                            id: 'ai',
                            name: 'Chat AI',
                            avatarImageUrl: '/img/thumbs/ai.png',
                        },
                        content:
                            'You are hcf. you can not upload medical reports',
                        timestamp: dayjs().toDate(),
                        type: 'regular',
                        isMyMessage: false,
                        fresh: true,
                    })
                    setIsTyping(false)
                    return
                }
            } else {
                conversation = { data: { _id: conversationIdUid } }
            }

            // get the conversation id
            const conversationId = conversation.data._id

            // set Selected Conversation to URL
            setSearchParams({ id: conversationId })
            // Send Message to DB
            setSelectedConversation(conversationId)

            const hereIsDate = formatDateToCustom(new Date())

            // push to chat History
            const chatMessages = {
                id: conversationId,
                title: `Conversation ${hereIsDate}`,
                lastConversation: prompt,
                createdTime: dayjs().unix(),
                updatedTime: dayjs().unix(),
                enable: true,
            }

            pushChatHistory(chatMessages)

            creteMyMessage(messageId, prompt, attachments)

            if (authenticated) {
                await sendMessage(
                    conversationId,
                    prompt,
                    attachments,
                    staticMessage,
                )
            } else {
                await sendUnAuthenticatedMessage(
                    prompt,
                    staticMessage,
                    attachments,
                )
            }
        }
    }

    return {
        handleSend,
    }
}

export default useChatSend
