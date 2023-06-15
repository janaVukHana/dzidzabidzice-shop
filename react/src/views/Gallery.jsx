import './Gallery.css'
import * as React from 'react';
import { useState, useEffect} from 'react'
import axiosClient from '../axios-client';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Spinner from '../components/Spinner';

// Test Modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};
// Test Modal END

function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `http://localhost:8000/images/gallery/${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  
  export default function Gallery() {
    // Test Modal
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null); // Track the selected image
    const handleOpen = (image) => {
      setOpen(true);
      setSelectedImage(image); // Set the selected image when opening the modal
    };
  const handleClose = () => setOpen(false);
    // Test Modal END 

    const [imagesData, setImagesData] = useState()

    useEffect(() => {
      axiosClient.get('/images')
              .then(({data}) => {
                  setImagesData(data.data)
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
            {/* Test Modal */}
            <Modal
              open={open}
              onClose={handleClose}
              // aria-labelledby="modal-modal-title"
              // aria-describedby="modal-modal-description"
            >
              <Box className='modal'>
                {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography> */}
                <img src={`http://localhost:8000/images/gallery/${selectedImage}`} alt="" /> {/* Show the selected image */}
              </Box>
            </Modal>
            {/* Test Modal END */}
        </div>
    );
}