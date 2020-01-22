import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getImage } from '../../utils';
import {
  InputLabel,
  InputArea,
  InputWrapper,
  InputCaption,
} from './TitleLiveCastStyles';
import {
  Header,
  PageTitle,
  BackButton,
  Placeholder,
} from './SharedLiveCastStyles';
import { BottomWrapper } from '../../styles';
import { Button } from '../Common/Button';

export const TitleLiveCast = ({ handleNextClick, handleClose }) => {
  const [title, setTitle] = useState('');

  const handleChange = e => {
    const value = e.target.value.replace(/[^a-zA-Z0-9_!?()\-\s]/g, '');
    setTitle(value);
  };

  return (
    <>
      <Header>
        <PageTitle>Start Live Cast</PageTitle>
      </Header>
      <InputWrapper>
        <InputLabel>Give your live cast a title</InputLabel>
        <InputArea
          type="text"
          maxLength="20"
          value={title}
          onChange={handleChange}
        />
        <InputCaption>{title.length}/20 characters</InputCaption>
      </InputWrapper>
      <BottomWrapper>
        <BackButton onClick={handleClose}>
          <img src={getImage('icons/backArrow.png')} alt="Back" />
        </BackButton>
        <Button
          text="Next"
          size="med"
          disabled={!title.length}
          handleClick={() => handleNextClick(title)}
        />
        <Placeholder />
      </BottomWrapper>
    </>
  );
};

TitleLiveCast.propTypes = {
  handleNextClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
