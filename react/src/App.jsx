import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './views/Home'
import Contact from './views/Contact'
import NotFound from './views/NotFound'
import Message from './views/Message'
import ScrollToTop from './components/ScrollToTop'
import { useState } from 'react'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proizvodi" element={<Message />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/poruke" element={<Message />} />
            {/* <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App
