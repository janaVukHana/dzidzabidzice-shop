import AboutUs from '../components/AboutUs'
import Divider from '../components/Divider'
import Hero from '../components/Hero'
import OurMenu from '../components/OurMenu'
import './Home.css'

export default function Home() {
    return (
        <div className='Home'>
            <Hero />
            <AboutUs />
            <Divider />
            <OurMenu />
        </div>
    )
}