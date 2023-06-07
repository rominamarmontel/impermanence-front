import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

const Navbar = () => {
  const [scrollNavbar, setScrollNavbar] = useState(false);
  const [scrollHamburgerMenu, setScrollHamburgerMenu] = useState(false)
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setScrollNavbar(scrollTop > 0);
      setScrollHamburgerMenu(scrollToTop > 0)
    };
    const handleResize = () => {
      setScrollNavbar(window.innerWidth > 992 && window.pageYOffset > 0);
      setIsMobile(window.innerWidth <= 992);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleHashLinkClick = () => {
    setIsActive(false);
  };

  const toggleNavigation = () => {
    setIsActive(!isActive);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <section className={`Navbar ${scrollNavbar ? 'Navbar--scroll' : ''}`}>
        <nav className='Navbar-container'>
          <picture>
            <Link to='/'>
              {scrollNavbar ? (
                <h1 style={{ color: 'white' }}>impermanence<br />
                  films</h1>
              ) : (
                <h1>impermanence<br />
                  films</h1>
              )}
            </Link>
          </picture>
          <ul className='navbar-list'>
            <li className='navbar-list-font'><Link to='/about#AboutPage' >À PROPOS</Link></li>
            <li style={{ textAlign: 'center' }} className='navbar-list-font'><HashLink to='/films#travail-en-cours' >TRAVAIL EN COURS</HashLink></li>
            <li className='navbar-list-font'><HashLink to='/films#production'>PRODUCTION</HashLink></li>
            <li className='navbar-list-font'><HashLink to='/films#distribution'>DISTRIBUTION</HashLink></li>
            <li className='navbar-list-font'><HashLink to='/films#programmation'>PROGRAMMATION</HashLink></li>
            <li className='change_langue' onClick={() => {
              navigate(`/en${location.pathname}`);
              scrollToTop();
            }}>EN</li>
          </ul>
        </nav>
      </section >


      {window.innerWidth <= 992 && (
        <section className={`hamburgerMenu-section ${isMobile ? 'visible' : ''}`} >
          <div className={`hamburgerMenu-top ${scrollHamburgerMenu ? 'hamburgerMenu-top--scroll' : ''}`}>
            <div className='overlay_logo'>
              <HashLink to='/'>
                <h1 className='logo-style'>impermanence<br />
                  films</h1>
              </HashLink>
            </div>
            <div className={`openbtn1 ${isActive ? 'active' : ''}`} onClick={toggleNavigation}><span></span><span></span></div>
          </div>


          <nav id="hamburgerMenu-nav" className={isActive ? 'panelactive' : ''} >
            <div className='overlay_sp_menu'>
              <ul className='overlay_sp_menu_ul'>
                <li onClick={handleHashLinkClick}>
                  <Link to='/about#AboutPage'>À PROPOS</Link></li>
                <li onClick={handleHashLinkClick}><HashLink to='/films#travail-en-cours' onClick={handleHashLinkClick}>EN COURS DE TRAVAIL</HashLink></li>
                <li onClick={handleHashLinkClick}><HashLink to='/films#production' >PRODUCTION</HashLink></li>
                <li onClick={handleHashLinkClick}><HashLink to='/films#distribution' >DISTRIBUTION</HashLink></li>
                <li onClick={handleHashLinkClick}><HashLink to='/films#programmation' >PROGRAMMATION</HashLink></li>
              </ul>
              <ul className='overlay_sp_menu_ul_sns'>
                <li className='overlay_sp_menu_sns' onClick={handleHashLinkClick}><HashLink to='#' ><FaFacebook /></HashLink></li>
                <li className='overlay_sp_menu_sns' onClick={handleHashLinkClick}><HashLink to='#' ><FaInstagram /></HashLink></li>
                <li className='overlay_sp_menu_sns' onClick={handleHashLinkClick}><HashLink to='#' ><FaTwitter /></HashLink></li>
                <li className='change_langue' onClick={() => {
                  navigate(`/en${location.pathname}`);
                  scrollToTop();
                }}>EN</li>
              </ul>
            </div>
          </nav>
        </section>
      )}
    </>
  );
}

export default Navbar;