import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myApi from '../../service/service';
import Spinner from '../../components/Spinner/Spinner';
import './FilmPage';
import ScrollToTop from '../../components/ScrollToTop';
import FadeIn from '../../components/FadeIn/FadeIn';

const FilmPageEn = () => {
  const [films, setFilms] = useState(null);

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  useEffect(() => {
    myApi.get(`/en/films`).then((response) => {
      setFilms(response.data);
    }).catch((error) => {
      console.error(error)
      setFilms([]);
    })
  }, []);

  // useEffect(() => {
  //   if (films) {
  //     films.forEach((film) => {
  //       console.log(film.english[0])
  //     });
  //   }
  // }, [films]);

  const groupedFilms = films ? films.reduce((result, film) => {
    const category = film.english[0].category;
    if (result[category]) {
      result[category].push(film);
    } else {
      result[category] = [film];
    }
    return result;
  }, {}) : {}

  const categoryOrder = ['work-in-progress', 'production', 'distribution', 'programmation'];

  for (const category in groupedFilms) {
    groupedFilms[category].sort((a, b) => {
      if (a.createdYear !== b.createdYear) {
        return b.createdYear - a.createdYear;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  }

  if (films === null) {
    return <Spinner />;
  }

  return (
    <FadeIn>
      <section className='FilmPage'>
        <div className='FilmPage-container'>
          {categoryOrder.map((category) => {
            const films = groupedFilms[category] || [];
            return (
              <div key={category} id={category} className='category-section' >
                <h2 className='category-title'>{category.toLowerCase()}</h2>
                <div className='FilmPage-category'>
                  {films && films.map((film) => (
                    < div className='FilmPage-content' key={film._id} >
                      <Link to={film._id ? `/films/${film._id}/en` : '#'}>
                        <div className='FilmPage-position'>
                          <picture>
                            {film.english[0] && film.english[0].images.length ? (
                              <img src={`${film.english[0].images[0]}`} alt={film.title} className='film-image' />
                            ) : ('')}
                          </picture>
                          <div className='film-title'>
                            <h4>{film.english[0] && film.english[0].title.toUpperCase()}</h4>
                            <h6>by {film.english[0] && film.english[0].directedBy}</h6>
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