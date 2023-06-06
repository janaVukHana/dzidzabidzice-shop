import './Image.css'
import Divider from '@mui/material/Divider';
import AddNewImageForm from '../components/AddNewImageForm'
import { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

export default function Image() {

    const [images, setImages] = useState([])

    useEffect(() => {
        updateImages()
    }, [])

    const updateImages = () => {
        axiosClient.get('/images')
            .then(({data}) => {
                console.log(data);
                setImages(data.data)
            })
    }

    return (
        <div className='Image section'>
            <h1>
                <Divider component="div" role="presentation">Sličice</Divider>
            </h1>
            <AddNewImageForm onUpdate={updateImages} />
            {/* tabela sa slicicama i delete i edit i cols i rows as optional */}
            <ul>
                {images.map((image,i) => {
                    return (
                        <li key={i}>{image.image} {image.title} {image.rows} {image.cols}</li>
                    )
                })}
            </ul>
        </div>
    )
}