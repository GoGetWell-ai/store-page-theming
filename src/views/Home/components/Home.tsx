import React from 'react';
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';
import HCFHeader from '@/components/shared/HCFHeader';
import { useThemeStore } from '@/store/themeStore';
import { themes } from '@/configs/theme.config';

const Hero: React.FC = () => {
  const { specialty } = useThemeStore();
  const selectedTheme = themes[specialty];

  const layouts = {
    default: 'text-center py-16 px-4 sm:px-6 lg:px-8 bg-primary',
    theme1: 'flex flex-col md:flex-row items-center py-12 px-4 sm:px-6 lg:px-8 bg-primary-mild',
    theme2: 'text-center py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-primary bg-opacity-80',
  };

  const bgImages = {
    default: '',
    theme1: '',
    theme2: 'url(/images/cosmetic-bg.jpg)',
  };

  const ctaStyles = {
    default: 'px-6 py-3 rounded-md bg-accent text-white hover:bg-primary-deep',
    theme1: 'px-8 py-4 rounded-lg border-2 border-primary bg-primary text-white hover:bg-primary-deep',
    theme2: 'px-6 py-3 rounded-full bg-accent text-white hover:bg-primary-deep',
  };

  const ctaText = {
    default: 'Explore Services',
    theme1: 'Schedule Transplant Consultation',
    theme2: 'Book Cosmetic Procedure',
  };

  const headingStyles = {
    default: 'text-white text-shadow-md',
    theme1: 'text-white text-shadow-lg',
    theme2: 'text-white text-shadow-xl',
  };

  const gradientStyles = {
    default: 'from-primary to-accent',
    theme1: 'from-primary to-accent', // Green gradient for Organ Transplant
    theme2: 'from-primary to-accent',
  };

  return (
    <div className="relative">
      <section
        className={layouts[specialty]}
        style={{ backgroundImage: bgImages[specialty] }}
      >
        <div className="max-w-7xl mx-auto">
          <HCFHeader
            leftSide={
              <>
                <h1 className={`text-h1 font-bold ${headingStyles[specialty]} mb-6 leading-tight text-center md:text-left`}>
                  {selectedTheme.marketingCopy.heroTitle.split(' ').map((word, index, arr) => (
                    word === arr[arr.length - 1] ? (
                      <span
                        key={index}
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientStyles[specialty]} text-shadow-sm`}
                        aria-hidden="true"
                      >
                        {word}
                      </span>
                    ) : (
                      <span key={index}>{word} </span>
                    )
                  ))}
                </h1>
                <p className="text-body text-white mx-auto mt-2 sm:mt-6 leading-normal text-center md:text-left max-w-2xl">
                  {selectedTheme.marketingCopy.heroSubtitle}
                </p>
                <div className="mt-6 flex justify-center md:justify-start gap-4">
                  <button
                    className={ctaStyles[specialty]}
                    aria-label={`Call to action: ${ctaText[specialty]}`}
                  >
                    {ctaText[specialty]}
                  </button>
                </div>
              </>
            }
          />
          {specialty === 'theme1' && (
            <div className="md:w-1/2 mt-6 md:mt-0">
              <img
                src="/images/transplant-hero.jpg"
                alt="Organ Transplant Care"
                className="w-full h-64 object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Organ+Transplant+Image';
                }}
              />
            </div>
          )}
        </div>
      </section>

      <div className="md:block hidden z-5 absolute bottom-[-10%] w-[70%] left-[15%] lg:w-[50%] lg:left-[25%]">
        <ProfileCard />
      </div>
      <div className="w-full md:hidden block">
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

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

const ProfileCard = () => {
    const { hcfData } = useAuthStore();
    const age = hcfData?.dob ? calculateAge(hcfData.dob) : 'N/A';
    const { specialty } = useThemeStore();

    const buttonStyles = {
        default: 'px-button py-button rounded-button',
        theme1: 'px-6 py-3 rounded-lg border-2 border-primary',
        theme2: 'px-5 py-2 rounded-full',
    };

    // Fallback if hcfData is undefined
    if (!hcfData) {
        return (
            <div className="w-full mx-auto bg-background rounded-xl md:shadow-lg p-4 md:p-6">
                <p className="text-text text-center">Profile data is currently unavailable.</p>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto bg-background rounded-xl md:shadow-lg p-4 md:p-6">
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-text">{hcfData.name || 'N/A'}</h1>
                    <a
                        href={`https://api.whatsapp.com/send?phone=${hcfData?.phone || hcfData?.auth?.phoneNumber || ''}&text=Hi!%20Dear,%20I%20have%20an%20inquiry`}
                        target="_blank"
                        rel="noreferrer"
                        className={`bg-primary text-white ${buttonStyles[specialty]} flex items-center gap-2 hover:bg-primary-deep transition-colors text-sm md:text-base`}
                        aria-label="Contact via WhatsApp"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Contact me
                    </a>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-1">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-600 text-sm">Location: </span>
                        <span className="text-primary text-sm">{`${hcfData?.address?.city ? `${hcfData?.address?.city}, ` : ''}${hcfData?.address?.country ? hcfData?.address?.country : 'N/A'}`}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-gray-600 text-sm">Age: </span>
                        <span className="text-text text-sm">{age} years</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <span className="text-gray-600 text-sm">Language: </span>
                        <span className="text-text text-sm">{hcfData?.languages?.length ? hcfData?.languages.join(', ') : 'N/A'}</span>
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