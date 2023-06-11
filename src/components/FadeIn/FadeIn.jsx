import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FadeIn.css'; // フェードインのCSSをインポート

const FadeIn = ({ children }) => {
  const location = useLocation();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, [location]);

  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
      {children}
    </div>
  );
};
FadeIn.propTypes = {
  children: PropTypes.node.isRequired
};

export default FadeIn;