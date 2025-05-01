import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { WhyMakwellData } from '../data/treatmentTypesData';
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { ItemAnimation, ScaleAnimation, TitleAnimation } from '@/components/shared/Animation';
import { Button } from '@/components/ui';
import { useThemeStore } from '@/store/themeStore';

const WhyMakeWell = () => {
    const { specialty } = useThemeStore();
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Get theme specific classes
    const getThemeClasses = () => {
        switch (specialty) {
            case 'organTransplant':
                return {
                    titleGradient: 'from-teal-600 to-cyan-500',
                    statsGradient: 'from-teal-700 to-teal-500',
                    subtitleColor: 'text-teal-600',
                    cardBg: 'bg-gradient-to-br from-teal-50 to-white',
                    cardBorder: 'border-teal-100',
                    buttonGradient: 'bg-gradient-to-r from-teal-600 to-teal-500'
                };
            case 'cosmeticSurgery':
                return {
                    titleGradient: 'from-pink-600 to-purple-500',
                    statsGradient: 'from-pink-700 to-pink-500',
                    subtitleColor: 'text-pink-600',
                    cardBg: 'bg-gradient-to-br from-pink-50 to-white',
                    cardBorder: 'border-pink-100',
                    buttonGradient: 'bg-gradient-to-r from-pink-600 to-pink-500'
                };
            default:
                return {
                    titleGradient: 'from-blue-600 to-indigo-500',
                    statsGradient: 'from-primary-deep to-primary',
                    subtitleColor: 'text-primary',
                    cardBg: 'bg-gradient-to-br from-blue-50 to-white',
                    cardBorder: 'border-blue-100',
                    buttonGradient: 'bg-gradient-to-r from-blue-600 to-blue-500'
                };
        }
    };

    const themeClasses = getThemeClasses();

    return (
        <div className={`w-full py-12 md:py-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-7xl px-6 mx-auto">
                <div className="text-center mb-12">
                    <h1 className={`text-3xl sm:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.titleGradient}`}>
                        Why Gogetwell.ai
                    </h1>
                    <p className={`text-lg ${themeClasses.subtitleColor}`}>
                        We help you with comprehensive healthcare solutions
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 stagger-fade-in">
                    {WhyMakwellData.map((item, index) => (
                        <div 
                            key={index} 
                            className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg} border ${themeClasses.cardBorder} hover-lift transition-all duration-300`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="text-center space-y-3">
                                <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${themeClasses.statsGradient} text-transparent bg-clip-text`}>
                                    {item.quantity}
                                </span>
                                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mt-2">
                                    {item.title}
                                </h2>
                                <div className="w-12 h-1 mx-auto rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <StartedButton themeClass={themeClasses.buttonGradient} />
                </div>
            </div>
        </div>
    );
};

export const StartedButton = ({ themeClass }) => {
    const hcfData = useAuthStore((state) => state.hcfData);
    const navigate = useNavigate();

    const handleClick = () => navigate(`/chat-bot`);

    return (
        <Button 
            className={`flex items-center gap-2 rounded-lg px-6 py-3 ${themeClass} text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 btn-ripple`} 
            onClick={handleClick}
        >
            <span className="text-base font-medium">Get Started</span>
            <FaArrowRight className="text-sm" />
        </Button>
    );
};

export default WhyMakeWell;