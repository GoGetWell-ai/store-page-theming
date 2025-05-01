import React from 'react'
import { Button, Card } from '@/components/ui'
import {
    HiOutlineSparkles,
    HiOutlineCalendar,
    HiOutlineBadgeCheck,
    HiOutlineUserCircle,
} from 'react-icons/hi'

/**
 * CosmeticSurgeryHero component
 *
 * An elegant hero section for cosmetic surgery services with
 * emphasis on transformation, beauty, and exclusive procedures.
 */
const CosmeticSurgeryHero: React.FC = () => {
    // Popular procedures
    const popularProcedures = [
        'Facial Contouring',
        'Rhinoplasty',
        'Body Sculpting',
        'Breast Augmentation',
    ]

    return (
        <div className="cosmetic-surgery-hero relative overflow-hidden bg-gradient-to-b from-white via-purple-50 to-pink-50">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/img/others/abstract-pattern.png')] opacity-5 z-0"></div>
            <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-purple-100/30 to-transparent z-0"></div>

            {/* Content container */}
            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left column - Image content */}
                    <div className="order-2 lg:order-1">
                        <div className="relative">
                            {/* Main image with styling */}
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="/img/others/cosmetic-transformation.jpg"
                                    alt="Cosmetic transformation"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
                            </div>

                            {/* Floating elements */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-20">
                                <div className="flex items-center space-x-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((_, index) => (
                                            <div
                                                key={index}
                                                className="w-8 h-8 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center"
                                            >
                                                <HiOutlineUserCircle className="h-4 w-4 text-purple-600" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xs">
                                        <p className="font-semibold">
                                            3,500+ satisfied clients
                                        </p>
                                        <div className="flex text-yellow-500">
                                            {[1, 2, 3, 4, 5].map((_, index) => (
                                                <span key={index}>★</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-1/4 -left-10 bg-white p-3 rounded-full shadow-lg z-20">
                                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                                    <HiOutlineSparkles className="h-6 w-6 text-pink-600" />
                                </div>
                            </div>
                        </div>

                        {/* Testimonial */}
                        <div className="mt-10 bg-white p-6 rounded-xl shadow-md border-l-4 border-pink-400">
                            <div className="flex items-start">
                                <div className="text-4xl text-pink-300 mr-4">
                                    "
                                </div>
                                <div>
                                    <p className="italic text-gray-700 mb-4">
                                        The transformation wasn't just physical.
                                        It gave me a new confidence I never
                                        thought possible. The entire team made
                                        me feel safe and cared for.
                                    </p>
                                    <p className="font-medium text-gray-900">
                                        — Sarah M., 34
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Facial Contouring & Rhinoplasty
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Text content */}
                    <div className="order-1 lg:order-2">
                        <div className="inline-block px-4 py-1 mb-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                            Premium Aesthetic Solutions
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Discover Your True{' '}
                            <span className="text-purple-600">
                                Beauty Potential
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8">
                            Our exclusive network of world-class cosmetic
                            surgeons combines artistry with medical expertise to
                            deliver natural-looking, transformative results
                            tailored to your unique features and aspirations.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-4 mb-10">
                            <Button
                                size="lg"
                                variant="solid"
                                className="bg-purple-600 hover:bg-purple-700 border-0"
                                icon={<HiOutlineCalendar />}
                            >
                                Schedule a Consultation
                            </Button>
                            <Button
                                size="lg"
                                variant="plain"
                                className="text-purple-600 border-purple-200"
                                icon={<HiOutlineSparkles />}
                            >
                                View Before & After Gallery
                            </Button>
                        </div>

                        {/* Procedures section */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <HiOutlineBadgeCheck className="h-5 w-5 text-purple-600 mr-2" />
                                Our Signature Procedures
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {popularProcedures.map((procedure, index) => (
                                    <Card
                                        key={index}
                                        className="border-purple-100 hover:border-purple-300 transition-colors cursor-pointer"
                                    >
                                        <div className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                                                    <HiOutlineSparkles className="h-4 w-4 text-pink-600" />
                                                </div>
                                                <p className="font-medium text-gray-700">
                                                    {procedure}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                            <p className="mt-4 text-center text-sm text-gray-500">
                                Each procedure is tailored to your unique
                                features and desired outcomes
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CosmeticSurgeryHero
