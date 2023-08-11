import PropTypes from 'prop-types'
import '../pages/FilmPage/FilmPage.css'

const FilmContent = ({ film }) => {
  if (!film || !film.thumbnailImages || !film.thumbnailImages[0]) {
    return <div>No Thumbnail Available</div>;
  }
  const pcImage = film.thumbnailImages[0].replace('/upload/', '/upload/w_400/')
  const tabletteImage = film.thumbnailImages[0].replace('/upload/', '/upload/w_942/')
  // const mobileImage = film.thumbnailImages[0].replace('/upload/', '/upload/w_320/')

  return (
    <div>
      <picture>
        <img
          src={film.thumbnailImages[0]}
          alt={film.title}
          // srcSet={`${mobileImage} 320w, ${pcImage} 400w, ${tabletteImage} 942w`}
          srcSet={`${pcImage} 400w, ${tabletteImage} 942w`}
          sizes="(min-width: 1351px) 400px, (min-width: 992px) 600px, (max-width: 992px) 942px, 400px"
          className='film-image'
        />
      </picture>
    </div>
  )
}
FilmContent.propTypes = {
  film: PropTypes.shape({
    thumbnailImages: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
  }).isRequired
};
export default FilmContent