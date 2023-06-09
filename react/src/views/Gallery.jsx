import './Gallery.css'
import * as React from 'react';
import axiosClient from '../axios-client';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Divider from '@mui/material/Divider'
import { useState, useEffect} from 'react'
import Spinner from '../components/Spinner';

function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `http://localhost:8000/images/gallery/${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  
  export default function Gallery() {

    const [imagesData, setImagesData] = useState()

    useEffect(() => {
      axiosClient.get('/images')
              .then(({data}) => {
                  setImagesData(data.data)
              })
    }, [])

    return (
        <div className='Gallery section'>
            <h1><Divider component="div" role="presentation">Galerija Torti, Kolača, Mafina i Krofnica</Divider></h1>
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
                    <ImageListItem key={item.image} cols={item.cols || 1} rows={item.rows || 1}>
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
        </div>
    );
}