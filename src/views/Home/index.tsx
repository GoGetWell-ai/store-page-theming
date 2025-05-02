import Hero from './components/Home'
import StartYourJourney from './components/StartYourJourney'
import Treatment from './components/Treatment'
import TopHospitals from './components/TopHospitals'
import TopDoctors from './components/TopDoctors'
import GetInTouch from './components/GetInTouch'
import Footer from '@/components/template/Footer'
import UserDropdown from '@/components/template/UserProfileDropdown'
import useResponsive from '@/utils/hooks/useResponsive'
import Notification from '@/components/template/Notification'
import HeaderLogo from '@/components/template/HeaderLogo'
import { useAuth } from '@/auth'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'

import '../../assets/styles/themes.css'


const Home = () => {
    const { hcfData } = useAuthStore((state) => state)
    const { smaller } = useResponsive()

    const { authenticated } = useAuth()

    return (
        <>

            <div className="patient w-full" >
                {smaller.lg && (
                    <div className="w-full py-[10px] bg-white px-[5%] flex items-center justify-between">
                        <div className="max-w-[150px]">
                            <HeaderLogo />
                        </div>

                        {
                            authenticated && (
                                <div className='flex items-center gap-x-[10px]'>
                                    <UserDropdown />
                                    <Notification />
                                </div>
                            )
                        }
                    </div>
                )}
                <Hero />
                <StartYourJourney />
                <Treatment />
                <TopHospitals hcfData={hcfData} />
                <TopDoctors hcfData={hcfData} />
                {/* <WhyMakeWell /> */}
                {/* <MbbsVisual /> */}
                {/* <Testimonials /> */}
                <GetInTouch hcfData={hcfData} />
                <Footer />
            </div>
        </>
    )
}

export default Home
