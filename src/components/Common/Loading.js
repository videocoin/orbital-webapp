import React from 'react';
import PropTypes from 'prop-types';
import { BodyAlt, Caption, OverlayContainer } from '../../styles';
import { COLORS, OPACITY } from '../../styles/vars';
import styled from 'styled-components';

export const LoadingBackground = styled(OverlayContainer)`
  background-color: ${COLORS.PURPLE_BLACK2};
  opacity: ${OPACITY.MID};
  z-index: 700;
`;

export const LoadingText = styled(OverlayContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 800;
`;

export const LoadingIcon = styled.div`
  .circle {
    margin: 0 auto;
    background-color: ${COLORS.WHITE};
    border-radius: 50%;
  }

  .smallCircle {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
  }

  .largeCircle {
    width: 28px;
    height: 28px;
    margin-bottom: 15px;
  }
`;

export const Loading = ({ title = 'Loading', text = '' }) => {
  const TitleText = BodyAlt('p', COLORS.WHITE);
  const Text = Caption('p', COLORS.WHITE);
  return (
    <>
      <LoadingBackground />
      <LoadingText>
        <div>
          <LoadingIcon>
            <div className="smallCircle circle" />
            <div className="largeCircle circle" />
          </LoadingIcon>
          <TitleText>{title}</TitleText>
          {text && <Text>{text}</Text>}
        </div>
      </LoadingText>
    </>
  );
};

Loading.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};
