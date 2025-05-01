import React, { useEffect, useState } from 'react'
import { Badge, Button } from '@/components/ui'
import { BiGlobe, BiPhone, BiUser } from 'react-icons/bi'
import { BsInstagram, BsLinkedin, BsTwitter, BsWhatsapp } from 'react-icons/bs'
import {
    HiOutlineMail,
    HiOutlineLocationMarker,
    HiOutlineGlobe,
} from 'react-icons/hi'
import { PiMapPinPlus } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '@/store/themeStore'

interface GetInTouchProps {
    hcfData: any
}

const GetInTouch: React.FC<GetInTouchProps> = ({ hcfData }) => {
    const navigate = useNavigate()
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
                    titleGradient: 'from-teal-600 to-cyan-500',
                    sectionBg: 'bg-gradient-to-b from-white to-teal-50',
                    cardBg: 'bg-white',
                    cardBorder: 'border-teal-100',
                    cardHover: 'hover:border-teal-300',
                    iconColor: 'text-teal-500',
                    iconBg: 'bg-teal-50',
                    buttonGradient: 'from-teal-600 to-teal-400',
                    accentBg: 'bg-teal-50',
                    badgeBg: 'bg-teal-100',
                    badgeText: 'text-teal-700',
                }
            case 'cosmeticSurgery':
                return {
                    titleGradient: 'from-pink-600 to-purple-500',
                    sectionBg: 'bg-gradient-to-b from-white to-pink-50',
                    cardBg: 'bg-white',
                    cardBorder: 'border-pink-100',
                    cardHover: 'hover:border-pink-300',
                    iconColor: 'text-pink-500',
                    iconBg: 'bg-pink-50',
                    buttonGradient: 'from-pink-600 to-pink-400',
                    accentBg: 'bg-pink-50',
                    badgeBg: 'bg-pink-100',
                    badgeText: 'text-pink-700',
                }
            default:
                return {
                    titleGradient: 'from-blue-600 to-indigo-500',
                    sectionBg: 'bg-gradient-to-b from-white to-blue-50',
                    cardBg: 'bg-white',
                    cardBorder: 'border-blue-100',
                    cardHover: 'hover:border-blue-300',
                    iconColor: 'text-primary',
                    iconBg: 'bg-blue-50',
                    buttonGradient: 'from-blue-600 to-blue-400',
                    accentBg: 'bg-blue-50',
                    badgeBg: 'bg-blue-100',
                    badgeText: 'text-blue-700',
                }
        }
    }

    const themeClasses = getThemeClasses()

    return (
        <div
            className={`w-full ${themeClasses.sectionBg} py-16 md:py-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1
                        className={`text-3xl sm:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.titleGradient}`}
                    >
                        Let's Get in Touch
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have questions about treatments or need personalized
                        assistance? Our expert team is ready to help you on your
                        healthcare journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left side - Contact Info */}
                    <div className="lg:col-span-3 space-y-6">
                        <div
                            className={`${themeClasses.cardBg} rounded-xl p-8 shadow-md border ${themeClasses.cardBorder} ${themeClasses.cardHover} transition-all duration-300`}
                        >
                            <div className="flex flex-wrap gap-4 mb-6 items-center">
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    {hcfData?.name || 'Healthcare Center'}
                                </h3>
                                <div className="flex gap-2">
                                    {(hcfData?.languages?.length
                                        ? hcfData?.languages
                                        : ['English']
                                    ).map((lang, idx) => (
                                        <Badge
                                            key={idx}
                                            className={`${themeClasses.badgeBg} ${themeClasses.badgeText} text-xs font-medium`}
                                        >
                                            {lang}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-5">
                                    <a
                                        href={`tel:${hcfData?.phone || hcfData?.phoneNumber}`}
                                        className={`flex items-center gap-3 text-gray-700 hover:${themeClasses.iconColor} transition-colors group`}
                                    >
                                        <div
                                            className={`p-3 rounded-full ${themeClasses.iconBg} ${themeClasses.iconColor} group-hover:scale-105 transition-transform`}
                                        >
                                            <BiPhone className="w-5 h-5" />
                                        </div>
                                        <span>
                                            {hcfData?.phone ||
                                                hcfData?.phoneNumber ||
                                                '+1 (555) 123-4567'}
                                        </span>
                                    </a>

                                    <a
                                        href={`mailto:${hcfData?.auth?.email || hcfData?.email}`}
                                        className={`flex items-center gap-3 text-gray-700 hover:${themeClasses.iconColor} transition-colors group`}
                                    >
                                        <div
                                            className={`p-3 rounded-full ${themeClasses.iconBg} ${themeClasses.iconColor} group-hover:scale-105 transition-transform`}
                                        >
                                            <HiOutlineMail className="w-5 h-5" />
                                        </div>
                                        <span>
                                            {hcfData?.auth?.email ||
                                                hcfData?.email ||
                                                'contact@healthcare.com'}
                                        </span>
                                    </a>

                                    <div
                                        className={`flex items-start gap-3 text-gray-700 group`}
                                    >
                                        <div
                                            className={`p-3 rounded-full ${themeClasses.iconBg} ${themeClasses.iconColor} group-hover:scale-105 transition-transform mt-1 flex-shrink-0`}
                                        >
                                            <HiOutlineLocationMarker className="w-5 h-5" />
                                        </div>
                                        <span className="line-clamp-3">
                                            {hcfData?.address?.street &&
                                                `${hcfData.address.street}, `}
                                            {hcfData?.address?.city &&
                                                `${hcfData.address.city}, `}
                                            {hcfData?.address?.country ||
                                                'Location Available Upon Request'}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div
                                        className={`flex items-center gap-3 text-gray-700`}
                                    >
                                        <div
                                            className={`p-3 rounded-full ${themeClasses.iconBg} ${themeClasses.iconColor}`}
                                        >
                                            <HiOutlineGlobe className="w-5 h-5" />
                                        </div>
                                        <span>
                                            {hcfData?.website ||
                                                'www.healthcarewebsite.com'}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                            <span
                                                className={`${themeClasses.iconColor}`}
                                            >
                                                •
                                            </span>
                                            Connect with us
                                        </h4>
                                        <div className="flex gap-3">
                                            <a
                                                href="#"
                                                className={`p-2.5 rounded-full ${themeClasses.iconBg} ${themeClasses.iconColor} hover:bg-gradient-to-r hover:${themeClasses.buttonGradient} hover:text-white transition-all duration-300`}
                                            >
                                                <BsInstagram className="w-5 h-5" />
                                            </a>
                                            <a
                                                href="#"
                                                className={`p-2.5 rounded-full ${themeClasses.iconBg} ${themeClasses.iconColor} hover:bg-gradient-to-r hover:${themeClasses.buttonGradient} hover:text-white transition-all duration-300`}
                                            >
                                                <BsTwitter className="w-5 h-5" />
                                            </a>
                                            <a
                                                href="#"
                                                className={`p-2.5 rounded-full ${themeClasses.iconBg} ${themeClasses.iconColor} hover:bg-gradient-to-r hover:${themeClasses.buttonGradient} hover:text-white transition-all duration-300`}
                                            >
                                                <BsLinkedin className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <a
                                    href={`https://api.whatsapp.com/send?phone=${hcfData?.phone || hcfData?.auth?.phoneNumber || '+15551234567'}&text=Hi!%20I%20have%20a%20question%20about%20your%20services.`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`px-6 py-3.5 bg-gradient-to-r ${themeClasses.buttonGradient} text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-medium`}
                                >
                                    <BsWhatsapp className="w-5 h-5" />
                                    Contact via WhatsApp
                                </a>
                                <button
                                    onClick={() => navigate('/contact')}
                                    className={`px-6 py-3.5 bg-white border ${themeClasses.cardBorder} hover:${themeClasses.cardHover} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 font-medium ${themeClasses.iconColor}`}
                                >
                                    Schedule a Call
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Quick Contact Form */}
                    <div className="lg:col-span-2">
                        <div
                            className={`${themeClasses.cardBg} rounded-xl p-8 shadow-md border ${themeClasses.cardBorder} h-full flex flex-col`}
                        >
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                                Send a Message
                            </h3>

                            <form className="space-y-5 flex-grow">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full p-3 rounded-lg border ${themeClasses.cardBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:${themeClasses.cardHover}`}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className={`w-full p-3 rounded-lg border ${themeClasses.cardBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:${themeClasses.cardHover}`}
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        className={`w-full p-3 rounded-lg border ${themeClasses.cardBorder} focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:${themeClasses.cardHover}`}
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="button"
                                        className={`w-full px-6 py-3.5 bg-gradient-to-r ${themeClasses.buttonGradient} text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 btn-ripple`}
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>

                            <div
                                className={`mt-6 p-3 rounded-lg ${themeClasses.accentBg} text-sm ${themeClasses.iconColor} flex items-start gap-2`}
                            >
                                <span className="font-bold">•</span>
                                <p>
                                    We typically respond within 24 hours. For
                                    urgent matters, please call us directly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetInTouch
