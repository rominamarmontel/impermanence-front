import { useState } from 'react';
import SwiperComponent from '../../components/SwiperComponent';
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import './HomePage.css';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const HomePageEn = () => {
  const [isEnglish, setIsEnglish] = useState(false);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  const images = [
    'https://res.cloudinary.com/dyu65fpse/image/upload/v1684312795/impermanence/Izoc-still_1.17.1_tyfkfl.png',
    'https://res.cloudinary.com/dyu65fpse/image/upload/v1684312770/impermanence/Tupiq_2_1.62.1_n2rxkg.png',
    'https://res.cloudinary.com/dyu65fpse/image/upload/v1684313091/impermanence/q6lXspTgTJgq8O01684313009_1684313026_f0cqeg.png',
  ];

  return (
    <div className="HomePage-wrap">
      <SwiperComponent images={images} />
      <div className="static-text">
        <div className='HomePage-text-left'>
          <h1>impermanence<br />films</h1>
          <p className='smartphone__area'>Based in Paris since 2011, Impermanence Films works for the production and distribution and programming of documentary cinema, favoring human perspective and films produced in a context of formal freedom.
            Essential support for independent works, Impermanence Films pools and provides production and distribution tools.
          </p>
          <div className='sns-container'>
            <ul style={{ display: "flex" }}>
              <li className='smartphone__area'><FaTwitter /></li>&nbsp;&nbsp;&nbsp;&nbsp;
              <li className='smartphone__area'><FaInstagram /></li>&nbsp;&nbsp;&nbsp;&nbsp;
              <li className='smartphone__area'><FaFacebook /></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <li onClick={toggleLanguage} className='HomePage-lang'>{isEnglish ? 'FR' : 'EN'}</li>
            </ul>
          </div>
        </div>
        <div className='HomePage-text-right'>
          {!isEnglish ? (
            <>
              <ul>
                <li>
                  <Link to='/films#work-in-progress'>TOUS LES FILMS</Link>
                </li>
                <li>
                  <Link to='/about#AboutPage'>À PROPOS D’IMPERMANENCE</Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul>
                <li>
                  <Link to='/en/films#work-in-progress'>ALL FILMS</Link>
                </li>
                <li>
                  <Link to='/en/about#AboutPage'>ABOUT MPERMANENCE</Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div >
  );
};

export default HomePageEn;