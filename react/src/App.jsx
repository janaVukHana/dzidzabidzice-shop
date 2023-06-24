import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useStateContext } from './contexts/ContextProvider'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
// Guest pages
import Home from './views/Home'
import Product from './views/Product'
import Gallery from './views/Gallery'
import Contact from './views/Contact'
import ShoppingCartPage from './views/ShoppingCartPage'
import CheckoutPage from './views/CheckoutPage'
import ThankYou from './views/ThankYou'
import Login from './views/Login'
import NotFound from './views/NotFound'
// Admin pages
import Message from './views/Message'
import AdminGallery from './views/admin/Gallery'
import Offer from './views/admin/Offer'
import OfferForm from './views/admin/OfferForm'
import Orders from './views/admin/Orders'
import ShowOrder from './views/admin/ShowOrder'

import ScrollToTop from './components/ScrollToTop'
import Protected from './components/Protected'

function App() {

  const {notification, setNotification} = useStateContext()
  // Modal 
  const [open, setOpen] = useState(true)
  const handleClose = () => setOpen(false);

  useEffect(() => {

    if(notification) {
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }, [notification])

  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proizvodi" element={<Product />} />
            <Route path="/galerija" element={<Gallery />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/korpa" element={<ShoppingCartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/hvala" element={<ThankYou />} />
            <Route path="/brbrlogin" element={<Login />} />

            <Route path="/poruke" element={<Protected><Message /></Protected>} />
            <Route path="/slicice" element={<Protected><AdminGallery /></Protected>} />
            <Route path="/ponuda" element={<Protected><Offer /></Protected>} />
            <Route path="/forma-ponuda" element={<Protected><OfferForm /></Protected>} />
            <Route path="/ponuda/:id" element={<Protected><OfferForm /></Protected>} />
            <Route path="/porudzbine" element={<Protected><Orders /></Protected>} />
            <Route path="/porudzbine/:id" element={<Protected><ShowOrder /></Protected>} />
            {/* TODO */}
            {/* Route /profil poruke ponuda slicice porudzbine */}
            {/* views Profile Message Offer Images Orders */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
      {notification && <p className='notification'>{notification}</p>}

    </div>
  )
}

export default App
