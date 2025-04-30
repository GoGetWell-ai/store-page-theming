import React from 'react'
import { Button, Card } from '@/components/ui'
import { HiOutlineClipboardCheck, HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi'

/**
 * DefaultHero component
 * 
 * A general healthcare hero section with modern design,
 * emphasizing accessibility and variety of medical services.
 */
const DefaultHero: React.FC = () => {
    // Featured services
    const featuredServices = [
        { icon: 'hospital-building', label: 'Primary Care' },
        { icon: 'heart', label: 'Cardiology' },
        { icon: 'brain', label: 'Neurology' },
        { icon: 'child', label: 'Pediatrics' },
    ]

    return (
        <div className="default-hero relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/img/others/medical-pattern.png')] opacity-5 z-0"></div>
            
            {/* Content container */}
            <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left column - Text content */}
                    <div>
                        <div className="inline-block px-4 py-1 mb-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                            Healthcare for Everyone
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            We Handle Everything,{" "}
                            <span className="text-blue-600">
                                You Focus on Healing
                            </span>
                        </h1>
                        
                        <p className="text-lg text-gray-600 mb-8">
                            Upload your medical reports to explore the best and most 
                            cost-effective treatments in your language. Our team of specialists
                            will guide you through every step of your healthcare journey.
                        </p>
                        
                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <Button 
                                size="lg" 
                                variant="solid" 
                                className="bg-blue-600 hover:bg-blue-700"
                                icon={<HiOutlineClipboardCheck />}
                            >
                                Upload Medical Reports
                            </Button>
                            <Button 
                                size="lg" 
                                variant="twoTone"
                                className="text-blue-600"
                                icon={<HiOutlinePhone />}
                            >
                                Contact a Specialist
                            </Button>
                        </div>
                        
                        {/* Info cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card className="border-blue-200">
                                <div className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <HiOutlineLocationMarker className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Global Network</p>
                                            <p className="text-sm text-gray-500">200+ hospitals worldwide</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <Card className="border-blue-200">
                                <div className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <HiOutlinePhone className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">24/7 Support</p>
                                            <p className="text-sm text-gray-500">In 20+ languages</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    
                    {/* Right column - Image and info */}
                    <div>
                        <div className="relative">
                            {/* Decorative elements */}
                            <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-200 rounded-full opacity-50 z-0"></div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full z-0"></div>
                            
                            {/* Main image */}
                            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                                <img 
                                    src="/img/others/doctor-patient.jpg" 
                                    alt="Doctor with patient"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                        
                        {/* Featured services */}
                        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Medical Services</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {featuredServices.map((service, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 mx-auto flex items-center justify-center mb-2">
                                            <span className="text-blue-600 text-xl">
                                                {/* Using placeholders since we don't have the actual icons */}
                                                {service.icon === 'hospital-building' && '🏥'}
                                                {service.icon === 'heart' && '❤️'}
                                                {service.icon === 'brain' && '🧠'}
                                                {service.icon === 'child' && '👶'}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-600">{service.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultHero