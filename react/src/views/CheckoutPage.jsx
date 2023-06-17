import './CheckoutPage.css'
import { useStateContext } from '../contexts/ContextProvider';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from "../axios-client";
import Spinner from '../components/Spinner'
import TextField from '@mui/material/TextField';
// Pick date
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


// TODO: when user place order, navigate to thank you page. On thank you page display message and clean cart.
//       then after 5sec send user to home page maybe.
// TODO: test date input. Enter just days, or/and months...
// TODO: show spinner when sending data
export default function CheckoutPage() {
    
    const {cartItems, setCartItems, setNotification} = useStateContext()
    const navigate = useNavigate();

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
          totalPrice += Number(item.subtotal);
        });
        return totalPrice;
      };

    const {register, handleSubmit, reset, watch, control, formState: { errors }} = useForm({mode: 'onChange'})
    
    const [laravelErrors, setLaravelErrors] = useState(null)
    const [sending, setSending] = useState(false)
    
    useEffect(() => {
        // Redirect to another route if cartItems === 0
        if(cartItems.length === 0) {
            navigate('/proizvodi')
        }
        // Prevent scroll while sending data to api
        if(sending) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'visible'
        }
    }, [sending])

    const registerOptions = {
        full_name: {
            required: 'Obavezno polje.',
            minLength: {
                value: 3,
                message: 'Ime mora biti minimum 3 karaktera.'
            },
            maxLength: {
                value: 30,
                message: 'Ime ne može biti duže od 30 karaktera'
            }
        },
        phone: {required: 'Obavezno polje.'},
        email: {required: 'Obavezno polje.'},
        address: {required: 'Obavezno polje.'},
        // date: {required: 'Obavezno polje.'},     NOT WORKING
        message: {
            required: 'Obavezno polje.',
            minLength: {
                value: 20,
                message: 'Poruka mora biti minumum 20 karaktera'
            },
            maxLength: {
                value: 1000,
                message: 'Maksimalno 1000 karaktera.'
            }
        }
    }

    const alert = {color: 'var(--danger)', borderBottomColor: 'var(--danger)'}

    const handleError = (errors) => {}

    // On Submit
    const handleOrder = async (formData) => {
        formData.order = JSON.stringify(cartItems);
        try {
            setSending(true); // Set the sending state to true to show the spinner
            const response = await axiosClient.post('/orders', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Make sure to set the content type as multipart/form-data
                },
              });
              // Handle the response from the API, e.g., show a success notification
              setNotification('Uspešno prosleđen zahtev.');

              navigate('/')
        } catch (error) {
            // Handle any errors that occur during the API request, e.g., show error messages
            setLaravelErrors(error.response?.data?.errors);
        } finally {
            setSending(false); // Set the sending state back to false to hide the spinner
        }
    };

    return (
        <div className='CheckoutPage section'>
            <div className="container">
                <form onSubmit={handleSubmit(handleOrder, handleError)} className="checkout-form">
                    <div className="form-section">
                        <h2>Contact Information</h2>

                        <div className="form-control">
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Ime i prezime"
                                error={!!errors?.full_name}
                                helperText={errors?.full_name && errors.full_name.message}
                                id="full_name"
                                name="full_name"
                                {...register('full_name', registerOptions.full_name)}
                            />
                        </div>

                        <div className="form-control">
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                error={!!errors?.email}
                                helperText={errors?.email && errors.email.message}
                                id="email"
                                name="email"
                                type="email"
                                {...register('email', registerOptions.email)}
                            />
                        </div>

                        <div className="form-control">
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Telefon"
                                error={!!errors?.phone}
                                helperText={errors?.phone && errors.phone.message}
                                id="phone"
                                name="phone"
                                type="tel"
                                {...register('phone', registerOptions.phone)}
                            />
                        </div>

                        <div className="form-control">
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Adresa"
                                error={!!errors?.address}
                                helperText={errors?.address && errors.address.message}
                                id="address"
                                name="address"
                                type="text"
                                {...register('address', registerOptions.address)}
                            />
                        </div>

                        <div className='form-control'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Controller
                                    name="date"
                                    control={control}
                                    defaultValue={null}
                                    rules={{ required: 'Izaberi datum dostave.' }}
                                    render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        disablePast
                                        label="Datum dostave"
                                        textFields={(params) => (
                                            <TextField
                                                {...params} 
                                             />
                                        )}
                                    />
                                    )}
                                />
                                {errors.date && <span>{errors.date.message}</span>} 
                            </LocalizationProvider>
                        </div>

                        <div className="form-control">
                            <TextField
                                fullWidth
                                error={!!errors?.message}
                                helperText={errors?.message && errors.message.message}
                                id="message"
                                name="message"
                                multiline
                                rows={4}
                                variant='outlined'
                                label="Poruka"
                                placeholder="Pošalji upit, Specijalni zahtev/porudžbinu, Slatku poruku..."
                                inputProps={{
                                    style: {
                                        whiteSpace: 'pre-wrap'
                                    }
                                }}
                                {...register('message', registerOptions.message)}
                            />
                        </div>
                        <button className='btn'>
                            Send Order
                        </button>
                    </div>
                    <div className="form-section">
                        <h2>Cart Items</h2>
                        <ul className="cart-items">
                            {cartItems.map((item, index) => (
                                <li key={index}>
                                    <h3>{item.title}</h3>
                                    <p>{Number(item.price)} * {item.quantity} = {item.price * item.quantity}</p>
                                </li>
                            ))}
                        </ul>
                        <p>Ukupno: {calculateTotalPrice()} rsd</p>
                    </div>
                </form>
            </div>
        </div>
    );
}



    

