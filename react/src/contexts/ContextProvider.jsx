import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios-client";

// createContext function accept DEFAULT VALUE. Default value is important for autocomplete purpose.
const StateContext = createContext({
    // user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    notification: null,
    setNotification: () => {},
    showMenu: null,
    setShowMenu: () => {},
    products: null,
    setProducts: () => {},
    cartItems: null,
    setCartItems: () => {},
    // loading: null,
    // setLoading: () => {}
})

// Now create context provider
export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [notification, setNotification] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [products, setProducts] = useState()
    const [cartItems, setCartItems] = useState([])

    // const [loading, setLoading] = useState(false)

    const setToken = (token) => {
        _setToken(token)
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    useEffect(() => {
        return () => {
            if(token|| user.name) {
                axiosClient.post('/logout')
                    .then(() => {
                        setUser({})
                        setToken(null)
                        setNotification('Izlogovan si.')
    
                        localStorage.removeItem('ACCESS_TOKEN');
                    })    
            }
        }
    }, [])

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification,
            showMenu, 
            setShowMenu,
            products,
            setProducts,
            cartItems,
            setCartItems
            // loading,
            // setLoading
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)