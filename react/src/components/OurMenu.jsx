import './OurMenu.css'
import { NavLink } from 'react-router-dom'

export default function OurMenu() {
    return (
        <div className='OurMenu section'>
            <div>
                <h2>Our Menu</h2>
                <h3>Torte</h3>
                <p>
                    Assortment of fresh baked fruit breads and muffins 5.50
                </p>
                <h3>Mafini</h3>
                <p>
                    Assortment of fresh baked fruit breads and muffins 5.50
                </p>
                <h3>Kolači</h3>
                <p>
                    Assortment of fresh baked fruit breads and muffins 5.50
                </p>
                <h3>Krofnice</h3>
                <p>
                    Assortment of fresh baked fruit breads and muffins 5.50
                </p>
                <NavLink to="/proizvodi" className='btn btn-action'>Pogledaj kompletnu ponudu</NavLink>
            </div>
            <div>
                <img src="/hero.jpg" alt="" />
            </div>
        </div>
    )
}