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

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

      {/* Show website info */}
      <Modal
          onClose={handleClose}
          open={open}
        >
          <Box className='modal' style={{padding: '0.5rem 2rem', width: '80%'}}>
            <div>
              <h1>Sajt info</h1>
              <p>Sajt Džidžabidžice je još uvek u procesu izrade.</p>
              <p>Ukoliko želite možete se slobodno poigrati sa sajtom.</p>
              <p><b>Takođe, svaka sugestija kao i predlog su dobrodošli.</b></p>

              <p>
                Da bi sajt koristili kao admin morate se ulogovati.<br />Adresa za 
                logovanje je <b>https://mytesting.shop/brbrlogin</b><br /> Podaci za logovanje: <br /><b>email: </b>barbara@gmail.com<br /><b>šifra: </b>babara.501
              </p>
            </div>
          </Box>
        </Modal>
    </div>
  )
}

export default App
