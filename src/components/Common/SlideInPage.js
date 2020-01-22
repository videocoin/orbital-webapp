import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CSSTransition } from 'react-transition-group';
import { OverlayContainer } from '../../styles';
import { COLORS } from '../../styles/vars';

const PageOuter = styled.div`
  .slide-in-enter {
    transform: translateX(100%);
  }
  .slide-in-enter-active {
    transform: translateX(0%);
    transition: transform 200ms ease-in-out;
  }
  .slide-in-exit {
    transform: translateX(0%);
  }
  .slide-in-exit-active {
    transform: translateX(100%);
    transition: transform 200ms ease-in-out;
  }
`;

const PageInner = styled(OverlayContainer)`
  padding: ${props => props.padding};
  background-color: ${props => props.background};
  z-index: 4000;
  text-align: center;
`;

export const SlideInPage = ({
  timeout = 200,
  open = false,
  background = COLORS.PURPLE_BLACK2,
  children,
  padding,
}) => {
  return (
    <PageOuter>
      <CSSTransition
        in={open}
        timeout={timeout}
        unmountOnExit
        classNames="slide-in"
      >
        <PageInner padding={padding} background={background}>{children}</PageInner>
      </CSSTransition>
    </PageOuter>
  );
};

SlideInPage.propTypes = {
  timeout: PropTypes.number,
  open: PropTypes.bool,
  background: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  padding: PropTypes.string,
};
