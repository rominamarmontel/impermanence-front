import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isLoading, user } = useContext(AuthContext)
  if (isLoading) {
    return <p>Loading...</p>
  }
  // console.log({ isLoading, user })
  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default ProtectedRoute