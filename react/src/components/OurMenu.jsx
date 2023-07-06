import './OurMenu.css'
import { NavLink } from 'react-router-dom'

export default function OurMenu() {
    return (
        <div className='OurMenu section'>
            <div>
                <h2>U Ponudi</h2>
                <h3>Torte</h3>
                <p>
                    Otkrijte raznovrsne i ukusne torte za svačiji neodoljiv ukus.
                </p>
                <h3>Mafini</h3>
                <p>
                    Isprobajte naše raznolike i ukusne mafine, savršene za svaku priliku.
                </p>
                <h3>Kolači</h3>
                <p>
                    Uživajte u bogatstvu ukusa sočnih i primamljivih kolača.
                </p>
                <h3>Krofnice</h3>
                <p>
                    Mekane krofnice sa šarenim prelivima će vas oduševiti svojom svežinom.
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