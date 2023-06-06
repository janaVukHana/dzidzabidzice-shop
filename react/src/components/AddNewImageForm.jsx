import './AddNewImageForm.css'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Spinner from '../components/Spinner'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { autocompleteClasses } from '@mui/material';

export default function AddNewImageForm({onUpdate}) {
    const {register, handleSubmit, reset, watch, formState: { errors }} = useForm({mode: 'onChange'})

    const [laravelErrors, setLaravelErrors] = useState(null)
    const [sending, setSending] = useState(false)
    const {setNotification} = useStateContext()

    useEffect(() => {
        if(sending) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'visible'
        }
    }, [sending])

    const registerOptions = {
        // slika je obavezna, title je obaveza min 3, cols 1 or 2, rows 1 or 2
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
            required: 'Obavezno polje.',
            minLength: {
              value: 3,
              message: 'Naslov mora imati najmanje 3 karaktera.',
            },
          },
          cols: {
            required: 'Obavezno polje.',
            validate: {
              validCols: (value) => [1, 2].includes(parseInt(value, 10)) || 'Dozvoljene vrednosti za Cols su 1 i 2.',
            },
          },
          rows: {
            required: 'Obavezno polje.',
            validate: {
              validRows: (value) => [1, 2].includes(parseInt(value, 10)) || 'Dozvoljene vrednosti za Rows su 1 i 2.',
            },
          },
    }

    const alert = {color: 'var(--danger)', borderBottomColor: 'var(--danger)'}

    const handleError = (errors) => {}

    // onSubmit
    const handleAddImage = async (formData) => {
        try {
          setSending(true); // Set the sending state to true to show the spinner

          const data = new FormData(); // Create a new FormData instance

          // Append the form data to the FormData instance
          data.append('image', formData.image[0]);
          data.append('title', formData.title);
          data.append('cols', formData.cols);
          data.append('rows', formData.rows);

          const response = await axiosClient.post('/images', data, {
            headers: {
              'Content-Type': 'multipart/form-data', // Make sure to set the content type as multipart/form-data
            },
          });

          onUpdate()
          // Handle the response from the API, e.g., show a success notification
          setNotification('Image added successfully');
          // Reset the form
          reset();
        } catch (error) {
          // Handle any errors that occur during the API request, e.g., show error messages
          setLaravelErrors(error.response?.data?.errors);
        } finally {
          setSending(false); // Set the sending state back to false to hide the spinner
        }
      };
      

    return (
        <div className='AddNewImageForm'>
            <form className="form" onSubmit={handleSubmit(handleAddImage, handleError)}>
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
                        label="Cols"
                        error={!!errors?.cols}
                        helperText={errors?.cols && errors.cols.message}
                        id="cols"
                        name="cols"
                        type="number"
                        {...register('cols', registerOptions.cols)}
                    />
                </div>

                <div className="form-control">
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Rows"
                        error={!!errors?.rows}
                        helperText={errors?.rows && errors.rows.message}
                        id="rows"
                        name="rows"
                        type="number"
                        {...register('rows', registerOptions.rows)}
                    />
                </div>

                <Button type="submit" fullWidth variant="contained">Dodaj sliku</Button>
                {sending && <Spinner />}

                
                {/* Laravel api errors object */}
                {laravelErrors && Object.values(laravelErrors).map((err, index) => {
                        return <div style={{color: 'red'}} key={index} className='error'>{err[0]}</div>
                    })}
            </form>
        </div>
    )
}