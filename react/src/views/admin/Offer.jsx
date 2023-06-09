import './Offer.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import axiosClient from '../../axios-client'

import Divider from '@mui/material/Divider'

export default function Offer() {

    const { products, setProducts, setNotification } = useStateContext()
    
    useEffect(() => {
        getProducts()
    }, [])
    
    const getProducts = () => {
        // Fetching all products
        axiosClient.get('/products')
        .then(({data}) => {
            setProducts(data.data)
        })
    }

    const handleDeleteImage = (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }
        
        axiosClient.delete('/products/' + id)
            .then(() => {
                getProducts()
                setNotification('Product deleted');
            });
    }

    return (
        <div className='Offer section'>
            <h1><Divider component="div" role="presentation">Ponuda by Baraba</Divider></h1>

            <Link to="/forma-ponuda" className='btn'>Dodaj proizvod</Link>

            {/* table with image i delete i edit i title i price*/}
            <table>
                <thead>
                <tr>
                    <th>Slika</th>
                    <th>Naslov</th>
                    <th>Cena</th>
                    <th>Kategorija</th>
                    {/* Empty cell for edit button */}
                    <th></th>  
                    {/* Empty cell for delete button */}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {products && products.map((product, i) => {
                    return (
                    <tr key={i}>
                        {/* <td><img src={'http://localhost:8000/images/products/'+product.image} alt={product.title} /></td> */}
                        <td><img src={'http://api.mytesting.shop/images/products/'+product.image} alt={product.title} /></td>
                        <td>{product.title}</td>
                        <td>{Number(product.price)} rsd.</td>
                        <td>{product.category}</td>
                        <td>
                        <Link to={'/ponuda/'+product.id} className='btn'>Promeni</Link>
                        </td>
                        <td>
                        <button onClick={() => handleDeleteImage(product.id)} className='btn btn-delete'>Izbriši</button>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}