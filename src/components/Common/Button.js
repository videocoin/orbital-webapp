import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS, OPACITY } from '../../styles/vars';
import { ButtonTitle } from '../../styles';

const themes = {
  main: {
    background: COLORS.RED,
    text: COLORS.WHITE,
    opacity: 1,
  },
  minimal: {
    background: 'transparent',
    border: 'none',
    text: COLORS.RED,
    opacity: 1,
    padding: 0,
  },
  minimalBlack: {
    background: 'transparent',
    text: COLORS.PURPLE_BLACK2,
    opacity: 1,
    padding: 0,
  },
  purple: {
    background: COLORS.PURPLE,
    text: COLORS.WHITE,
    opacity: 1,
  },
  disabled: {
    background: COLORS.WHITE,
    text: COLORS.PURPLE_BLACK2,
    opacity: OPACITY.LIGHT,
  },
};

const sizes = {
  xs: {
    padding: '10px',
    width: 'auto',
  },
  sm: {
    padding: '10px 40px',
    width: 'auto',
    borderRadius: '20px',
  },
  med: {
    padding: '12px 60px',
    width: 'auto',
    borderRadius: '30px',
  },
  lrg: {
    padding: '18px 60px',
    width: 'auto',
    borderRadius: '36px',
  },
  full: {
    padding: '18px 60px',
    width: '100%',
    borderRadius: '36px',
  },
  half: {
    padding: '12px 20px',
    width: '50%',
    borderRadius: '36px',
  },
  minimal: {
    padding: 0,
    width: 'auto',
  },
};

export const ButtonOuter = styled.button`
  justify-content: space-between;
  padding: ${props => sizes[props.size].padding};
  width: ${props => sizes[props.size].width};
  background-color: ${props => themes[props.theme].background};
  border-radius: ${props => sizes[props.size].borderRadius};
  border: none;
  ${props => props.styles}

  &:disabled {
    background-color: ${COLORS.WHITE};
    opacity: 0.4;

    p {
      color: ${COLORS.PURPLE_BLACK2};
    }
  }
`;

const Outer = styled(ButtonOuter)`
  display: inline;
`;

export const getButtonText = theme => ButtonTitle('p', themes[theme].text);

export const Button = ({
  text,
  handleClick = () => {},
  theme = 'main',
  size = 'med',
  disabled = false,
  href = '',
}) => {
  const buttonTheme = disabled ? 'disabled' : theme;
  const ButtonText = getButtonText(buttonTheme);

  return (
    <Outer
      onClick={handleClick}
      theme={buttonTheme}
      size={size}
      disabled={disabled}
      href={href}
    >
      <ButtonText>{text}</ButtonText>
    </Outer>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  theme: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
};
