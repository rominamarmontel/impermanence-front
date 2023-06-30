import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myApi from '../../service/service';
import Spinner from '../../components/Spinner/Spinner';
import './FilmPage.css';
import ScrollToTop from '../../components/ScrollToTop';
import FadeIn from '../../components/FadeIn/FadeIn';

const FilmPage = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  useEffect(() => {
    myApi.get(`/films`).then((response) => {
      setFilms(response.data);
    });
  }, []);

  const groupedFilms = films.reduce((result, film) => {
    const category = film.category || 'defaultCategory';
    if (result[category]) {
      result[category].push(film);
    } else {
      result[category] = [film];
    }
    return result;
  }, {});

  const categoryOrder = ['encours', 'production', 'distribution', 'programmation'];

  for (const category in groupedFilms) {
    groupedFilms[category].sort((a, b) => {
      if (a.createdYear !== b.createdYear) {
        return b.createdYear - a.createdYear;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  }

  if (!films || !films.length) {
    return <Spinner />;
  }

  const displayCategory = (category) => {
    switch (category) {
      case 'encours':
        return 'en cours';
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

  const formatDirectorName = (directorName) => {
    return /^[aeiouœ]/i.test(directorName) ? `d'${directorName}` : `de ${directorName}`;
  };

  return (
    <FadeIn>
      <section className='FilmPage'>
        <div className='FilmPage-container'>
          {categoryOrder && categoryOrder.map((category) => {
            const films = groupedFilms[category] || [];
            return (
              <div key={category} id={category} className='category-section' >
                <h2 className='category-title'>{displayCategory(category)}</h2>
                <div className='FilmPage-category'>
                  {films.map((film) => (
                    <div className='FilmPage-content' key={film._id}>
                      {/* <Link to={`/films/${film._id}#${categorie}`}> */}
                      <Link to={`/films/${film._id}`}>
                        <div className='FilmPage-position'>
                          {/* <picture>
                            {film.images.length ? (
                              <img src={`${film.images[0]}`} alt={film.title} className='film-image' style={{ quality: 10 }} />
                            ) : ('')}
                          </picture> */}
                          <picture>
                            {film.images.length ? (
                              <img
                                src={`${film.images[0]}`}
                                srcSet={`${film.images[0].replace("/upload/", "/upload/w_350/")} 350w,
                ${film.images[0].replace("/upload/", "/upload/w_578/")} 578w,
                ${film.images[0].replace("/upload/", "/upload/w_942/")} 942w`}
                                sizes="
        (max-width: 400px) 350px,
        (max-width: 992px) 942px,
        578px
      "
                                alt={film.title}
                                className="film-image"
                                style={{ quality: 10 }}
                              />
                            ) : ('')}
                          </picture>
                          <div className='film-title'>
                            <h4>{film.title.toUpperCase()}</h4>
                            <h6>{formatDirectorName(film.directedBy)}</h6>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
        <ScrollToTop />
      </section >
    </FadeIn>
  );
};

export default FilmPage;