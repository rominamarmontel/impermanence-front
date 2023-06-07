import Spinner from "./Spinner"

const FilmCard = ({ film }) => {
  console.log(film)
  return (
    <div className='FilmCard'>
      {film ? (
        <>
          <img src={film.image} alt={film.title} width={450} height={250} />
          <h4>{film.title}</h4>
          <h5>by {film.directedBy}</h5>
        </>

      ) : (<div><Spinner /></div>)}
    </div>
  )
}

export default FilmCard