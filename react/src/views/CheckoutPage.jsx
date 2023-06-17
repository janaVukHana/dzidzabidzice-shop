import './CheckoutPage.css'
import { useStateContext } from '../contexts/ContextProvider';
import { useForm } from 'react-hook-form'
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


export default function CheckoutPage() {
    
    const {register, handleSubmit, reset, watch, control, formState: { errors }} = useForm({mode: 'onChange'})

    const [laravelErrors, setLaravelErrors] = useState(null)
    const [sending, setSending] = useState(false)
    const {cartItems, setNotification} = useStateContext()

    useEffect(() => {
        if(sending) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'visible'
        }
    }, [sending])

    const registerOptions = {
        fullName: {
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
        // date: {
        //     required: 'Obavezno polje.',
        //     validate: {
        //         shouldHaveValue: (value) => !!value || 'Obavezno polje.',
        //     }  
        //   },
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
    const handleOrder = (formData) => {
        formData.date === undefined && console.log('its undefined');
        return;

        // Prepare data to send to the backend
        const orderData = {
            fullName,
            address,
            email,
            phone,
            date,
            message,
            cartItems,
        };

        // Send orderData to the Laravel backend using an HTTP request (e.g., fetch, axios)
        // Example using fetch:
        fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle response from the backend
                console.log('Order sent successfully:', data);
                // Perform any additional actions as needed
            })
            .catch((error) => {
                console.error('Error sending order:', error);
                // Handle error condition
            });
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
                                error={!!errors?.fullName}
                                helperText={errors?.fullName && errors.fullName.message}
                                id="fullName"
                                name="fullName"
                                {...register('fullName', registerOptions.fullName)}
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

                        {/* Here goes date picker no.1: On error text is red, border is not */}
                        <div className='form-control'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Controller
                                    name="date"
                                    control={control}
                                    defaultValue={null}
                                    rules={{ required: 'Please pick a date' }}
                                    render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        label="Date"
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
                                <li key={index}>{item.title}</li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );
}



    

