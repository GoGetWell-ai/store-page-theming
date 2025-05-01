import React, { useEffect } from 'react'; // Import useEffect for potential debugging logs
import Hero from './components/hero';
import StartYourJourney from './components/StartYourJourney';
import Treatment from './components/Treatment';
import TopHospitals from './components/TopHospitals';
import TopDoctors from './components/TopDoctors';
import GetInTouch from './components/GetInTouch';
import Footer from '@/components/template/Footer';
import UserDropdown from '@/components/template/UserProfileDropdown';
import useResponsive from '@/utils/hooks/useResponsive';
import Notification from '@/components/template/Notification';
import HeaderLogo from '@/components/template/HeaderLogo';
import { useAuth } from '@/auth';
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore';

const Home = () => {
    const { hcfData } = useAuthStore((state) => state);
    const { smaller } = useResponsive();
    const { authenticated } = useAuth();

    useEffect(() => {
        console.log('Home component rendered. Current hcfData:', hcfData);
    }, [hcfData]); // Log hcfData whenever it changes

    return (
        <div className="patient w-full">
            {smaller.lg && (
                <div className="w-full py-[10px] bg-white px-[5%] flex items-center justify-between">
                    <div className="max-w-[150px]">
                        <HeaderLogo />
                    </div>
                    {authenticated && (
                        <div className="flex items-center gap-x-[10px]">
                            <UserDropdown />
                            <Notification />
                        </div>
                    )}
                </div>
            )}
            <Hero />
            <StartYourJourney />
            <Treatment />
            {hcfData ? (
                <>
                    <TopHospitals hcfData={hcfData} />
                    <TopDoctors hcfData={hcfData} />
                    <GetInTouch hcfData={hcfData} />
                </>
            ) : (
                <div className="py-10 text-center text-gray-500">
                    Loading hospital and doctor data... {/* Or a more appropriate loading state */}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Home;
