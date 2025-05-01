import React, { useState, useEffect, useRef } from 'react'
import { Button, Input } from '@/components/ui'
import { BiPlusCircle, BiSearch, BiUser } from 'react-icons/bi'
import { BsHospital } from 'react-icons/bs'
import { CiSettings } from 'react-icons/ci'
import { FiFileText } from 'react-icons/fi'
import UploadMedicalReports from '@/components/shared/UploadMedicalReports'
import { treatmentTypesData } from '../data/treatmentTypesData'
import { useNavigate } from 'react-router-dom'
import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'
import { useThemeStore } from '@/store/themeStore'

const StartYourJourney = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [uploadReportPopupStatus, setUploadReportPopupStatus] =
        useState(false)
    const { hcfData } = useAuthStore()
    const { specialty } = useThemeStore()
    const [steps, setSteps] = useState<
        { icon: JSX.Element; text: string; description: string }[]
    >([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const wrapperRef = useRef(null)
    const navigate = useNavigate()
    const { setPushedMessages } = usGenerativeChatStore()

    // Apply animation on mount
    useEffect(() => {
        setIsVisible(true)
    }, [])

    // Get theme specific classes
    const getThemeClasses = () => {
        switch (specialty) {
            case 'organTransplant':
                return {
                    primary: 'text-teal-600',
                    gradient: 'from-teal-500 to-cyan-600',
                    activeStepBg: 'bg-teal-600',
                    inactiveStepBg: 'bg-teal-100',
                    hoverStepBg: 'bg-teal-200',
                    borderFocus: 'focus:border-teal-500 hover:border-teal-500',
                    progressBar: 'bg-teal-500',
                    buttonGradient:
                        'bg-gradient-to-r from-teal-600 to-teal-400',
                }
            case 'cosmeticSurgery':
                return {
                    primary: 'text-pink-600',
                    gradient: 'from-pink-500 to-purple-600',
                    activeStepBg: 'bg-pink-600',
                    inactiveStepBg: 'bg-pink-100',
                    hoverStepBg: 'bg-pink-200',
                    borderFocus: 'focus:border-pink-500 hover:border-pink-500',
                    progressBar: 'bg-pink-500',
                    buttonGradient:
                        'bg-gradient-to-r from-pink-600 to-pink-400',
                }
            default:
                return {
                    primary: 'text-primary',
                    gradient: 'from-blue-500 to-indigo-600',
                    activeStepBg: 'bg-primary',
                    inactiveStepBg: 'bg-[#e5e2f1]',
                    hoverStepBg: 'bg-primary/20',
                    borderFocus: 'focus:border-primary hover:border-primary',
                    progressBar: 'bg-primary',
                    buttonGradient:
                        'bg-gradient-to-r from-blue-600 to-blue-400',
                }
        }
    }

    const themeClasses = getThemeClasses()

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length)
        }, 2000)
        return () => clearInterval(timer)
    }, [steps.length])

    useEffect(() => {
        if (hcfData?.type !== 'hospital') {
            setSteps([
                {
                    icon: <BiPlusCircle className="w-6 h-6" />,
                    text: 'Choose Treatment',
                    description: 'Browse treatment options',
                },
                {
                    icon: <FiFileText className="w-6 h-6" />,
                    text: 'Get Treatment Plan',
                    description: 'Receive a personalized plan',
                },
                {
                    icon: <BsHospital className="w-6 h-6" />,
                    text: 'Select Hospital',
                    description: 'Find the best hospitals',
                },
                {
                    icon: <BiUser className="w-6 h-6" />,
                    text: 'Select Doctor',
                    description: 'Choose top specialists',
                },
                {
                    icon: <CiSettings className="w-6 h-6" />,
                    text: 'Finalize Treatment',
                    description: 'Confirm your options',
                },
            ])
        } else {
            setSteps([
                {
                    icon: <BiPlusCircle className="w-6 h-6" />,
                    text: 'Choose Treatment',
                    description: 'Browse treatment options',
                },
                {
                    icon: <FiFileText className="w-6 h-6" />,
                    text: 'Get Treatment Plan',
                    description: 'Receive a personalized plan',
                },
                {
                    icon: <BiUser className="w-6 h-6" />,
                    text: 'Select Doctor',
                    description: 'Choose top specialists',
                },
                {
                    icon: <CiSettings className="w-6 h-6" />,
                    text: 'Finalize Treatment',
                    description: 'Confirm your options',
                },
            ])
        }
    }, [hcfData])

    const handleInputChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        searchTreatments(value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        searchTreatments(searchTerm)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsInputFocused(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [wrapperRef])

    const searchTreatments = (term) => {
        if (!term.trim()) {
            // If search term is empty, show all treatments
            const allTreatments = treatmentTypesData.flatMap((category) =>
                category.subtypes.map((subtype) => ({
                    subtype,
                    majorTitle: category.majorTitle,
                })),
            )
            setSearchResults(allTreatments)
            return
        }

        // Filter treatments based on search term
        const filteredResults = treatmentTypesData.flatMap((category) => {
            const matchingSubtypes = category.subtypes.filter((subtype) =>
                subtype.toLowerCase().includes(term.toLowerCase()),
            )

            return matchingSubtypes.map((subtype) => ({
                subtype,
                majorTitle: category.majorTitle,
            }))
        })

        setSearchResults(filteredResults)
    }

    // Handle selection of a treatment
    const handleSelectTreatment = (treatment) => {
        setSearchTerm(treatment.subtype)
        setIsInputFocused(false)
        setPushedMessages(treatment.subtype)
        navigate(`/chat-bot`)
    }

    return (
        <div
            className={`mt-32 md:mt-36 lg:mt-16 py-4 sm:py-6 px-4 max-w-6xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
            <div className="flex justify-center items-center gap-x-1 sm:flex-row flex-col mb-0">
                <div className="relative w-full md:w-96" ref={wrapperRef}>
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full md:w-96 group"
                    >
                        <Input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            onFocus={() => {
                                setIsInputFocused(true)
                                searchTreatments(searchTerm)
                            }}
                            placeholder="Search Your Treatment"
                            className={`w-full px-3 py-1.5 pr-10 rounded-full border border-gray-200 ${themeClasses.borderFocus} focus:outline-none 
              text-gray-700 placeholder-gray-400 transition-all duration-300 shadow-sm text-sm`}
                        />
                        <button
                            type="submit"
                            className={`absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full 
              transition-all duration-300 hover:text-white ${themeClasses.buttonGradient} hover:shadow-md btn-ripple`}
                        >
                            <BiSearch className="w-3.5 h-3.5 text-white" />
                        </button>
                    </form>

                    {isInputFocused && (
                        <div className="absolute z-10 mt-0.5 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto fade-in">
                            {searchResults.length > 0 ? (
                                <ul className="py-0.5">
                                    {searchResults.map((result, index) => (
                                        <li
                                            key={index}
                                            className={`px-3 py-1 hover:bg-gray-100 cursor-pointer transition-all duration-300 ${index === 0 ? 'stagger-fade-in' : ''}`}
                                            onClick={() =>
                                                handleSelectTreatment(result)
                                            }
                                            style={{
                                                animationDelay: `${index * 50}ms`,
                                            }}
                                        >
                                            <div
                                                className={`text-xs font-medium ${themeClasses.primary}`}
                                            >
                                                {result.subtype}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {result.majorTitle}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-3 py-2 text-xs text-gray-500 fade-in">
                                    No treatments found
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <p className="mx-1 sm:block hidden text-gray-500 text-sm">Or</p>

                <div className="sm:mt-0 mt-1 w-full sm:w-auto">
                    {uploadReportPopupStatus && (
                        <UploadMedicalReports
                            setPopupStatus={setUploadReportPopupStatus}
                        />
                    )}
                    <Button
                        className={`rounded-full block w-full md:w-auto ${themeClasses.buttonGradient} 
              text-white shadow-sm btn-ripple transition-all duration-300
              hover:shadow-md hover:scale-105 active:scale-95 px-3 py-1.5 text-xs`}
                        onClick={() => setUploadReportPopupStatus(true)}
                    >
                        Upload Your Medical Report
                    </Button>
                </div>
            </div>

            <div className="text-center mb-8 mt-12 stagger-fade-in">
                <h2
                    className={`text-3xl sm:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.gradient}`}
                >
                    Start Your Journey
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Upload your medical report to receive AI-powered insights on
                    the best treatment plans.
                </p>
            </div>

            <div className="relative py-12 mt-8">
                {/* Progress Line - positioned lower to avoid text overlap */}
                <div className="absolute top-[calc(75%)] left-[9%] w-[82%] hidden md:block z-[1]">
                    <div className="h-1.5 bg-gray-200 rounded-full relative">
                        <div
                            className={`absolute top-0 left-0 h-full ${themeClasses.progressBar} rounded-full transition-all duration-1000 ease-in-out`}
                            style={{
                                width: `${(activeStep / (steps.length - 1)) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Journey steps with proper spacing */}
                <div className="relative flex flex-col md:flex-row justify-between gap-y-6 md:gap-x-2 z-[3]">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center md:px-2 w-full transition-all duration-500
                ${index === activeStep ? 'scale-105' : 'scale-100'}
              `}
                        >
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 relative z-[2]
                  transition-all duration-300 transform shadow-lg border
                  ${
                      index === activeStep
                          ? `${themeClasses.activeStepBg} text-white shadow-xl border-white`
                          : `${themeClasses.inactiveStepBg} ${themeClasses.primary} hover:${themeClasses.hoverStepBg} border-gray-100`
                  }
                `}
                            >
                                {step.icon}
                            </div>
                            {/* Text moved far enough from the progress line */}
                            <div className="h-8 mb-8">
                                <p
                                    className={`text-sm font-medium text-center transition-colors duration-300
                    ${index === activeStep ? themeClasses.primary : 'text-gray-600'}
                  `}
                                >
                                    {step.text}
                                </p>
                                {index === activeStep && (
                                    <p className="text-xs text-center mt-1 text-gray-500 transition-all duration-300 opacity-100 scale-100">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="text-center mt-16 mb-8">
                <h2 className={`text-2xl sm:text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.gradient}`}>
                    Explore more about Treatments
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-blue-500"></div>
            </div>
        </div>
    )
}

export default StartYourJourney
