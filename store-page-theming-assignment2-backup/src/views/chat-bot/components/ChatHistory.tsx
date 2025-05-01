import { Fragment, useEffect } from 'react'
import ScrollBar from '@/components/ui/ScrollBar'
import ChatHistoryItem from './ChatHistoryItem'
import { usGenerativeChatStore } from '../store/generativeChatStore'

import useSWR from 'swr'
import type { AllConversationResponse, GetChatHistoryResponse } from '../types'
import { apiGetConversation } from '@/services/ConversationService'
import { useSessionUser } from '@/store/authStore'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/auth'
import SkeletonLoader from '@/components/shared/SkeletonLoader'
import { Button } from '@/components/ui'
import useResponsive from '@/utils/hooks/useResponsive'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'

type ChatHistoryProps = {
    queryText?: string
    onClick?: () => void
    vh?: any
}

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

const ChatHistory = ({ queryText = '', onClick, vh }: ChatHistoryProps) => {
    const {
        chatHistory,
        setChatHistory,
        setRenameDialog,
        setSelectedConversation,
        selectedConversation,
        setSuggestedQuestions,
        setConversationMessages
    } = usGenerativeChatStore()
    const navigate = useNavigate()
    const user = useSessionUser((state) => state.user)
    const [searchParams, setSearchParams] = useSearchParams();
    const { authenticated } = useAuth()
    const { smaller } = useResponsive();
    const { hcfData } = useAuthStore()

    const { isLoading } = useSWR<AllConversationResponse>(
        authenticated ? [`/api/v1/${user.userId}`] : null,
        () => apiGetConversation<AllConversationResponse>(user.userId),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
            onSuccess: (data: AllConversationResponse) => {
                // console.log('get data conversation data', data)
                const newData = data.data
                    .filter((data) => data.createdAt && data.updatedAt && data._id && data.message?.content) // Check if required fields exist
                    .map((data) => {
                        return {
                            createdTime: new Date(data.createdAt).getTime(),
                            enable: true,
                            id: data._id,
                            lastConversation: data.message?.content,
                            title: `Conversation ${formatDateToCustom(data.createdAt)}`,
                            updatedTime: new Date(data.updatedAt).getTime()
                        };
                    }).reverse();
                // const finalData = conversationResponseToChatHistory(data)
                // console.log('finalData finalData finalData finalData #finalData finalData', finalData)
                setChatHistory(newData)
            },
        },
    )

    const handleDelete = (id: string) => {
        setChatHistory(chatHistory.filter((item) => item.id !== id))
        setSelectedConversation('')
    }

    const handleArchive = (id: string) => {
        setChatHistory(chatHistory.filter((item) => item.id !== id))
        setSelectedConversation('')
    }

    const handleRename = (id: string, title: string) => {
        setRenameDialog({
            id,
            title,
            open: true,
        })
    }

    const handleClick = (id: string) => {
        setSelectedConversation(id)
        setSearchParams({ id })
        onClick?.()
    }

    useEffect(() => {
        const conversationId = searchParams.get('id')
        if (conversationId !== selectedConversation && conversationId) {
            setSelectedConversation(conversationId)
        }
        if (!conversationId) {
            setSelectedConversation('')
        }
    }, [searchParams, setSelectedConversation]);

    const defaultSkeletonNumber = ['', '', '', '', '', '']


    const handleNewChat = () => {
        setSelectedConversation('')
        setSuggestedQuestions([])
        setConversationMessages([])
        navigate(`/chat-bot`)
        // onClick?.()
    }
    return (
        <ScrollBar
            style={{ maxHeight: `${vh-(smaller.lg ? 15 : 13)}vh` }} className={`h-full overflow-x-hidden overflow-y-auto`}>
            {
                (
                    <div className="flex flex-col gap-1 py-1 px-2 pb-[150px]">
                        {isLoading ? (
                            defaultSkeletonNumber.map((item, i) => (
                                <div key={i} className='bg-gray-100 w-[95%] mx-auto px-2 py-1'>
                                    <SkeletonLoader height={15} className='' />
                                    <SkeletonLoader height={10} className='' />
                                </div>
                            ))
                        ) : chatHistory?.length ? chatHistory.map((item) => {
                            if (!item.enable) {
                                return <Fragment key={item.id} />
                            }
                            let medicalReport = false;
                            if (typeof item.lastConversation !== 'string') {
                                const data = item.lastConversation?.extractedText || '';
                                medicalReport = data.includes('Medical Records')
                            }
                            return (
                                <ChatHistoryItem
                                    key={item.id}
                                    data-testid={item.id}
                                    title={item.title}
                                    conversation={typeof item.lastConversation === 'string' ? item.lastConversation : medicalReport ? `Uploaded Medical Report ${item.lastConversation?.filename || ''}` : `Uploaded file ${item.lastConversation?.filename || ''}`}
                                    active={selectedConversation === item.id}
                                    onDelete={() => handleDelete(item.id)}
                                    onArchive={() => handleArchive(item.id)}
                                    onRename={() =>
                                        handleRename(item.id, item.title)
                                    }
                                    onClick={() => handleClick(item.id)}
                                />
                            )
                        }) : <div className='min-h-[250px] w-full flex items-center justify-center'>There is no chat history to show</div>}
                        {
                            !authenticated && selectedConversation && (
                                <Button className='rounded-[5px]' block variant="solid" onClick={handleNewChat}>
                                    New chat
                                </Button>
                            )
                        }
                    </div>
                )
            }
        </ScrollBar>
    )
}

export default ChatHistory
