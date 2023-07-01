import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myApi from '../../service/service';
import Spinner from '../../components/Spinner/Spinner';
import './FilmPage.css';
import ScrollToTop from '../../components/ScrollToTop';
import FadeIn from '../../components/FadeIn/FadeIn';

const FilmPageEn = () => {
  const [films, setFilms] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    scrollTo(0, 0)
    myApi.get(`/en/films`).then((response) => {
      const englishArray = []
      response.data.map((oneData) => {
        englishArray.push(oneData)
      })
      setFilms(englishArray);
      setLoading(false)
    }).catch((error) => {
      console.error(error)
      setFilms([]);
    })
  }, []);

  // useEffect(() => {
  //   if (films) {
  //     films.forEach((film) => {
  //       console.log(film)
  //     });
  //   }
  // }, [films]);

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
                  {films && films.map((film) => (
                    < div className='FilmPage-content' key={film._id} >
                      <Link to={`/films/${film.french._id}/en`}>
                        <div className='FilmPage-position'>
                          {/* <picture>
                            {film && film.images.length ? (
                              <img src={`${film.images[0]}`} alt={film.title} className='film-image' />
                            ) : ('')}
                          </picture> */}
                          <picture style={{ display: 'inline-block', margin: '0 auto', overflow: 'hidden', cursor: 'pointer' }}>
                            {film.images.length ? (
                              <>
                                {/* <source media="(max-width: 400px)" srcSet={`${film.images[0].replace("/upload/", "/upload/w_350/")} 350w`} /> */}
                                {/* <source media="(max-width: 992px)" srcSet={`${film.images[0].replace("/upload/", "/upload/w_942/")} 942w`} />
                                <source media="(max-width: 1350px)" srcSet={`${film.images[0].replace("/upload/", "/upload/w_578/")} 578w`} /> */}
                                <img
                                  src={`${film.images[0].replace("/upload/", "/upload/w_400/")}`}
                                  alt={film.title}
                                  className="film-image"
                                  style={{ quality: 10, aspectRatio: "16/9", objectFit: 'cover', transform: 'scale(1.1)', objectPosition: '100% 100%', transitionDuration: '0.5s' }}
                                // loading="lazy"
                                />
                              </>
                            ) : null}
                          </picture>
                          <div className='film-title'>
                            <h4>{film && film.title.toUpperCase()}</h4>
                            <h6>by {film && film.directedBy}</h6>
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
    </FadeIn >
  );
};

export default FilmPageEn;