import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myApi from '../../service/service';
import Spinner from '../../components/Spinner/Spinner';
import './FilmPage.css';
import ScrollToTop from '../../components/ScrollToTop';
import FadeIn from '../../components/FadeIn/FadeIn';
// import { Image, Transformation } from 'cloudinary-react';

const FilmPageEn = () => {
  const [films, setFilms] = useState(null);
  const [loading, setLoading] = useState(true)
  // const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME

  useEffect(() => {
    scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await myApi.get(`/en/films`);
        const englishArray = response.data.map((oneData) => oneData);
        setFilms(englishArray);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setFilms([]);
      }
    };

    fetchData();
  }, []);

  const groupedFilms = films ? films.reduce((result, film) => {
    const category = film.category;
    if (category) {
      if (result[category]) {
        result[category].push(film);
      } else {
        result[category] = [film];
      }
    }
    return result;
  }, {}) : {}

  const categoryOrder = ['inprogress', 'production', 'distribution', 'programmation'];

  for (const category in groupedFilms) {
    groupedFilms[category].sort((a, b) => {
      if (a.createdYear !== b.createdYear) {
        return b.createdYear - a.createdYear;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  }

  if (loading) {
    return <Spinner />;
  }

  const displayCategory = (category) => {
    switch (category) {
      case 'inprogress':
        return 'in progress';
      case 'production':
        return 'production';
      case 'distribution':
        return 'distribution';
      case 'programmation':
        return 'programmation';
      default:
        return '';
    }
  };
  return (
    <FadeIn>
      <section className='FilmPage'>
        <div className='FilmPage-container'>
          {categoryOrder.map((category) => {
            const films = groupedFilms[category] || [];
            return (
              <div key={category} id={category} className='category-section' >
                <h2 className='category-title'>{displayCategory(category)}</h2>
                <div className='FilmPage-category'>
                  {films && films.map((film) => {
                    if (!film || !film._id || !film.french) return null;
                    return (
                      < div className='FilmPage-content' key={film._id} >
                        <Link to={`/films/${film._id}`}>
                          <div className='FilmPage-position' style={{ display: 'block', margin: '0 auto', overflow: 'hidden', cursor: 'pointer', }}>
                            <div >
                              <picture >
                                <source
                                  media="(max-width: 1350px)"
                                  srcSet={`${film.thumbnailImages[0].replace('/upload/', '/upload/w_577/')} 577w`}
                                />
                                <source
                                  media="(min-width: 1351px)"
                                  srcSet={`${film.thumbnailImages[0].replace('/upload/', '/upload/w_400/')} 400w`}
                                />
                                <img
                                  src={film.thumbnailImages[0]}
                                  alt={film.title}
                                  style={{
                                    quality: 10, aspectRatio: '16/9', objectFit: 'cover', transform: 'scale(1.1)', objectPosition: '100% 100%', transitionDuration: '0.5s', width: '100%', height: 'auto', marginBottom: 12
                                  }}
                                />
                              </picture>
                            </div>
                            <div className='film-title'>
                              <h4>{film && film.title.toUpperCase()}</h4>
                              <h6>by {film && film.directedBy}</h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <ScrollToTop />
      </section >
    </FadeIn >
  );
};

export default FilmPageEn;