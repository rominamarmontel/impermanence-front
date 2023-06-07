
import { NavLink } from 'react-router-dom'
import './Header.css'


const Header = () => {
  return (
    <>
      <div className='Header'>
        <nav className='Header-container'>
          <picture>
            <NavLink to='/'>
              <img src='/images/tCPYU5wSBoF8Kx01681915333_1681915392.png' alt='logo-impermanence' />
            </NavLink>
          </picture>
          <ul className='header-list'>
            <li><NavLink to='/infos' >info</NavLink></li>
            <li><NavLink to='/films' >films</NavLink></li>
            <li><NavLink to='/about' >about</NavLink></li>
            <li><NavLink to='/contact' >contact</NavLink></li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header