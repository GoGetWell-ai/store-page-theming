import React from 'react'
import visualBg from '@/assets/images/mbbsImg.webp'
import { BsArrowRight } from 'react-icons/bs'
import { Button } from '@/components/ui'

const HeroSection = () => {
    return (
        <div className="flex items-center">
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6 animate-fade-in lg:order-first order-last lg:mt-0 mt-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        Harness the Power of{' '}
                        <span className="text-primary">
                            10,000 MBBS Doctors
                        </span>
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
                        Join forces with a network of over 10,000 MBBS doctors
                        who are ready to support you in converting leads and
                        providing expert guidance to your patients, ensuring
                        optimal outcomes and patient satisfaction.
                    </p>

                    <Button
                        variant="solid"
                        className="rounded-md !text-[15px] group inline-flex items-center px-6 py-4 text-lg transition-all duration-300 ease-in-out
                           transform hover:scale-105"
                    >
                        Get Started
                        <BsArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                </div>

                {/* Right Image */}
                <div className="relative flex justify-center items-center max-w-[500px] sm:w-full w-[80%] mx-auto lg:order-last order-first">
                    <div className="absolute w-[120%] h-[120%] bg-gray-300 rounded-full opacity-10 animate-pulse-slow"></div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-purple-600/10 rounded-full filter blur-3xl animate-blob"></div>
                        <div className="relative z-10 animate-float">
                            <img
                                src={visualBg}
                                alt="Medical Technology Illustration"
                                className="w-full max-w-lg mx-auto"
                            />
                            {/* Decorative Circles */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-600 rounded-full animate-bounce delay-100"></div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-600 rounded-full animate-bounce delay-300"></div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
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
        </div>
    )
}

export default HeroSection
