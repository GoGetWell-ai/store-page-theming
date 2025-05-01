import React, { ReactNode, useRef, useState, useEffect } from 'react';
import Attachment from './Attachment';
import classNames from '@/utils/classNames';
import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore';
import { MdBugReport, MdOutlineFileDownload } from 'react-icons/md';
import ChatCustomAction from '../../ChatCustomAction';
import { Tooltip } from '@/components/ui';
import html2canvas from 'html2canvas';
import NewAttachment from './NewAttachment';
import RelatedQuestionsComponent from './FaqComponent';

interface NewMessageProps {
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
    isMyMessage?: boolean
    bubbleClass?: string
    customRenderer?: () => string | ReactNode
    customAction?: () => string | ReactNode
    nextMessage?: any
    listLength?: number
    index?: number
}

const NewMessage: React.FC<NewMessageProps> = (props) => {
    const {
        attachments,
        content,
        isMyMessage,
        id,
        bubbleClass,
        customRenderer,
        nextMessage,
        index,
        listLength
    } = props;

    console.log('here is the attachments', attachments);

    const [activeTab, setActiveTab] = useState('search');
    const { isLoading, isTyping, suggestedQuestions } = usGenerativeChatStore();
    const divRef = useRef<HTMLDivElement>(null);
    const [analyzeText, setAnalyzeText] = useState('Analyzing');

    // Animation for "Analyzing..." text
    useEffect(() => {
        if (!isLoading) return;

        const intervalId = setInterval(() => {
            setAnalyzeText(prev => {
                if (prev === 'Analyzing...') return 'Analyzing';
                if (prev === 'Analyzing..') return 'Analyzing...';
                if (prev === 'Analyzing.') return 'Analyzing..';
                return 'Analyzing.';
            });
        }, 400);

        return () => clearInterval(intervalId);
    }, [isLoading]);

    const isPlainText = (text: string | ReactNode): boolean => {
        if (typeof text !== 'string') return false;
        return !/<\/?[^>]+(>|$)/g.test(text) && !/#/.test(text);
    };

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
        <div className="w-full p-3">
            {
                isMyMessage && (
                    <div className="w-full">
                        {/* Message header with AI icon */}
                        {/* <div className="flex items-center mb-4">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4L12 8M12 20L12 16M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12ZM12 12V16M21 16C21 18.7614 16.9706 21 12 21C7.02944 21 3 18.7614 3 16C3 13.2386 7.02944 11 12 11C16.9706 11 21 13.2386 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">{sender?.name || 'AI Assistant'}</h3>
                                <span className="text-xs text-gray-500">AI-powered chat assistant</span>
                            </div>
                        </div> */}

                        <NewAttachment attachments={attachments} />
                        {/* Message content area */}
                        <div className="mb-6">
                            <div className="text-xl font-bold mb-3 text-gray-800">
                                {content}
                            </div>
                        </div>

                        {/* Tabs navigation */}
                        <div className="border-b border-gray-300">
                            <div className="flex items-center">
                                <div className="flex space-x-6">
                                    {/* Search tab */}
                                    <button
                                        onClick={() => setActiveTab('search')}
                                        className={`flex items-center pb-1.5 px-3 font-medium transition-colors duration-200 ${activeTab === 'search' ? 'border-b-2 border-primary text-primary-deep' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Search
                                    </button>

                                    {/* Images tab */}
                                    <button
                                        onClick={() => setActiveTab('images')}
                                        className={`flex items-center pb-1.5 px-3 font-medium transition-colors duration-200 ${activeTab === 'images' ? 'border-b-2 border-primary text-primary-deep' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <MdBugReport size={23} className='mr-1' />
                                        Reports
                                    </button>

                                    {/* AI Tools tab */}
                                    {/* <button
                                        onClick={() => setActiveTab('ai')}
                                        className={`flex items-center pb-1.5 px-3 font-medium transition-colors duration-200 ${activeTab === 'ai' ? 'border-b-2 border-primary text-primary-deep' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.1 17.8l-3.9-3.9a2 2 0 0 1 0-2.8l3.9-3.9M14.9 6.2l3.9 3.9a2 2 0 0 1 0 2.8l-3.9 3.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        AI Tools
                                    </button> */}
                                </div>

                                {/* Task count indicator */}
                                {/* <div className="ml-auto flex items-center text-gray-500 group cursor-pointer hover:text-primary-deep transition-colors duration-200">
                                    <div className="mr-1.5 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span>2 tasks</span>
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div> */}
                            </div>
                        </div>

                        {/* Tab content area */}
                        <div className="pt-4">
                            {/* {activeTab === 'search' && (
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search or ask AI assistant..."
                                        className="w-full py-2 pl-10 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-all duration-200"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <button className="p-1 rounded-full bg-blue-50 text-primary hover:bg-blue-100 transition-colors duration-200">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )} */}

                            {activeTab === 'search' && <div
                                ref={divRef}
                                className={`${classNames(
                                    `bubble flex flex-col justify-center h-full max-w-[750px] rounded-xl px-2 sm:px-5 py-2 sm:py-2.5 prose text-sm text-gray-900 dark:text-gray-100`,
                                    bubbleClass,
                                )} ${id.includes('typing') && '!bg-transparent !p-0'} !max-w-[100%] !text-[12px] xs:!text-[14px] sm:!text-[16px]`}
                            >
                                {nextMessage?.sender?.id === 'ai' ? (
                                    customRenderer && !isLoading ? (
                                        customRenderer()
                                    ) : (
                                        <>
                                            {isPlainText(nextMessage?.content) && nextMessage?.content} hello world
                                        </>
                                    )
                                ) : isTyping && nextMessage?.sender?.id !== 'human' && (
                                    <div className="flex items-center py-3 px-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm border border-blue-100">
                                        <span className="font-medium text-primary-deep mr-4">{analyzeText}</span>
                                        <div className="flex items-end space-x-1.5">
                                            {[0, 1, 2, 3, 4].map((index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gradient-to-t from-primary to-primary-deep rounded-full"
                                                    style={{
                                                        width: '3px',
                                                        height: `${Math.sin((Date.now() / 500) + index) * 5 + 10}px`,
                                                        animation: 'typingWave 1.5s ease-in-out infinite',
                                                        animationDelay: `${index * 100}ms`
                                                    }}
                                                ></div>
                                            ))}
                                        </div>

                                        <style jsx>{`
                                        @keyframes typingWave {
                                          0%, 100% {
                                            transform: scaleY(0.5);
                                          }
                                          50% {
                                            transform: scaleY(1.2);
                                          }
                                        }
                                      `}</style>
                                    </div>
                                )}
                            </div>}

                            {activeTab === 'images' && (
                                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                                    <div className="flex flex-col items-center text-gray-500">
                                        <svg className="w-8 h-8 mb-2 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                                            <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="text-sm">Drop images here or click to upload</span>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'ai' && (
                                <div className="grid grid-cols-3 gap-3 py-2">
                                    <button className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-primary-deep transition-colors duration-200">
                                        <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 4L12 8M12 20L12 16M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12ZM12 12V16M21 16C21 18.7614 16.9706 21 12 21C7.02944 21 3 18.7614 3 16C3 13.2386 7.02944 11 12 11C16.9706 11 21 13.2386 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="text-sm">Analyze</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors duration-200">
                                        <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 11.5L11 13.5L15 9.5M19 8.5L14 3.5H7C5.89543 3.5 5 4.39543 5 5.5V18.5C5 19.6046 5.89543 20.5 7 20.5H17C18.1046 20.5 19 19.6046 19 18.5V8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="text-sm">Complete</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg hover:bg-green-100 text-green-600 transition-colors duration-200">
                                        <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="text-sm">Chat</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {
                            nextMessage?.sender?.id === 'ai' && !isTyping && (
                                <div className="mt-0 flex items-center justify-between pb-0">
                                    <div className='flex items-center space-x-2'>
                                        <ChatCustomAction content={nextMessage?.content} />
                                        <Tooltip title="Download response" placement="bottom">
                                            <button
                                                className={classNames(
                                                    "p-1.5 rounded-full text-gray-500 transition-all duration-300 chat-action-btn"
                                                )}
                                                onClick={downloadPDF}
                                                aria-label="Download response"
                                            >
                                                <MdOutlineFileDownload className='cursor-pointer' size={22} />
                                            </button>
                                        </Tooltip>
                                    </div>

                                    <div className="hidden sm:flex items-center">
                                        <span className="text-xs text-gray-500 mr-2">AI powered by</span>
                                        <div className="flex items-center px-2 py-1 bg-blue-50 rounded-full text-primary-deep text-xs font-medium">
                                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Real-time
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            (nextMessage?.sender?.id === 'ai' && (index + 2) === listLength && suggestedQuestions?.length) ? (
                                <RelatedQuestionsComponent questions={suggestedQuestions} />
                            ) : ''
                        }

                    </div>
                )
            }
        </div>
    );
};

export default NewMessage;