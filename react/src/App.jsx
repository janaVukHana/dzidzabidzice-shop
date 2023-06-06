import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useStateContext } from './contexts/ContextProvider'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './views/Home'
import Galerija from './views/Galerija'
import Contact from './views/Contact'
import Login from './views/Login'
import NotFound from './views/NotFound'
import Message from './views/Message'
import Image from './views/Image'
import ScrollToTop from './components/ScrollToTop'
import Proizvod from './views/Proizvod'
import Protected from './components/Protected'

function App() {

  const {notification, setNotification} = useStateContext()

  useEffect(() => {
    if(notification) {
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  })

  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proizvodi" element={<Proizvod />} />
            <Route path="/galerija" element={<Galerija />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/brbrlogin" element={<Login />} />

            <Route path="/poruke" element={<Protected><Message /></Protected>} />
            <Route path="/slicice" element={<Protected><Image /></Protected>} />
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
