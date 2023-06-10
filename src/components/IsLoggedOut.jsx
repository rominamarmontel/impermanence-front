import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from './Spinner/Spinner'

const IsLoggedOut = () => {
  const { isLoading, user } = useContext(AuthContext)
  if (isLoading) {
    return <Spinner />
  }
  if (user) {
    return <Navigate to="/admin/top" />
  }
  return <Outlet />
}

export default IsLoggedOut