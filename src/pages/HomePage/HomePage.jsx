import { useState } from 'react';
import SwiperComponent from '../../components/SwiperComponent';
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import './HomePage.css';
import { FaVimeo, FaLinkedinIn } from 'react-icons/fa';
import FadeIn from '../../components/FadeIn/FadeIn';

const HomePage = () => {
  const [isEnglish, setIsEnglish] = useState(false);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  const images = [
    'https://res.cloudinary.com/dyu65fpse/image/upload/v1687181871/images/Izoc_still_1_kbkbm2.png',
    'https://res.cloudinary.com/dyu65fpse/image/upload/v1687181883/images/Tupiq_2_1.62.1_1_bujxlh.png',
    'https://res.cloudinary.com/dyu65fpse/image/upload/v1687181763/images/song_of_a_seer_zmhcbb.png',
  ];

  return (
    <FadeIn>
      <div className="HomePage-wrap">
        <SwiperComponent images={images} />
        <div className="static-text">
          <div className='HomePage-text-left'>
            <h1>impermanence<br />films</h1>
            {isEnglish ? (
              <p className='smartphone__area'>Based in Paris since 2011, Impermanence Films works for the production and distribution and programming of documentary cinema, favoring human perspective and films produced in a context of formal freedom.
                Essential support for independent works, Impermanence Films pools and provides production and distribution tools.
              </p>) : (
              <p className='smartphone__area'>Basée à Paris depuis 2011, Impermanence Films est une structure œuvrant pour la production, la diffusion et la programmation du cinéma documentaire, privilégiant les regards à hauteur humaine et les films produits dans un contexte de liberté formelle. En soutien aux oeuvres indépendantes, Impermanence Films mutualise et met à disposition des outils de production et de diffusion.
              </p>
            )}
            <div className='sns-container'>
              <ul style={{ display: "flex" }}>
                <li className='smartphone__area'><FaVimeo /></li>&nbsp;&nbsp;&nbsp;&nbsp;
                <li className='smartphone__area'><FaLinkedinIn /></li>&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
    </FadeIn>
  );
};

export default HomePage;