import './Footer.css'
import SocialIcon from './SocialIcon'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className='Footer'>
            <SocialIcon />
            <div>
                <p>&copy; <span className="copyright-year">{year}</span> Ilija Radovanović</p>
                <p>Made with &hearts; & &#9749; in Novi Sad, Budva and Belgrade.</p>
            </div>
        </footer>
    )
}