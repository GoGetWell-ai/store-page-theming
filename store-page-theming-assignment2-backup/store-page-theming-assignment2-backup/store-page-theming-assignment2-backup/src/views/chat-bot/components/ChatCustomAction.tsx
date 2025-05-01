import { useRef, useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { Form, FormItem } from '@/components/ui/Form'
import Dialog from '@/components/ui/Dialog'
import Tooltip from '@/components/ui/Tooltip'
import classNames from '@/utils/classNames'
import AppointmentPopup from '@/components/shared/AppointmentPopup'
import { TbThumbDown, TbThumbDownFilled, TbThumbUp, TbThumbUpFilled } from 'react-icons/tb'

type ChatCustomActionProps = {
    content: string
}

const responseOption = [
    { label: 'Not factually correct', value: 'notFactuallyCorrect' },
    { label: 'Harmful content', value: 'harmfulContent' },
    { label: 'Overeactive refusal', value: 'overeactiveRefusal' },
    { label: 'Other', value: 'other' },
]

const ChatCustomAction = ({ content }: ChatCustomActionProps) => {
    const detailInput = useRef<HTMLTextAreaElement>(null)
    const [copied, setCopied] = useState(false)
    const [selected, setSelected] = useState('')
    const [responseSend, setResponSend] = useState('')
    const [activeButton, setActiveButton] = useState<string | null>(null)
    const [responseDialog, setResponseDialog] = useState<{
        type: string
        open: boolean
    }>({
        type: '',
        open: false,
    })

    // Handle animation effects
    useEffect(() => {
        if (activeButton) {
            const timer = setTimeout(() => {
                setActiveButton(null)
            }, 600)
            return () => clearTimeout(timer)
        }
    }, [activeButton])

    // Handle copy functionality
    useEffect(() => {
        if (copied && content) {
            navigator.clipboard.writeText(content)
            const copyFeedbackInterval = setTimeout(
                () => setCopied(false),
                2000
            )

            return () => {
                clearTimeout(copyFeedbackInterval)
            }
        }
    }, [copied, content])

    const handleDialogClose = () => {
        setResponseDialog({
            type: '',
            open: false,
        })
    }

    const handleSubmit = () => {
        setResponSend(responseDialog.type)
        handleDialogClose()
        toast.push(
            <Notification type="success">
                Thanks for your feedback!
            </Notification>,
            { placement: 'top-center' },
        )
    }

    const handleButtonClick = (action: string) => {
        setActiveButton(action)

        switch (action) {
            case 'copy':
                setCopied(true)
                break
            case 'thumbsUp':
                setResponseDialog({ type: 'praise', open: true })
                break
            case 'thumbsDown':
                setResponseDialog({ type: 'blame', open: true })
                break
            case 'appointment':
                // Appointment handling is through the AppointmentPopup component
                break
        }
    }

    return (
        <>
            <div className="flex space-x-2 my-2 items-center">
                <Tooltip title={copied ? 'Copied!' : 'Copy message'} placement="bottom">
                    <button
                        className={classNames(
                            "p-1.5 rounded-full text-gray-500 transition-all duration-300 chat-action-btn",
                            copied ? "copied-state bg-green-50 text-green-500" : "hover:bg-gray-100 hover:text-green-500",
                            activeButton === 'copy' ? "active" : ""
                        )}
                        onClick={() => handleButtonClick('copy')}
                        aria-label="Copy message"
                    >
                        <svg className="w-5 h-5 svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {copied ? (
                                <path
                                    d="M5 13L9 17L19 7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            ) : (
                                <path
                                    d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M10 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            )}
                        </svg>
                    </button>
                </Tooltip>
                <Tooltip title="Good response" placement="bottom">
                    <button
                        className={classNames(
                            "p-1.5 rounded-full text-gray-500 transition-all duration-300 chat-action-btn",
                            responseSend === 'praise' ? "thumbs-up-selected action-selected" : "hover:bg-gray-100 hover:text-blue-500",
                            activeButton === 'thumbsUp' ? "active" : ""
                        )}
                        onClick={() => handleButtonClick('thumbsUp')}
                        aria-label="Good response"
                    >
                        {responseSend === 'praise' ? (
                            <TbThumbUpFilled size={20} />
                        ) : (
                            <TbThumbUp size={20} />
                        )}
                    </button>
                </Tooltip>

                <Tooltip title="Bad response" placement="bottom">
                    <button
                        className={classNames(
                            "p-1.5 rounded-full text-gray-500 transition-all duration-300 chat-action-btn",
                            responseSend === 'blame' ? "thumbs-down-selected action-selected" : "hover:bg-gray-100 hover:text-red-500",
                            activeButton === 'thumbsDown' ? "active" : ""
                        )}
                        onClick={() => handleButtonClick('thumbsDown')}
                        aria-label="Bad response"
                    >
                        {responseSend === 'blame' ? (
                            <TbThumbDownFilled size={20} />
                        ) : (
                            <TbThumbDown size={20} />
                        )}
                    </button>
                </Tooltip>

                <Tooltip title="Book Appointment" placement="bottom">
                    <AppointmentPopup
                        buttonChildren={
                            <div
                                className={classNames(
                                    "cursor-pointer p-1.5 rounded-full text-gray-500 transition-all duration-300 chat-action-btn",
                                    "hover:bg-gray-100 hover:text-purple-500",
                                    activeButton === 'appointment' ? "active" : ""
                                )}
                                onClick={() => setActiveButton('appointment')}
                            >
                                <svg
                                    className="w-5 h-5 svg-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 12H15M9 16H15M9 8H15M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        }
                    />
                </Tooltip>
            </div>

            <Dialog
                isOpen={responseDialog.open}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
                className="feedback-dialog"
            >
                <h5 className="mb-4">Feedback</h5>
                <Form onSubmit={handleSubmit}>
                    {responseDialog.type === 'praise' && (
                        <FormItem label="Please provide details: (optional)">
                            <Input
                                ref={detailInput}
                                textArea
                                placeholder="What was satisfying about this response?"
                            />
                        </FormItem>
                    )}
                    {responseDialog.type === 'blame' && (
                        <>
                            <FormItem label="What type of issue do you wish to report? (optional)">
                                <Select
                                    options={responseOption}
                                    value={responseOption.filter(
                                        (response) =>
                                            response.value === selected,
                                    )}
                                    onChange={(option) =>
                                        setSelected(option?.value || '')
                                    }
                                />
                            </FormItem>
                            <FormItem label="Please provide details: (optional)">
                                <Input
                                    ref={detailInput}
                                    textArea
                                    placeholder="What was unsatisfying about this response?"
                                />
                            </FormItem>
                        </>
                    )}
                </Form>
                <div className="flex justify-end gap-2">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        type="button"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default ChatCustomAction