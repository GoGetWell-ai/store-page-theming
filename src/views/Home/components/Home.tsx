import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';
import HCFHeader from '@/components/shared/HCFHeader';
import { useThemeStore } from '@/store/themeStore';
import { useState, useEffect } from 'react';

// Define the structure of the expected props

const Hero: React.FC = () => {
    const { specialty } = useThemeStore();
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Helper function to get theme-specific gradient classes
    const getThemeGradientClasses = () => {
        switch (specialty) {
            case 'organTransplant':
                return 'from-teal-400 to-cyan-600';
            case 'cosmeticSurgery':
                return 'from-pink-400 to-purple-600';
            default:
                return 'from-blue-400 to-indigo-600';
        }
    };
    
    // Helper function to get theme-specific text highlight color
    const getTextHighlightClass = () => {
        switch (specialty) {
            case 'organTransplant':
                return 'text-teal-300';
            case 'cosmeticSurgery':
                return 'text-pink-300';
            default:
                return 'text-blue-300';
        }
    };

    return (
        <div className='relative'>
            <HCFHeader leftSide={
                <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight text-center">
                        We Handle Everything,{" "}
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getThemeGradientClasses()}`}>
                            You Focus on Healing
                        </span>
                    </h1>
                    <p className={`text-[15px] sm:text-[17px] ${getTextHighlightClass()} mx-auto mt-2 sm:mt-6 leading-shorter md:leading-normal text-center fade-in`}>
                        Upload Your Medical Reports to Explore the Best and Most Cost-Effective Treatments in Your Language
                    </p>
                    <div className="flex justify-center mt-8 gap-4 stagger-fade-in">
                        <button className={`px-6 py-3 rounded-lg bg-gradient-to-r ${getThemeGradientClasses()} text-white font-medium hover-lift btn-ripple shadow-lg`}>
                            Upload Now
                        </button>
                        <button className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white font-medium border border-white/20 hover-scale">
                            Get Started
                        </button>
                    </div>
                </div>
            } />

            <div className={`md:block hidden z-5 absolute bottom-[-25%] w-[70%] left-[15%] lg:w-[50%] lg:left-[25%] transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '300ms'}}>
                <ProfileCard />
            </div>
            <div className={`w-full md:hidden block transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '300ms'}}>
                <ProfileCard />
            </div>
        </div>
    );
};

export default Hero;



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
    const { specialty } = useThemeStore();
    const age = calculateAge(hcfData?.dob);

    // Helper function to get theme-specific classes
    const getThemeClasses = () => {
        switch (specialty) {
            case 'organTransplant':
                return {
                    primary: 'text-teal-600',
                    button: 'bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-500 hover:to-teal-300',
                    iconBg: 'bg-teal-50',
                    iconColor: 'text-teal-500',
                    cardBorder: 'border-teal-100',
                    highlight: 'text-teal-600'
                };
            case 'cosmeticSurgery':
                return {
                    primary: 'text-pink-600',
                    button: 'bg-gradient-to-r from-pink-600 to-pink-400 hover:from-pink-500 hover:to-pink-300',
                    iconBg: 'bg-pink-50',
                    iconColor: 'text-pink-500',
                    cardBorder: 'border-pink-100',
                    highlight: 'text-pink-600'
                };
            default:
                return {
                    primary: 'text-blue-600',
                    button: 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300',
                    iconBg: 'bg-blue-50',
                    iconColor: 'text-blue-500',
                    cardBorder: 'border-blue-100',
                    highlight: 'text-blue-600'
                };
        }
    };

    const themeClasses = getThemeClasses();

    return (
        <div className={`w-full mx-auto bg-white rounded-xl shadow-lg p-6 border ${themeClasses.cardBorder} hover-lift transition-all`}>
            <div className="flex flex-col gap-4">
                {/* Header with title and button */}
                <div className="flex justify-between items-center">
                    <h1 className={`text-2xl font-bold ${themeClasses.primary}`}>{hcfData.name}</h1>
                    <a 
                        href={`https://api.whatsapp.com/send?phone=${hcfData?.phone || hcfData?.auth?.phoneNumber}&text=Hi!%20Dear,%20I%20have%20a%20inquiry`} 
                        target='_blank' 
                        rel='noreferrer' 
                        className={`${themeClasses.button} text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg btn-ripple`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Contact me
                    </a>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`${themeClasses.iconBg} p-2 rounded-full`}>
                            <svg className={`w-5 h-5 ${themeClasses.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-gray-600 text-sm block">Location</span>
                            <span className={`${themeClasses.highlight} font-medium`}>
                                {`${hcfData?.address?.city ? `${hcfData?.address?.city}, ` : ''}${hcfData?.address?.country || 'N/A'}`}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className={`${themeClasses.iconBg} p-2 rounded-full`}>
                            <svg className={`w-5 h-5 ${themeClasses.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-gray-600 text-sm block">Age</span>
                            <span className="font-medium">{age || 'N/A'} years</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className={`${themeClasses.iconBg} p-2 rounded-full`}>
                            <svg className={`w-5 h-5 ${themeClasses.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-gray-600 text-sm block">Language</span>
                            <span className="font-medium">{hcfData?.languages?.length ? hcfData?.languages.join(', ') : 'N/A'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className={`${themeClasses.iconBg} p-2 rounded-full`}>
                            <svg className={`w-5 h-5 ${themeClasses.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-gray-600 text-sm block">Gender</span>
                            <span className={`${themeClasses.highlight} font-medium capitalize`}>{hcfData?.gender || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};