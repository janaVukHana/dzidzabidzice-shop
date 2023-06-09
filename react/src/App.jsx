import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useStateContext } from './contexts/ContextProvider'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
// Guest pages
import Home from './views/Home'
import Product from './views/Product'
import Gallery from './views/Gallery'
import Contact from './views/Contact'
import Login from './views/Login'
import NotFound from './views/NotFound'
// Admin pages
import Message from './views/Message'
import AdminGallery from './views/admin/Gallery'
import Offer from './views/admin/Offer'
import OfferForm from './views/admin/OfferForm'

import ScrollToTop from './components/ScrollToTop'
import Protected from './components/Protected'
import axiosClient from './axios-client'

function App() {

  const {notification, setNotification} = useStateContext()

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
            <Route path="/brbrlogin" element={<Login />} />

            <Route path="/poruke" element={<Protected><Message /></Protected>} />
            <Route path="/slicice" element={<Protected><AdminGallery /></Protected>} />
            <Route path="/ponuda" element={<Protected><Offer /></Protected>} />
            <Route path="/forma-ponuda" element={<Protected><OfferForm /></Protected>} />
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
