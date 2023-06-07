import { useEffect } from 'react';
import Swiper, { Autoplay, Pagination, EffectFade } from 'swiper';
import 'swiper/swiper-bundle.css';
import PropTypes from 'prop-types';

const SwiperComponent = ({ images }) => {
  useEffect(() => {
    Swiper.use([Autoplay, Pagination, EffectFade]);
    new Swiper('.swiper-container', {
      loop: true,
      effect: 'fade',
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      speed: 2000,
      pagination: {
        el: '.swiper-pagination',
        clickable: false,
      },
    });
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {images.map((image, index) => (
          <div className="swiper-slide" key={index}>
            <div className="slide-img">
              <img src={image} alt={`img${index}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};
SwiperComponent.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default SwiperComponent;