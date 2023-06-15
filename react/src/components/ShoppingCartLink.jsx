import './ShoppingCartLink.css'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ShoppingCartLink() {

    const {cartItems} = useStateContext()

    return (
        <div className='ShoppingCartLink'>
            <span className='cartItems'>{cartItems.length}</span>
            <Link to='/korpa'><ShoppingCartIcon /></Link>
        </div>
    )
}