import './OfferForm.css'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Spinner from '../components/Spinner'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem'

// TODO: better validation. 
// Category have some issues. It show error on Change(until submit).
// empty string is valid. Validate that.

export default function OfferForm() {

    const {register, handleSubmit, reset, watch, formState: { errors }} = useForm({mode: 'onChange'})

    const [laravelErrors, setLaravelErrors] = useState(null)
    const [sending, setSending] = useState(false)
    const {setNotification} = useStateContext()

    // Hide scrollbar while communicatin with api
    useEffect(() => {
        if(sending) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'visible'
        }
    }, [sending])

    const registerOptions = {
        // FronEnd Validation
        image: {
            required: 'Obavezno polje.',
            validate: {
              requiredFileType: (value) => {
                if (!value[0]) return true; // Skip validation if no file is selected
                const fileType = value[0].type;
                const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
                return allowedFormats.includes(fileType) || 'Dozvoljeni formati slika su JPEG, JPG i PNG.';;
              },
              requiredFileSize: (value) => {
                if (!value[0]) return true; // Skip validation if no file is selected
                const fileSize = value[0].size / 1024; // Convert to KB
                const maxFileSize = 10240; // Maximum file size in KB (10MB)
                return fileSize <= maxFileSize || 'Maksimalna veličina slike je 10MB.';
              },
            },
          },
          title: {
            // required: 'Obavezno polje.',
            minLength: {
              value: 3,
              message: 'Naslov mora imati najmanje 3 karaktera.',
            },
          },
          description: {
            required: 'Obavezno polje.',
            minLength: {
              value: 3,
              message: 'Naslov mora imati najmanje 3 karaktera.',
            },
          }, 
          price: {
            required: 'Obavezno polje.',
            // TODO: must be number, positive,
          },
          category: {
            required: 'Izaberi jedno od ponudjenog'
          }
    }

    const alert = {color: 'var(--danger)', borderBottomColor: 'var(--danger)'}

    const handleError = (errors) => {}

    // onSubmit
    const handleAddProduct = (formData) => {
        // e.preventDefault()

        console.log('I will add product!');
        console.log(formData);
    }

    return (
        <div className='OfferForm section'>
            <h1>Dodaj proizvod</h1>

            <form className="form" onSubmit={handleSubmit(handleAddProduct, handleError)}>
            {/* input za dodavanje slike */}
                <div className="form-control">
                    <input
                        type="file"
                        id="image"
                        name="image"
                        {...register('image', registerOptions.image)}
                    />
                    {errors?.image && <div style={{ color: 'red' }}>{errors.image.message}</div>}
                </div>
                <div className="form-control">
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Title"
                        error={!!errors?.title}
                        helperText={errors?.title && errors.title.message}
                        id="title"
                        name="title"
                        {...register('title', registerOptions.title)}
                    />
                </div>

                <div className="form-control">
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Description"
                        error={!!errors?.description}
                        helperText={errors?.description && errors.description.message}
                        id="description"
                        name="description"
                        {...register('description', registerOptions.description)}
                    />
                </div>

                <div className="form-control">
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Price"
                        error={!!errors?.price}
                        helperText={errors?.price && errors.price.message}
                        id="price"
                        name="price"
                        type="number"
                        {...register('price', registerOptions.price)}
                    />
                </div>

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Category"
                    error={!!errors?.category}
                    helperText={errors?.category && errors.category.message}
                    id="category"
                    name="category"
                    {...register('category', registerOptions.category)}
                    >
                    <MenuItem disabled value="">Odaberite kategoriju</MenuItem>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                </TextField>
                
                
                <Button type="submit" fullWidth variant="contained">Dodaj proizvod</Button>
                {sending && <Spinner />}

                
                {/* Laravel api errors object */}
                {laravelErrors && Object.values(laravelErrors).map((err, index) => {
                        return <div style={{color: 'red'}} key={index} className='error'>{err[0]}</div>
                    })}
            </form>
        </div>
    )
}