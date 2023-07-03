import { createContext, useState, useEffect, useCallback } from 'react'
import myApi from '../service/service'

export const AuthContext = createContext()

export const AuthContextWrapper = (props) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const storeToken = useCallback((receivedToken) => {
    localStorage.setItem('token', receivedToken)
    setToken(receivedToken)
  }, [])

  const getToken = useCallback(() => {
    return localStorage.getItem('token')
  }, [])

  const removeToken = useCallback(() => {
    localStorage.removeItem('token')
  }, [])

  const authenticateUser = useCallback(async () => {
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
  }, [getToken])

  useEffect(() => {
    authenticateUser()
  }, [authenticateUser])

  useEffect(() => {
    const logoutOnTokenExpiration = () => {
      const currentToken = getToken();
      if (currentToken) {
        const tokenData = JSON.parse(atob(currentToken.split('.')[1]));
        const expirationTime = tokenData.exp * 1000; // Convert expiration time to milliseconds
        const currentTime = Date.now();

        if (currentTime > expirationTime) {
          alert('Login session expired. Please Login again'); // トークンが切れたことを通知
          removeToken(); // トークンを削除してログアウト
        }
      }
    };

    const interval = setInterval(logoutOnTokenExpiration, 60000); // 1分ごとにトークンの有効期限をチェック
    return () => {
      clearInterval(interval); // コンポーネントがアンマウントされたときにインターバルをクリア
    };
  }, [getToken, removeToken]);

  return (
    <AuthContext.Provider
      value={{ storeToken, user, setUser, authenticateUser, removeToken, isLoading, token, getToken }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextWrapper