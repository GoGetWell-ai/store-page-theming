import React, { useEffect, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { treatmentTypesData } from '../data/treatmentTypesData'
import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'
import {
    FaHeartPulse,
    FaBrain,
    FaBone,
    FaUserDoctor,
    FaStethoscope,
    FaLungs,
} from 'react-icons/fa6'
import {
    GiStomach,
    GiMedicalDrip,
    GiMedicines,
    GiBrainTentacle,
    GiEyeTarget,
    GiKidneys,
} from 'react-icons/gi'
import {
    MdPregnantWoman,
    MdChildCare,
    MdEmergency,
    MdOutlinePsychology,
    MdOutlineSick,
} from 'react-icons/md'
import { ImLab } from 'react-icons/im'
import { FaAllergies, FaHospital } from 'react-icons/fa'

type Treatment = {
    majorTitle: string
    subtypes: string[]
}

type TreatmentRowProps = {
    treatments: Treatment[]
    expandedId: string | null
    setExpandedId: React.Dispatch<React.SetStateAction<string | null>>
    rowIndex: number
    themeClasses: any
}

const getSpecialtyIcon = (title) => {
    const iconProps = { className: 'w-6 h-6' }

    switch (title) {
        case 'Organ Transplant':
            return <FaHospital {...iconProps} />
        case 'Cardiology':
            return <FaHeartPulse {...iconProps} />
        case 'Neurology':
            return <FaBrain {...iconProps} />
        case 'Orthopedics':
            return <FaBone {...iconProps} />
        case 'Oncology':
            return <GiMedicines {...iconProps} />
        case 'Dermatology':
            return <MdOutlineSick {...iconProps} />
        case 'Gastroenterology':
            return <GiStomach {...iconProps} />
        case 'Pulmonology':
            return <FaLungs {...iconProps} />
        case 'Endocrinology':
            return <GiMedicalDrip {...iconProps} />
        case 'Nephrology':
            return <GiKidneys {...iconProps} />
        case 'Rheumatology':
            return <FaStethoscope {...iconProps} />
        case 'Urology':
            return <FaUserDoctor {...iconProps} />
        case 'Psychiatry':
            return <MdOutlinePsychology {...iconProps} />
        case 'Ophthalmology':
            return <GiEyeTarget {...iconProps} />
        case 'Hematology':
            return <ImLab {...iconProps} />
        case 'Infectious Diseases':
            return <GiBrainTentacle {...iconProps} />
        case 'Allergy & Immunology':
            return <FaAllergies {...iconProps} />
        case 'Geriatrics':
            return <FaStethoscope {...iconProps} />
        case 'Obstetrics & Gynecology':
            return <MdPregnantWoman {...iconProps} />
        case 'Pediatrics':
            return <MdChildCare {...iconProps} />
        case 'Emergency Medicine':
            return <MdEmergency {...iconProps} />
        default:
            return <FaUserDoctor {...iconProps} />
    }
}

const TreatmentRow: React.FC<TreatmentRowProps> = ({
    treatments,
    expandedId,
    setExpandedId,
    rowIndex,
    themeClasses
}) => {
    const [className, setClassNames] = useState<string>('')
    const { setPushedMessages } = usGenerativeChatStore()
    const { hcfData } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 639) {
                const classNames =
                    'absolute bg-white w-full px-3 rounded-lg pb-3 left-0 z-50 shadow-lg border border-gray-100'
                setClassNames(classNames)
            } else {
                setClassNames('')
            }
        }

        // Add event listener to update width on resize
        window.addEventListener('resize', handleResize)
        handleResize()

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleClick = (line: string) => {
        setPushedMessages(line)
        navigate(`/chat-bot`)
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {treatments.map((treatment, index) => (
                <div key={index} className="stagger-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
                    <button
                        onClick={() =>
                            setExpandedId(
                                expandedId === `${rowIndex}-${index}`
                                    ? null
                                    : `${rowIndex}-${index}`,
                            )
                        }
                        className={`w-full p-4 text-left rounded-xl border ${
                            expandedId === `${rowIndex}-${index}` 
                            ? themeClasses.activeBorder 
                            : `border-gray-100 hover:${themeClasses.hoverBorder}`
                        } bg-white transition-all duration-300 relative hover-lift shadow-sm`}
                    >
                        <div className="flex items-center justify-between group">
                            <div className='flex items-center gap-2'>
                                <div
                                    className={`p-2 rounded-lg transition-colors duration-300 
                                    ${expandedId === `${rowIndex}-${index}`
                                        ? `${themeClasses.activeBg} ${themeClasses.activeIconColor}`
                                        : `bg-gray-50 ${themeClasses.iconColor} group-hover:${themeClasses.hoverBg}`
                                    }`}
                                >
                                    {getSpecialtyIcon(treatment.majorTitle)}
                                </div>
                                <span className={`font-medium ${themeClasses.textColor} transition-all duration-300`}>
                                    {treatment.majorTitle}
                                </span>
                            </div>
                            
                            <div className={`${expandedId === `${rowIndex}-${index}` ? themeClasses.activeIconColor : themeClasses.iconColor}`}>
                                {expandedId === `${rowIndex}-${index}` ? (
                                    <BiChevronUp className="w-5 h-5" />
                                ) : (
                                    <BiChevronDown className="w-5 h-5" />
                                )}
                            </div>
                        </div>

                        {expandedId === `${rowIndex}-${index}` && (
                            <div
                                className={`mt-4 pt-4 border-t ${themeClasses.dividerBorder} ${className} fade-in`}
                            >
                                <ul className="space-y-1">
                                    {treatment.subtypes.map(
                                        (subtype, subIndex) => (
                                            <li
                                                key={subIndex}
                                                className={`text-sm ${themeClasses.linkColor} transition-colors px-3 py-2 hover:${themeClasses.hoverBg} rounded-md cursor-pointer flex items-center gap-2`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleClick(subtype);
                                                }}
                                                style={{ animationDelay: `${subIndex * 30}ms` }}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${themeClasses.bulletColor}`}></span>
                                                {subtype}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        )}
                    </button>
                </div>
            ))}
        </div>
    )
}

const Treatments: React.FC = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const { specialty } = useThemeStore()
    
    useEffect(() => {
        setIsVisible(true)
    }, [])
    
    // Get theme specific classes
    const getThemeClasses = () => {
        switch (specialty) {
            case 'organTransplant':
                return {
                    titleGradient: 'from-teal-500 to-cyan-600',
                    textColor: 'text-teal-700',
                    iconColor: 'text-teal-600',
                    activeIconColor: 'text-teal-700',
                    activeBg: 'bg-teal-50',
                    hoverBg: 'bg-teal-50',
                    linkColor: 'text-teal-700',
                    bulletColor: 'bg-teal-500',
                    activeBorder: 'border-teal-200',
                    hoverBorder: 'border-teal-200',
                    dividerBorder: 'border-teal-100',
                    subtitleColor: 'text-teal-600'
                };
            case 'cosmeticSurgery':
                return {
                    titleGradient: 'from-pink-500 to-purple-600',
                    textColor: 'text-pink-700',
                    iconColor: 'text-pink-500',
                    activeIconColor: 'text-pink-700',
                    activeBg: 'bg-pink-50',
                    hoverBg: 'bg-pink-50',
                    linkColor: 'text-pink-700',
                    bulletColor: 'bg-pink-500',
                    activeBorder: 'border-pink-200',
                    hoverBorder: 'border-pink-200',
                    dividerBorder: 'border-pink-100',
                    subtitleColor: 'text-pink-600'
                };
            default:
                return {
                    titleGradient: 'from-blue-500 to-indigo-600',
                    textColor: 'text-primary',
                    iconColor: 'text-primary',
                    activeIconColor: 'text-primary-deep',
                    activeBg: 'bg-primary-subtle',
                    hoverBg: 'bg-primary-subtle',
                    linkColor: 'text-primary-deep',
                    bulletColor: 'bg-primary',
                    activeBorder: 'border-primary-mild',
                    hoverBorder: 'border-primary-subtle',
                    dividerBorder: 'border-gray-100',
                    subtitleColor: 'text-primary-mild'
                };
        }
    };

    const themeClasses = getThemeClasses();

    return (
        <div className={`max-w-[1538px] mx-auto px-4 sm:px-12 mt-12 md:mt-20 pb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-10">
                <h2 className={`text-3xl sm:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.titleGradient}`}>
                    Explore more about Treatments
                </h2>
                <p className={`text-gray-600 max-w-2xl mx-auto ${themeClasses.subtitleColor}`}>
                    Discover specialized treatments across multiple medical fields and connect with experts
                </p>
            </div>

            <div className="space-y-8">
                <TreatmentRow
                    treatments={treatmentTypesData}
                    expandedId={expandedId}
                    setExpandedId={setExpandedId}
                    rowIndex={0}
                    themeClasses={themeClasses}
                />
            </div>
        </div>
    )
}

export default Treatments
