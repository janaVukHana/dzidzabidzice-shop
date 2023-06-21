import React, { useEffect } from 'react';
import './ThankYou.css';
import { useStateContext } from '../contexts/ContextProvider';

export default function ThankYou() {
    const { setCartItems } = useStateContext();

    useEffect(() => {
        setCartItems([]);
    }, []);

    return (
        <div className='ThankYou section'>
            <div>
                <h1>Uspešno prosleđen zahtev</h1>
                <p>Do kraja dana možete očekivati poziv našeg predstavnika.</p>
            </div>
        </div>
    );
}