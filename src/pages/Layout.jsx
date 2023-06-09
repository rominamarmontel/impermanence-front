import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import NavbarEn from '../components/Navbar/NavbarEn';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

const Layout = ({ isEnglish }) => {
  const NavbarComponent = isEnglish ? NavbarEn : Navbar;

  return (
    <>
      <body>
        <div className='wrapper'>
          <header>
            <NavbarComponent />
          </header>
          <main>
            <Outlet />
          </main>
        </div>
        <footer>
          <Footer />
        </footer>
      </body>
    </>
  );
};

Layout.propTypes = {
  isEnglish: PropTypes.bool.isRequired,
};

export default Layout;