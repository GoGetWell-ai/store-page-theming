import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';
import React, { useState } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const Testimonials: React.FC = () => {
    const { hcfData } = useAuthStore()
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonialsData = [
        {
            imageSrc:
                'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp', // Profile image source will be inserted here
            reviewContent: `I would like to express my heartfelt gratitude to ${hcfData.name} for making my medical journey to India smooth and stress-free. From the moment I reached out for assistance, ${hcfData.name} took care of every detail – from finding the best doctor to arranging my travel and accommodation. Their professionalism, kindness, and quick responses reassured me throughout the process. Thanks to their expertise and dedication, I was able to focus entirely on my recovery, knowing I was in capable hands.`,
            reviewer: {
                name: 'Ava Robert',
                designation: 'Golio',
            },
        },
        {
            imageSrc:
                'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp', // Profile image source will be inserted here
            reviewContent: `Traveling to India for medical treatment was a big decision, but ${hcfData.name} made it much easier by coordinating everything perfectly. From finding the top specialists to handling all the paperwork and logistics, ${hcfData.name} ensured a smooth process from start to finish. Their personalized approach made me feel cared for every step of the way. I couldn’t have asked for a more attentive and thoughtful guide during this challenging time. My treatment was successful, and I am so grateful for the outstanding support I received.`,
            reviewer: {
                name: 'Ava Robert',
                designation: 'Golio',
            }
        },
        {
            imageSrc:
                'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp',
            reviewContent: `I am incredibly thankful to ${hcfData.name} for coordinating my entire medical trip to India. Their efficiency, attention to detail, and deep understanding of healthcare made what could have been a daunting process feel seamless. ${hcfData.name} not only arranged the best possible treatment for my condition but also took care of everything from hospital appointments to transportation and accommodations. Their constant communication reassured me throughout the process, allowing me to focus on healing. I highly recommend ${hcfData.name} to anyone seeking medical treatment abroad.`,
            reviewer: {
                name: 'Ava Robert',
                designation: 'Golio',
            }
        },
        {
            imageSrc:
                'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp', // Profile image source will be inserted here
            reviewContent: `I cannot thank ${hcfData.name} enough for their exceptional support during my treatment in India. They helped me find the best healthcare professionals and managed all the logistics, making my experience stress-free. ${hcfData.name} was always available to answer questions, provide updates, and ensure I was comfortable at every step of the journey. Their compassion and expertise were invaluable, and I’m grateful for the smooth and successful treatment process they arranged for me.`,
            reviewer: {
                name: 'Ava Robert',
                designation: 'Golio',
            }
        },
        {
            imageSrc:
                'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp', // Profile image source will be inserted here
            reviewContent: `Working with ${hcfData.name} was an absolute blessing during my time of need. They took care of everything – from coordinating with top hospitals and doctors to arranging my visa and travel. Their dedication to ensuring I received the best possible treatment made me feel confident and secure, even though I was far from home. ${hcfData.name} went above and beyond to make sure all my needs were met, and I couldn’t be happier with the outcome of my treatment. I would recommend ${hcfData.name} to anyone looking for expert healthcare coordination.`,
            reviewer: {
                name: 'Ava Robert',
                designation: 'Golio',
            }
        },
    ];

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };



    return (
        <div className="w-full bg-gradient-to-br from-primary-mild/5 via-white to-primary-mild/10 dark:from-primary/10 dark:via-background dark:to-primary/5 py-6">
            <div className="max-w-7xl mx-auto px-6">
                <div
                    className="text-center mb-6 space-y-2"
                >
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-text">
                        What our patients says
                    </h2>
                    <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-deep to-primary dark:from-primary dark:to-primary-mild bg-clip-text text-transparent">
                        about {hcfData.name}
                    </h3>
                </div>

                <div className="relative">
                    <div className="flex items-center justify-center">
                        <div
                            className="bg-white dark:bg-card-bg rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl relative dark:border dark:border-border"
                        >
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                                <FaQuoteLeft className="text-primary dark:text-primary-mild text-xl" />
                            </div>

                            <div className="space-y-8">
                                <p className="text-gray-600 dark:text-text-light text-[13px] sm:text-md leading-relaxed italic">
                                    {testimonialsData[currentIndex].reviewContent}
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <div className="relative w-16 h-16 overflow-hidden rounded-full">
                                        <img
                                            src={testimonialsData[currentIndex].imageSrc}
                                            alt={testimonialsData[currentIndex].reviewer.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-gray-900 dark:text-text">
                                            {testimonialsData[currentIndex].reviewer.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-text-light">
                                            {testimonialsData[currentIndex].reviewer.designation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 -left-4">
                        <button
                            onClick={handlePrevious} className="p-3 rounded-full bg-white dark:bg-card-bg shadow-lg hover:bg-primary-mild/10 dark:hover:bg-primary/20 transition-colors dark:border dark:border-border">
                            <FaChevronLeft className="text-primary dark:text-primary-mild text-xl" />
                        </button>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 -right-4">
                        <button
                            onClick={handleNext} className="p-3 rounded-full bg-white dark:bg-card-bg shadow-lg hover:bg-primary-mild/10 dark:hover:bg-primary/20 transition-colors dark:border dark:border-border">
                            <FaChevronRight className="text-primary dark:text-primary-mild text-xl" />
                        </button>
                    </div>
                </div>

                <div className="flex justify-center mt-8 gap-2">
                    {testimonialsData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'w-8 bg-primary dark:bg-primary-mild' 
                                    : 'w-2 bg-gray-300 dark:bg-gray-600'
                                } h-2`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;

