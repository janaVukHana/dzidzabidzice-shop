import { useStateContext } from '../contexts/ContextProvider'
import './ShoppingCartPage.css'

export default function ShoppingCartPage() {

    const { cartItems } = useStateContext()

    return (
        <div className='ShoppingCartPage section'>
            <h1>Tvoja korpa</h1>

            {cartItems.map((item, index) => {
                return (
                    <p key={index}>Id: {item.id}</p>
                )
            })}
        </div>
    )
}