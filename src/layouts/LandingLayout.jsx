import React from 'react'
import HomeNavbar from '../components/HomeNavbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

const LandingLayout = () => {
  return (
    <>
        <HomeNavbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default LandingLayout