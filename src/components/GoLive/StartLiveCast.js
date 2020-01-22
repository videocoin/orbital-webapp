import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { COLORS } from '../../styles/vars';
import { getImage } from '../../utils';
import { ButtonWrapper } from './StartLiveCastStyles';
import { SlideInPage } from '../Common/SlideInPage';
import { ButtonWithIcon } from '../Common/ButtonWithIcon';
import { CreateLiveCast } from './CreateLiveCast';
import { TitleLiveCast } from './TitleLiveCast';
import { BREAKPOINT_NAMES, withScreenWidth } from '../HOC/withScreenWidth';

export const StartLiveCastInner = ({ screenWidth, user }) => {
  const [titleOpen, setTitleOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [title, setTitle] = useState('');

  const isDesktop =
    screenWidth === BREAKPOINT_NAMES.LAPTOP ||
    screenWidth === BREAKPOINT_NAMES.DESKTOP;

  const handleTitleNextClick = titleVal => {
    setCreateOpen(true);
    setTitle(titleVal);
  };

  const handleAllClose = () => {
    setTitleOpen(false);
    setCreateOpen(false);
  };

  return (
    <div>
      <ButtonWrapper>
        <ButtonWithIcon
          icon={getImage('icons/shutter.png')}
          handleClick={() => setTitleOpen(true)}
          text="Start Live Cast"
          theme="purple"
          size={isDesktop ? 'lrg' : 'full'}
        />
      </ButtonWrapper>
      <SlideInPage open={titleOpen} background={COLORS.PURPLE_BLACK2}>
        <TitleLiveCast
          handleNextClick={handleTitleNextClick}
          handleClose={handleAllClose}
        />
      </SlideInPage>
      <SlideInPage open={createOpen} background={COLORS.PURPLE_BLACK2}>
        <CreateLiveCast
          user={user}
          title={title}
          handleClose={handleAllClose}
        />
      </SlideInPage>
    </div>
  );
};

StartLiveCastInner.propTypes = {
  screenWidth: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string.isRequired,
    profile_img_url: PropTypes.string.isRequired,
    livecast_time_limit: PropTypes.number,
  }),
};

export const StartLiveCast = withScreenWidth(StartLiveCastInner);
