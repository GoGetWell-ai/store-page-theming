import { forwardRef } from 'react'
import ScrollBar from '@/components/ui/ScrollBar'
import Message from './Message'
import classNames from '@/utils/classNames'
import type { ReactNode } from 'react'
import type { ScrollBarRef } from '../types'
import type { MessageProps } from './Message'
import { BeatLoader } from 'react-spinners'

type List = MessageProps & { fresh?: boolean }

export type MessageListProps = {
    list: List[]
    showAvatar?: boolean
    avatarGap?: boolean
    typing?:
    | {
        id: string
        name: string
        avatarImageUrl?: string
    }
    | false
    customRenderer?: (message: List, index: number) => string | ReactNode
    customAction?: (message: List, index: number) => string | ReactNode
    bubbleClass?: string
    messageListClass?: string
}

const MessageList = forwardRef<ScrollBarRef, MessageListProps>((props, ref) => {
    const {
        list = [],
        showAvatar = true,
        typing = false,
        avatarGap,
        customRenderer,
        customAction,
        messageListClass,
        bubbleClass,
    } = props

    console.log('here is the message list', list);

    return (
        <div className={classNames('relative', messageListClass)}>
            <div className="absolute top-0 left-0 h-full w-full py-4">
                <ScrollBar
                    autoHide
                    className="overflow-y-auto h-full max-w-full"
                    scrollableNodeProps={{ ref: ref }}
                >
                    <div className="flex flex-col gap-1 xs:gap-4 px-2 xs:px-4">
                        {list?.length
                            ? list.map((message, index) => (
                                <Message
                                    key={message.id}
                                    showAvatar={showAvatar}
                                    avatarGap={avatarGap}
                                    bubbleClass={bubbleClass}
                                    {...message}
                                    {...(customRenderer
                                        ? {
                                            customRenderer: () =>
                                                customRenderer(
                                                    message,
                                                    index,
                                                ),
                                        }
                                        : {})}
                                    {...(customAction
                                        ? {
                                            customAction: () =>
                                                customAction(
                                                    message,
                                                    index,
                                                ),
                                        }
                                        : {})}
                                />
                            ))
                            : null}
                        {typing && (
                            <Message
                                id={typing.name + 'typing'}
                                sender={typing}
                                type="regular"
                                showAvatar={showAvatar}
                                bubbleClass={bubbleClass}
                                avatarGap={avatarGap}
                                content={
                                    <div className="flex items-center gap-x-[10px] w-full min-w-[200px] !m-0">
                                        <BeatLoader size={10} color="#63559A" />

                                        <p className='!m-0'>Generating Response...</p>
                                    </div>
                                }
                            />
                        )}
                    </div>
                </ScrollBar>
            </div>
        </div>
    )
})

MessageList.displayName = 'MessageList'

export default MessageList
