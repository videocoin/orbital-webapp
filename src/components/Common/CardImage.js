import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { getImage } from '../../utils';

const isImageValid = src => {
  let promise = new Promise(resolve => {
    let img = document.createElement('img');
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
    img.src = src;
  });

  return promise;
};

export const CardImage = ({ src = '', alt = '', StyledComponent = 'div' }) => {
  const imgEl = useRef(null);
  const fallbackSrc = getImage('placeholder.jpg');

  useEffect(() => {
    isImageValid(src).then(isValid => {
      if (!isValid && imgEl && imgEl.current) {
        imgEl.current.src = fallbackSrc;
      }
    });
  }, [fallbackSrc, src]);

  if (!src) {
    return <StyledComponent alt={alt} ref={imgEl} src={fallbackSrc} />;
  }

  return <StyledComponent alt={alt} ref={imgEl} src={src} />;
};

CardImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  StyledComponent: PropTypes.object,
};
