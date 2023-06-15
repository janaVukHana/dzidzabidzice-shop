import './Product.css'
import { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'
import Divider from '@mui/material/Divider'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Product() {

    const {products, setProducts} = useStateContext()

    const [category, setCategory] = useState(sessionStorage.getItem('category'))

    
    useEffect(() => {
        // Fetching all products
        axiosClient.get('/products')
        .then(({data}) => {
            if(category) {
                const filteredData = data.data.filter(product => product.category === category)
                setProducts(filteredData)
            } else {
                setProducts(data.data)
            }
        })
    }, [category])
    
    const handleCategoryFilter = (category) => {
        sessionStorage.setItem('category', category)
        setCategory(sessionStorage.getItem('category'))
    };

    const handleResetFilterCategory = () => {
        sessionStorage.removeItem('category')
        setCategory(null)
    }

    return (
        <div className='Product section'>
            <h1><Divider component="div" role="presentation">Naši proizvodi</Divider></h1>
            <h2>Heading with some longer text</h2>

            {/* Test filtering */}
            <Box sx={{ minWidth: 120, marginBottom: '20px' }}>
                <FormControl fullWidth>
                    <InputLabel id="categoryFilter">Filtriraj po kategoriji</InputLabel>
                    <Select
                    labelId="categoryFilter"
                    id="catFilter"
                    value={category || ''}
                    label="Filtriraj po kategoriji"
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                    >
                    <MenuItem value='torte'>Torte</MenuItem>
                    <MenuItem value='kolaci'>Kolaci</MenuItem>
                    <MenuItem value='mafini'>Mafini</MenuItem>
                    <MenuItem value='krofnice'>Krofnice</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {/* Test filtering END */}
            {category && (
                <div className='filter'>
                    <button className='btn' onClick={handleResetFilterCategory}>Resetuj filter</button>
                    <p>Filter kategorije je ukljucen!</p>
                </div>
            )}

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
                                <span onClick={() => handleCategoryFilter(item.category)} className="category">{item.category}</span>
                            </div>
                            <button className="btn btn-action add-to-cart">Add to Cart</button>
                        </div>   
                    )
                })}
            </div>
        </div>
    )
}