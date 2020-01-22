import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { OverlayContainer, BodyAlt } from '../../styles';
import { OPACITY, COLORS } from '../../styles/vars';
import { Button } from './Button';

const ModalContainer = styled(OverlayContainer)`
  z-index: 500;
`;

const ModalBackground = styled(OverlayContainer)`
  z-index: 600;
  opacity: ${OPACITY.MID};
  background-color: ${COLORS.PURPLE_BLACK2};
`;

const ModalInner = styled.div`
  position: relative;
  z-index: 1000;
  margin: 0 auto;
  top: 30%;
  padding: 20px;
  height: auto;
  width: 259px;
  background-color: ${COLORS.WHITE2};
  border-radius: 20px;
  box-shadow: 0 16px 24px 0 rgba(26, 24, 37, 0.25);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  button {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const TitleText = styled(BodyAlt('p'))`
  padding-bottom: 15px;
  text-align: center;
`;

const BodyText = styled.p`
  padding-bottom: 15px;
`;

export const Modal = ({
  title,
  text = '',
  buttonText = '',
  handleButtonClick = () => {},
  secondaryButtonText = '',
  handleSecondaryButtonClick = () => {},
  handleClose,
}) => {
  return (
    <ModalContainer>
      <ModalBackground onClick={handleClose} />
      <ModalInner>
        <TitleText>{title}</TitleText>
        <BodyText>{text}</BodyText>
        <ButtonWrapper>
          {secondaryButtonText && (
            <Button
              handleClick={handleSecondaryButtonClick}
              text={secondaryButtonText}
              theme="minimalBlack"
              size="half"
            />
          )}
          {buttonText && (
            <Button
              handleClick={handleButtonClick}
              text={buttonText}
              size={secondaryButtonText ? 'half' : 'full'}
            />
          )}
        </ButtonWrapper>
      </ModalInner>
    </ModalContainer>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  buttonText: PropTypes.string,
  handleButtonClick: PropTypes.func,
  secondaryButtonText: PropTypes.string,
  handleSecondaryButtonClick: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
};
