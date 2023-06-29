import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './FilmDetails.css';
import myApi from '../../service/service';
import { RxArrowLeft } from 'react-icons/rx';
import { RxArrowRight } from 'react-icons/rx';
import ScrollToTop from '../../components/ScrollToTop';
import 'swiper/swiper-bundle.css';
import Spinner from '../../components/Spinner/Spinner'
import FadeIn from '../../components/FadeIn/FadeIn';


const FilmDetails = () => {
  const { frenchId } = useParams();
  const [films, setFilms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCrew, setShowCrew] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    scrollTo(0, 0)
    const index = films.findIndex((film) => film._id === frenchId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [films, frenchId]);

  useEffect(() => {
    const category = location.state?.category;
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
      const sortedFilms = response.data.sort((a, b) => {
        if (a.category === b.category) {
          return b.createdYear - a.createdYear || a.title.localeCompare(b.title);
        } else {
          const categoryOrder = ['encours', 'production', 'distribution', 'programmation'];
          return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
        }
      });
      setFilms(sortedFilms);
    });
  }, []);

  const goToPreviousFilm = () => {
    window.scrollTo(0, 0);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? films.length - 1 : prevIndex - 1));
    const previousFilmId = films[currentIndex === 0 ? films.length - 1 : currentIndex - 1]._id;
    navigate(`/films/${previousFilmId}`);
  };

  const goToNextFilm = () => {
    window.scrollTo(0, 0);
    setCurrentIndex((prevIndex) => (prevIndex === films.length - 1 ? 0 : prevIndex + 1));
    const nextFilmId = films[currentIndex === films.length - 1 ? 0 : currentIndex + 1]._id;
    navigate(`/films/${nextFilmId}`);
  };

  const handleDownload = async (downloadUrl, fileName) => {
    try {
      const response = await fetch(downloadUrl);
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageCount = films[currentIndex]?.images.length;

  useEffect(() => {
    if (imageCount >= 2) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [films, currentIndex, imageCount]);


  const handleClickDownload = () => {
    setShowDownload(!showDownload)
  }
  const handleClickCrew = () => {
    setShowCrew(!showCrew)
  }

  if (!films.length) {
    return <Spinner />;
  }
  const authorArray = films[currentIndex].author.split('\n')
  const partnerArray = films[currentIndex].partner.split('\n')
  const videoOnDemandUrls = films[currentIndex].videoOnDemand.split('\n').map(url => url.trim())
  const shouldReduceTitleSize = films[currentIndex].originalTitle.length > 28

  const directorName = films[currentIndex].directedBy;
  const formattedDirectorName = /^[aeiouœ]/i.test(directorName) ? `d'${directorName}` : `de ${directorName}`;

  return (
    <>
      <FadeIn>
        <section className='FilmDetails'>
          <div className='container' >
            <div className='top'>
              <div className='image-content'>
                <div className='FilmDetails-right-position'>
                  {currentImageIndex < imageCount && imageCount >= 2 ? (
                    <div className='image-container'>
                      {films[currentIndex]?.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Film"
                          className={`fade-in ${index === currentImageIndex ? 'current-image' : 'next-image'}`}
                        />
                      ))}
                    </div>
                  ) : imageCount === 1 ? (
                    <div className='image-container'>
                      <picture>
                        <div>
                          <img src={films[currentIndex].images[0]} alt="Film" />
                        </div>
                      </picture>
                    </div>
                  ) : ('')}


                  <div className='text-on-image'>
                    <h1>{films[currentIndex].title.toUpperCase()}</h1>
                    {films[currentIndex].directedBy && (<h4 className='directedBy'>{formattedDirectorName}</h4>)}
                    {films[currentIndex].createdYear && (<h4 className='createdYear'>{films[currentIndex].createdYear}</h4>)}
                  </div>
                  <div className='copyright-on-image'>
                    {films[currentIndex].copyright && (<h6>&copy; {films[currentIndex].copyright}</h6>)}
                  </div>
                </div>
              </div>


              <div className='title-content'>
                <div className='FilmDetails-originalTitle-container'>
                  {films[currentIndex].originalTitle && (
                    <>
                      <div className='FilmDetails-originalTitle-content'>
                        <h1 className={`FilmDetails-originalTitle ${shouldReduceTitleSize ? 'reduce-size' : ''}`}>
                          {films[currentIndex].originalTitle.toUpperCase()}
                        </h1>
                        {films[currentIndex] && (
                          <div className='FilmDetails-category'>
                            {films[currentIndex]?.category === 'encours' ? 'EN COURS' : films[currentIndex]?.category.toUpperCase()}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>


            <div className='bottom'>
              <ul className='ul-left' >
                <div className='ul-col'>
                  {films[currentIndex].directedBy && (
                    <div>
                      <li><h5>RÉALISATION</h5></li>
                      <li>{films[currentIndex].directedBy}</li>
                    </div>
                  )}
                  {films[currentIndex].producedBy && (
                    <div>
                      <li><h5>PRODUCTION</h5></li>
                      <li>{films[currentIndex].producedBy}</li>
                    </div>
                  )}
                </div>

                {films[currentIndex].author && (
                  <div>
                    <li><h5>{authorArray.length > 1 ? 'AUTEUR(E)S' : 'AUTEUR(E)'}</h5></li>
                    <li>{films[currentIndex].author}</li>
                  </div>
                )}

                <div className='ul-col'>
                  {films[currentIndex].format && (
                    <div>
                      <li><h5>FORMAT</h5></li>
                      <li>{films[currentIndex].format}</li>
                    </div>
                  )}
                  {films[currentIndex].duration && (
                    <div>
                      <li><h5>DUREE</h5></li>
                      <li>{films[currentIndex].duration}</li>
                    </div>
                  )}
                </div>


                {films[currentIndex].partner && (
                  <div>
                    <li><h5>{partnerArray.length > 1 ? 'PARTENAIRES' : 'PARTENAIRE'}</h5></li>
                    <li>{films[currentIndex].partner}</li>
                  </div>
                )}


                <div className='ul-col'>
                  {films[currentIndex].distribution && (
                    <>
                      <div>
                        <li><h5>DISTRIBUTION</h5></li>
                        <li>{films[currentIndex].distribution}</li>
                      </div>
                    </>
                  )}
                  {films[currentIndex].internationalSales && (
                    <div>
                      <li><h5>VENTES INTERNATIONALES</h5></li>
                      <li>{films[currentIndex].internationalSales}</li>
                    </div>
                  )}
                </div>


                {films[currentIndex].stageOfProduction && (
                  <>
                    <div>
                      <li><h5>ÉTAPE DE PRODUCTION</h5></li>
                      <li>{films[currentIndex].stageOfProduction}</li>
                    </div>
                  </>
                )}
                {films[currentIndex].genre && (
                  <div>
                    <li><h5>GENRE</h5></li>
                    <li>{films[currentIndex].genre}</li>
                  </div>
                )}



                <div className='FilmDetails-li-videoOnDemand'>
                  {films[currentIndex].videoOnDemand && (
                    <div>
                      <li><h5>VIDEO À LA DEMANDE</h5></li>
                      {videoOnDemandUrls.map((url, index) => (
                        <li key={index} style={{ marginBottom: 'unset', lineHeight: '1rem' }}>
                          <a href={url} target="_blank" rel="noreferrer">{url}</a>
                        </li>
                      ))}
                    </div>
                  )}
                </div>
                <div className='button-showDownload'>
                  {films[currentIndex].download && (
                    <div>
                      <li>
                        <button onClick={handleClickDownload}>{showDownload ? 'TÉLÉCHARGEMENT' : 'TÉLÉCHARGEMENT +'}</button></li>
                      {showDownload && films[currentIndex].download && <a
                        href={films[currentIndex].download}
                        target="_blank" rel="noopener, noreferrer"
                        onClick={() => handleDownload(films[currentIndex].download,)}
                      >{films[currentIndex].title}</a>}
                    </div>
                  )}
                </div>
                <div className='button-showClick'>
                  {films[currentIndex].crew && (
                    <div>
                      <li>
                        <button onClick={handleClickCrew}>{showCrew ? 'ÉQUIPE' : 'ÉQUIPE +'}</button>
                      </li>
                      {showCrew && <li style={{ paddingTop: '2px' }}>{films[currentIndex].crew}</li>}
                    </div>
                  )}
                </div>
              </ul>



              <ul className='ul-right'>
                {films[currentIndex].synopsis && (
                  <div>
                    <li>
                      <h5 className='FilmDetails-synopsis-h5'>SYNOPSIS</h5>
                    </li>
                    <li>
                      {films[currentIndex].synopsis}
                    </li>
                  </div>
                )}
                {films[currentIndex].festivalsAndAwards && (
                  <div>
                    <li>
                      <h5 className='FilmDetails-festivalsAndAwards-h5'>FESTIVALS & RÉCOMPENSES</h5>
                    </li>
                    <li>
                      {films[currentIndex].festivalsAndAwards}
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
          <ScrollToTop />
          <div className='flesh-left' onClick={goToPreviousFilm}><RxArrowLeft /></div>
          <div className='flesh-right' onClick={goToNextFilm}><RxArrowRight /></div>
        </section >
      </FadeIn >
    </>
  )
}

export default FilmDetails
