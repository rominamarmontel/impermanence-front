import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myApi from '../../service/service';
import Spinner from '../../components/Spinner/Spinner';
import './FilmPage.css';
import ScrollToTop from '../../components/ScrollToTop';
import FadeIn from '../../components/FadeIn/FadeIn';
import FilmContent from '../../components/FilmContent';

const FilmPage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true)
  // const LazyFilmContent = lazy(() => import('../../components/FilmContent'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myApi.get(`/films`);
        setFilms(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const groupedFilms = {};
  films.forEach((film) => {
    const category = film.category || 'defaultCategory';
    if (!groupedFilms[category]) {
      groupedFilms[category] = [];
    }
    groupedFilms[category].push(film);
  });

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
    return /^[aeiou\u0153]/i.test(directorName) ? `d'${directorName}` : `de ${directorName}`;
  };

  return (
    <FadeIn>
      <section className='FilmPage'>
        <div className='FilmPage-container'>
          {categoryOrder.map((category) => (
            <div key={category} id={category} className='category-section'>
              <h2 className='category-title'>{displayCategory(category)}</h2>
              <div className='FilmPage-category'>
                {groupedFilms[category]?.map((film) => (
                  <div className='FilmPage-content' key={film._id}>
                    <Link to={`/films/${film._id}`}>
                      <div className='FilmPage-position'>
                        <FilmContent film={film} />
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
          ))}
        </div>
        <ScrollToTop />
      </section>
    </FadeIn>
  );
};

export default FilmPage;