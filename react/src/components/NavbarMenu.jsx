import { Link, NavLink } from 'react-router-dom';
import './NavbarMenu.css'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { useState, useEffect } from 'react';

export default function NavbarMenu() {

  const {token, setUser, setToken, setNotification, showMenu, setShowMenu} = useStateContext()

  useEffect(() => {
    if(showMenu) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'visible'
    }
  }, [showMenu])

    const onLogout = (e) => {
        e.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
                setNotification('Izlogovan si.')
            })
    }

    const handleClick = () => {
      if(window.innerWidth <= 768) {
        setShowMenu(false)
      }
    }

    return (
      <div className={`NavbarMenu ${showMenu ? 'show-menu':''}`}>
        <ul>
          <li>
            <NavLink to="/" onClick={handleClick} className={({isActive}) => isActive ? 'active':''}>Početna</NavLink>
          </li>
          <li>
            <NavLink to="/proizvodi" onClick={handleClick} className={({isActive}) => isActive ? 'active':''}>Proizvodi</NavLink>
          </li>
          <li>
            <NavLink to="/galerija" onClick={handleClick} className={({isActive}) => isActive ? 'active':''}>Galerija</NavLink>
          </li>
          <li>
            <NavLink to="/kontakt" onClick={handleClick} className={({isActive}) => isActive ? 'active':''}>Kontakt</NavLink>
          </li>
          
          {/* {token && 
              <li><a className="active" href="/dashboard">Dashboard</a></li>
          }
          {token && 
              <li><a href="#" onClick={onLogout}>Logout</a></li>
          } */}
        </ul>
      </div>
    )
}