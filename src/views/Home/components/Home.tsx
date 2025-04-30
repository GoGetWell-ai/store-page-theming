import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';
import HCFHeader from '@/components/shared/HCFHeader';
import { useThemeStore } from '@/store/themeStore';

const Hero: React.FC = () => {
    const { specialty } = useThemeStore();
    
    return (
        <div className='relative font-theme'>
            <HCFHeader leftSide={
                <>
                    <h1 className="text-3xl lg:text-5xl font-heading font-heading text-hero-text mb-6 leading-tight text-center">
                        We Handle Everything,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-mild to-primary">
                            You Focus on Healing
                        </span>
                    </h1>
                    <p className="text-[15px] sm:text-[17px] text-hero-text mx-auto mt-2 sm:mt-6 leading-shorter md:leading-normal text-center opacity-90">
                        Upload Your Medical Reports to Explore the Best and Most Cost-Effective Treatments in Your Language
                    </p>
                </>
            } />

            {/* Only show profile card for default theme */}
            {specialty === 'default' && (
                <>
                    <div className='md:block hidden z-5 absolute bottom-[-25%] w-[70%] left-[15%] lg:w-[50%] lg:left-[25%]'>
                        <ProfileCard />
                    </div>
                    <div className='w-full md:hidden block'>
                        <ProfileCard />
                    </div>
                </>
            )}
            
            {/* For organ transplant theme, add a testimonials section */}
            {specialty === 'organ-transplant' && (
                <div className="bg-green-50 py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-heading font-bold text-green-800 text-center mb-12">Patient Success Stories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <TestimonialCard 
                                name="Michael Johnson"
                                procedure="Kidney Transplant"
                                quote="After 3 years on dialysis, my transplant gave me my life back. The care team was exceptional throughout the entire process."
                                image="https://placehold.co/100x100/16a34a/FFFFFF?text=MJ"
                            />
                            <TestimonialCard 
                                name="Sarah Williams"
                                procedure="Liver Transplant"
                                quote="I received my transplant 5 years ago and have been able to watch my children grow up. I'm forever grateful to my donor and the medical team."
                                image="https://placehold.co/100x100/16a34a/FFFFFF?text=SW"
                            />
                            <TestimonialCard 
                                name="David Chen"
                                procedure="Heart Transplant"
                                quote="The transplant team didn't just save my life - they gave me a new one. I've run two marathons since my procedure."
                                image="https://placehold.co/100x100/16a34a/FFFFFF?text=DC"
                            />
                        </div>
                    </div>
                </div>
            )}
            
            {/* For cosmetic surgery theme, add a before/after gallery */}
            {specialty === 'cosmetic-surgery' && (
                <div className="bg-gradient-to-b from-pink-50 to-white py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-heading font-bold text-pink-800 text-center mb-4">Transformative Results</h2>
                        <p className="text-pink-600 text-center max-w-2xl mx-auto mb-12">See the difference our expert procedures can make with these real patient transformations</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <BeforeAfterCard 
                                procedure="Rhinoplasty"
                                description="Refined nose profile with natural-looking results"
                                beforeImage="https://placehold.co/300x400/db2777/FFFFFF?text=Before"
                                afterImage="https://placehold.co/300x400/db2777/FFFFFF?text=After"
                            />
                            <BeforeAfterCard 
                                procedure="Facelift"
                                description="Restored youthful contours with minimal scarring"
                                beforeImage="https://placehold.co/300x400/db2777/FFFFFF?text=Before"
                                afterImage="https://placehold.co/300x400/db2777/FFFFFF?text=After"
                            />
                            <BeforeAfterCard 
                                procedure="Body Contouring"
                                description="Sculpted silhouette with improved proportion"
                                beforeImage="https://placehold.co/300x400/db2777/FFFFFF?text=Before"
                                afterImage="https://placehold.co/300x400/db2777/FFFFFF?text=After"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;

// Testimonial Card for Organ Transplant theme
const TestimonialCard = ({ name, procedure, quote, image }: { name: string, procedure: string, quote: string, image: string }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-green-100">
            <div className="flex items-center mb-4">
                <img src={image} alt={name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                    <h3 className="font-heading font-bold text-green-800">{name}</h3>
                    <p className="text-green-600">{procedure}</p>
                </div>
            </div>
            <p className="text-gray-700 italic">"{quote}"</p>
            <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        </div>
    );
};

// Before/After Card for Cosmetic Surgery theme
const BeforeAfterCard = ({ procedure, description, beforeImage, afterImage }: 
    { procedure: string, description: string, beforeImage: string, afterImage: string }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
                <div className="grid grid-cols-2">
                    <div className="relative">
                        <img src={beforeImage} alt={`Before ${procedure}`} className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 text-sm">Before</div>
                    </div>
                    <div className="relative">
                        <img src={afterImage} alt={`After ${procedure}`} className="w-full h-64 object-cover" />
                        <div className="absolute bottom-0 right-0 bg-pink-600 text-white px-2 py-1 text-sm">After</div>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-heading font-bold text-pink-800 text-lg">{procedure}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </div>
    );
};

const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust if the current date is before the birth date in the current year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

const ProfileCard = () => {
    const { hcfData } = useAuthStore();

    const age = hcfData?.dob ? calculateAge(hcfData.dob) : 'N/A';

    return (
        <div className="w-full mx-auto bg-card-bg rounded-card shadow-theme p-4 md:p-6 border border-border">
            <div className="flex flex-col gap-1">
                {/* Header with title and button */}
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-heading font-heading text-text">{hcfData.name}</h1>
                    <a 
                        href={`https://api.whatsapp.com/send?phone=${hcfData?.phone || hcfData?.auth?.phoneNumber}&text=Hi!%20Dear,%20I%20have%20a%20inquiry`} 
                        target='_blank' 
                        rel='noreferrer' 
                        className="bg-primary text-white px-4 md:px-6 py-2 rounded-button flex items-center gap-2 hover:bg-primary-deep transition-colors text-sm md:text-base shadow-theme"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Contact me
                    </a>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-1 mt-3">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-text-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-text-light text-sm">Location: </span>
                        <span className="text-primary text-sm">{`${hcfData?.address?.city ? `${hcfData?.address?.city}, ` : ''}${hcfData?.address?.country ? `${hcfData?.address?.country}, ` : ''}`}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-text-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-text-light text-sm">Age: </span>
                        <span className="text-text text-sm">{age} years</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-text-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <span className="text-text-light text-sm">Language: </span>
                        <span className="text-text text-sm">{hcfData?.languages?.length ? hcfData?.languages.map((data) => ` ${data},`) : ''}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-text-light flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-text-light text-sm">Gender: </span>
                        <span className="text-primary text-sm capitalize">{hcfData?.gender || 'N/A'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};