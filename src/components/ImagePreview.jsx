import PropTypes from 'prop-types';

const ImagePreview = ({ imageUrl }) => {
  if (!imageUrl) {
    return null;
  }
  return <img src={imageUrl} alt="Preview" style={{ width: '200px', height: 'auto' }} />;
};
ImagePreview.propTypes = {
  imageUrl: PropTypes.string,
};
export default ImagePreview;