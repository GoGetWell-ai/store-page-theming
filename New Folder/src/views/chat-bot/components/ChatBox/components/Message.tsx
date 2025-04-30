import Avatar from '@/components/ui/Avatar'
import Attachment from './Attachment'
import classNames from '@/utils/classNames'
import { useRef, type ReactNode } from 'react'
import ChatCustomContent from '@/views/chat-bot/components/ChatCustomContent'
import useResponsive from '@/utils/hooks/useResponsive'
import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore'
import html2canvas from "html2canvas";
import { FaDownload } from 'react-icons/fa6'
import { Tooltip } from '@/components/ui'

export type MessageProps = {
    id: string
    sender: {
        id: string
        name: string
        avatarImageUrl?: string
    }
    content?: string | ReactNode
    timestamp?: Date | number
    type: 'regular' | 'reply' | 'deleted' | 'divider'
    attachments?: Array<{
        type: 'image' | 'video' | 'audio' | 'misc'
        source: File
        mediaUrl: string
    }>
    showAvatar?: boolean
    isMyMessage?: boolean
    avatarGap?: boolean
    bubbleClass?: string
    customRenderer?: () => string | ReactNode
    customAction?: () => string | ReactNode
}

const Message = (props: MessageProps) => {
    const {
        attachments,
        content,
        showAvatar = true,
        avatarGap,
        isMyMessage,
        sender,
        type,
        customRenderer,
        customAction,
        bubbleClass,
        id,
    } = props
    const isPlainText = (text) =>
        !/<\/?[^>]+(>|$)/g.test(text) && !/#/.test(text)
    const { smaller } = useResponsive()
    const { isLoading, isTyping } = usGenerativeChatStore()

    const divRef = useRef(null);

    const downloadPDF = async () => {
        const input = divRef.current;
        if (!input) return;

        const canvas = await html2canvas(input, { backgroundColor: null });
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "chat-message.png";
        link.click();
    };

    return (
        <>
            {type === 'divider' ? (
                <></>
            ) : (
                <div
                    className={classNames('flex', isMyMessage && 'justify-end')}
                >
                    <div className={`flex flex-col w-full ${isMyMessage && 'items-end'}`}>
                        <div
                            className={classNames(
                                'inline-flex items-end gap-2 max-w-[1000px] w-full',
                                isMyMessage && 'flex-row-reverse',
                            )}
                        >
                            {showAvatar && !smaller.lg && (
                                <div className={classNames('w-[35px]')}>
                                    {avatarGap && (
                                        <Avatar
                                            src={sender.avatarImageUrl}
                                            size={35}
                                        />
                                    )}
                                </div>
                            )}
                            <div
                                ref={divRef}
                                className={`${classNames(
                                    ` ${(content === 'Something went wrong. Please try again.' || content === 'Something went wrong. Please try again') && '!bg-[#ff000049] !text-[red]'} bubble flex flex-col justify-center h-full max-w-[750px] rounded-xl px-2 sm:px-5 py-2 sm:py-2.5 bg-gray-100 dark:bg-gray-700 prose text-sm text-gray-900 dark:text-gray-100`,
                                    bubbleClass,
                                )} ${isLoading && '!max-w-[100%]'} ${id.includes('typing') && '!bg-transparent !p-0'} max-w-[90%] !text-[12px] xs:!text-[14px] sm:!text-[16px]`}
                            >
                                {sender.id === 'ai' ? (
                                    customRenderer && !isLoading ? (
                                        customRenderer()
                                    ) : (
                                        <>
                                            {attachments &&
                                                attachments?.length > 0 && (
                                                    <Attachment
                                                        attachments={
                                                            attachments
                                                        }
                                                    />
                                                )}
                                            {isPlainText(content) && content}
                                        </>
                                    )
                                ) : attachments?.length ? (
                                    <div>
                                        <Attachment attachments={attachments} />
                                        {
                                            !isPlainText(content) ? (
                                                <ChatCustomContent
                                                    content={content as string}
                                                    triggerTyping={false}
                                                    onFinish={() => Date.now().toString()}
                                                />
                                            ) : (
                                                content
                                            )
                                        }
                                    </div>
                                ) : !isPlainText(content) ? (
                                    <ChatCustomContent
                                        content={content as string}
                                        triggerTyping={false}
                                        onFinish={() => Date.now().toString()}
                                    />
                                ) : (
                                    content
                                )}
                            </div>
                        </div>

                        {showAvatar && isTyping && smaller.lg && (
                            <div
                                className={classNames(
                                    'flex items-center gap-2',
                                    isMyMessage && ' flex-row-reverse',
                                )}
                            >
                                <div className={classNames('w-[35px]')}>
                                    {avatarGap && (
                                        <Avatar
                                            src={sender.avatarImageUrl}
                                            size={35}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                        {customAction &&
                            content !==
                            'Something went wrong. Please try again' && (
                                <div>
                                    <div
                                        className={classNames(
                                            'flex items-center gap-2',
                                            isMyMessage && ' flex-row-reverse',
                                        )}
                                    >
                                        {showAvatar &&
                                            avatarGap &&
                                            !smaller.lg && (
                                                <div
                                                    className={classNames(
                                                        'w-[35px]',
                                                    )}
                                                ></div>
                                            )}
                                        {showAvatar &&
                                            !isTyping &&
                                            smaller.lg && (
                                                <div
                                                    className={classNames(
                                                        'w-[35px]',
                                                    )}
                                                >
                                                    {avatarGap && (
                                                        <Avatar
                                                            src={
                                                                sender.avatarImageUrl
                                                            }
                                                            size={35}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        {customAction()}
                                        {
                                            !isTyping && !isMyMessage && content && !isLoading && (
                                                <Tooltip title="Download response" placement="bottom">
                                                    <button
                                                        className={classNames('text-lg')}
                                                        onClick={downloadPDF}
                                                    >
                                                        <FaDownload className='cursor-pointer' size={20} />
                                                    </button>
                                                </Tooltip>
                                            )
                                        }
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Message
