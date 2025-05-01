import { cloneElement } from 'react'
import type { CommonProps } from '@/@types/common'
import { useThemeStore } from '@/store/themeStore'

type SideProps = CommonProps

const Side = ({ children, ...rest }: SideProps) => {
    const { specialty } = useThemeStore()
    
    // Define theme-specific content and styles
    const getThemeContent = () => {
        if (specialty === 'organ-transplant') {
            return {
                bgGradient: 'bg-gradient-to-r from-green-900 to-green-700',
                overlayColor: 'bg-green-800 opacity-80',
                image: '/img/specialties/organ-transplant-auth.png',
                fallbackImage: 'https://placehold.co/800x1200/16a34a/FFFFFF?text=Organ+Transplant',
                title: "Leading Organ Transplant Specialists",
                description: "Our team of expert surgeons provides life-saving transplant procedures with the highest success rates.",
                features: [
                    "98% success rate for kidney transplants",
                    "Minimally invasive techniques for faster recovery",
                    "Comprehensive pre and post-operative care",
                    "24/7 support for transplant patients"
                ]
            };
        } else if (specialty === 'cosmetic-surgery') {
            return {
                bgGradient: 'bg-gradient-to-r from-pink-900 via-pink-800 to-purple-900',
                overlayColor: 'bg-pink-800 opacity-80',
                image: '/img/specialties/cosmetic-surgery-auth.png',
                fallbackImage: 'https://placehold.co/800x1200/db2777/FFFFFF?text=Cosmetic+Surgery',
                title: "Transform Your Beauty with Expert Care",
                description: "Discover our range of cosmetic procedures designed to enhance your natural beauty with minimal recovery time.",
                features: [
                    "Board-certified plastic surgeons",
                    "State-of-the-art facilities and equipment",
                    "Personalized treatment plans",
                    "Natural-looking, beautiful results"
                ]
            };
        } else {
            return {
                bgGradient: 'bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900',
                overlayColor: 'bg-blue-800 opacity-70',
                image: '/img/others/auth-side-bg.png',
                fallbackImage: 'https://placehold.co/800x1200/2a85ff/FFFFFF?text=Medical+Care',
                title: "Advanced Medical Care for Your Health",
                description: "Experience the future of healthcare with our cutting-edge technology and compassionate medical professionals.",
                features: [
                    "Expert doctors across all specialties",
                    "Cutting-edge medical technology",
                    "Personalized treatment plans",
                    "Comprehensive follow-up care"
                ]
            };
        }
    };
    
    const themeContent = getThemeContent();
    
    return (
        <div className="flex h-full p-6 bg-background font-theme">
            <div className="flex flex-col justify-center items-center flex-1">
                <div className="w-full xl:max-w-[450px] px-8 max-w-[380px]">
                    {children
                        ? cloneElement(children as React.ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
            <div className={`py-6 px-10 lg:flex flex-col flex-1 justify-between hidden rounded-card shadow-theme-md items-end relative xl:max-w-[520px] 2xl:max-w-[720px] ${themeContent.bgGradient}`}>
                <div className="absolute inset-0 rounded-card overflow-hidden">
                    <img
                        src={themeContent.image}
                        className="absolute h-full w-full top-0 left-0 object-cover rounded-card"
                        alt="Authentication background"
                        onError={(e) => {
                            // Fallback if image doesn't exist
                            e.currentTarget.src = themeContent.fallbackImage;
                        }}
                    />
                    <div className={`absolute inset-0 ${themeContent.overlayColor}`}></div>
                </div>
                <div className="relative z-10 text-white p-6 max-w-md">
                    <h1 className="text-3xl font-heading font-heading mb-4">
                        {themeContent.title}
                    </h1>
                    <p className="text-lg opacity-90 mb-6">
                        {themeContent.description}
                    </p>
                    <div className="space-y-3">
                        {themeContent.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                                <svg className="w-5 h-5 text-white mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                    
                    {/* Theme-specific call to action */}
                    {specialty === 'organ-transplant' && (
                        <div className="mt-8 bg-white bg-opacity-10 p-4 rounded-lg">
                            <p className="text-sm font-medium">Join our organ donor registry and help save lives.</p>
                        </div>
                    )}
                    
                    {specialty === 'cosmetic-surgery' && (
                        <div className="mt-8 bg-white bg-opacity-10 p-4 rounded-lg">
                            <p className="text-sm font-medium">Book a free consultation to discuss your aesthetic goals.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Side
