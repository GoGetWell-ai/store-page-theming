import { forwardRef, useState, useRef, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Upload from '@/components/ui/Upload'
import hooks from '@/components/ui/hooks'
import type { KeyboardEvent } from 'react'
import { useSessionUser } from '@/store/authStore'
import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore'
import { Input, Notification, toast } from '@/components/ui'
import { LuImagePlus, LuSendHorizontal } from 'react-icons/lu'
import { BiShare } from 'react-icons/bi'
import { apiMakeConversationPublic } from '@/services/ConversationService'
import SharedPopup from '@/components/shared/SharedPopup'
import { MdKeyboardVoice } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import { FiLoader } from 'react-icons/fi'

export type ChatInputProps = {
    placeholder?: string
    onInputChange?: (payload: { value: string; attachments: File[] }) => void
    scrollToBottom?: any
    defaultOptions?: string[]
}

const { useMergeRef } = hooks;

const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>((props, ref) => {
    let alreadyRun = false
    const [attachments, setAttachments] = useState<File[]>([]);
    const { file, setFile, isTyping, fileUploadStatus } = usGenerativeChatStore()

    const user = useSessionUser((state) => state.user)
    const [sharedPopupStatus, setSharedPopupStatus] = useState(false)

    const { placeholder, onInputChange, scrollToBottom, defaultOptions } = props

    const inputRef = useRef<HTMLInputElement>(null)

    const { setPushedMessages, pushedMessages, conversationsMessages, selectedConversation } = usGenerativeChatStore()
    const [sharedLink, setSharedLink] = useState('')
    const [shareLoading, setShareLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Show dropdown when input is focused
    const handleInputFocus = () => {
        if (defaultOptions?.length > 0) {
            setIsDropdownOpen(true);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.body.addEventListener('click', () => {
                setIsDropdownOpen(false);
            })
        }
    }, [isDropdownOpen]);

    const handleInputClear = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }
        setAttachments([])
    }

    const handleChange = () => {
        if (inputRef.current?.value || attachments.length) {
            onInputChange?.({
                value: inputRef.current?.value || '',
                attachments,
            })
            handleInputClear()
        }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onInputChange?.({
                value: inputRef.current?.value || '',
                attachments,
            })
            handleInputClear()
            setIsDropdownOpen(false);
        }
    }

    useEffect(() => {
        console.log('pushedMessages', pushedMessages);
        if (pushedMessages) {
            const timeOut = setTimeout(() => {
                onInputChange?.({
                    value: pushedMessages,
                    attachments: [],
                })
                handleInputClear()

                if (scrollToBottom) {
                    scrollToBottom()
                }
            }, 100)

            return () => clearInterval(timeOut)
        }
    }, [pushedMessages, setPushedMessages])

    useEffect(() => {
        if ((file?.name || file?.length) && !alreadyRun) {
            alreadyRun = true
            onInputChange?.({
                value: "",
                attachments: file,
            })
            handleInputClear()
            setFile([])
            if (scrollToBottom) {
                scrollToBottom()
            }
        }
    }, [file]);

    const handleShareChat = async () => {
        try {
            setShareLoading(true)
            await apiMakeConversationPublic(selectedConversation);

            setSharedPopupStatus(true)
            setSharedLink(window.location.origin + `/chat-bot/public?id=${selectedConversation}`)
            toast.push(<Notification type='success' title='Success'>Conversation shared successfully.</Notification>)
        } catch (err) {
            console.log('something went wrong', err);
            toast.push(<Notification type='danger' title='Error'>Something went wrong. Try again later.</Notification>)
        } finally {
            setShareLoading(false)
        }
    }

    const renderActionButtons = () => (
        <div className="flex gap-2">
            {conversationsMessages?.length > 0 && (
                <Button
                    loading={shareLoading}
                    onClick={handleShareChat}
                    className="text-primary !border-0 hover:text-primary-deep transition-colors !h-auto !p-0 !m-0 hover:border-0"
                >
                    <BiShare size={24} />
                </Button>
            )}
            <Upload
                disabled={(user?.role?.[0] === 'patient' || !user?.role?.[0]) ? false : true}
                fileList={attachments}
                showList={false}
                onChange={setAttachments}
            >
                <button
                    className="p-2 text-primary hover:text-primary-deep transition-colors"
                    type="button"
                >
                    <LuImagePlus className='w-6 h-6' />
                </button>
            </Upload>
            <button
                onClick={() => handleKeyDown({ key: 'Enter' })}
                className="p-2 text-primary hover:text-primary-deep transition-colors relative"
                disabled={isTyping}
            >
                {isTyping ? (
                    <FiLoader className="w-6 h-6 animate-spin" />
                ) : (
                    <LuSendHorizontal className="w-6 h-6" />
                )}
            </button>
        </div>
    );

    const voiceButton = (
        <div className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gray-200 min-w-[40px] ml-1'>
            <MdKeyboardVoice size={20} className='text-primary' />
        </div>
    );

    return (
        <div className="dark:border-gray-700 rounded-xl min-h-[50px] flex flex-col chat-message-input relative">
            <SharedPopup popupStatus={sharedPopupStatus} link={sharedLink} />
            <div
                style={isTyping ? {
                    pointerEvents: 'none',
                    opacity: 0.5,
                } : {}}
                className={`flex items-center gap-2 w-full h-[50px] relative ${conversationsMessages.length ? 'max-w-[700px]' : 'max-w-[600px]'} mx-auto`}
            >
            {attachments.length > 0 && (
                <div className='absolute bottom-[100%]'>
                    <Upload
                        fileList={attachments}
                        fileListClass="flex gap-4"
                        fileItemClass="flex gap-8"
                        onFileRemove={setAttachments}
                    >
                        <></>
                    </Upload>
                </div>
            )}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedConversation ? 'conversation' : 'no-conversation'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full border-primary border-2 ${selectedConversation || conversationsMessages.length ? 'rounded-full overflow-hidden flex items-center justify-between gap-x-2' : 'rounded-[15px]'}`}
                    >
                        {selectedConversation && voiceButton}

                        <Input
                            ref={useMergeRef(inputRef, ref)}
                            className="w-full px-4 py-2 bg-white focus:outline-none focus:ring-0 focus:ring-transparent border-0 shadow-none"
                            placeholder={fileUploadStatus ? 'Please Wait file is uploading...' : isTyping ? 'Processing...' : placeholder}
                            onKeyDown={handleKeyDown}
                            onFocus={handleInputFocus}
                            disabled={isTyping || (user?.role?.[0] !== 'patient' && user?.role?.[0])}
                        />

                        {selectedConversation ? renderActionButtons() : (
                            <div className='w-[95%] mx-auto flex items-center justify-between mb-1'>
                                {voiceButton}
                                {renderActionButtons()}
                            </div>
                        )}

                        {!selectedConversation && (
                            <div onClick={(e) => e.stopPropagation()} className="relative w-full" ref={dropdownRef}>
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute z-10 w-full max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg mt-1"
                                        >
                                            {defaultOptions?.length && defaultOptions.map((option, index) => (
                                                <button
                                                    key={index}
                                                    className="flex items-center w-full px-4 py-1 text-left text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setPushedMessages(option)}
                                                >
                                                    <span className="mr-2 text-gray-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                        </svg>
                                                    </span>
                                                    {option}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
})

ChatInput.displayName = 'ChatInput'

export default ChatInput