import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myApi from '../../service/service';
import Spinner from '../../components/Spinner';
import './FilmPage';
import Fade from 'react-reveal/Fade';
import ScrollToTop from '../../components/ScrollToTop';

const FilmPageEn = () => {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    myApi.get(`/en/films`).then((response) => {
      setFilms(response.data);
    });
  }, []);

  const groupedFilms = films.reduce((result, film) => {
    const category = film.category;
    if (result[category]) {
      result[category].push(film);
    } else {
      result[category] = [film];
    }
    return result;
  }, {});

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
    <section className='FilmPage'>
      <div className='FilmPage-container'>
        {categoryOrder.map((category) => {
          const films = groupedFilms[category] || [];
          return (
            <div key={category} id={category} className='category-section' >
              <Fade left>
                <h2 className='category-title'>{category.toLowerCase()}</h2>
              </Fade>
              <div className='FilmPage-category'>
                {films.map((film) => (
                  <div className='FilmPage-content' key={film._id}>
                    <Link to={`/en/films/${film._id}#${category}`}>
                      <Fade bottom>
                        <div className='FilmPage-position'>
                          <picture>
                            {film.images.length ? (
                              <img src={`${film.images[0]}`} alt={film.title} className='film-image' />
                            ) : ('')}
                          </picture>
                          <div className='film-title'>
                            <h4>{film.title}</h4>
                            <h6>by {film.directedBy}</h6>
                          </div>
                        </div>
                      </Fade>
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
  );
};

export default FilmPageEn;