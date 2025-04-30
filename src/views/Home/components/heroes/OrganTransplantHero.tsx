import React from 'react'
import { Button, Card } from '@/components/ui'
import { HiOutlineHeart, HiOutlineClipboardCheck, HiOutlineGlobe, HiOutlineLightBulb } from 'react-icons/hi'

/**
 * OrganTransplantHero component
 * 
 * A specialized hero section for organ transplant services with 
 * emphasis on life-saving care, organ donation, and transplant expertise.
 */
const OrganTransplantHero: React.FC = () => {
    // Transplant types we specialize in
    const transplantTypes = [
        { name: 'Kidney', count: '2,500+', color: 'bg-red-100 text-red-600' },
        { name: 'Liver', count: '1,800+', color: 'bg-amber-100 text-amber-600' },
        { name: 'Heart', count: '950+', color: 'bg-rose-100 text-rose-600' },
        { name: 'Lung', count: '700+', color: 'bg-blue-100 text-blue-600' }
    ]

    return (
        <div className="organ-transplant-hero relative bg-gradient-to-br from-slate-50 to-red-50">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('/img/others/cell-pattern.png')] opacity-5 z-0"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-100/50 to-transparent z-0"></div>
            
            {/* Content container */}
            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Left column - Text content */}
                    <div>
                        <div className="inline-block px-4 py-1 mb-6 rounded-full bg-red-100 text-red-600 text-sm font-medium">
                            Leading in Organ Transplantation
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            A New Chance at Life with{" "}
                            <span className="text-red-600">
                                Expert Transplant Care
                            </span>
                        </h1>
                        
                        <p className="text-lg text-gray-600 mb-8">
                            Our network of world-renowned transplant centers offers hope and healing 
                            through innovative organ transplantation procedures. From evaluation to 
                            post-transplant care, we're with you at every step.
                        </p>
                        
                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-4 mb-10">
                            <Button 
                                size="lg" 
                                variant="solid" 
                                className="bg-red-600 hover:bg-red-700 border-0"
                                icon={<HiOutlineClipboardCheck />}
                            >
                                Request a Consultation
                            </Button>
                            <Button 
                                size="lg" 
                                variant="plain"
                                className="text-red-600 border-red-200"
                                icon={<HiOutlineHeart />}
                            >
                                Learn About Organ Donation
                            </Button>
                        </div>
                        
                        {/* Stats section */}
                        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Transplant Success</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {transplantTypes.map((type, index) => (
                                    <div key={index} className="text-center">
                                        <div className={`w-12 h-12 rounded-full ${type.color} mx-auto flex items-center justify-center mb-2`}>
                                            <HiOutlineHeart className="h-6 w-6" />
                                        </div>
                                        <p className="text-lg font-bold text-gray-800">{type.count}</p>
                                        <p className="text-sm text-gray-600">{type.name} Transplants</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Right column - Image and features */}
                    <div>
                        <div className="relative mb-8">
                            {/* Main image with styling */}
                            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                                <img 
                                    src="/img/others/transplant-team.jpg" 
                                    alt="Transplant medical team"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-900/80 to-transparent p-6">
                                    <p className="text-white font-medium">Our transplant teams work around the clock to save lives</p>
                                </div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-200 rounded-full opacity-70 z-0"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-100 rounded-full z-0"></div>
                        </div>
                        
                        {/* Feature cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card className="border-red-100">
                                <div className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                            <HiOutlineGlobe className="h-5 w-5 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">International Coordination</p>
                                            <p className="text-sm text-gray-500">Cross-border transplant support</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <Card className="border-red-100">
                                <div className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                            <HiOutlineLightBulb className="h-5 w-5 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Innovative Techniques</p>
                                            <p className="text-sm text-gray-500">Latest advancements in transplantation</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganTransplantHero