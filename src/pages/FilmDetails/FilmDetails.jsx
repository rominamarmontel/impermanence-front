import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './FilmDetails.css';
import myApi from '../../service/service';
import { RxArrowLeft } from 'react-icons/rx';
import { RxArrowRight } from 'react-icons/rx';
import ScrollToTop from '../../components/ScrollToTop';
import 'swiper/swiper-bundle.css';
import Swiper, { Autoplay, Pagination, EffectFade } from 'swiper';

const FilmDetails = () => {
  const { id } = useParams();
  const [films, setFilms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCrew, setShowCrew] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const location = useLocation()
  const [parentHeight, setParentHeight] = useState(0);
  const grandGrandChildARef = useRef(null);
  const grandGrandChildBRef = useRef(null);
  const grandchildARef = useRef(null);
  const childARef = useRef(null);

  useEffect(() => {
    const index = films.findIndex((film) => film._id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [films, id]);

  useEffect(() => {
    const category = location.state?.categorie;
    if (category) {
      const categoryElement = document.getElementById(category);
      if (categoryElement) {
        const yOffset = -130;
        const y = categoryElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location.state]);

  useEffect(() => {
    myApi.get('/films').then((response) => {
      console.log(response)
      const sortedFilms = response.data.sort((a, b) => {
        if (a.categorie === b.categorie) {
          return b.anneeDeCreation - a.anneeDeCreation || a.titre.localeCompare(b.titre);
        } else {
          const categoryOrder = ['travail-en-cours', 'production', 'distribution', 'programmation'];
          return categoryOrder.indexOf(a.categorie) - categoryOrder.indexOf(b.categorie);
        }
      });
      setFilms(sortedFilms);
    });
  }, []);

  useEffect(() => {
    let observer;
    let resizeTimeout;

    const adjustParentHeight = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const grandGrandChildAHeight = grandGrandChildARef.current?.clientHeight || 0;
        const grandGrandChildBHeight = grandGrandChildBRef.current?.clientHeight || 0;
        const grandchildAHeight = grandchildARef.current?.clientHeight || 0;
        const childAHeight = childARef.current?.clientHeight || 0;
        const maxHeight = Math.max(
          grandGrandChildAHeight + grandGrandChildBHeight,
          grandchildAHeight + childAHeight
        );

        setParentHeight(maxHeight);
      }, 0);
    };

    const handleResize = () => {
      if (window.innerWidth > 992) {
        adjustParentHeight();
      } else {
        setParentHeight(0);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    observer = new ResizeObserver(adjustParentHeight);
    if (grandGrandChildARef.current) {
      observer.observe(grandGrandChildARef.current);
    }
    if (grandGrandChildBRef.current) {
      observer.observe(grandGrandChildBRef.current);
    }
    if (grandchildARef.current) {
      observer.observe(grandchildARef.current);
    }
    if (childARef.current) {
      observer.observe(childARef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const goToPreviousFilm = () => {
    window.scrollTo(0, 0)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? films.length - 1 : prevIndex - 1));
  };

  const goToNextFilm = () => {
    window.scrollTo(0, 0)
    setCurrentIndex((prevIndex) => (prevIndex === films.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDownload = async (telechargementUrl, fileName) => {
    try {
      const response = await fetch(telechargementUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('download error:', error);
    }
  };

  const images = films[currentIndex]?.images;
  useEffect(() => {
    Swiper.use([Autoplay, Pagination, EffectFade]);
    new Swiper('.film-swiper-container', {
      loop: true,
      effect: 'fade',
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      speed: 1000,
      pagination: {
        el: '.swiper-pagination',
        clickable: false,
      },
    });
  }, [images]);


  const handleClickDownload = () => {
    setShowDownload(!showDownload)
  }
  const handleClickCrew = () => {
    setShowCrew(!showCrew)
  }

  if (!films.length) {
    return null;
  }
  const authorArray = films[currentIndex].auteur.split('\n');
  const partnerArray = films[currentIndex].partenaire.split('\n')
  const videoALaDemandeUrls = films[currentIndex].videoALaDemande.split('\n');
  const shouldReduceTitleSize = films[currentIndex].titreOriginal.length > 40;

  return (
    <>
      <section className='FilmDetails'>
        <div className='FilmDetails-container' style={{ height: parentHeight }}>
          <div className='FilmDetails-top'>
            <div className='FilmDetails-left'>
              <div className='FilmDetails-originalTitle-container'>
                <div className='FilmDetails-originalTitle-content' ref={grandGrandChildARef}>
                  {films[currentIndex].titreOriginal && (
                    <>
                      <h1 className={`FilmDetails-originalTitle ${shouldReduceTitleSize ? 'reduce-size' : ''}`}>{films[currentIndex].titreOriginal.toUpperCase()}</h1>

                      <div className='FilmDetails-category'>
                        {films[currentIndex].categorie.toUpperCase()}
                      </div>
                    </>
                  )}
                </div>
                <div className='FilmDetails-bottom' ref={grandGrandChildBRef}>
                  <ul className='ul-left' >
                    {films[currentIndex].realisePar && (
                      <>
                        <div>
                          <li><h5>RÉALISATION</h5></li>
                          <li>{films[currentIndex].realisePar}</li>
                        </div>
                      </>
                    )}
                    {films[currentIndex].produitPar && (
                      <>
                        <div>
                          <li><h5>PRODUCTION</h5></li>
                          <li>{films[currentIndex].produitPar}</li>
                        </div>
                      </>
                    )}
                    {films[currentIndex].auteur && (
                      <>
                        <div>
                          <li><h5>{authorArray.length > 1 ? 'AUTEUR(E)S' : 'AUTEUR(E)'}</h5></li>
                          <li>{films[currentIndex].auteur}</li>
                        </div>
                      </>
                    )}
                    {films[currentIndex].format && (
                      <>
                        <div>
                          <li><h5>FORMAT</h5></li>
                          <li>{films[currentIndex].format}</li>
                        </div>
                      </>
                    )}
                    {films[currentIndex].duree && (
                      <>
                        <div>
                          <li><h5>DUREE</h5></li>
                          <li>{films[currentIndex].duree}</li>
                        </div>
                      </>
                    )}
                    {films[currentIndex].partenaire && (
                      <>
                        <div>
                          <li><h5>{partnerArray.length > 1 ? 'PARTENAIRES' : 'PARTENAIRE'}</h5></li>
                          <li>{films[currentIndex].partenaire}</li>
                        </div>
                      </>
                    )}
                    {films[currentIndex].distribution && (
                      <>
                        <div>
                          <li><h5>DISTRIBUTION</h5></li>
                          <li>{films[currentIndex].distribution}</li>
                        </div>
                      </>
                    )}
                    {films[currentIndex].ventesInternationales && (
                      <>
                        <div>
                          <li><h5>VENTES INTERNATIONALES</h5></li>
                          <li>{films[currentIndex].ventesInternationales}</li>
                        </div>
                      </>
                    )}
                    {films[currentIndex].etapeDeProduction && (
                      <>
                        <div>
                          <li><h5>ÉTAP DE PRODUCTION</h5></li>
                          <li>{films[currentIndex].etapeDeProduction}</li>
                        </div>
                      </>
                    )}
                    {films[currentIndex].genre && (
                      <>
                        <div>
                          <li><h5>GENRE</h5></li>
                          <li>{films[currentIndex].genre}</li>
                        </div>
                      </>
                    )}
                    <div className='FilmDetails-li-videoOnDemand'>
                      {films[currentIndex].videoALaDemande && (
                        <>
                          <li><h5>VIDEO À LA DEMANDE</h5></li>
                          {videoALaDemandeUrls.map((url, index) => (
                            <li key={index} style={{ marginBottom: 'unset', lineHeight: '1.5rem' }} > <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: '1rem' }}>{url}</a></li>
                          ))}
                        </>
                      )}
                    </div>
                    <div className='button-showDownload'>
                      {films[currentIndex].telechargement && (
                        <>
                          <li>
                            <button onClick={handleClickDownload}>{showDownload ? 'TÉLÉCHARGEMENT' : 'TÉLÉCHARGEMENT +'}</button></li>
                          {showDownload && films[currentIndex].telechargement && <a
                            href={films[currentIndex].telechargement}
                            target="_blank" rel="noopener, noreferrer"
                            onClick={() => handleDownload(films[currentIndex].telechargement,)}
                          >{films[currentIndex].titre}</a>}
                        </>
                      )}
                    </div>
                    <div className='button-showClick'>
                      {films[currentIndex].equipe && (
                        <>
                          <li>
                            <button onClick={handleClickCrew}>{showCrew ? 'ÉQUIPE' : 'ÉQUIPE +'}</button>
                          </li>
                          {showCrew && <li style={{ paddingTop: '2px' }}>{films[currentIndex].equipe}</li>}
                        </>
                      )}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div className='FilmDetails-right' ref={grandchildARef}>
              <div className='FilmDetails-right-position'>
                {films[currentIndex].images && films[currentIndex].images.length > 1 ? (
                  <div className="film-swiper-container" >
                    <div className="swiper-wrapper">
                      {films[currentIndex].images.map((image, index) => (
                        <div className="swiper-slide" key={index}>
                          <div className="slide-img">
                            <img src={image} alt={`img${index}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                ) : images && images.length === 1 ? (
                  <div className='image-container'>
                    <picture>
                      <div>
                        <img src={films[currentIndex].images[0]} alt="Film" />
                      </div>
                    </picture>
                  </div>
                ) : ('')}
                <div className='text-on-image'>
                  <h1>{films[currentIndex].titre.toUpperCase()}</h1>
                  {films[currentIndex].realisePar && (<h4>par {films[currentIndex].realisePar}</h4>)}
                  {films[currentIndex].anneeDeCreation && (<h4>{films[currentIndex].anneeDeCreation}</h4>)}
                </div>
                <div className='copyright-on-image'>
                  {films[currentIndex].droitsDauteur && (<h6>&copy; {films[currentIndex].droitsDauteur}</h6>)}
                </div>
              </div>


            </div>
          </div>
          <div className='FilmDetails-synopsis' ref={childARef}>
            <div className='FilmDetails-synopsis-text'>
              <ul>
                {films[currentIndex].synopsis && (
                  <>
                    <li>
                      <h5 className='FilmDetails-synopsis-h5'>SYNOPSIS</h5>
                    </li>
                    <li>
                      {films[currentIndex].synopsis}
                    </li>
                  </>
                )}
                {films[currentIndex].festivalsEtRecompenses && (
                  <>
                    <li>
                      <h5 className='FilmDetails-festivalsAndAwards-h5'>FESTIVALS & RÉCOMPENSES</h5>
                    </li>
                    <li>
                      {films[currentIndex].festivalsEtRecompenses}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div >
        <ScrollToTop />
        <div className='flesh-left' onClick={goToPreviousFilm}><RxArrowLeft /></div>
        <div className='flesh-right' onClick={goToNextFilm}><RxArrowRight /></div>
      </section >
    </>
  )
}
// FilmDetails.propTypes = {
//   // images: PropTypes.arrayOf(PropTypes.string),
// };
export default FilmDetails
