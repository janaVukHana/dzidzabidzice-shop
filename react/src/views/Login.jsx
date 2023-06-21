import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import './Login.css'
import Spinner from '../components/Spinner'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { autocompleteClasses } from '@mui/material';

export default function Login() {

    const { token, setUser, setToken, setNotification } = useStateContext()

    if (token) {
        return <Navigate to="/poruke" />
    }

    const {register, handleSubmit, reset, watch, formState: { errors }} = useForm({mode: 'onChange'})

    const [laravelErrors, setLaravelErrors] = useState(null)
    const [sending, setSending] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        if(sending) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'visible'
        }

        return () => setSending(false)
    }, [sending])

    const registerOptions = {
        
        email: {required: 'Obavezno polje.'},
        password: {required: 'Obavezno polje.'},
    }

    const alert = {color: 'var(--danger)', borderBottomColor: 'var(--danger)'}

    const handleError = (errors) => {}

    // onSubmit
    const handleLogin = (formData) => {
        setSending(true);

        axiosClient.post('/login', formData)
            .then(data => {
                setUser(data.data.user);
                setToken(data.data.token);
                setNotification('Ulogovan si.');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setLaravelErrors(response.data.errors);
                    } else {
                        setLaravelErrors({
                            email: [response.data.message]
                        });
                    }
                }
            })
            .finally(() => {
                setSending(false);
            });
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <div className='Login section'>
            <h1>
                <Divider component="div" role="presentation">Log In</Divider>
            </h1>

            <form className="form" onSubmit={handleSubmit(handleLogin, handleError)}>

                <div className='form-control'>
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
                <div className='form-control'>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Password"
                        error={!!errors?.password}
                        helperText={errors?.password && errors.password.message}
                        id="password"
                        name="password"
                        type={passwordVisible ? 'text' : 'password'}
                        {...register('password', registerOptions.password)}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                    aria-label="toggle password visibility"
                                >
                                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )
                        }}
                    />
                </div>
                
                <Button type="submit" fullWidth variant="contained">Log In</Button>
                {sending && <Spinner />}

                
                {/* Laravel api errors object */}
                {laravelErrors && Object.values(laravelErrors).map((err, index) => {
                        return <div style={{color: 'red'}} key={index} className='error'>{err[0]}</div>
                    })}
            </form>
        </div>
    )
}