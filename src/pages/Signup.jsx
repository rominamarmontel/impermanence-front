import { useState, useEffect } from 'react'
import myApi from '../service/service'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [{ username, email, password }, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  function handleChange(event) {
    const updatedState = {
      username,
      email,
      password,
      [event.target.id]: event.target.value,
    }
    setFormData(updatedState)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const userToCreate = { username, email, password }

    try {
      const response = await myApi.post('/auth/signup', userToCreate)
      if (response.status === 201) {
        navigate('/login')
      }
    } catch (error) {
      console.error(error.response.data)
      setError(error.response.data.message)
    }
  }

  return (
    <section id='Signup' style={{ width: '100vw', height: '100vh' }}>
      <div style={{ height: '100%', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ border: "1px solid black", padding: 30 }}>
          <h2 style={{ display: "flex", justifyContent: "center" }}>Signup</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: 5 }}>name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleChange}
              style={{ marginBottom: 10 }} />
            <label style={{ marginBottom: 5 }}>email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              style={{ marginBottom: 10 }} />
            <label style={{ marginBottom: 5 }}>password</label>
            <input
              type="password"
              id="password"
              autoComplete="on"
              value={password}
              onChange={handleChange}
              style={{ marginBottom: 10 }} />
          </div>
          {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button>Signup</button>
          </div>
        </form>
      </div>
    </section >
  )
}

export default Signup