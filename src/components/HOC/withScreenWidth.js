import React, { useEffect, useState } from 'react';

export const BREAKPOINTS = {
  TABLET: 767,
  LAPTOP: 1023,
  DESKTOP: 1439,
};

export const BREAKPOINT_NAMES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  LAPTOP: 'laptop',
  DESKTOP: 'desktop',
};

export const withScreenWidth = WrappedComponent => props => {
  const [screenWidth, setScreenWidth] = useState(BREAKPOINT_NAMES.DESKTOP);

  const onWindowResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < BREAKPOINTS.TABLET) {
      return setScreenWidth(BREAKPOINT_NAMES.MOBILE);
    }

    if (screenWidth < BREAKPOINTS.LAPTOP) {
      return setScreenWidth(BREAKPOINT_NAMES.TABLET);
    }

    if (screenWidth < BREAKPOINTS.DESKTOP) {
      return setScreenWidth(BREAKPOINT_NAMES.LAPTOP);
    }

    return setScreenWidth(BREAKPOINT_NAMES.DESKTOP);
  };

  useEffect(() => {
    onWindowResize();

    window.addEventListener('resize', onWindowResize);

    return () => window.removeEventListener('resize', onWindowResize);
  });

  return <WrappedComponent screenWidth={screenWidth} {...props} />;
};

withScreenWidth.displayName = 'withScreenWidth';
