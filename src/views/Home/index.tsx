import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'
import MenuBar from '@/components/shared/MenuBar'
import Footer from '@/components/template/Footer'
import GetInTouch from './components/GetInTouch'
import Hero from './components/Home'
import StartYourJourney from './components/StartYourJourney'
import TopDoctors from './components/TopDoctors'
import TopHospitals from './components/TopHospitals'
import Treatment from './components/Treatment'

const Home = () => {
    const { hcfData } = useAuthStore((state) => state)

    return (
        <>
            <div className="patient w-full">
                <MenuBar />
                <Hero />
                <StartYourJourney />
                <Treatment />
                <TopHospitals
                    hcfData={{ hospitals: hcfData?.hospitals || [] }}
                />
                <TopDoctors hcfData={{ doctors: hcfData?.doctors || [] }} />
                {/* <WhyMakeWell /> */}
                {/* <MbbsVisual /> */}
                {/* <Testimonials /> */}
                <GetInTouch hcfData={hcfData} />
                <Footer pageContainerType="contained" />
            </div>
        </>
    )
}

export default Home
