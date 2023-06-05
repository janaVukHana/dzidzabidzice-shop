import './Proizvod.css'
import Divider from '@mui/material/Divider'

const proizvodi = [1,2,3,4,5,6,7,8]

export default function Proizvod() {
    return (
        <div className='Proizvod section'>
            <h1><Divider component="div" role="presentation">Naši proizvodi</Divider></h1>
            <h2>H2 heading with some longer text</h2>

            <div className="flex-container">
                {proizvodi.map(item => {
                    return (
                        <div className="card">
                            <img src="/hero.jpg" alt="Card Image" />
                            <h3>Title three words</h3>
                            <p className='description'>One two three four five six seven eight nine ten eleven twelve thirteen</p>
                            <div className="details">
                                <p className="price">$19.99</p>
                                <span className="category">Category</span>
                            </div>
                            <button className="btn btn-action add-to-cart">Add to Cart</button>
                        </div>   
                    )
                })}
            </div>


        </div>
    )
}