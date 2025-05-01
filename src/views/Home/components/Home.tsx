import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';
import HCFHeader from '@/components/shared/HCFHeader';
import { useThemeStore } from '@/store/themeStore';
import DarkModeToggle from '@/components/shared/DarkModeToggle';

const Hero: React.FC = () => {
    const { specialty, mode } = useThemeStore();
    
    return (
        <div className='relative font-theme min-h-screen flex flex-col dark:bg-background'>
            <div className="flex-grow flex flex-col relative">
                {/* Dark mode toggle for all themes - positioned with higher z-index */}
                <div className="fixed top-4 right-4 z-[100]">
                    <DarkModeToggle />
                </div>
                <HCFHeader leftSide={
                    <>
                        <h1 className="text-3xl lg:text-5xl font-heading font-heading text-hero-text dark:text-text mb-6 leading-tight text-center">
                            We Handle Everything,{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-mild to-primary">
                                You Focus on Healing
                            </span>
                        </h1>
                        <p className="text-[15px] sm:text-[17px] text-hero-text dark:text-text-light mx-auto mt-2 sm:mt-6 leading-shorter md:leading-normal text-center opacity-90">
                            Upload Your Medical Reports to Explore the Best and Most Cost-Effective Treatments in Your Language
                        </p>
                    </>
                } />

            {/* Only show profile card for default theme */}
            {specialty === 'default' && (
                <>
                    {/* Desktop version - positioned below hero with proper spacing */}
                    <div className='md:block hidden relative z-10 mx-auto max-w-4xl px-4 sm:px-6 -mt-16'>
                        <ProfileCard />
                    </div>
                    {/* Mobile version - full width with proper spacing */}
                    <div className='w-full md:hidden block mt-6 px-4 sm:px-6'>
                        <ProfileCard />
                    </div>
                    {/* Add spacing after the card for content that follows */}
                    <div className="md:pt-24 pt-12"></div>
                </>
            )}
            
            {/* For organ transplant theme, add a testimonials section */}
            {specialty === 'organ-transplant' && (
                <div className="bg-green-50 dark:bg-green-900/20 py-16 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <h2 className="text-3xl font-heading font-bold text-green-800 dark:text-green-400 text-center mb-12">Patient Success Stories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
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
                <div className="bg-gradient-to-b from-pink-50 to-white dark:from-pink-900/20 dark:to-background py-16 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <h2 className="text-3xl font-heading font-bold text-pink-800 dark:text-pink-400 text-center mb-4">Transformative Results</h2>
                        <p className="text-pink-600 dark:text-pink-300 text-center max-w-2xl mx-auto mb-12">See the difference our expert procedures can make with these real patient transformations</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
                            <BeforeAfterCard 
                                procedure="Rhinoplasty"
                                description="Refined nose profile with natural-looking results"
                                beforeImage="https://www1.plasticsurgery.org/include/images/photogallery/cases/9728/44247-122963b_scaled.jpg?text=Before"
                                afterImage="https://www1.plasticsurgery.org/include/images/photogallery/cases/9728/44247-122963a_scaled.jpg?text=After"
                            />
                            <BeforeAfterCard 
                                procedure="Facelift"
                                description="Restored youthful contours with minimal scarring"
                                beforeImage="https://www1.plasticsurgery.org/include/images/photogallery/cases/6959/25339-81257b_scaled.jpg?text=Before"
                                afterImage="https://www1.plasticsurgery.org/include/images/photogallery/cases/6959/25339-81257a_scaled.jpg?text=After"
                            />
                            <BeforeAfterCard 
                                procedure="Blepharoplasty"
                                description="Rejuvenated eye area with reduced puffiness and a more alert appearance"
                                beforeImage="https://www1.plasticsurgery.org/include/images/photogallery/cases/5855/41005-114594b_scaled.jpg?text=Before"
                                afterImage="https://www1.plasticsurgery.org/include/images/photogallery/cases/5855/41005-114594a_scaled.jpg?text=After"
                            />
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default Hero;

// Testimonial Card for Organ Transplant theme
const TestimonialCard = ({ name, procedure, quote, image }: { name: string, procedure: string, quote: string, image: string }) => {
    return (
        <div className="bg-white dark:bg-card-bg rounded-lg shadow-lg p-6 border border-green-100 dark:border-green-900">
            <div className="flex items-center mb-4">
                <img src={image} alt={name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                    <h3 className="font-heading font-bold text-green-800 dark:text-green-400">{name}</h3>
                    <p className="text-green-600 dark:text-green-500">{procedure}</p>
                </div>
            </div>
            <p className="text-gray-700 dark:text-text-light italic">"{quote}"</p>
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
        <div className="bg-white dark:bg-card-bg rounded-lg shadow-lg overflow-hidden">
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
                <h3 className="font-heading font-bold text-pink-800 dark:text-pink-400 text-lg">{procedure}</h3>
                <p className="text-gray-600 dark:text-text-light text-sm">{description}</p>
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
    
    // Format location properly
    const location = () => {
        const city = hcfData?.address?.city || '';
        const country = hcfData?.address?.country || '';
        
        if (city && country) return `${city}, ${country}`;
        if (city) return city;
        if (country) return country;
        return 'N/A';
    };
    
    // Format languages properly
    const languages = () => {
        if (!hcfData?.languages?.length) return 'N/A';
        return hcfData.languages.join(', ');
    };

    return (
        <div className="w-full mx-auto bg-card-bg dark:bg-card-bg rounded-card shadow-theme p-4 md:p-6 border border-border dark:border-border">
            <div className="flex flex-col gap-3">
                {/* Header with title and button */}
                <div className="flex flex-wrap justify-between items-center gap-3">
                    <h1 className="text-xl font-heading font-bold text-text dark:text-text">
                        {hcfData?.name || 'Medical Professional'}
                    </h1>
                    <a 
                        href={`https://api.whatsapp.com/send?phone=${hcfData?.phone || hcfData?.auth?.phoneNumber || '1234567890'}&text=Hi!%20I%20have%20an%20inquiry`} 
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

                {/* Profile image section with multiple doctor images */}
                <div className="flex flex-col mb-4">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-16 h-16 rounded-full bg-primary-subtle dark:bg-primary-subtle/30 flex items-center justify-center overflow-hidden border-2 border-primary">
                            <img 
                                src="https://placehold.co/200x200/2a85ff/FFFFFF?text=MD" 
                                alt="Doctor Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-text-light dark:text-text-light text-sm">Medical Professional</p>
                            <p className="text-primary font-medium">{hcfData && 'specialty' in hcfData ? (hcfData.specialty as string) : 'General Medicine'}</p>
                        </div>
                    </div>
                    
                    {/* Multiple doctor images */}
                    <div className="bg-primary-subtle/20 dark:bg-primary-subtle/10 p-3 rounded-lg">
                        <p className="text-text-light dark:text-text-light text-sm mb-2">Our Medical Team</p>
                        <div className="flex -space-x-3 overflow-hidden">
                            {[
                                "https://placehold.co/100x100/2a85ff/FFFFFF?text=Dr.A",
                                "https://placehold.co/100x100/4996ff/FFFFFF?text=Dr.B",
                                "https://placehold.co/100x100/0069f6/FFFFFF?text=Dr.C",
                                "https://placehold.co/100x100/2a85ff/FFFFFF?text=Dr.D",
                                "https://placehold.co/100x100/4996ff/FFFFFF?text=Dr.E"
                            ].map((img, index) => (
                                <div 
                                    key={index} 
                                    className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden"
                                >
                                    <img 
                                        src={img} 
                                        alt={`Doctor ${index + 1}`} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-primary flex items-center justify-center text-white text-xs font-bold">
                                +15
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 mt-2">
                    <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-primary-subtle/20 dark:hover:bg-primary-subtle/10 transition-colors">
                        <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                            <span className="text-text-light dark:text-text-light text-sm block">Location</span>
                            <span className="text-text dark:text-text font-medium">{location()}</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-primary-subtle/20 dark:hover:bg-primary-subtle/10 transition-colors">
                        <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div>
                            <span className="text-text-light dark:text-text-light text-sm block">Age</span>
                            <span className="text-text dark:text-text font-medium">{age} years</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-primary-subtle/20 dark:hover:bg-primary-subtle/10 transition-colors">
                        <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <div>
                            <span className="text-text-light dark:text-text-light text-sm block">Languages</span>
                            <span className="text-text dark:text-text font-medium">{languages()}</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-primary-subtle/20 dark:hover:bg-primary-subtle/10 transition-colors">
                        <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <div>
                            <span className="text-text-light dark:text-text-light text-sm block">Gender</span>
                            <span className="text-text dark:text-text font-medium capitalize">{hcfData?.gender || 'N/A'}</span>
                        </div>
                    </div>
                </div>
                
                {/* Experience and ratings - Added for better visual appeal */}
                <div className="mt-2 pt-3 border-t border-border dark:border-border flex justify-between">
                    <div className="text-center">
                        <span className="text-primary font-bold text-lg">10+</span>
                        <p className="text-text-light dark:text-text-light text-xs">Years Exp.</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-text-light dark:text-text-light text-xs">4.9/5 Rating</p>
                    </div>
                    <div className="text-center">
                        <span className="text-primary font-bold text-lg">500+</span>
                        <p className="text-text-light dark:text-text-light text-xs">Patients</p>
                    </div>
                </div>
            </div>
        </div>
    );
};