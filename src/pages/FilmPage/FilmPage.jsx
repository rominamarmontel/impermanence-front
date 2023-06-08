import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myApi from '../../service/service';
import Spinner from '../../components/Spinner';
import './FilmPage.css';
import ScrollToTop from '../../components/ScrollToTop';

const FilmPage = () => {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    myApi.get(`/films`).then((response) => {
      setFilms(response.data);
    });
  }, []);

  const groupedFilms = films.reduce((result, film) => {
    const category = film.categorie || 'defaultCategory';
    if (result[category]) {
      result[category].push(film);
    } else {
      result[category] = [film];
    }
    return result;
  }, {});

  const categoryOrder = ['travail-en-cours', 'production', 'distribution', 'programmation'];

  for (const category in groupedFilms) {
    groupedFilms[category].sort((a, b) => {
      if (a.anneeDeCreation !== b.anneeDeCreation) {
        return b.anneeDeCreation - a.anneeDeCreation;
      } else {
        return a.titre && b.titre ? a.titre.localeCompare(b.titre) : 0;
      }
    });
  }

  if (films === null) {
    return <Spinner />;
  }
  return (
    <section className='FilmPage'>
      <div className='FilmPage-container'>
        {categoryOrder.map((categorie) => {
          const films = groupedFilms[categorie] || [];
          return (
            <div key={categorie} id={categorie} className='category-section' >
              <h2 className='category-title'>{categorie.toLowerCase()}</h2>
              <div className='FilmPage-category'>
                {films.map((film) => (
                  <div className='FilmPage-content' key={film._id}>
                    <Link to={`/films/${film._id}#${categorie}`}>
                      <div className='FilmPage-position'>
                        <picture>
                          {film.images.length ? (
                            <img src={`${film.images[0]}`} alt={film.titre} className='film-image' />
                          ) : ('')}
                        </picture>
                        <div className='film-title'>
                          <h4>{film.titre}</h4>
                          <h6>de {film.realisePar}</h6>
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
  );
};

export default FilmPage;