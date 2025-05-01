import { Button } from '@/components/ui';
import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import UploadMedicalReports from '../UploadMedicalReports';
import { useThemeStore } from '@/store/themeStore';

interface HCFHeaderProps {
    leftSide: ReactNode
}

const HCFHeader: React.FC<HCFHeaderProps> = ({ leftSide }) => {
    const [uploadReport, setUploadReport] = useState(false)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { specialty } = useThemeStore()

    useEffect(() => {
        if (searchParams.get('status') === 'upload') {
            setUploadReport(true)
        }
    }, [pathname, searchParams.get('status')])

    // Render different hero sections based on the selected theme
    if (specialty === 'organ-transplant') {
        return (
            <section className="relative overflow-hidden bg-gradient-to-r from-green-900 to-green-700 text-white">
                {/* Enhanced background pattern */}
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="organGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                            </pattern>
                            <pattern id="organLargeGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                                <rect width="80" height="80" fill="url(#organGrid)"/>
                                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1"/>
                            </pattern>
                            <linearGradient id="organGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#16a34a" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#166534" stopOpacity="0.3"/>
                            </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#organLargeGrid)" />
                        <rect width="100%" height="100%" fill="url(#organGlow)" />
                    </svg>
                </div>
                
                {/* Enhanced animated particles with more variety */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Main floating elements */}
                    <div className="absolute top-10 left-10 w-16 h-16 bg-green-300 rounded-full opacity-20 animate-float-slow"></div>
                    <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-green-400 rounded-full opacity-10 animate-float-right"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-green-200 rounded-full opacity-15 animate-float-left"></div>
                    
                    {/* Additional floating elements */}
                    <div className="absolute top-1/2 right-20 w-12 h-12 bg-green-500 rounded-full opacity-10 animate-float-circle"></div>
                    <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-green-600 rounded-full opacity-15 animate-float-delay"></div>
                    <div className="absolute top-1/3 left-20 w-10 h-10 bg-green-100 rounded-full opacity-20 animate-blob"></div>
                    
                    {/* Small decorative elements */}
                    <div className="absolute top-40 right-40 w-6 h-6 bg-white rounded-full opacity-30 animate-pulse-slow"></div>
                    <div className="absolute bottom-40 left-40 w-8 h-8 bg-white rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-white rounded-full opacity-40 animate-sparkle"></div>
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 animate-fade-in">
                            <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-2">
                                Organ Transplant Specialists
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                                Giving the Gift of <span className="text-green-300 animate-pulse-slow">Life</span> Through Expert Transplantation
                            </h1>
                            <p className="text-lg md:text-xl text-green-100 max-w-xl">
                                Our team of world-class surgeons specializes in kidney, liver, heart, and lung transplants with industry-leading success rates.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Button
                                    type="button"
                                    className="min-w-[150px] rounded-button bg-white text-green-800 hover:bg-green-50 shadow-lg group"
                                >
                                    <span className="flex items-center">
                                        Upload Medical Records
                                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </span>
                                </Button>
                                <Button
                                    type="button"
                                    className="min-w-[150px] bg-transparent border-2 border-white rounded-button hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                                    onClick={() => navigate('/chat-bot')}
                                    variant='solid'
                                >
                                    Speak to a Specialist
                                </Button>
                            </div>
                        </div>
                        <div className="relative flex justify-center">
                            {/* Enhanced glow effect with animation */}
                            <div className="absolute w-[120%] h-[120%] bg-green-500 rounded-full opacity-10 animate-blob"></div>
                            <div className="absolute w-[90%] h-[90%] bg-green-300 rounded-full opacity-20 animate-pulse-slow"></div>
                            <div className="absolute w-[105%] h-[105%] bg-green-400 rounded-full opacity-15 animate-float-circle"></div>
                            
                            {/* Main image with multiple organ icons */}
                            <div className="relative z-10 w-full max-w-md">
                                <img 
                                    src="https://placehold.co/600x400/16a34a/FFFFFF?text=Organ+Transplant" 
                                    alt="Organ Transplant Illustration" 
                                    className="relative z-10 w-full rounded-lg shadow-lg"
                                />
                                
                                {/* Floating organ icons with enhanced animations */}
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-full p-1 shadow-lg animate-float-right">
                                    <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white rounded-full p-1 shadow-lg animate-float-left">
                                    <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 w-16 h-16 bg-white rounded-full p-1 shadow-lg animate-float-delay">
                                    <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                        </svg>
                                    </div>
                                </div>
                                
                                {/* Additional organ icons for more visual interest */}
                                <div className="absolute -top-4 left-1/4 w-14 h-14 bg-white rounded-full p-1 shadow-lg animate-float-slow">
                                    <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                                        <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 right-1/4 w-12 h-12 bg-white rounded-full p-1 shadow-lg animate-float">
                                    <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            {uploadReport && <UploadMedicalReports setPopupStatus={setUploadReport} />}
                        </div>
                    </div>
                    
                    {/* Stats section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center">
                        <div className="bg-white bg-opacity-10 rounded-lg p-4">
                            <div className="text-3xl font-bold text-green-300">98%</div>
                            <div className="text-sm text-green-100">Success Rate</div>
                        </div>
                        <div className="bg-white bg-opacity-10 rounded-lg p-4">
                            <div className="text-3xl font-bold text-green-300">5,000+</div>
                            <div className="text-sm text-green-100">Transplants</div>
                        </div>
                        <div className="bg-white bg-opacity-10 rounded-lg p-4">
                            <div className="text-3xl font-bold text-green-300">24/7</div>
                            <div className="text-sm text-green-100">Support</div>
                        </div>
                        <div className="bg-white bg-opacity-10 rounded-lg p-4">
                            <div className="text-3xl font-bold text-green-300">50+</div>
                            <div className="text-sm text-green-100">Specialists</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    } else if (specialty === 'cosmetic-surgery') {
        return (
            <section className="relative overflow-hidden bg-gradient-to-r from-pink-900 via-pink-800 to-purple-900 text-white">
                {/* Enhanced background pattern */}
                <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="cosmeticDots" width="10" height="10" patternUnits="userSpaceOnUse">
                                <circle cx="5" cy="5" r="1" fill="white" opacity="0.3" />
                            </pattern>
                            <linearGradient id="cosmeticGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#db2777" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.3"/>
                            </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#cosmeticDots)" />
                        <rect width="100%" height="100%" fill="url(#cosmeticGlow)" />
                    </svg>
                </div>
                
                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-[20%] w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-float-slow"></div>
                    <div className="absolute top-1/3 right-[15%] w-24 h-24 bg-purple-400 rounded-full opacity-10 animate-float"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-pink-200 rounded-full opacity-15 animate-float-delay"></div>
                    
                    {/* Sparkle effects */}
                    <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-white rounded-full opacity-70 animate-sparkle"></div>
                    <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-white rounded-full opacity-70 animate-sparkle-delay"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-white rounded-full opacity-70 animate-sparkle-slow"></div>
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 space-y-6 text-center md:text-left mb-10 md:mb-0 animate-fade-in">
                            <div className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold mb-2">
                                Premium Cosmetic Surgery
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                                Reveal Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 animate-gradient">True Beauty</span>
                            </h1>
                            <p className="text-lg text-pink-100 max-w-xl mx-auto md:mx-0">
                                Experience transformative results with our award-winning cosmetic procedures, personalized for your unique beauty goals.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                                <Button
                                    type="button"
                                    className="min-w-[150px] rounded-button bg-white text-pink-800 hover:bg-pink-50 shadow-lg group"
                                >
                                    <span className="flex items-center">
                                        Free Consultation
                                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </span>
                                </Button>
                                <Button
                                    type="button"
                                    className="min-w-[150px] bg-transparent border-2 border-white rounded-button hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                                    onClick={() => navigate('/chat-bot')}
                                    variant='solid'
                                >
                                    View Procedures
                                </Button>
                            </div>
                        </div>
                        <div className="md:w-1/2 relative">
                            {/* Enhanced glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
                            
                            {/* Main image with floating elements */}
                            <div className="relative z-10 w-full max-w-lg mx-auto">
                                <img 
                                    src="https://placehold.co/600x400/db2777/FFFFFF?text=Cosmetic+Surgery" 
                                    alt="Cosmetic Surgery Illustration" 
                                    className="w-full rounded-lg shadow-lg"
                                />
                                
                                {/* Floating beauty elements */}
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-full p-1 shadow-lg animate-float-slow">
                                    <div className="w-full h-full rounded-full bg-pink-100 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white rounded-full p-1 shadow-lg animate-float">
                                    <div className="w-full h-full rounded-full bg-purple-100 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 w-16 h-16 bg-white rounded-full p-1 shadow-lg animate-float-delay">
                                    <div className="w-full h-full rounded-full bg-pink-100 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            {uploadReport && <UploadMedicalReports setPopupStatus={setUploadReport} />}
                        </div>
                    </div>
                    
                    {/* Procedures section */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-heading font-semibold text-center mb-8">Our Premium Procedures</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 transition-all">
                                <div className="w-12 h-12 bg-pink-200 text-pink-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                    </svg>
                                </div>
                                <div className="font-medium">Facial Contouring</div>
                            </div>
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 transition-all">
                                <div className="w-12 h-12 bg-pink-200 text-pink-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                </div>
                                <div className="font-medium">Breast Enhancement</div>
                            </div>
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 transition-all">
                                <div className="w-12 h-12 bg-pink-200 text-pink-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <div className="font-medium">Body Sculpting</div>
                            </div>
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-20 transition-all">
                                <div className="w-12 h-12 bg-pink-200 text-pink-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                    </svg>
                                </div>
                                <div className="font-medium">Skin Rejuvenation</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    } else {
        // Default theme
        return (
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white">
                {/* Background pattern */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[#00000031]"></div>
                    {/* Add subtle pattern for visual interest */}
                    <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%">
                            <defs>
                                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                                </pattern>
                                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                                    <rect width="80" height="80" fill="url(#smallGrid)"/>
                                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>
                </div>
                
                {/* Main content */}
                <div className="relative z-10 px-4 py-16 md:py-24 mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left side content */}
                        <div className="space-y-6">
                            {leftSide}
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Button
                                    type="button"
                                    className="min-w-[150px] rounded-button bg-primary border-0 text-white hover:text-white hover:bg-primary-deep shadow-theme"
                                >
                                    Upload now
                                </Button>
                                <Button
                                    type="button"
                                    className="min-w-[150px] bg-transparent border-2 border-white rounded-button hover:bg-primary hover:border-primary transition-all duration-300 shadow-theme"
                                    onClick={() => navigate('/chat-bot')}
                                    variant='solid'
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                        
                        {/* Right side image */}
                        <div className="relative flex justify-center">
                            {/* Animated background glow */}
                            <div className="absolute w-[120%] h-[120%] bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
                            
                            {/* Multiple images with animation */}
                            <div className="relative z-10 w-full max-w-md">
                                {/* Main image */}
                                <img 
                                    src="https://placehold.co/600x400/2a85ff/FFFFFF?text=Medical+Care" 
                                    alt="Medical Technology Illustration" 
                                    className="w-full rounded-lg shadow-lg"
                                />
                                
                                {/* Floating doctor images */}
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-full p-1 shadow-lg animate-float-slow">
                                    <img 
                                        src="https://placehold.co/100x100/0069f6/FFFFFF?text=Dr.1" 
                                        alt="Doctor 1" 
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white rounded-full p-1 shadow-lg animate-float">
                                    <img 
                                        src="https://placehold.co/100x100/4996ff/FFFFFF?text=Dr.2" 
                                        alt="Doctor 2" 
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 w-16 h-16 bg-white rounded-full p-1 shadow-lg animate-float-delay">
                                    <img 
                                        src="https://placehold.co/100x100/2a85ff/FFFFFF?text=Dr.3" 
                                        alt="Doctor 3" 
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                            </div>
                            
                            {/* Upload report popup */}
                            {uploadReport && <UploadMedicalReports setPopupStatus={setUploadReport} />}
                        </div>
                    </div>
                    
                    {/* Features section */}
                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white bg-opacity-10 rounded-lg p-6 hover:bg-opacity-15 transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Advanced Care</h3>
                                <p className="text-blue-100">Access to cutting-edge medical technology and treatments for optimal health outcomes.</p>
                            </div>
                            <div className="bg-white bg-opacity-10 rounded-lg p-6 hover:bg-opacity-15 transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Expert Doctors</h3>
                                <p className="text-blue-100">Our team of specialists brings decades of experience to provide personalized care.</p>
                            </div>
                            <div className="bg-white bg-opacity-10 rounded-lg p-6 hover:bg-opacity-15 transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium mb-2">24/7 Support</h3>
                                <p className="text-blue-100">Round-the-clock assistance ensures you receive care whenever you need it.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Add extra padding at the bottom to accommodate the profile card */}
                    <div className="pb-16 md:pb-24"></div>
                </div>
                
                {/* Add animation styles */}
                <style jsx global="true">{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                    }
                    
                    .animate-float {
                        animation: float 4s ease-in-out infinite;
                    }
                    
                    .animate-float-slow {
                        animation: float-slow 6s ease-in-out infinite;
                    }
                    
                    .animate-float-delay {
                        animation: float 5s ease-in-out 1s infinite;
                    }
                `}</style>
            </section>
        );
    }
};

export default HCFHeader;