import React, { useEffect, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { treatmentTypesData } from '../data/treatmentTypesData'
import { useAuth } from '@/auth'
import { usGenerativeChatStore } from '@/views/chat-bot/store/generativeChatStore'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'
import { useNavigate } from 'react-router-dom'
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
}) => {
    const [className, setClassNames] = useState<string>('')
    const { setPushedMessages } = usGenerativeChatStore()
    const { hcfData } = useAuthStore()
    const navigate = useNavigate()

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
                        className="w-full p-4 text-left rounded-xl border border-purple-100 hover:border-purple-300 bg-white transition-all duration-200 relative"
                    >
                        <div className="flex items-center justify-between group">
                            <div className='flex items-center gap-2'>
                                <div
                                    className={`p-2 rounded-lg transition-colors duration-300 
              ${expandedId  === `${rowIndex}-${index}`? 'bg-[#63559a2b] text-primary' : 'bg-gray-50 text-primary group-hover:bg-[#63559a2b] group-hover:text-primary'}`}
                                >
                                    {getSpecialtyIcon(treatment.majorTitle)}
                                </div>
                                <span className="font-medium text-primary">
                                    {treatment.majorTitle}
                                </span>
                            </div>
                            {expandedId === `${rowIndex}-${index}` ? (
                                <BiChevronUp className="w-5 h-5 text-primary" />
                            ) : (
                                <BiChevronDown className="w-5 h-5 text-primary" />
                            )}
                        </div>

                        {expandedId === `${rowIndex}-${index}` && (
                            <div
                                className={`mt-4 pt-4 border-t border-purple-100 ${className}`}
                            >
                                <ul className="space-y-1">
                                    {treatment.subtypes.map(
                                        (subtype, subIndex) => (
                                            <li
                                                key={subIndex}
                                                className="text-sm hover:text-primary transition-colors px-2 py-2 hover:bg-purple-50 rounded-md text-primary underline"
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
    const [expandedId, setExpandedId] = useState<string | null>(null)

    return (
        <div className="max-w-[1538px] mx-auto px-4 sm:px-12 mt-5 md:mt-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8">
                Explore more about Treatments
            </h2>

            <div className="space-y-8">
                <TreatmentRow
                    treatments={treatmentTypesData}
                    expandedId={expandedId}
                    setExpandedId={setExpandedId}
                    rowIndex={0}
                />
            </div>
        </div>
    )
}

export default Treatments
