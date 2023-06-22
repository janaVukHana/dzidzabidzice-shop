import './Gallery.css'
import * as React from 'react';
import { useState, useEffect} from 'react'
import axiosClient from '../axios-client';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Spinner from '../components/Spinner';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `http://api.mytesting.shop/images/gallery/${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  
  export default function Gallery() {

    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null); // Track the selected image
    const handleOpen = (image) => {
      setOpen(true);
      setSelectedImage(image); // Set the selected image when opening the modal
    };
    const handleClose = () => setOpen(false);

    const [imagesData, setImagesData] = useState()

    useEffect(() => {
      axiosClient.get('/images')
              .then(({data}) => {
                  setImagesData(data.data)
              })
              .catch((err) => {
                console.error('Error fetching images', error);
              })
    }, [])

    return (
        <div className='Gallery section'>
            <h1>Galerija Torti, Kolača, Mafina i Krofnica</h1>
            <div className='gallery-content'>
              {!imagesData && <Spinner />}
              {imagesData && 
              
                <ImageList
                    sx={{ width: '95%', maxWidth: 500 }}
                    variant="quilted"
                    cols={4}
                    rowHeight={121}
                >
                    {imagesData.map((item) => (
                    <ImageListItem onClick={() => handleOpen(item.image)} key={item.image} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                        {...srcset(item.image, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
              }
            </div>

            <Modal
              open={open}
              onClose={handleClose}
            >
              <Box className='modal'>
                {/* <img src={`http://localhost:8000/images/gallery/${selectedImage}`} alt="" /> Show the selected image */}
                <img src={`http://api.mytesting.shop/images/gallery/${selectedImage}`} alt="" /> {/* Show the selected image */}
              </Box>
            </Modal>

        </div>
    );
}