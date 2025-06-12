import Header from '../components/Header'
import { Outlet } from 'react-router'

const UserLayout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
    </>
  )
}

export default UserLayout