import './ShoppingCartPage.css'
import {Link} from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import DeleteIcon from '@mui/icons-material/Delete';

export default function ShoppingCartPage() {

    const { cartItems, setCartItems } = useStateContext()

    const handleQuantityChange = (id, newQuantity) => {

        const updatedCartItems = cartItems.map(item => {
            if(item.id === id) {
                return {...item, quantity: newQuantity, subtotal: item.price * newQuantity}
            } else {
                return item
            }
        })
        setCartItems(updatedCartItems);
    }

    const handleRemoveItem = id => {
        const updatedCartItems = cartItems.filter(item => item.id !== id)
        setCartItems(updatedCartItems)
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
          totalPrice += Number(item.subtotal);
        });
        return totalPrice;
      };

    return (
        <div className='ShoppingCartPage section'>
            <h1>Tvoja korpa</h1>

            {cartItems.length === 0 && <p style={{textAlign: 'center'}}>Korpa je prazna. <Link to="/proizvodi" className="btn btn-sm">Nastavi kupovinu</Link></p>}

            {cartItems.length > 0 && 
            <>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Slatkiš</th>
                        <th>Kolicina</th>
                        <th>Cena</th>
                        <th>Ukupno</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                {/* <td><img src={'http://localhost:8000/images/products/'+item.image} alt={item.title} /></td> */}
                                <td><img src={'http://api.mytesting.shop/images/products/'+item.image} alt={item.title} /></td>
                                <td>{item.title}</td>
                                <td>
                                    <input 
                                        type="number" 
                                        value={item.quantity} 
                                        min="1" 
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} 
                                    />
                                </td>
                                <td>{Number(item.price)} rsd.</td>
                                <td>{Number(item.subtotal)} rsd.</td>
                                <td><button className='btn btn-delete' onClick={() => handleRemoveItem(item.id)}>
                                        <span className="delete-text">Ukloni</span><DeleteIcon className="delete-icon"/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="4"></td>
                        <td><strong>Ukupno za naplatu:</strong></td>
                        <td>{calculateTotalPrice()} rsd.</td>
                    </tr>
                    </tfoot>
                </table>
                
                <br />
                <Link to="/checkout" className='btn btn-action'>Dovrši porudžbinu</Link>
            </>
            }
  
        </div>
    )
}