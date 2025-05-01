import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { WhyMakwellData } from '../data/treatmentTypesData';
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';
import { useAuth } from '@/auth';
import { useNavigate } from 'react-router-dom';
import { ItemAnimation, ScaleAnimation, TitleAnimation } from '@/components/shared/Animation';
import { Button } from '@/components/ui';

const WhyMakeWell = () => {
    return (
        <div className="w-full">
            <div className="max-w-7xl px-6 mx-auto py-4">
                <TitleAnimation>
                    <h1 className="text-2xl sm:text-4xl  font-bold text-black  bg-clip-text">
                        Why Gogetwell.ai
                    </h1>
                    <p className="text-lg text-gray-600">We help you with comprehensive healthcare solutions</p>
                </TitleAnimation>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {WhyMakwellData.map((item, index) => (
                        <ItemAnimation key={index} index={index}>
                            <div className="p-6">
                                <div className="text-center space-y-1 leading-6">
                                    <span className="text-xl md:text-4xl font-bold bg-gradient-to-r from-primary-deep to-primary text-transparent bg-clip-text">
                                        {item.quantity}
                                    </span>
                                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                                        {item.title}
                                    </h2>
                                </div>
                            </div>
                        </ItemAnimation>
                    ))}
                </div>

                <div className="flex justify-center mt-7">
                    <StartedButton />
                </div>
            </div>
        </div>
    );
};

export const StartedButton = () => {
    const hcfData = useAuthStore((state) => state.hcfData);
    const navigate = useNavigate();

    const handleClick = () =>
        navigate(`/chat-bot`);

    return (
        <Button className='flex items-center rounded-md' variant='solid' onClick={handleClick}>
            <span className="text-sm">Get Started</span>
            <FaArrowRight className="text-sm ml-1" />
        </Button>
    );
};

export default WhyMakeWell;