import {
    LuFileClock,
    LuFileSearch,
    LuImagePlus,
    LuMessagesSquare,
    LuSendHorizonal,
} from 'react-icons/lu'
import useChatSend from '../hooks/useChatSend'
import { Card } from '@/components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import ChatInput from '@/views/chat-bot/components/ChatBox/components/ChatInput'
import { FiMessageCircle } from 'react-icons/fi'
import {
    BiCalendar,
    BiCalendarAlt,
    BiCalendarCheck,
    BiCheckCircle,
    BiClipboard,
} from 'react-icons/bi'
import { BsActivity } from 'react-icons/bs'
import { CgLock } from 'react-icons/cg'
import AppointmentPopup from '@/components/shared/AppointmentPopup'
import { useUserStore } from '@/store/userStore'
import { useSessionUser } from '@/store/authStore'
import { usGenerativeChatStore } from '../store/generativeChatStore'
import Loading from '@/components/shared/Loading'
import { motion } from 'framer-motion'
import UploadMedicalReports from '@/components/shared/UploadMedicalReports'

interface ChatLandingViewProps {
    placeholder: string
    onInputChange: any
    scrollToBottom: any
}

const ChatLandingView: React.FC<ChatLandingViewProps> = ({
    placeholder,
    onInputChange,
    scrollToBottom,
}) => {
    const {
        setPushedMessages,
        isTyping,
        selectedConversationMessages,
        selectedConversation,
        conversationsMessages,
    } = usGenerativeChatStore()
    const { user } = useSessionUser()
    const [medicalReportPopupStatus, setMedicalReportPopupStatus] = useState(false);

    const defaultOptions = [
        'Treatment Options',
        'Cost Of Treatment',
        'Understand The Procedure',
        'Pre- Surgery Preparation',
        'Medical Visa Requirements',
        'Discount On Treatment'
    ]

    const quickActions = [
        {
            icon: <BiCalendarAlt className="w-6 h-6" />,
            title: 'Quick Appointments',
            description: 'Schedule consultations easily',
        },
    ]

    useEffect(() => {
        scrollToBottom()
    }, [])

    return (
        <div
            className="h-full"
        >
            <div className="w-full mx-auto p-2 md:p-4 h-full flex flex-col justify-center gap-y-2">
                {/* <div>
                    <div className="bg-white rounded-xl p-2 xs:p-4 md:p-6 shadow-sm border">
                        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-deep to-primary bg-clip-text text-transparent md:mb-4">
                            Hi
                        </h1>
                        <h2 className="text-xl md:text-3xl font-bold text-gray-800 md:mb-4">
                            How can I help you?
                        </h2>
                        <p className="text-gray-600 mb-2">
                            I'm here to assist you in the{' '}
                            <span className="text-primary font-bold">
                                Planning your treatment with ease
                            </span>
                            .
                        </p>
                        <p className="text-gray-600">
                            Feel free to{' '}
                            <span className="text-primary font-bold">
                                Ask me any question
                            </span>{' '}
                            about your{' '}
                            <span className="text-primary font-bold">
                                Medical report
                            </span>
                            , treatment options or free doctor consultation,
                            second opinion or pricing for treatment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-2">
                        {(user.role?.[0] === 'patient' || !user.role?.[0]) &&
                            quickActions.map((action, index) => (
                                <AppointmentPopup
                                    key={index}
                                    buttonChildren={
                                        <div
                                            key={index}
                                            className="bg-white p-2 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border block sm:hidden cursor-pointer"
                                        >
                                            <div className="bg-primary/10 rounded-full text-primary mb-1">
                                                {action.icon}
                                            </div>
                                            <p className="font-semibold text-gray-800 mb-1 !text-md md:!text-xl">
                                                {action.title}
                                            </p>
                                            <p className="text-[12px] md:text-sm text-gray-600">
                                                {action.description}
                                            </p>
                                        </div>
                                    }
                                />
                            ))}
                    </div>
                </div> */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        How can I help you?
                    </h1>

                    <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
                        I am here to assist you to plan your treatment. Upload your medical report to plan your
                        treatment with personalized care.
                    </p>
                </motion.div >

                <div className="">


                    <div className="mt-3 relative">
                        {!selectedConversation &&
                            !conversationsMessages.length && (
                                <ChatInput
                                    placeholder={placeholder}
                                    scrollToBottom={scrollToBottom}
                                    onInputChange={onInputChange}
                                    defaultOptions={defaultOptions}
                                />
                            )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center max-w-[600px] mx-auto flex items-between justify-between mt-10"
                    >
                        <button className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3m0 0a7 7 0 017 7c0 4-3 6-7 7m-7-7a7 7 0 017-7" />
                            </svg>
                        </button>

                        <div className="flex space-x-2">
                            <button onClick={() => setMedicalReportPopupStatus(true)} className="px-4 py-2 bg-blue-50 rounded-lg text-primary hover:bg-blue-100 transition-all duration-300 text-sm font-medium">
                                Upload Report
                            </button>
                            <button onClick={() => setPushedMessages('Treatment options')} className="px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary-deep transition-all duration-300 text-sm font-medium">
                                Get Started
                            </button>
                        </div>
                    </motion.div >
                    {medicalReportPopupStatus && (
                        <UploadMedicalReports
                            setPopupStatus={setMedicalReportPopupStatus}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}

export default ChatLandingView
