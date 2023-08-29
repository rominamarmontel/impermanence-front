import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from './Spinner/Spinner'

const ProtectedRoute = () => {
  const { isLoading, user } = useContext(AuthContext)
  if (isLoading) {
    return <Spinner />
  }
  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default ProtectedRoute