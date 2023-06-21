import './OfferForm.css'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

import Spinner from '../../components/Spinner'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'

// TODO: better validation. 
// empty string is valid. Validate that.

export default function OfferForm() {

    const [laravelErrors, setLaravelErrors] = useState(null)
    const [sending, setSending] = useState(false)
    const {setNotification, setProducts} = useStateContext()

    const navigate = useNavigate()
    const { id } = useParams()

    const [product, setProduct] = useState(null)

    const {register, handleSubmit, reset, watch, formState: { errors }, setValue} = useForm({
      mode: 'onChange',
      defaultValues: {
        title: '',
        description: '',
        price: '',
        category: 'kolaci',

      }
    })

    useEffect(() => {
      // Hide scrollbar while sending 
      if(sending) {
          document.body.style.overflow = 'hidden'
      }
      else {
          document.body.style.overflow = 'visible'
      }
      setValue('category', watch('category'))
      // This will run on Edit
      if(id) {
        axiosClient.get('/products/'+id)
          .then(({data}) => {
            setProduct(data.data)

            const { title, description, price, category } = data.data;

            // Convert price to integer if it is a decimal number
            const integerPrice = Number.isInteger(price) ? price : Math.floor(price);

            setValue('title', title);
            setValue('description', description);
            setValue('price', integerPrice);
            setValue('category', category);
          })
      }

      return () => setSending(false)
    }, [sending, watch, setValue])

    const [imagePreview, setImagePreview] = useState(null);
    const handleImageChange = (e) => {
      const file = e.target.files[0];
    
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
      } else {
        setImagePreview(null);
      }
    };    

    // FronEnd Validation
    const registerOptions = {
        // Image is not required
        image: {
            // required: 'Obavezno polje.',
            validate: {
              requiredFileType: (value) => {
                if (!value[0]) return true; // Skip validation if no file is selected
                const fileType = value[0].type;
                const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                return allowedFormats.includes(fileType) || 'Dozvoljeni formati slika su JPEG, JPG, PNG i WEBP.';;
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
            required: 'Obavezno polje.',
            minLength: {
              value: 6,
              message: 'Naslov mora imati najmanje 6 karaktera.',
            },
            maxLength: {
              value: 20,
              message: 'Naslov mora imati najvise 20 karaktera'
            },
          },
          description: {
            required: 'Obavezno polje.',
            minLength: {
              value: 20,
              message: 'Opis mora imati najmanje 20 karaktera.',
            },
            maxLength: {
              value: 100,
              message: 'Opis mora imate najvise 100 karaktera'
            },
          }, 
          price: {
            required: 'Obavezno polje.',
            // Must be number and be positive,
            pattern: {
              value: /^[0-9]+$/,
              message: 'Cena mora biti broj.',
            },
            min: {
              value: 0,
              message: 'Cena mora biti pozitivan broj.',
            },
          },
          category: {
            required: 'Izaberi jedno od ponudjenog'
          }
    }

    const alert = {color: 'var(--danger)', borderBottomColor: 'var(--danger)'}

    const handleError = (errors) => {}

    // onSubmit
    // TODO: find better name maybe
    const handleAddEditProduct = async (formData) => {
      try {
        setSending(true); // Set the sending state to true to show the spinner

        const data = new FormData(); // Create a new FormData instance

        // Append the form data to the FormData instance
        formData.image[0] !== undefined && data.append('image', formData.image[0]);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);

        // Edit product
        if(id) {
          const response = await axiosClient.post(`/products/${id}?_method=PUT`, data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          setNotification('Product updated');
        } 
        // Add product
        else {
          const response = await axiosClient.post('/products', data, {
            headers: {
              'Content-Type': 'multipart/form-data', // Make sure to set the content type as multipart/form-data
            },
          });
  
          // Handle the response from the API, e.g., show a success notification
          setNotification('Product added successfully');
        }

        // Redirect to another route
        navigate('/ponuda')
      } catch (error) {
        // Handle any errors that occur during the API request, e.g., show error messages
        setLaravelErrors(error.response?.data?.errors);
      } finally {
        setSending(false); // Set the sending state back to false to hide the spinner
      }
    };
    return (
        <div className='OfferForm section'>
        {/* TODO: don't show title while loading */}
            <h1>{product ? `Edit: ${product.title}` : 'Dodaj proizvod'}</h1>

            <form className="form" onSubmit={handleSubmit(handleAddEditProduct, handleError)}>
            {/* input za dodavanje slike */}
                <div className="form-control">
                    <input
                        type="file"
                        id="image"
                        name="image"
                        {...register('image', registerOptions.image)}
                        onChange={handleImageChange}
                    />

                    {imagePreview && <img src={imagePreview} alt="Preview" />}
                    {/* if Edit page show image if user did not choose image */}
                    {!imagePreview && product && <img src={'http://localhost:8000/images/products/'+product.image} alt={product.title} />}

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
                        value={watch('title')}
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
                        value={watch('description')}
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
                        value={watch('price')}
                        {...register('price', registerOptions.price)}
                    />
                </div>

                <div className='form-control'>
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
                      value={watch('category')} // Set the value based on the watched value
                      onChange={(e) => setValue('category', e.target.value)} // Update the value when it changes
                      >
                      {/* <MenuItem disabled value="">Odaberite kategoriju</MenuItem> */}
                      <MenuItem value="torte">Torte</MenuItem>
                      <MenuItem value="kolaci">Kolaci</MenuItem>
                      <MenuItem value="mafini">Mafini</MenuItem>
                      <MenuItem value="krofnice">Krofnice</MenuItem>
                  </TextField>
                </div>
                
                {/* TODO: don't show button while loading */}
                <Button type="submit" fullWidth variant="contained">{product ? 'Edit' : 'Dodaj'} proizvod</Button>
                {sending && <Spinner />}

                
                {/* Laravel api errors object if somehow frontend validation is passed */}
                {laravelErrors && Object.values(laravelErrors).map((err, index) => {
                        return <div key={index} className='error'>{err[0]}</div>
                    })}
            </form>
        </div>
    )
}