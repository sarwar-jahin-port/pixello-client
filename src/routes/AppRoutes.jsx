import { Route, Routes } from 'react-router'
import LandingLayout from '../layouts/LandingLayout'
import App from '../App'
import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import Dashboard from '../pages/Dashboard'
import UserLayout from '../layouts/UserLayout'
import Pricing from '../pages/Pricing'
import Profile from '../pages/Profile'
import Connections from '../pages/Connections'
import AboutUs from '../pages/Aboutus'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LandingLayout/>}>
        <Route path="/" element={<App/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Route>
      <Route 
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        } 
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<Connections />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes