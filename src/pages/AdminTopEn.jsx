import { useEffect, useState } from 'react'
import myApi from '../service/service'
import Spinner from '../components/Spinner/Spinner'
import { Link } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'

const AdminTop = () => {
  const [films, setFilms] = useState([])

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  useEffect(() => {
    myApi.get('/en/films').then((response) => {
      setFilms(response.data)
      console.log(response.data)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  const groupedFilms = films.reduce((result, film) => {
    const category = film.category;
    if (result[category]) {
      result[category].push(film);
    } else {
      result[category] = [film];
    }
    return result;
  }, []);

  const categoryOrder = ['work-in-progress', 'production', 'distribution', 'programmation'];


  return (

    <section className='AdminTop' style={{ paddingTop: '5rem', paddingBottom: '5rem', width: '100vw', display: 'flex', justifyContent: 'center' }}>

      <div style={{ border: '1px solid var(--color-gray7)', margin: '5rem', padding: 30, borderRadius: '10px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src='https://cdn.icon-icons.com/icons2/3665/PNG/512/gb_flag_great_britain_england_union_jack_english_icon_228674.png' alt='England' width={72} height={54} />
            <Link to='/admin/top' style={{ color: 'var(--color-pink)', padding: 10, textDecoration: 'underline' }}>FRENCH</Link>
          </div>
          <h3 style={{ display: 'flex', justifyContent: 'center', marginBottom: 15, fontFamily: 'Source Sans Pro', fontWeight: 600, fontSize: 30 }}> Admin Top Page</h3>
          <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'center', gap: 30 }}>
            <Link to='/admin/en/films/create' style={{ padding: 10, textDecoration: 'underline' }}>Create a new film</Link>
          </div>

          {categoryOrder.map((category) => {
            const films = groupedFilms[category] || [];
            return (
              <div key={category} id={category} style={{ marginBottom: 50, border: '1px solid var(--color-gray8)', borderRadius: 10 }} >
                <h3 style={{ backgroundColor: 'var(--color-gray8)', color: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20 }}>{category.toUpperCase()}</h3>
                {films ? (
                  <ul style={{ padding: 20, backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                    {films.map((film) => (
                      <div key={film._id}>
                        <li style={{ lineHeight: 2 }}>
                          <Link to={`/admin/en/films/edit/${film._id}`}>
                            {film.title}
                          </Link>
                        </li>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <Spinner />
                )}
              </div>
            )
          })}
          <ScrollToTop />
        </div>
      </div>
    </section >
  )
}

export default AdminTop