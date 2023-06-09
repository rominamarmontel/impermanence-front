import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { BsPower } from 'react-icons/bs'
import { MdPowerOff } from 'react-icons/md'

const Footer = () => {
  const handleClick = () => {
    removeToken()
    authenticateUser()
  }
  const { user, authenticateUser, removeToken } = useContext(AuthContext)
  return (
    <section >
      <div style={{
        minHeight: `3rem`, backgroundColor: "transparent", paddingTop: '1rem'
      }}>
      </div>
      <div style={{
        minHeight: `1rem`, backgroundColor: "#ededed", paddingTop: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <small>&copy; impermanence</small>
        </div>
        <div className='footer-container' style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {!user ? (
            <>
              <div className='login-container'>
                <Link to='/login'><BsPower /></Link>
                <Link to='/signup'>  signup</Link>
              </div>
            </>
          ) : (<button onClick={handleClick} style={{ backgroundColor: 'inherit', padding: 'inherit', color: 'black' }}><MdPowerOff /></button>)}
        </div>
      </div>
    </section >
  )
}

export default Footer