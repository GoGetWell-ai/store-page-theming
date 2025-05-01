import { useRef, useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import ChatBox from '@/views/chat-bot/components/ChatBox'
import ChatLandingView from './ChatLandingView'
import ChatCustomContent from './ChatCustomContent'
import ChatCustomAction from './ChatCustomAction'
import { usGenerativeChatStore } from '../store/generativeChatStore'
import useChatSend from '../hooks/useChatSend'
import type { ScrollBarRef } from '@/views/chat-bot/components/ChatBox'
import { apiGetAllMessage, apiGetAllPublicMessage } from '@/services/MessageService'
import { AllMessageResponse } from '../types'
import { generateLLMChatHistory, transformMessages } from '../utils'
import { useAuth } from '@/auth'
import PatientSignUpPopup from '@/views/auth/PatientSignUp/Popup'
import { useLocation, useSearchParams } from 'react-router-dom'
import AppointmentPopup from '@/components/shared/AppointmentPopup'
import staticChats from '../static-chats/index.json'
import { Notification, toast } from '@/components/ui'
import { apiGetSuggestChatForConversation } from '@/services/SuggestionQuestion'
import useResponsive from '@/utils/hooks/useResponsive'
import EnvConfig from '@/configs/env.config'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'
import { useAppointmentPopup } from '@/utils/hooks/useAppointmentPopup'

const ChatView = () => {
    const scrollRef = useRef<ScrollBarRef>(null)
    const {
        selectedConversation,
        chatHistory,
        isTyping,
        disabledChatFresh,
        setSelectedConversationMessages,
        setConversationMessages,
        conversationsMessages,
        setLoading,
        setSuggestedQuestions,
        suggestedQuestions,
        medicalReportUploadedStatus,
        setMedicalReportsUploadedStatus,
        setPushedMessages,
        isLoading,
        setSelectedConversation,
    } = usGenerativeChatStore()
    const { handleSend } = useChatSend()
    const { user } = useAuth()
    const [showLoginPopup] = useState<boolean>(false)
    const { authenticated } = useAuth()
    const [appointmentMessage, setAppointmentMessage] = useState('')
    const [searchParams] = useSearchParams()
    const { smaller } = useResponsive()
    const { hcfData } = useAuthStore()
    const { pathname } = useLocation()
    const {
        isPopupOpen: appointMentPopupStatus,
        setIsPopupOpen: setAppointmentPopupStatus,
        appointmentData: { doctorName, doctorProfile, hospitalName, hospitalProfile },
        useButtonListeners,
        handleDoctorButtonClick,
        handleHospitalButtonClick,
        setAppointmentData
    } = useAppointmentPopup();

    useEffect(() => {
        console.log("searchParams.get('id')searchParams.get('id')", searchParams.get('id'));
        if (searchParams.get('id')) {
            setSelectedConversation(searchParams.get('id'))
        }
    }, [searchParams.get('id')])

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedConversation) {
                setConversationMessages([])
                setSuggestedQuestions([])
                return
            }

            try {
                setLoading(true)
                let response = {}

                if (pathname.includes('public')) {
                    response =
                        await apiGetAllPublicMessage<AllMessageResponse>(
                            selectedConversation,
                        )
                } else {
                    response =
                        await apiGetAllMessage<AllMessageResponse>(
                            selectedConversation,
                        )
                }
                const llmChatHistory = generateLLMChatHistory(
                    response.data.messages,
                )
                setSelectedConversationMessages(llmChatHistory)
                const transformedMessages = transformMessages(
                    response.data.messages,
                )
                setLoading(false)

                setConversationMessages(transformedMessages)
                if (!pathname.includes('public')) {
                    const suggestionResponse =
                        await apiGetSuggestChatForConversation({
                            id: selectedConversation,
                            patientId: user.userId || user.authId,
                        })
                    if (
                        suggestionResponse?.success &&
                        suggestionResponse?.data?.suggestedQuestions
                    ) {
                        setSuggestedQuestions(
                            suggestionResponse?.data?.suggestedQuestions,
                        )
                    }
                    console.log('suggestionResponse', suggestionResponse)
                }
            } catch (error) {
                console.error('Error conversation fetching messages:', error)
                const timeOut = setTimeout(() => {
                    if (!conversationsMessages.length) {
                        toast.push(
                            <Notification
                                title={'Chat not found'}
                                type={'danger'}
                            >
                                The chat not found. Please try with new chat.
                            </Notification>,
                        )
                        setSelectedConversation('')
                    }
                }, 1000)
                setLoading(false)
                if (authenticated) {
                    setConversationMessages([])
                    setSuggestedQuestions([])
                }
                return () => clearTimeout(timeOut)
                // setSelectedConversation('')
                // searchParams.delete('id')
            }
        }

        if (!isTyping) {
            fetchMessages()
        }
        if (!selectedConversation) {
            setConversationMessages([])
            setSuggestedQuestions([])
        }
    }, [selectedConversation])

    useEffect(() => {
        scrollToBottom()
    }, [selectedConversation, chatHistory])

    // useEffect(() => {
    //     const chat = chatHistory.find(
    //         (chat) => chat.id === selectedConversation,
    //     )

    //     setMessages(chat?.conversation || [])
    // }, [chatHistory])

    // get message from message query params

    console.log('conversationsMessages', conversationsMessages)

    const handleInputChange = async ({
        value,
        attachments,
    }: {
        value: string
        attachments?: File[]
    }) => {
        // console.log('the handle input is running', is);
        // console.log({
        //     value,
        //     attachments,
        // });
        const staticMessage = staticChats[value]

        if (!authenticated && ((!staticMessage || !staticMessage.includes('Treatment')) || attachments?.length)) {
            window.location.href = `https://auth.${EnvConfig.hostname}/sign-in?redirect_url=${window.location.href}&store=${hcfData?._id}`
        }

        if (conversationsMessages.length > 0 && !authenticated) {
            if (conversationsMessages[0].attachments?.length) {

                const newObjectg = {
                    ...conversationsMessages[0],
                    attachments: [
                        {
                            ...conversationsMessages[0].attachments[0],
                            source: {
                                name: conversationsMessages[0].attachments[0]
                                    .source.name,
                                type: conversationsMessages[0].attachments[0]
                                    .source.type,
                                size: conversationsMessages[0].attachments[0]
                                    .source.size,
                            },
                        },
                    ],
                }

                localStorage.setItem(
                    'unauthenticatedMessage',
                    JSON.stringify(newObjectg),
                )
            } else {
                localStorage.setItem(
                    'unauthenticatedMessage',
                    JSON.stringify(conversationsMessages[0]),
                )
            }

            window.location.href = `https://auth.${EnvConfig.hostname}/sign-in?redirect_url=${window.location.href}&store=${hcfData?._id}`
        } else if (!isTyping) {
            await handleSend(
                !staticMessage || !staticMessage.includes('Treatment')
                    ? value
                    : value,
                attachments,
                staticMessage,
            )
            setPushedMessages('')
        }
    }

    useEffect(() => {
        if (authenticated) {
            const message = JSON.parse(
                localStorage.getItem('unauthenticatedMessage') || '{}',
            )
            if (
                Object.keys(message).length > 0 &&
                !isTyping &&
                message?.content
            ) {
                {
                    handleInputChange({
                        value: message.content,
                        attachments: message?.attachments || [],
                    })
                    // localStorage.removeItem('unauthenticatedMessage')
                }
            }
        }
    }, [authenticated])

    useEffect(() => {
        const message = JSON.parse(
            localStorage.getItem('unauthenticatedMessage') || '{}',
        )

        if (message?.content) {
            if (message?.attachments?.length) {
                setConversationMessages([message])
            }
            localStorage.removeItem('unauthenticatedMessage')
        }
    }, [selectedConversation])

    useEffect(() => {
        if (medicalReportUploadedStatus === true) {
            toast.push(
                <Notification title={'Medical Report'} type={'success'}>
                    We stored your medical report.
                </Notification>,
            )
            setMedicalReportsUploadedStatus(false)
        }

        if (medicalReportUploadedStatus === null) {
            toast.push(
                <Notification
                    title={'Medical Report Upload Error'}
                    type={'danger'}
                >
                    An error occurred: The medical report was not saved to our
                    database.
                </Notification>,
            )
            setMedicalReportsUploadedStatus(false)
        }
    }, [medicalReportUploadedStatus])

    useEffect(() => {
        if (appointmentMessage) {
            handleInputChange({ value: appointmentMessage, attachments: [] })
            setAppointmentMessage('')
        }
    }, [appointmentMessage])

    const handleFinish = (id: string) => {
        disabledChatFresh(id)
        scrollToBottom()
    }

    useButtonListeners(['.styled-button.doctor-btn', '.styled-button.doctor'], handleDoctorButtonClick);
    useButtonListeners(['.styled-button.hospital-btn', '.styled-button.hospital'], handleHospitalButtonClick);



    useEffect(() => {
        if (
            conversationsMessages.length &&
            !isTyping &&
            !selectedConversation
        ) {
            setConversationMessages([])
        }

        if (conversationsMessages.length && isTyping && !selectedConversation) {
            setSelectedConversation(
                conversationsMessages[0]?.id || conversationsMessages[0]?._id,
            )
        }
    }, [conversationsMessages])

    const suggestStringify = localStorage.getItem('suggestedQuestion')
    useEffect(() => {
        if (!isTyping && suggestStringify) {
            try {
                const suggestedQuestion = JSON.parse(suggestStringify)

                if (
                    Array.isArray(suggestedQuestion?.questions) &&
                    suggestedQuestion?.questions?.length > 0
                ) {
                    setSuggestedQuestions(suggestedQuestion?.questions)
                }
                localStorage.removeItem('suggestedQuestion')
            } catch (error) {
                console.error('Failed to parse suggestedQuestion:', error)
            }
        }
    }, [isTyping, conversationsMessages, suggestStringify])

    useEffect(() => {
        scrollToBottom()
    }, [suggestedQuestions, conversationsMessages])

    useEffect(() => {
        const footer = document.querySelector('footer')
        if (footer) {
            footer.style.display = 'none'
        }
    }, [])

    const placeholder =
        'Ask anything about treatment'

    useEffect(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }, [])

    const [newDoctorName, setDoctorName] = useState<string>('');

    useEffect(() => {
        if (newDoctorName) {
            setAppointmentData(prev => ({
                ...prev,
                doctorName: newDoctorName
            }))
        }
    }, [newDoctorName])


    return (
        <Card
            style={{ height: `calc(100% - ${smaller.lg ? '30px' : '104px'})` }}
            className={`flex-1 rounded-none`}
            bodyClass="h-full rounded-none !p-0 !pb-[71px]"
        >
            {appointMentPopupStatus ? (
                <AppointmentPopup
                    setDoctorName={setDoctorName}
                    doctorProfile={doctorProfile}
                    hospitalProfile={hospitalProfile}
                    hospitalName={hospitalName}
                    setSuccessChatMessage={setAppointmentMessage}
                    doctorName={doctorName}
                    setPopupStatus={setAppointmentPopupStatus}
                    conversationId={selectedConversation}
                />
            ) : (
                <></>
            )}
            {!authenticated && showLoginPopup ? (
                <div className="fixed left-0 top-0 w-full h-full">
                    <PatientSignUpPopup />
                </div>
            ) : (
                <></>
            )}
            <ChatBox
                ref={scrollRef}
                scrollToBottom={scrollToBottom}
                messageList={conversationsMessages}
                placeholder={placeholder}
                showMessageList={Boolean(selectedConversation)}
                showAvatar={true}
                avatarGap={true}
                containerClass=""
                messageListClass={'h-[calc(100%)]'} //TODO `${authenticated ? 'h-[calc(100%-100px)] xl:h-[calc(100%-70px)]' : 'min-h-[60vh]'}`
                typing={
                    isTyping
                        ? {
                            id: 'ai',
                            name: 'Chat AI',
                            avatarImageUrl: '/img/thumbs/ai.png',
                        }
                        : false
                }
                customRenderer={(message) => {
                    if (message.sender.id === 'ai') {
                        return (
                            <ChatCustomContent
                                content={message.content as string}
                                triggerTyping={message.fresh || false}
                                onFinish={() => handleFinish(message.id)}
                            />
                        )
                    }

                    return message.content
                }}
                customAction={(message) => {
                    if (message.sender.id === 'ai' && !isLoading) {
                        return (
                            <ChatCustomAction
                                content={message.content as string}
                            />
                        )
                    }

                    return null
                }}
                onInputChange={handleInputChange}
            >
                {!selectedConversation && (
                    <ChatLandingView
                        placeholder={placeholder}
                        scrollToBottom={scrollToBottom}
                        onInputChange={handleInputChange}
                    />
                )}
            </ChatBox>
        </Card>
    )
}

export default ChatView
