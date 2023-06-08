import './Image.css'
import Divider from '@mui/material/Divider';
import AddNewImageForm from '../components/AddNewImageForm'
import { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Image() {

    const [images, setImages] = useState([])
    const {setNotification} = useStateContext()

    useEffect(() => {
        updateImages()
    }, [])

    const updateImages = () => {
        axiosClient.get('/images')
            .then(({data}) => {
                setImages(data.data)
            })
    }

    const handleDeleteImage = (id) => {
        if (!window.confirm('Are you sure you want to delete this image?')) {
            return;
        }
        
        axiosClient.delete('/images/' + id)
            .then(() => {
                setNotification('Image deleted');
                updateImages();
            });
    }

    return (
        <div className='Image section'>
            <h1>
                <Divider component="div" role="presentation">Sličice</Divider>
            </h1>
            <AddNewImageForm onUpdate={updateImages} />
            {/* tabela sa slicicama i delete i edit i cols i rows as optional */}
            <table>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    {/* // <!-- Empty cell for delete button --> */}
                    <th></th>  
                </tr>
                </thead>
                <tbody>
                {images.map((image, i) => {
                    return (
                    <tr key={i}>
                        <td><img src={`http://localhost:8000/images/gallery/${image.image}`} alt={image.title} /></td>
                        <td>{image.title}</td>
                        <td>
                        <button onClick={() => handleDeleteImage(image.id)} className='btn btn-delete'>Delete</button>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}