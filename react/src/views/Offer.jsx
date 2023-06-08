import { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import './Offer.css'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'

export default function Offer() {

    const { products, setProducts } = useStateContext()
    
    useEffect(() => {
        if(!products) {
            // Fetching all products
            axiosClient.get('/products')
            .then(({data}) => {
                setProducts(data.data)
            })
            }
    }, [])

    return (
        <div className='Offer section'>
            <h1>Ponuda by Brbra</h1>
            <Link to="/forma-ponuda" className='btn'>Dodaj proizvod</Link>

            {/* table with image i delete i edit i title i price*/}
            <table>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    {/* Empty cell for delete button */}
                    <th></th>  
                    {/* Empty cell for delete button */}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {products && products.map((product, i) => {
                    return (
                    <tr key={i}>
                        <td><img src={product.image} alt={product.title} /></td>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td>
                        <button className='btn'>Edit</button>
                        </td>
                        <td>
                        <button onClick={() => handleDeleteImage(product.id)} className='btn btn-delete'>Delete</button>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}