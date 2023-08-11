import PropTypes from 'prop-types'

const FilmContent = ({ film }) => {
  if (!film || !film.thumbnailImages || !film.thumbnailImages[0]) {
    return <div>No Thumbnail Available</div>;
  }
  return (
    <div>
      <picture>
        <source media="(min-width: 1351px)" srcSet={`${film.thumbnailImages[0].replace('/upload/', '/upload/w_400/')} 400w`} />
        <source media="(max-width: 992px)" srcSet={`${film.thumbnailImages[0].replace('/upload/', '/upload/w_942/')} 942w`} />
        <source media="(max-width: 414px)" srcSet={`${film.thumbnailImages[0].replace('/upload/', '/upload/w_320/')} 320w`} />
        <img
          src={film.thumbnailImages[0]}
          alt={film.title}
          style={{
            quality: 10,
            aspectRatio: '16/9',
            objectFit: 'cover',
            transform: 'scale(1.1)',
            objectPosition: '100% 100%',
            transitionDuration: '0.5s',
            width: '100%',
            height: 'auto',
            marginBottom: 12
          }}
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