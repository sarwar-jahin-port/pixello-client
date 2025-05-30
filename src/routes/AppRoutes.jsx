import React from 'react'
import { Route, Routes } from 'react-router'
import LandingLayout from '../layouts/LandingLayout'
import App from '../App'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LandingLayout/>}>
        <Route path="/" element={<App/>}/>
      </Route>
    </Routes>
  )
}

export default AppRoutes