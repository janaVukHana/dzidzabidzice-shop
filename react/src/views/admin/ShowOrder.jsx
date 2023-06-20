import './ShowOrder.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axiosClient from "../../axios-client";
import Spinner from '../../components/Spinner';

export default function ShowOrder() {

    const [order, setOrder] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        axiosClient.get('/orders/'+id)
          .then(({data}) => {
            setOrder(data.data)
            console.log(data.data);
    })
    }, [])

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        order.order.forEach((item) => {
          totalPrice += Number(item.subtotal);
        });
        return totalPrice;
      };

    return (
        <div className='ShowOrder section'>
            {order && 
                <div className="order">
                    <h1>User Order</h1>
                    <div className="order-header">Order Details</div>
                    <div className="order-info">
                    <p><strong>Full Name:</strong> {order.full_name}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Created:</strong> {order.created_at}</p>
                    <p><strong>Order Date:</strong> {order.date}</p>
                    <p><strong>Message:</strong> {order.message}</p>
                    <p><strong>Ukupno za naplatu:</strong> {calculateTotalPrice()} rsd.</p>
                    
                    </div>
                    <div className="order-items">
                        {order.order.map((item, index) => {
                            return (
                                <div key={index} className="order-item">
                                    <img src={'http://localhost:8000/images/products/'+item.image} alt={item.title} />
                                    <h4>Naziv proizvoda: {item.title}</h4>
                                    <p>Cena: {item.price}</p>
                                    <p>Kolicina: {item.quantity}</p>
                                    <p>Ukupno: {item.subtotal}</p>
                                </div> 
                            )
                        })}
                    </div>
                </div>
            }
            {!order && <Spinner />}
        </div>
    )
}

