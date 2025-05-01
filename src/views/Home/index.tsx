import Hero from './components/Home'
import StartYourJourney from './components/StartYourJourney'
import Treatment from './components/Treatment'
import TopHospitals from './components/TopHospitals'
import TopDoctors from './components/TopDoctors'
import GetInTouch from './components/GetInTouch'
import Footer from '@/components/template/Footer'
import { useAuthStore } from '@/components/layouts/AuthLayout/store/useAuthStore'

const Home = () => {
    const { hcfData } = useAuthStore((state) => state)

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Hero />
                <StartYourJourney />
                <Treatment />
                <TopHospitals hcfData={hcfData} />
                <TopDoctors hcfData={hcfData} />
                <GetInTouch hcfData={hcfData} />
            </main>
            <Footer />
        </div>
    )
}

export default Home
