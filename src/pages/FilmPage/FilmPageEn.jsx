import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myApi from '../../service/service';
import Spinner from '../../components/Spinner/Spinner';
import './FilmPage.css';
import ScrollToTop from '../../components/ScrollToTop';

const FilmPageEn = () => {
  const [films, setFilms] = useState(null);
  const [loading, setLoading] = useState(true)

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
    <section className='FilmPage'>
      <div className='FilmPage-container'>
        {categoryOrder.map((category) => (
          <div key={category} id={category} className='category-section'>
            <h2 className='category-title'>{displayCategory(category)}</h2>
            <div className='FilmPage-category'>
              {groupedFilms[category]?.map((film) => (
                < div className='FilmPage-content' key={film._id} >
                  <Link to={`/films/${film.french}/en`}>
                    <div className='FilmPage-position'>
                      <picture>
                        <div className='film-imagebg'>
                          <img
                            src={film.thumbnailImages[0]}
                            alt={film.title}
                            className='film-image'
                          />
                        </div>
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
        ))}
      </div>
      <ScrollToTop />
    </section >
  );
};

export default FilmPageEn;