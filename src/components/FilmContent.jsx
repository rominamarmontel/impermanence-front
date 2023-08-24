import PropTypes from 'prop-types'
import '../pages/FilmPage/FilmPage.css'

const FilmContent = ({ film }) => {
  if (!film || !film.thumbnailImages || !film.thumbnailImages[0]) {
    return <div>No Thumbnail Available</div>;
  }
  const thumbnailImage = film.thumbnailImages[0];
  // const pcImage = film.thumbnailImages[0].replace('/upload/', '/upload/w_400/')
  // const tabletteImage = film.thumbnailImages[0].replace('/upload/', '/upload/w_942/')

  return (
    <div>
      <picture>
        <img
          src={thumbnailImage}
          alt={film.title}
          className='film-image'
        // srcSet={`${pcImage} 400w, ${tabletteImage} 942w`}
        // sizes="(min-width: 1351px) 400px, (min-width: 992px) 600px, (max-width: 992px) 942px, 400px"
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