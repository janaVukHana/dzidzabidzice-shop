import './ShoppingCartLink.css'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ShoppingCartLink() {

    const {cartItems} = useStateContext()

    return (
        <div className='ShoppingCartLink'>
            <span className='cartItems'>{cartItems.length}</span>
            {/* Cart is empty === prevent link to work */}
            {cartItems.length === 0 && <Link to='#'><ShoppingCartIcon /></Link>}
            {/* Cart is Not empty === link work */}
            {cartItems.length > 0 && <Link to='/korpa'><ShoppingCartIcon /></Link>}
        </div>
    )
}