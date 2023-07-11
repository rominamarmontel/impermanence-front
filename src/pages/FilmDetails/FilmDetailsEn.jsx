import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FilmDetails';
import myApi from '../../service/service';
import { RxArrowLeft } from 'react-icons/rx';
import { RxArrowRight } from 'react-icons/rx';
import ScrollToTop from '../../components/ScrollToTop';
import 'swiper/swiper-bundle.css';
import FadeIn from '../../components/FadeIn/FadeIn';
import Spinner from '../../components/Spinner/Spinner';

const FilmDetailsEn = () => {
  const { frenchId } = useParams();
  const [film, setFilm] = useState('')
  const [sortedEnglish, setSortedEnglish] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCrew, setShowCrew] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    scrollTo(0, 0)
    myApi.get(`/films/${frenchId}/en`).then((response) => {
      setFilm(response.data)
    })
  }, [frenchId])

  useEffect(() => {
    myApi.get('/en/films').then((response) => {
      const sortedFilms = response.data.sort((a, b) => {
        if (a.category === b.category) {
          return b.createdYear - a.createdYear || a.title.localeCompare(b.title);
        } else {
          const categoryOrder = ['inprogress', 'production', 'distribution', 'programmation'];
          return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
        }
      });
      setSortedEnglish(sortedFilms);
    });
  }, []);

  useEffect(() => {
    const index = sortedEnglish.findIndex((film) => (film?.french?._id === frenchId))
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [sortedEnglish, frenchId]);

  const goToPreviousFilm = () => {
    window.scrollTo(0, 0);
    const previousIndex = currentIndex === 0 ? sortedEnglish.length - 1 : currentIndex - 1;
    const previousFilmId = sortedEnglish[previousIndex].french._id;
    setCurrentIndex(previousIndex);

    myApi.get(`/films/${previousFilmId}/en`).then((response) => {
      setFilm(response.data);
    });
    navigate(`/films/${previousFilmId}/en`);
  };

  const goToNextFilm = () => {
    window.scrollTo(0, 0);
    const nextIndex = currentIndex === sortedEnglish.length - 1 ? 0 : currentIndex + 1;
    const nextFilmId = sortedEnglish[nextIndex].french._id;
    setCurrentIndex(nextIndex);

    myApi.get(`/films/${nextFilmId}/en`).then((response) => {
      setFilm(response.data);
    });
    navigate(`/films/${nextFilmId}/en`);
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

  const images = film.detailImages;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images && images.length >= 2) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [images]);


  const handleClickDownload = () => {
    setShowDownload(!showDownload)
  }
  const handleClickCrew = () => {
    setShowCrew(!showCrew)
  }

  if (!film) {
    return <Spinner />
  }

  const author = film.author.split('\n');
  const partner = film.partner.split('\n')
  const videoOnDemandUrl = film.videoOnDemand.split('\n').map(url => url.trim())
  const shouldReduceTitleSize = film.originalTitle.length > 15

  return (
    <>
      <FadeIn>
        <section className='FilmDetails'>
          <div className='container'>
            <div className='top'>
              <div className='image-content'>
                <div className='FilmDetails-right-position'>
                  {images.length >= 2 ? (
                    <div className='image-container'>
                      {film.detailImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Film"
                          className={`fade-in ${index === currentImageIndex ? 'current-image' : 'next-image'}`}
                        />
                      ))}
                    </div>
                  ) : images.length === 1 ? (
                    <div className='image-container'>
                      <picture>
                        <div>
                          <img src={film.detailImages[0]} alt="Film" />
                        </div>
                      </picture>
                    </div>
                  ) : ('')}
                  <div className='text-on-image'>
                    <h1>{film.title.toUpperCase()}</h1>
                    {film.directedBy && (<h4 className='directedBy'>by {film.directedBy}</h4>)}
                    {film.createdYear && (<h4 className='createdYear'>{film.createdYear}</h4>)}
                  </div>
                  <div className='copyright-on-image'>
                    {film.copyright && (<h6>&copy; {film.copyright}</h6>)}
                  </div>
                </div>
              </div>


              <div className='title-content'>
                <div className='FilmDetails-originalTitle-container'>
                  {film.originalTitle && (
                    <div className='FilmDetails-originalTitle-content'>
                      <h1 className={`FilmDetails-originalTitle ${shouldReduceTitleSize ? 'reduce-size' : ''}`}>{film.originalTitle.toUpperCase()}</h1>
                      <div className='FilmDetails-category'>
                        {film?.category === 'inprogress' ? 'IN PROGRESS' : film?.category.toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='bottom'>
              <ul className='ul-left' >
                <div className='ul-col'>
                  {film.directedBy && (
                    <div>
                      <li><h5>DIRECTED BY</h5></li>
                      <li>{film.directedBy}</li>
                    </div>
                  )}
                  {film.producedBy && (
                    <>
                      <div>
                        <li><h5>PRODUCED BY</h5></li>
                        <li>{film.producedBy}</li>
                      </div>
                    </>
                  )}
                </div>

                {film.author && (
                  <div>
                    <li><h5>{author.length > 1 ? 'AUTHORS' : 'AUTHOR'}</h5></li>
                    <li>{film.author}</li>
                  </div>
                )}

                <div className='ul-col'>
                  {film.format && (
                    <div>
                      <li><h5>FORMAT</h5></li>
                      <li>{film.format}</li>
                    </div>
                  )}
                  {film.duration && (
                    <div>
                      <li><h5>DURATION</h5></li>
                      <li>{film.duration}</li>
                    </div>
                  )}
                </div>


                {film.partner && (
                  <div>
                    <li><h5>{partner.length > 1 ? 'PARTNERS' : 'PARTNER'}</h5></li>
                    <li>{film.partner}</li>
                  </div>
                )}


                <div className='ul-col'>
                  {film.distribution && (
                    <div>
                      <li><h5>DISTRIBUTION</h5></li>
                      <li>{film.distribution}</li>
                    </div>
                  )}
                  {film.internationalSales && (
                    <div>
                      <li><h5>INTERNATIONAL SALES</h5></li>
                      <li>{film.internationalSales}</li>
                    </div>
                  )}
                </div>


                {film.stageOfProduction && (
                  <div>
                    <li><h5>STAGE OF PRODUCTION</h5></li>
                    <li>{film.stageOfProduction}</li>
                  </div>
                )}
                {film.genre && (
                  <div>
                    <li><h5>GENRE</h5></li>
                    <li>{film.genre}</li>
                  </div>
                )}


                <div className='FilmDetails-li-videoOnDemand'>
                  {film.videoOnDemand && (
                    <>
                      <li><h5>VIDEO ON DEMAND</h5></li>
                      {videoOnDemandUrl.map((url, index) => (
                        <li key={index} style={{ marginBottom: 'unset', lineHeight: '1rem' }}>
                          <a href={url} target="_blank" rel="noreferrer">{url}</a>
                        </li>
                      ))}
                    </>
                  )}
                </div>
                <div className='button-showDownload'>
                  {film.download && (
                    <>
                      <li>
                        <button onClick={handleClickDownload}>{showDownload ? 'DOWNLOAD' : 'DOWNLOAD +'}</button></li>
                      {showDownload && film.download && <a
                        href={film.download}
                        target="_blank" rel="noopener, noreferrer"
                        onClick={() => handleDownload(film.download,)}
                      >{film.title}</a>}
                    </>
                  )}
                </div>
                <div className='button-showClick'>
                  {film.crew && (
                    <>
                      <li>
                        <button onClick={handleClickCrew}>{showCrew ? 'CREW' : 'CREW +'}</button></li>
                      {showCrew && <li>{film.crew}</li>}
                    </>
                  )}
                </div>
              </ul>



              <ul className='ul-right'>
                {film.synopsis && (
                  <>
                    <li>
                      <h5 className='FilmDetails-synopsis-h5'>SYNOPSIS</h5>
                    </li>
                    <li>
                      {film.synopsis}
                    </li>
                  </>
                )}
                {film.festivalsAndAwards && (
                  <>
                    <li>
                      <h5 className='FilmDetails-festivalsAndAwards-h5'>FESTIVALS & AWARDS</h5>
                    </li>
                    <li>
                      {film.festivalsAndAwards}
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