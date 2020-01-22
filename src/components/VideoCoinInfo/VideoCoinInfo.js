import React, { useState } from 'react';

import { COLORS } from '../../styles/vars';
import { getImage } from '../../utils';
import { SectionWrapper, BottomWrapper } from '../../styles';
import {
  LogoButton,
  InfoPage,
  LogoGlobeImage,
  InfoPageTitle,
} from './VideoCoinInfoStyles';
import { SlideInPage } from '../Common/SlideInPage';
import { Button } from '../Common/Button';

export const VideoCoinInfo = () => {
  const [open, setOpen] = useState(false);

  const toggleSetOpen = e => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <LogoButton onClick={toggleSetOpen}>
        <img src={getImage('VCOrbitalSymbol.png')} alt="VideoCoin" />
      </LogoButton>
      <SlideInPage open={open} background={COLORS.WHITE}>
        {open ? (
          <InfoPage>
            <LogoGlobeImage>
              <img src={getImage('VCOrbitalSymbol.png')} alt="orbital" />
            </LogoGlobeImage>
            <InfoPageTitle>Powered by VideoCoin</InfoPageTitle>
            <SectionWrapper>
              <p>
                Orbital is powered by VideoCoin Network, a decentralized video
                platform that is redefining the process for creating, storing,
                storing, storing, and distributing video content.
              </p>
            </SectionWrapper>
            <SectionWrapper>
              <Button handleClick={() => {}} text="Learn More" />
            </SectionWrapper>
            <BottomWrapper>
              <Button
                handleClick={toggleSetOpen}
                theme="minimal"
                text="Close"
              />
            </BottomWrapper>
          </InfoPage>
        ) : (
          <div></div>
        )}
      </SlideInPage>
    </>
  );
};
