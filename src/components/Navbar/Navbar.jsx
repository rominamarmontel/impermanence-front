import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { FaVimeo } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';

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
      setScrollHamburgerMenu(scrollTop > 0)
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

  const generateLanguageURL = (language) => {
    const currentPath = location.pathname;
    const languageIndicator = `/${language}`;
    const trimmedPath = currentPath.replace(languageIndicator, '');
    const lastPath = trimmedPath.split('/');
    if (language === 'fr') {
      return trimmedPath;
    } else {
      if (lastPath.length >= 3) {
        return `${trimmedPath}/en`;
      } else {
        return `en${trimmedPath}`;
      }
    }
  };
  return (
    <>
      <section className={`Navbar ${scrollNavbar ? 'Navbar--scroll' : ''} `}>
        <nav className='Navbar-container'>
          <picture>
            <Link to='/'>
              {scrollNavbar ? (
                <h1 className='logo-style-scroll'>impermanence<br />
                  films</h1>
              ) : (
                <h1 className='logo-style'>impermanence<br />
                  films</h1>
              )}
            </Link>
          </picture>
          <ul className='navbar-list'>
            <li className='navbar-list-font'><Link to='/about' >À PROPOS</Link></li>
            <li style={{ textAlign: 'center' }} className='navbar-list-font'>
              <HashLink to='/films#encours' >EN COURS</HashLink>
            </li>
            <li className='navbar-list-font'><HashLink to='/films#production'>PRODUCTION</HashLink></li>
            <li className='navbar-list-font' ><HashLink to='/films#distribution'>DISTRIBUTION</HashLink></li>
            <li className='navbar-list-font'><HashLink to='/films#programmation'>PROGRAMMATION</HashLink></li>
            <li className='change_langue' onClick={() => {
              const languageURL = generateLanguageURL('en');
              navigate(languageURL);
              scrollToTop();
            }}>EN</li>

          </ul>
        </nav>
      </section >


      {window.innerWidth <= 992 && (
        <section className={`hamburgerMenu-section ${isMobile ? 'visible' : ''}`} >
          <div className={`hamburgerMenu-top ${scrollHamburgerMenu ? 'hamburgerMenu-top--scroll' : ''}`} >
            <div className='overlay_logo'>
              <Link to='/'>
                <h1 className='logo-style'>impermanence<br />
                  films</h1>
              </Link>
            </div>
            <div className={`openbtn1 ${isActive ? 'active' : ''} `} onClick={toggleNavigation}><span></span><span></span></div>
          </div>


          <nav id="hamburgerMenu-nav" className={isActive ? 'panelactive' : ''} >
            <div className='overlay_sp_menu style'>
              <img src='https://res.cloudinary.com/dyu65fpse/image/upload/v1688306594/lesilo_back_o0ah1q_1_fazlqx.jpg' alt='inaugulation' className='blur style' />
              <div className='overlay_sp_menu_text style'>
                <ul className='overlay_sp_menu_ul'>
                  <li onClick={handleHashLinkClick}>
                    <Link to='/about'>À PROPOS</Link></li>
                  <li onClick={handleHashLinkClick}><HashLink to='/films/#encours' onClick={handleHashLinkClick}>EN COURS</HashLink></li>
                  <li onClick={handleHashLinkClick}><HashLink to='/films#production' >PRODUCTION</HashLink></li>
                  <li onClick={handleHashLinkClick}><HashLink to='/films#distribution' >DISTRIBUTION</HashLink></li>
                  <li onClick={handleHashLinkClick}><HashLink to='/films#programmation' >PROGRAMMATION</HashLink></li>
                </ul>
                <ul className='overlay_sp_menu_ul_sns'>
                  <div>
                    <li className='overlay_sp_menu_sns' onClick={handleHashLinkClick}><HashLink to='https://vimeo.com/user9555000' target="_blank"><FaVimeo /></HashLink></li>
                    <li className='overlay_sp_menu_sns' onClick={handleHashLinkClick}><HashLink to='https://www.linkedin.com/company/impermanence-films/' target="_blank"><FaLinkedinIn /></HashLink></li>
                  </div>
                  <li className='change_langue' onClick={() => {
                    const languageURL = generateLanguageURL('en');
                    navigate(languageURL);
                    scrollToTop();
                  }}>EN</li>
                </ul>
              </div>
            </div>
          </nav>
        </section>
      )}
    </>
  );
}

export default Navbar;