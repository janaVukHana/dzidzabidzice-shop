import './Hero.css'

export default function Hero() {
    return (
        <>
            <div className="Hero">
                <div>
                    <h1>Torte<br />Mafini<br />Krofnice</h1>
                    <a href="tel:+38162421903" className='btn btn-action'>POZOVI</a>
                </div>
            </div>
            <div className='overlay'></div>
        </>
    )
}