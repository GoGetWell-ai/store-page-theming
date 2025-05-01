import { forwardRef, useEffect, useState } from 'react'
import ChatContainer from './components/ChatContainer'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'
import type { MessageListProps } from './components/MessageList'
import type { ChatContainerProps } from './components/ChatContainer'
import type { ChatInputProps } from './components/ChatInput'
import type { ReactNode } from 'react'
import type { ScrollBarRef } from './types'
import Loading from '@/components/shared/Loading'
import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore'
import SuggestedQuestion from './components/SuggestedQuestion'
import SkeletonLoader from '@/components/shared/SkeletonLoader'
import Treatment from './components/Treatment'
import { Card } from '@/components/ui'
import { skeletonMessages } from '@/mock/fakeApi/skeletonMessages'
import NewMessageList from './components/NewMessageList'
// import SuggestedQuestion from './components/SuggestedQuestion'

export type MessageList = MessageListProps['list']

export type ChatBoxProps = {
    messageList: MessageList
    header?: ChatContainerProps['header']
    showMessageList?: boolean
    children?: ReactNode
    containerClass?: string
    scrollToBottom?: any
} & Omit<MessageListProps, 'list'> &
    ChatInputProps

const ChatBox = forwardRef<ScrollBarRef, ChatBoxProps>((props, ref) => {
    const {
        messageList,
        showMessageList = true,
        children,
        header,
        placeholder,
        onInputChange,
        showAvatar,
        avatarGap,
        customRenderer,
        customAction,
        bubbleClass,
        typing,
        messageListClass,
        containerClass,
        scrollToBottom,
    } = props
    const { isLoading, selectedConversation } = usGenerativeChatStore()

    return (
        <>
            <ChatContainer
                className={`${containerClass}`}
                header={header}
                input={
                    selectedConversation ? (
                        <div className="relative p-3">
                            <ChatInput
                                placeholder={placeholder}
                                onInputChange={onInputChange}
                                scrollToBottom={scrollToBottom}
                            />
                        </div>
                    ) : (
                        <div></div>
                    )
                }
            >
                {/* {showMessageList && (
                    <MessageList
                        ref={ref}
                        list={isLoading ? skeletonMessages : messageList}
                        showAvatar={showAvatar}
                        avatarGap={avatarGap}
                        customRenderer={customRenderer}
                        customAction={customAction}
                        typing={typing}
                        messageListClass={messageListClass}
                        bubbleClass={bubbleClass}
                    />
                )} */}

                {
                    showMessageList && selectedConversation && (
                        <NewMessageList
                            ref={ref} bubbleClass={bubbleClass} list={messageList}
                            customRenderer={customRenderer}
                            customAction={customAction} />
                    )
                }

                {/* {selectedConversation && (
                    <SuggestedQuestion
                        ref={ref}
                        onInputChange={onInputChange}
                    />
                )} */}

                {children}
            </ChatContainer>
        </>
    )
})

ChatBox.displayName = 'ChatBox'

export default ChatBox
