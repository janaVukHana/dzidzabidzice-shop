import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useStateContext } from '../contexts/ContextProvider';
import NavbarMenu from './NavbarMenu';
import Logo from './Logo';
import Hamburger from './Hamburger';
import DashboardLink from './DashboardLink'

export default function Navbar() {
    const {showMenu, setShowMenu, token} = useStateContext()
    const [showNavigation, setShowNavigation] = useState(false)

    setTimeout(() => setShowNavigation(true), 5000)

    useEffect(() => {
        window.addEventListener('resize', (e) => {
            if(window.innerWidth > 768) {
                setShowMenu(false)
            }
        })

    }, [showMenu]);

    return (
    <nav className={`Navbar ${!showNavigation && 'hide'}`}>
        <Logo />
        <NavbarMenu />
        {token && <DashboardLink />}
        <Hamburger />
      </nav>
    );
  }
  