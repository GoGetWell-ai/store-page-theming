import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore';
import React, { useEffect, useRef, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface SuggestedQuestionProps {
    onInputChange: any
    ref: any
}


const SuggestedQuestion: React.FC<SuggestedQuestionProps> = ({ onInputChange, ref }) => {
    const { suggestedQuestions } = usGenerativeChatStore()
    const scrollRef = useRef()

    const scrollToBottomDiv = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollToBottomDiv()
    }, [])

    const [clickStatus, setClickStatus] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState(true);
    const [userClicked, setUserClicked] = useState(false);

    useEffect(() => {
        setClickStatus(false);
        if (ref?.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }

        if (suggestedQuestions?.length) {
            setIsVisible(true)
        }
    }, [suggestedQuestions])

    useEffect(() => {
        // Only start timer if not manually toggled
        if (isVisible && !userClicked) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);



    const handleToggle = (e) => {
        e.stopPropagation()
        setIsVisible(!isVisible);
        setUserClicked(!userClicked)
    };

    useEffect(() => {
        const handleClick = () => {
            setIsVisible(false)
            setUserClicked(false)
        }

        window.addEventListener('click', handleClick);

        return () => window.removeEventListener('click', handleClick)
    }, [])

    if (!suggestedQuestions?.length || clickStatus) {
        return null;
    }


    return (
        <div ref={scrollRef} className="relative w-full">
            <div className={`transition-all duration-500 ease-in-out overflow-hidden
        ${isVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div onClick={(e) => e.stopPropagation()} className="w-auto mx-[1%] bg-white rounded-xl p-2 shadow-sm border">
                    <div className="flex flex-wrap gap-1 justify-center">
                        {suggestedQuestions.map((data, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (onInputChange) {
                                        onInputChange({
                                            value: data,
                                            attachments: []
                                        });
                                        setClickStatus(true);
                                    }
                                }}
                                className="px-2 py-1 text-sm bg-primary hover:bg-primary-deep text-white 
                          rounded-[5px] transition-colors duration-200 border border-primary/10
                          hover:shadow-md text-[12px]"
                            >
                                {data}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={handleToggle}
                className={`absolute left-1/2 -translate-x-1/2 ${isVisible ? '-bottom-3 w-8 h-8' : 'bottom-[-10px] px-2 py-1'}
                    bg-white rounded-full shadow-md border border-primary/20
                   flex items-center justify-center text-primary hover:bg-primary/5
                   transition-all duration-200 z-10`}
            >
                {!isVisible ?
                    <div className='flex items-center'>
                        <BiChevronUp className="w-5 h-5" />
                        <p>Suggestions</p>
                    </div> :
                    <BiChevronDown className="w-5 h-5" />
                }
            </button>
        </div>
    );
};

export default SuggestedQuestion;