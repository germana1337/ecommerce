import React, { useState } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import DayNightToggle from 'react-day-and-night-toggle'
import classes from './Layout.module.css'
import Product from './Product'

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bodyBgColor, setBodyBgColor] = useState(isDarkMode ? 'black' : 'white');
  const [bodyTextColor, setBodyTextColor] = useState(isDarkMode ? 'white' : 'black');

  const handleToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
    setBodyBgColor(prevColor => prevColor === 'black' ? 'white' : 'black');
    setBodyTextColor(prevColor => prevColor === 'black' ? 'white' : 'black');
  }

  return (
    <div className='layout' style={{ backgroundColor: bodyBgColor, color: bodyTextColor }}>
      <Head>
        <title>iMax Music Store</title>
      </Head>
      <header>
        <Navbar />
        <div className={classes.toggle}>

          <DayNightToggle
            className={classes.dayNightToggle}
            onChange={handleToggle}
            checked={isDarkMode}
            size={28}
          />
          {isDarkMode ? <p className={classes.dayNightToggle2}>Dark Mode</p> : <p className={classes.dayNightToggle2}>Light Mode</p>}
        </div>

      </header>

      <main className='main-container'>
        {children}
      </main>
      <footer>
        <div className='space'>
        </div>
        <Footer />
        <div className='reserved'>
          <p>© 2021 iMax Music Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout;
