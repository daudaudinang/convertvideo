import PropTypes from 'prop-types';
import React from 'react';
import './Banner.scss';

Banner.propTypes = {
  title: PropTypes.string,
  backgroundUrl: PropTypes.string,
  message: PropTypes.string
};

Banner.defaultProps = {
  title: '',
  backgroundUrl: '',
  message:''
}

function Banner(props) {
  const { title, backgroundUrl, message } = props;

  const bannerStyle = backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : {}

  return (
    <section className="banner" style={bannerStyle}>
      <h1 className="banner__title">{title}</h1>
      <p>{message}</p>
    </section>
  );
}

export default Banner;