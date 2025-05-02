import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';
import HCFHeader from '@/components/shared/HCFHeader';

// Define the structure of the expected props

const Hero: React.FC = () => {

    return (
        <div className='relative'>
            <HCFHeader leftSide={
                <>
                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight text-center">
                        We Handle Everything,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            You Focus on Healing
                        </span>
                    </h1>
                    <p className="text-[15px] sm:text-[17px] text-gray-300 mx-auto mt-2 sm:mt-6 leading-shorter md:leading-normal text-center">
                        Upload Your Medical Reports to Explore the Best and Most Cost-Effective Treatments in Your Language
                    </p>
                </>
            } />

            <div className='md:block hidden z-5 absolute bottom-[-25%] w-[70%] left-[15%] lg:w-[50%] lg:left-[25%]'>
                <ProfileCard />
            </div>
            <div className='w-full md:hidden block'>
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

    const age = calculateAge(hcfData?.dob)

    return (
        <div className="w-full mx-auto bg-white rounded-xl md:shadow-lg p-4 md:p-6">
            <div className="flex flex-col gap-1">
                {/* Header with title and button */}
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">{hcfData.name}</h1>
                    <a href={`https://api.whatsapp.com/send?phone=${hcfData?.phone || hcfData?.auth?.phoneNumber}&text=Hi!%20Dear,%20I%20have%20a%20inquiry`} target='_blank' rel='noreferrer' className="bg-primary text-white px-4 md:px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-deep transition-colors text-sm md:text-base">
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Contact me
                    </a>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-1">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-600 text-sm">Location: </span>
                        <span className="text-primary text-sm">{`${hcfData?.address?.city ? `${hcfData?.address?.city}, ` : ''}${hcfData?.address?.country ? `${hcfData?.address?.country}, ` : ''}`}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-gray-600 text-sm">Age: </span>
                        <span className="text-sm">{age} years</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <span className="text-gray-600 text-sm">Language: </span>
                        <span className="text-sm">{hcfData?.languages?.length ? hcfData?.languages.map((data) => ` ${data},`) : ''}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-gray-600 text-sm">Gender: </span>
                        <span className="text-primary text-sm capitalize">{hcfData?.gender || 'N/A'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
