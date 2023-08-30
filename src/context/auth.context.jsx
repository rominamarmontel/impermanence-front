import { createContext, useState, useEffect, useCallback } from 'react'
import myApi from '../service/service'
import PropTypes from 'prop-types';


export const AuthContext = createContext()

export const AuthContextWrapper = (props) => {
  console.log(props.children)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const storeToken = useCallback((receivedToken) => {
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
  }, []);

  const getToken = useCallback(() => {
    return localStorage.getItem('token');
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem('token');
  }, []);

  const authenticateUser = useCallback(async () => {
    try {
      const currentToken = getToken();
      const response = await myApi.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${currentToken}`
        },
      });
      if (response.status === 200) {
        setUser(response.data);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      console.error('Error details:', error.response);
      setUser(null);
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return (
    <AuthContext.Provider
      value={{ storeToken, user, setUser, authenticateUser, removeToken, isLoading, token, getToken }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
AuthContextWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthContextWrapper