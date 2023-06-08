import './Galerija.css'
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

  
  export default function Galerija() {

    const [imagesData, setImagesData] = useState()

    useEffect(() => {
      axiosClient.get('/images')
              .then(({data}) => {
                  setImagesData(data.data)
              })
    }, [])

    return (
        <div className='Galerija section'>
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

const itemData = [
    {
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      rows: 2,
      cols: 2,
    },
    {
      image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      image: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      image: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      cols: 2,
    },
    {
      image: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      cols: 2,
    },
    {
      image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
    },
    {
      image: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      image: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      image: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      rows: 2,
      cols: 2,
    },
    {
      image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      image: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      cols: 2,
    },
  ];