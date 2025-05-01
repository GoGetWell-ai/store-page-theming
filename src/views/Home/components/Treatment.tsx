import React, { useEffect, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { treatmentTypesData } from '../data/treatmentTypesData'
import { useAuth } from '@/auth'
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

type ThemeStyles = {
    container: string;
    heading: string;
    card: string;
    iconBgActive: string;
    iconBgHover: string;
    titleText: string;
    chevron: string;
    expandedBg: string;
    listItem: string;
}

type TreatmentRowProps = {
    treatments: Treatment[]
    expandedId: string | null
    setExpandedId: React.Dispatch<React.SetStateAction<string | null>>
    rowIndex: number
    themeStyles?: ThemeStyles
}

interface IconProps {
    className: string
}

const getSpecialtyIcon = (title: string): JSX.Element => {
    const iconProps: IconProps = { className: 'w-6 h-6' }

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
    themeStyles,
}) => {
    const [className, setClassNames] = useState<string>('')
    const { setPushedMessages } = usGenerativeChatStore()
    const { hcfData } = useAuthStore()
    const navigate = useNavigate()
    const { specialty } = useThemeStore()

    // Default styles if themeStyles is not provided
    const defaultStyles = {
        card: "border-purple-100 hover:border-purple-300",
        iconBgActive: "bg-[#63559a2b] text-primary",
        iconBgHover: "group-hover:bg-[#63559a2b] group-hover:text-primary",
        titleText: "text-primary",
        chevron: "text-primary",
        expandedBg: "border-purple-100",
        listItem: "hover:bg-purple-50 text-primary hover:text-primary"
    };

    // Use provided theme styles or default
    const styles = themeStyles || defaultStyles;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 639) {
                const classNames =
                    'absolute bg-white w-full px-3 rounded-lg pb-3 left-0 z-50'
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

    // Get card background based on theme
    const getCardBackground = () => {
        switch (specialty) {
            case 'organ-transplant':
                return 'bg-white hover:bg-green-50';
            case 'cosmetic-surgery':
                return 'bg-white hover:bg-pink-50';
            default:
                return 'bg-white';
        }
    };

    return (
        <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}
        >
            {treatments.map((treatment, index) => (
                <div key={index}>
                    <button
                        onClick={() =>
                            setExpandedId(
                                expandedId === `${rowIndex}-${index}`
                                    ? null
                                    : `${rowIndex}-${index}`,
                            )
                        }
                        className={`w-full p-4 text-left rounded-xl border ${styles.card} ${getCardBackground()} transition-all duration-200 relative`}
                    >
                        <div className="flex items-center justify-between group">
                            <div className='flex items-center gap-2'>
                                <div
                                    className={`p-2 rounded-lg transition-colors duration-300 
                                    ${expandedId === `${rowIndex}-${index}` 
                                        ? styles.iconBgActive 
                                        : `bg-gray-100 ${styles.titleText} ${styles.iconBgHover}`}`}
                                >
                                    {getSpecialtyIcon(treatment.majorTitle)}
                                </div>
                                <span className={`font-medium ${styles.titleText}`}>
                                    {treatment.majorTitle}
                                </span>
                            </div>
                            {expandedId === `${rowIndex}-${index}` ? (
                                <BiChevronUp className={`w-5 h-5 ${styles.chevron}`} />
                            ) : (
                                <BiChevronDown className={`w-5 h-5 ${styles.chevron}`} />
                            )}
                        </div>

                        {expandedId === `${rowIndex}-${index}` && (
                            <div
                                className={`mt-4 pt-4 ${styles.expandedBg} ${className}`}
                                // style={{ border : '2px solid blue' }}
                            >
                                <ul className="space-y-1 "  >
                                    {treatment.subtypes.map(
                                        (subtype, subIndex) => (
                                            <li
                                                key={subIndex}
                                                className={`text-sm transition-colors px-2 py-2 rounded-md underline cursor-pointer ${styles.listItem}`}
                                                onClick={() =>
                                                    handleClick(subtype)
                                                }
                                            >
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
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const { specialty } = useThemeStore();

    // Theme-specific styling
    const getThemeStyles = () => {
        switch (specialty) {
            case 'organ-transplant':
                return {
                    container: "max-w-[1538px] mx-auto px-4 sm:px-12 mt-5 md:mt-10 py-12 bg-gradient-to-b from-white to-green-50",
                    heading: "text-2xl sm:text-4xl font-bold text-green-800 text-center mb-8",
                    card: "border-green-200 hover:border-green-400 shadow-sm hover:shadow-md hover:shadow-green-100 ",
                    iconBgActive: "bg-green-100 text-green-700",
                    iconBgHover: "group-hover:bg-green-100 group-hover:text-green-700",
                    titleText: "text-green-700",
                    chevron: "text-green-600",
                    expandedBg: " border-[2px] border-green-500",
                    listItem: "hover:bg-green-100 text-green-800 hover:text-green-900"
                };
            case 'cosmetic-surgery':
                return {
                    container: "max-w-[1538px] mx-auto px-4 sm:px-12 mt-5 md:mt-10 py-12 bg-gradient-to-b from-white to-pink-50",
                    heading: "text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 text-center mb-8",
                    card: "border-pink-200 hover:border-pink-400 shadow-sm hover:shadow-md hover:shadow-pink-100",
                    iconBgActive: "bg-pink-100 text-pink-700",
                    iconBgHover: "group-hover:bg-pink-100 group-hover:text-pink-700",
                    titleText: "text-pink-700",
                    chevron: "text-pink-600",
                    expandedBg: " border-[2px] border-pink-500",
                    listItem: "hover:bg-pink-50 text-pink-700 hover:text-pink-800"
                };
            default:
                return {
                    container: "max-w-[1538px] mx-auto px-4 sm:px-12 mt-5 md:mt-10",
                    heading: "text-2xl sm:text-4xl font-bold text-center mb-8",
                    card: "border-purple-100 hover:border-purple-300",
                    iconBgActive: "bg-[#63559a2b] text-primary",
                    iconBgHover: "group-hover:bg-[#63559a2b] group-hover:text-primary",
                    titleText: "text-primary",
                    chevron: "text-primary",
                    expandedBg: " border-[2px] border-purple-400",
                    listItem: "hover:bg-purple-50 text-primary hover:text-primary"
                };
        }
    };

    const styles = getThemeStyles();

    // Pass theme styles to TreatmentRow
    const updatedTreatmentRow = (
        <TreatmentRow
            treatments={treatmentTypesData}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            rowIndex={0}
            themeStyles={styles}
        />
    );

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                Explore more about Treatments
            </h2>

            <div className="space-y-8">
                {updatedTreatmentRow}
            </div>
        </div>
    );
}

export default Treatments
