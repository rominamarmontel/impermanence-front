import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './FilmDetails';
import myApi from '../../service/service';
import { RxArrowLeft } from 'react-icons/rx';
import { RxArrowRight } from 'react-icons/rx';
import ScrollToTop from '../../components/ScrollToTop';
import 'swiper/swiper-bundle.css';
import Swiper, { Autoplay, Pagination, EffectFade } from 'swiper';
import FadeIn from '../../components/FadeIn/FadeIn';
import Spinner from '../../components/Spinner/Spinner';

const FilmDetailsEn = () => {
  const { id } = useParams();
  const [films, setFilms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCrew, setShowCrew] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const index = films.findIndex((film) => film._id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [films, id]);

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
    myApi.get('/en/films').then((response) => {
      const sortedFilms = response.data.sort((a, b) => {
        if (a.category === b.category) {
          return b.createdYear - a.createdYear || a.title.localeCompare(b.title);
        } else {
          const categoryOrder = ['work-in-progress', 'production', 'distribution', 'programmation'];
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
    return <Spinner />
  }
  const authorArray = films[currentIndex].author.split('\n');
  const partnerArray = films[currentIndex].partner.split('\n')
  const videoOnDemandUrls = films[currentIndex].videoOnDemand.split('\n').map(url => url.trim())
  const shouldReduceTitleSize = films[currentIndex].originalTitle.length > 15;

  return (
    <>
      <FadeIn>
        <section className='FilmDetails'>
          <div className='container'>
            <div className='top'>
              <div className='image-content'>
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
                    <h1>{films[currentIndex].title.toUpperCase()}</h1>
                    {films[currentIndex].directedBy && (<h4 className='directedBy'>by {films[currentIndex].directedBy}</h4>)}
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
                    <div className='FilmDetails-originalTitle-content'>
                      <h1 className={`FilmDetails-originalTitle ${shouldReduceTitleSize ? 'reduce-size' : ''}`}>{films[currentIndex].originalTitle.toUpperCase()}</h1>
                      <div className='FilmDetails-category'>
                        {films[currentIndex].category.toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='bottom'>
              <ul className='ul-left' >
                <div className='ul-col'>
                  {films[currentIndex].directedBy && (
                    <div>
                      <li><h5>DIRECTED BY</h5></li>
                      <li>{films[currentIndex].directedBy}</li>
                    </div>
                  )}
                  {films[currentIndex].producedBy && (
                    <>
                      <div>
                        <li><h5>PRODUCED BY</h5></li>
                        <li>{films[currentIndex].producedBy}</li>
                      </div>
                    </>
                  )}
                </div>

                {films[currentIndex].author && (
                  <div>
                    <li><h5>{authorArray.length > 1 ? 'AUTHORS' : 'AUTHOR'}</h5></li>
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
                      <li><h5>DURATION</h5></li>
                      <li>{films[currentIndex].duration}</li>
                    </div>
                  )}
                </div>


                {films[currentIndex].partner && (
                  <div>
                    <li><h5>{partnerArray.length > 1 ? 'PARTNERS' : 'PARTNER'}</h5></li>
                    <li>{films[currentIndex].partner}</li>
                  </div>
                )}


                <div className='ul-col'>
                  {films[currentIndex].distribution && (
                    <div>
                      <li><h5>DISTRIBUTION</h5></li>
                      <li>{films[currentIndex].distribution}</li>
                    </div>
                  )}
                  {films[currentIndex].internationalSales && (
                    <div>
                      <li><h5>INTERNATIONAL SALES</h5></li>
                      <li>{films[currentIndex].internationalSales}</li>
                    </div>
                  )}
                </div>


                {films[currentIndex].stageOfProduction && (
                  <div>
                    <li><h5>STAGE OF PRODUCTION</h5></li>
                    <li>{films[currentIndex].stageOfProduction}</li>
                  </div>
                )}
                {films[currentIndex].genre && (
                  <div>
                    <li><h5>GENRE</h5></li>
                    <li>{films[currentIndex].genre}</li>
                  </div>
                )}


                <div className='FilmDetails-li-videoOnDemand'>
                  {films[currentIndex].videoOnDemand && (
                    <>
                      <li><h5>VIDEO ON DEMAND</h5></li>
                      {videoOnDemandUrls.map((url, index) => (
                        <li key={index} style={{ marginBottom: 'unset', lineHeight: '1rem' }}>
                          <a href={url} target="_blank" rel="noreferrer">{url}</a>
                        </li>
                      ))}
                    </>
                  )}
                </div>
                <div className='button-showDownload'>
                  {films[currentIndex].download && (
                    <>
                      <li>
                        <button onClick={handleClickDownload}>{showDownload ? 'DOWNLOAD' : 'DOWNLOAD +'}</button></li>
                      {showDownload && films[currentIndex].download && <a
                        href={films[currentIndex].download}
                        target="_blank" rel="noopener, noreferrer"
                        onClick={() => handleDownload(films[currentIndex].download,)}
                      >{films[currentIndex].title}</a>}
                    </>
                  )}
                </div>
                <div className='button-showClick'>
                  {films[currentIndex].crew && (
                    <>
                      <li>
                        <button onClick={handleClickCrew}>{showCrew ? 'CREW' : 'CREW +'}</button></li>
                      {showCrew && <li>{films[currentIndex].crew}</li>}
                    </>
                  )}
                </div>
              </ul>



              <ul className='ul-right'>
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
                {films[currentIndex].festivalsAndAwards && (
                  <>
                    <li>
                      <h5 className='FilmDetails-festivalsAndAwards-h5'>FESTIVALS & AWARDS</h5>
                    </li>
                    <li>
                      {films[currentIndex].festivalsAndAwards}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <ScrollToTop />
          <div className='flesh-left' onClick={goToPreviousFilm}><RxArrowLeft /></div>
          <div className='flesh-right' onClick={goToNextFilm}><RxArrowRight /></div>
        </section >
      </FadeIn>
    </>
  )
}

export default FilmDetailsEn