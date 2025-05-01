import React, { forwardRef } from 'react';
import { MessageProps } from './Message';
import NewMessage from './NewMessage';
import { ScrollBar } from '@/components/ui';
import { ScrollBarRef } from '@/views/support/components/ChatBox';

type List = MessageProps & { fresh?: boolean }
interface NewMessageListProps {
    list: List[]
    customRenderer?: (message: List, index: number) => string | ReactNode
    customAction?: (message: List, index: number) => string | ReactNode
    bubbleClass?: string
}

const NewMessageList = forwardRef<ScrollBarRef, NewMessageListProps>((props, ref) => {
    const { list, customRenderer, customAction, bubbleClass } = props
    return (
        <div className='h-full'>
            <ScrollBar
                autoHide
                className="overflow-y-auto overflow-x-hidden h-full  w-full"
                scrollableNodeProps={{ ref: ref }}
            >
                <div className='w-full mx-auto  max-w-[800px]'>
                    {
                        list.map((message, index) => (
                            <div key={index}>
                                <NewMessage listLength={list.length} index={index} nextMessage={list[index + 1]?.sender?.id === 'ai' && list[index + 1]} bubbleClass={bubbleClass} {...message}
                                    {...(customRenderer
                                        ? {
                                            customRenderer: () =>
                                                customRenderer(
                                                    list[index + 1]?.sender?.id === 'ai' ? list[index + 1] : message,
                                                    index,
                                                ),
                                        }
                                        : {})}
                                    {...(customAction
                                        ? {
                                            customAction: () =>
                                                customAction(
                                                    list[index + 1]?.sender?.id === 'ai' ? list[index + 1] : message,
                                                    index,
                                                ),
                                        }
                                        : {})} />
                            </div>
                        ))
                    }
                </div>
            </ScrollBar>
        </div>
    )
})


NewMessageList.displayName = 'NewMessageList';
export default NewMessageList;
