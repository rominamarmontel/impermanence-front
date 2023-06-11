import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import NavbarEn from '../components/Navbar/NavbarEn';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

const Layout = ({ isEnglish }) => {
  const NavbarComponent = isEnglish ? NavbarEn : Navbar;
  return (
    <>
      <div className='wrapper'>
        <header>
          <NavbarComponent />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  isEnglish: PropTypes.bool.isRequired,
};

export default Layout;