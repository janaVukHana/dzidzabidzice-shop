import './Orders.css'
import { useEffect, useState } from 'react'
import axiosClient from '../../axios-client'
import {Link} from 'react-router-dom'

import Divider from '@mui/material/Divider'
import Spinner from '../../components/Spinner'
import { useStateContext } from '../../contexts/ContextProvider'

export default function Orders() {

    const [orders, setOrders] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const {setNotification} = useStateContext()

    useEffect(() => {
        getOrders()
    }, [])
    
    const getOrders = () => {
        axiosClient.get('/orders')
            .then(({ data }) => {
                setOrders(data.data);
                setIsLoading(false);
            });
    }

    const deleteOrder = id => {
        console.log(id);

        if (!window.confirm('Are you sure you want to delete this order?')) {
            return;
        }
        
        axiosClient.delete('/orders/' + id)
            .then(() => {
                setNotification('Order deleted');
                getOrders();
            });
    };

    return (
        <div className='Orders section'>
            <h1><Divider component="div" role="presentation">Porudžbine</Divider></h1>

            {!isLoading &&
                <table>
                    <thead>
                    <tr>
                        <th>Poručio</th>
                        <th>Datum</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => {
                        return (
                            <tr key={index}>
                                <td>{order.full_name}</td>
                                <td>{order.created_at}</td>
                                <td><Link to={`/porudzbine/${order.id}`} className="btn btn-show">Prikaži</Link></td>
                                <td><button onClick={() => deleteOrder(order.id)} className="btn btn-delete">Izbriši</button></td>
                            </tr> 
                        )
                    })}
                    </tbody>
                </table>
            }
            {isLoading && <Spinner />}
            
        </div>
    )
}