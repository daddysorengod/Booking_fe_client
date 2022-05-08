import React from 'react'
import Navbar from '../components/menu-navbar'
const Layout = ({children}:any) => {
  return (
    <>
    <Navbar />
    {children}
    </>
  )
}

export default Layout