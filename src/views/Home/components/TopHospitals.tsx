import React, { useEffect, useState } from 'react'
import { Badge, Button } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { defaultHospitals } from '../data/treatmentTypesData'
import {
    HiOutlineLocationMarker,
    HiOutlineCalendar,
    HiOutlineHeart,
    HiOutlineStar,
    HiOutlineShieldCheck,
} from 'react-icons/hi'
import { LuBed } from 'react-icons/lu'
import { MdFavoriteBorder, MdOutlineLocalHospital } from 'react-icons/md'
import { useThemeStore } from '@/store/themeStore'

// Define the props type
interface TopHospitalsProps {
    hcfData: {
        hospitals: any
    }
}

const InfoRow = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value: string
}) => (
    <div className="flex items-center gap-2">
        <div className="text-primary/70">{icon}</div>
        <span className="text-gray-500">{label}:</span>
        <span className="font-medium text-gray-700">{value}</span>
    </div>
)

const TopHospitals: React.FC<TopHospitalsProps> = ({ hcfData }) => {
    const navigate = useNavigate()
    const [hospitals, setHospital] = useState<any>([])
    const [isVisible, setIsVisible] = useState(false)
    const { specialty } = useThemeStore()

    // Get theme specific classes
    const getThemeClasses = () => {
        switch (specialty) {
            case 'organTransplant':
                return {
                    titleGradient: 'from-teal-600 to-cyan-500',
                    cardBg: 'hover:bg-teal-50/50',
                    badgeBg: 'bg-teal-100',
                    badgeText: 'text-teal-700',
                    cardBorder: 'border-teal-100',
                    iconColor: 'text-teal-500',
                    buttonGradient:
                        'bg-gradient-to-r from-teal-600 to-teal-400',
                    loadMoreText: 'text-teal-600',
                    loadMoreHover: 'hover:bg-teal-50',
                    sectionBg: 'bg-gradient-to-b from-white to-teal-50/30',
                }
            case 'cosmeticSurgery':
                return {
                    titleGradient: 'from-pink-600 to-purple-500',
                    cardBg: 'hover:bg-pink-50/50',
                    badgeBg: 'bg-pink-100',
                    badgeText: 'text-pink-700',
                    cardBorder: 'border-pink-100',
                    iconColor: 'text-pink-500',
                    buttonGradient:
                        'bg-gradient-to-r from-pink-600 to-pink-400',
                    loadMoreText: 'text-pink-600',
                    loadMoreHover: 'hover:bg-pink-50',
                    sectionBg: 'bg-gradient-to-b from-white to-pink-50/30',
                }
            default:
                return {
                    titleGradient: 'from-blue-600 to-indigo-500',
                    cardBg: 'hover:bg-primary/5',
                    badgeBg: 'bg-blue-100',
                    badgeText: 'text-blue-700',
                    cardBorder: 'border-blue-100',
                    iconColor: 'text-primary',
                    buttonGradient:
                        'bg-gradient-to-r from-blue-600 to-blue-400',
                    loadMoreText: 'text-primary',
                    loadMoreHover: 'hover:bg-primary/5',
                    sectionBg: 'bg-gradient-to-b from-white to-blue-50/30',
                }
        }
    }

    const themeClasses = getThemeClasses()

    useEffect(() => {
        setIsVisible(true)
    }, [])

    useEffect(() => {
        const callApi = async () => {
            const data = hcfData.hospitals?.slice?.(0, 3) || []
            const limit = 3 - data?.length || 0
            try {
                const againData = []
                for (let i = 0; i < limit; i++) {
                    againData.push(defaultHospitals[i])
                }

                setHospital([...data, ...againData.splice(0, limit)])
            } catch (err) {
                console.log('error', err)
            }
        }

        callApi()
    }, [hcfData])

    // Helper function to get random specializations
    const getRandomSpecializations = (specializations = [], count = 3) => {
        if (!specializations.length) {
            // Default specializations if none are provided
            const defaults = [
                'Cardiology',
                'Orthopedics',
                'Neurology',
                'Oncology',
                'Pediatrics',
            ]
            return defaults.slice(0, count)
        }

        const shuffled = [...specializations].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, count)
    }

    // Helper function to get featured treatments from hospital
    const getFeaturedTreatments = (hospital) => {
        if (hospital?.treatments?.length) {
            return hospital.treatments.slice(0, 2)
        }
        return []
    }

    // Get rating for a hospital (mock data)
    const getHospitalRating = () => {
        return (Math.random() * (5 - 4) + 4).toFixed(1)
    }

    return (
        <div
            className={`w-full ${themeClasses.sectionBg} py-12 md:py-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1
                        className={`text-3xl sm:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.titleGradient}`}
                    >
                        Top Hospitals
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover world-class healthcare facilities with advanced
                        technology and expert medical staff
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-fade-in">
                    {hospitals.map((hospital, index) => (
                        <div
                            key={hospital._id || index}
                            onClick={() =>
                                navigate(`/hospitals-details/${hospital._id}`)
                            }
                            className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group w-full flex flex-col justify-between h-full mx-auto border ${themeClasses.cardBorder} ${themeClasses.cardBg}`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div>
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={
                                            hospital.images?.[0] ||
                                            hospital.galleryImages?.[0] ||
                                            'https://media.bizj.us/view/img/10532525/hospital-generic-exterior*900x506x6100-3435-0-0.jpg'
                                        }
                                        alt={hospital.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                'https://media.bizj.us/view/img/10532525/hospital-generic-exterior*900x506x6100-3435-0-0.jpg' // Fallback URL
                                        }}
                                    />
                                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium">
                                        <HiOutlineStar
                                            className={`${themeClasses.iconColor}`}
                                        />
                                        <span>{getHospitalRating()}/5</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 h-[56px]">
                                        {hospital.name}
                                    </h2>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {getRandomSpecializations(
                                            hospital.specializations,
                                            3,
                                        ).map((specialty, i) => (
                                            <Badge
                                                key={i}
                                                className={`${themeClasses.badgeBg} ${themeClasses.badgeText} text-xs font-medium`}
                                            >
                                                {typeof specialty === 'string'
                                                    ? specialty
                                                          .split(' ')
                                                          .slice(0, 2)
                                                          .join(' ')
                                                    : 'Specialty'}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="space-y-3 text-gray-600 text-sm mb-4">
                                        <InfoRow
                                            icon={
                                                <HiOutlineCalendar className="w-4 h-4" />
                                            }
                                            label="Established"
                                            value={
                                                hospital.establishedYear?.toString() ||
                                                'N/A'
                                            }
                                        />
                                        <InfoRow
                                            icon={<LuBed className="w-4 h-4" />}
                                            label="Beds"
                                            value={
                                                hospital.infrastructure
                                                    ?.bedCount || 'N/A'
                                            }
                                        />
                                        <InfoRow
                                            icon={
                                                <HiOutlineLocationMarker className="w-4 h-4" />
                                            }
                                            label="Location"
                                            value={`${hospital.city || 'N/A'}, ${hospital.country || 'N/A'}`}
                                        />
                                    </div>

                                    {getFeaturedTreatments(hospital).length >
                                        0 && (
                                        <div className="mt-4 border-t pt-3">
                                            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                                <MdOutlineLocalHospital
                                                    className={`mr-1 ${themeClasses.iconColor}`}
                                                />
                                                Featured Treatments
                                            </h3>
                                            <ul className="space-y-1">
                                                {getFeaturedTreatments(
                                                    hospital,
                                                ).map((treatment, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-center justify-between text-sm"
                                                    >
                                                        <span>
                                                            {treatment.name}
                                                        </span>
                                                        <span className="font-medium">
                                                            {treatment.price}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 border-t">
                                <div className="flex gap-2">
                                    <Button
                                        block
                                        className={`${themeClasses.buttonGradient} text-white`}
                                        variant="solid"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            navigate(
                                                `/hospitals-details/${hospital._id}`,
                                            )
                                        }}
                                    >
                                        View Details
                                    </Button>
                                    <Button
                                        className="border border-gray-300 hover:bg-gray-50"
                                        variant="plain"
                                        icon={<MdFavoriteBorder />}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => navigate(`/hospitals`)}
                        className={`bg-white ${themeClasses.loadMoreHover} ${themeClasses.loadMoreText} border ${themeClasses.cardBorder} px-8 py-3 rounded-lg font-medium transition-all duration-300 hover-scale shadow-sm`}
                    >
                        View All Hospitals
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopHospitals
