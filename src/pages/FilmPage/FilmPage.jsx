import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import myApi from '../../service/service';
import Spinner from '../../components/Spinner/Spinner';
import './FilmPage.css';
import ScrollToTop from '../../components/ScrollToTop';
import FadeIn from '../../components/FadeIn/FadeIn';
import { Image, Transformation } from 'cloudinary-react';


const FilmPage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true)
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME

  useEffect(() => {
    scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await myApi.get(`/films`);
        setFilms(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <FadeIn>
      <section className='FilmPage'>
        <div className='FilmPage-container'>
          {categoryOrder && categoryOrder.map((category) => {
            const films = groupedFilms[category] || [];
            return (
              <div key={category} id={category} className='category-section'>
                <h2 className='category-title'>{displayCategory(category)}</h2>
                <div className='FilmPage-category'>
                  {films.map((film) => (
                    <div className='FilmPage-content' key={film._id}>
                      <Link to={`/films/${film._id}`}>
                        <div>
                          <div
                            className='FilmPage-position'
                            style={{
                              display: 'inline-block',
                              margin: '0 auto',
                              overflow: 'hidden',
                              cursor: 'pointer',
                              // aspectRatio: '16/9'
                            }}
                          >
                            <Image
                              cloudName={CLOUD_NAME}
                              secure={true}
                              upload_preset="my_unsigned_preset"
                              publicId={film.images[0]}
                              style={{
                                maxWidth: '100%',
                                objectFit: 'cover',
                                transform: 'scale(1.1)',
                                objectPosition: '100% 100%',
                                transitionDuration: '0.5s'
                              }}
                            >
                              <Transformation width="400" height="225" crop="scale" />
                            </Image>
                          </div>
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
      </section>
    </FadeIn>
  );
};

export default FilmPage;