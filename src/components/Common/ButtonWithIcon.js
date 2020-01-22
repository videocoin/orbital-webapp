import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ButtonOuter, getButtonText } from './Button';

const Outer = styled(ButtonOuter)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  margin-left: -30px;
  margin-right: 30px;
  img {
    width: 100%;
  }
`;

export const ButtonWithIcon = ({
  text,
  handleClick = () => {},
  theme = 'main',
  size = 'med',
  disabled = false,
  href = '',
  icon,
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
      <Icon>
        <img src={icon} alt="icon" />
      </Icon>
      <ButtonText>{text}</ButtonText>
      <div></div>
    </Outer>
  );
};

ButtonWithIcon.defaultProps = {
  theme: 'main',
  size: 'med',
  handleClick: () => {},
};

ButtonWithIcon.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  theme: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.string.isRequired,
};
