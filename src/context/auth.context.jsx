/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from 'react'
import myApi from '../service/service'

export const AuthContext = createContext()

export const AuthContextWrapper = (props) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  function storeToken(receivedToken) {
    localStorage.setItem('token', receivedToken)
    setToken(receivedToken)
  }

  function getToken() {
    return localStorage.getItem('token')
  }

  function removeToken() {
    localStorage.removeItem('token')
  }

  async function authenticateUser() {
    try {
      const currentToken = getToken()
      setToken(currentToken)

      const response = await myApi.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      })
      if (response.status === 200) {
        setUser(response.data)
        setIsLoading(false)
      } else {
        setUser(null)
        setIsLoading(false)
      }
    } catch (error) {
      setUser(null)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ storeToken, user, setUser, authenticateUser, removeToken, isLoading, token, getToken }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextWrapper