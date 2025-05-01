import React from 'react'
import visualBg from '@/assets/images/mbbsImg.webp'
import { BsArrowRight } from 'react-icons/bs'
import { Button } from '@/components/ui'
import { useThemeStore } from '@/store/themeStore'
const HeroSection = () => {
    const { specialty } = useThemeStore();

    // Render different hero sections based on the selected theme
    if (specialty === 'organ-transplant') {
        return (
            <div className="bg-green-50 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 animate-fade-in">
                            <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-2">
                                Organ Transplant Network
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-green-900">
                                Connect with{' '}
                                <span className="text-green-600">
                                    Transplant Specialists
                                </span>
                            </h1>

                            <p className="text-green-800 text-lg md:text-xl leading-relaxed max-w-xl">
                                Join our network of over 500 transplant specialists who are ready to provide expert care for your patients, ensuring optimal outcomes and patient satisfaction.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    variant="solid"
                                    className="bg-green-600 hover:bg-green-700 rounded-button !text-[15px] group inline-flex items-center px-6 py-4 text-lg transition-all duration-300 ease-in-out shadow-lg"
                                >
                                    Join Our Network
                                    <BsArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Button>
                                <Button
                                    className="border-green-600 text-green-600 hover:bg-green-50 rounded-button !text-[15px] group inline-flex items-center px-6 py-4 text-lg transition-all duration-300 ease-in-out"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>

                        <div className="relative flex justify-center items-center">
                            <div className="absolute w-[120%] h-[120%] bg-green-200 rounded-full opacity-30 animate-pulse-slow"></div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-500/10 rounded-full filter blur-3xl animate-blob"></div>
                                <div className="relative z-10 animate-float">
                                    <img
                                        src={organthemeplant}
                                        alt="Organ Transplant Specialists"
                                        className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
                                    />
                                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full animate-bounce delay-100"></div>
                                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-600 rounded-full animate-bounce delay-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Specialties section */}
                    <div className="mt-20">
                        <h2 className="text-2xl font-heading font-bold text-green-800 text-center mb-10">Our Transplant Specialties</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-heading font-bold text-green-800">Heart</h3>
                                <p className="text-green-600 text-sm mt-2">98% success rate</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-heading font-bold text-green-800">Kidney</h3>
                                <p className="text-green-600 text-sm mt-2">5,000+ procedures</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-heading font-bold text-green-800">Liver</h3>
                                <p className="text-green-600 text-sm mt-2">Advanced techniques</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-heading font-bold text-green-800">Lung</h3>
                                <p className="text-green-600 text-sm mt-2">Minimally invasive</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <AnimationStyles />
            </div>
        );
    } else if (specialty === 'cosmetic-surgery') {
        return (
            <div className="bg-gradient-to-b from-pink-50 to-white py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 animate-fade-in">
                            <div className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold mb-2">
                                Premium Cosmetic Surgery
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-pink-900">
                                Partner with{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                                    Elite Surgeons
                                </span>
                            </h1>

                            <p className="text-pink-800 text-lg md:text-xl leading-relaxed max-w-xl">
                                Join our exclusive network of board-certified cosmetic surgeons who deliver exceptional results and personalized care for every patient.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    variant="solid"
                                    className="bg-pink-600 hover:bg-pink-700 rounded-button !text-[15px] group inline-flex items-center px-6 py-4 text-lg transition-all duration-300 ease-in-out shadow-lg"
                                >
                                    Become a Partner
                                    <BsArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Button>
                                <Button
                                    variant="solid"
                                    className="border-pink-600 text-pink-600 hover:bg-pink-50 rounded-button !text-[15px] group inline-flex items-center px-6 py-4 text-lg transition-all duration-300 ease-in-out"
                                >
                                    View Procedures
                                </Button>
                            </div>
                        </div>

                        <div className="relative flex justify-center items-center">
                            <div className="absolute w-[120%] h-[120%] bg-pink-200 rounded-full opacity-30 animate-pulse-slow"></div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-pink-500/10 rounded-full filter blur-3xl animate-blob"></div>
                                <div className="relative z-10 animate-float">
                                    <img
                                        src="https://placehold.co/600x400/db2777/FFFFFF?text=Cosmetic+Surgeons"
                                        alt="Cosmetic Surgery Specialists"
                                        className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
                                    />
                                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-500 rounded-full animate-bounce delay-100"></div>
                                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-bounce delay-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Procedures section */}
                    <div className="mt-20">
                        <h2 className="text-2xl font-heading font-bold text-pink-800 text-center mb-10">Our Premium Procedures</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-pink-100">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-heading font-bold text-pink-800">Facial Contouring</h3>
                                <p className="text-pink-600 text-sm mt-2">Natural results</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-pink-100">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-heading font-bold text-pink-800">Breast Enhancement</h3>
                                <p className="text-pink-600 text-sm mt-2">Personalized approach</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-pink-100">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-heading font-bold text-pink-800">Body Sculpting</h3>
                                <p className="text-pink-600 text-sm mt-2">Advanced techniques</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-pink-100">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                    </svg>
                                </div>
                                <h3 className="font-heading font-bold text-pink-800">Skin Rejuvenation</h3>
                                <p className="text-pink-600 text-sm mt-2">Youthful results</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <AnimationStyles />
            </div>
        );
    } else {
        // Default theme
        return (
            <div className="flex items-center bg-background py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 animate-fade-in lg:order-first order-last lg:mt-0 mt-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-text">
                            Harness the Power of{' '}
                            <span className="text-primary">
                                10,000 MBBS Doctors
                            </span>
                        </h1>

                        <p className="text-text-light text-lg md:text-xl leading-relaxed max-w-xl">
                            Join forces with a network of over 10,000 MBBS doctors
                            who are ready to support you in converting leads and
                            providing expert guidance to your patients, ensuring
                            optimal outcomes and patient satisfaction.
                        </p>

                        <Button
                            variant="solid"
                            className="rounded-button !text-[15px] group inline-flex items-center px-6 py-4 text-lg transition-all duration-300 ease-in-out
                               transform hover:scale-105 shadow-theme"
                        >
                            Get Started
                            <BsArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </div>

                    {/* Right Image with multiple doctor images */}
                    <div className="relative flex justify-center items-center max-w-[500px] sm:w-full w-[80%] mx-auto lg:order-last order-first">
                        {/* Enhanced glow effects */}
                        <div className="absolute w-[120%] h-[120%] bg-primary-subtle rounded-full opacity-10 animate-pulse-slow"></div>
                        <div className="absolute w-[100%] h-[100%] bg-primary/20 rounded-full opacity-20 animate-pulse"></div>
                        
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/10 rounded-full filter blur-3xl animate-blob"></div>
                            <div className="relative z-10 animate-float">
                                <img
                                    src="https://placehold.co/600x400/2a85ff/FFFFFF?text=Medical+Care"
                                    alt="Medical Technology Illustration"
                                    className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://placehold.co/600x400/2a85ff/FFFFFF?text=Medical+Care";
                                    }}
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
                                
                                {/* Decorative Circles */}
                                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-bounce delay-100"></div>
                                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-deep rounded-full animate-bounce delay-300"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <AnimationStyles />
            </div>
        )
    }
}

// Extract animation styles to a separate component
const AnimationStyles = () => (
    <style jsx global="true">{`
        @keyframes float {
            0%,
            100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
        }

        @keyframes blob {
            0%,
            100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }

        .animate-float {
            animation: float 6s ease-in-out infinite;
        }

        .animate-blob {
            animation: blob 7s infinite;
        }

        .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
        }
    `}</style>
);

export default HeroSection
