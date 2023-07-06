import './OurMenu.css'
import { NavLink } from 'react-router-dom'

export default function OurMenu() {
    return (
        <div className='OurMenu section'>
            <div>
                <h2>U Ponudi</h2>
                <h3>Torte</h3>
                <p>
                    Izrada tradicionalnih torti na moderan način. Spoj lepog izgleda i još lepšeg ukusa.
                </p>
                <h3>Mafini</h3>
                <p>
                    Otkrijte naše mafine i mini mafine idealne za svaku priliku.
                </p>
                <h3>Čokoladne torte iznenađenja</h3>
                <p>
                    Kreativan poklon kako za mališane, tako i za odrasle osobe.
                </p>
                <h3>Krofnice</h3>
                <p>
                    Uživajte u mekanim krofnicama, sa šarenom čokoladnom dekoracijom, koje će vas oduševiti
                </p>
                <div className='flex'>
                    <NavLink to="/proizvodi" className='btn btn-action'>Kompletna ponuda</NavLink>
                </div>
            </div>
            <div>
                <img src="/image4.webp" alt="" />
            </div>
        </div>
    )
}