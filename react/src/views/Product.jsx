import { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import './Product.css'
import Divider from '@mui/material/Divider'
import axiosClient from '../axios-client'

const proizvodi = [1,2,3,4,5,6,7,8]

export default function Product() {

    const {products, setProducts} = useStateContext()
    useEffect(() => {
        // Fetching all products
        axiosClient.get('/products')
        .then(({data}) => {
            setProducts(data.data)
        })
    }, [])

    return (
        <div className='Product section'>
            <h1><Divider component="div" role="presentation">Naši proizvodi</Divider></h1>
            <h2>Heading with some longer text</h2>

            <div className="flex-container">
                {products && products.map((item, index) => {
                    {/* DODO: make component and add key uuid */}
                    return (
                        <div key={index} className="card">
                            <img src={'http://localhost:8000/images/products/'+item.image} alt="Card Image" />
                            <h3>{item.title}</h3>
                            <p className='description'>{item.description}</p>
                            <div className="details">
                                <p className="price">${item.price}</p>
                                <span className="category">{item.category}</span>
                            </div>
                            <button className="btn btn-action add-to-cart">Add to Cart</button>
                        </div>   
                    )
                })}
            </div>
        </div>
    )
}