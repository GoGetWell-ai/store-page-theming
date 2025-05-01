import Hero from './components/Home'
import StartYourJourney from './components/StartYourJourney'
import Treatment from './components/Treatment'
import TopHospitals from './components/TopHospitals'
import TopDoctors from './components/TopDoctors'
import GetInTouch from './components/GetInTouch'
import Footer from '@/components/template/Footer'
import useResponsive from '@/utils/hooks/useResponsive'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'
import { dummyHcfData } from '@/mock/data/dummyHcfData'
import MenuBar from '@/components/shared/MenuBar'

const Home = () => {
    const { hcfData } = useAuthStore((state) => state)
    const { smaller } = useResponsive()

    return (
        <>
            <div className="patient w-full">
           

                <Hero />
                <StartYourJourney />
                <Treatment />
                <TopHospitals hcfData={dummyHcfData} />
                <TopDoctors hcfData={hcfData} />
                <GetInTouch hcfData={hcfData} />
                <Footer />
            </div>
        </>
    )
}

export default Home
