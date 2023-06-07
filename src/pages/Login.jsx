import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/auth.context'
import axios from 'axios'
const URL = 'http://localhost:5005/api/'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { storeToken, authenticateUser } = useContext(AuthContext)

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const userToLogin = { email, password }

    try {
      const response = await axios.post(`${URL}/auth/login`, userToLogin)
      storeToken(response.data.token)
      await authenticateUser()
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <section id='Login' style={{ width: '100vw', height: '100vh' }}>
      <div style={{ height: '100%', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ border: "1px solid black", padding: 30 }}>
          <h2 style={{ display: "flex", justifyContent: "center" }}>Login</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: 5 }}>email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)} style={{ marginBottom: 10 }}
            />
            <label style={{ marginBottom: 5 }}>password</label>
            <input
              type="password"
              id="password" autoComplete="on"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{ marginBottom: 20 }} />
          </div>
          {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button>Login</button>
          </div>
        </form>
      </div>
    </section >
  )
}

export default Login