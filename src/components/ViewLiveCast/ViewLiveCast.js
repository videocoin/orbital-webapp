import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Hls from 'hls.js';

import { BottomWrapper, Logo } from '../../styles';
import { COLORS } from '../../styles/vars';
import { BREAKPOINT_NAMES, withScreenWidth } from '../HOC/withScreenWidth';
import {
  HeaderWrapper,
  CornerImage,
  VideoWrapperMobile,
  VideoWrapperDesktop,
  BackButton,
  BackButtonDesktop,
  LogoDesktop,
} from './ViewLiveCastStyles';
import { SmallBodyAlt, Caption } from '../../styles';
import { SlideInPage } from '../Common/SlideInPage';
import { videosRef } from '../../firebase';
import { getImage } from '../../utils';

const fetchFirebaseData = async (id, callback) => {
  try {
    const doc = await videosRef.doc(id).get();
    const docData = await doc.data();

    callback(docData);
  } catch (e) {
    console.log('error', e);
  }
};

export const ViewLiveCastInner = ({ id = '', screenWidth, handleClose }) => {
  const [data, setData] = useState(null);
  const videoRef = createRef();

  const isDesktop =
    screenWidth === BREAKPOINT_NAMES.LAPTOP ||
    screenWidth === BREAKPOINT_NAMES.DESKTOP;

  useEffect(() => {
    if (id) {
      fetchFirebaseData(id, setData);
    }
  }, [id]);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported() && video && data) {
      const hls = new Hls();
      hls.loadSource(data.playback_url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
    }
  }, [data, videoRef]);

  const renderTitleArea = () => {
    const VideoTitle = SmallBodyAlt('h3', COLORS.WHITE);
    const AuthorNameTitle = Caption('h5', COLORS.WHITE);
    return (
      <HeaderWrapper>
        <CornerImage src={data.creator_img_url} alt={data.creator_name} />
        <div className="videoInfoArea">
          <AuthorNameTitle>{data.creator_name}</AuthorNameTitle>
          <VideoTitle color={COLORS.WHITE}>{data.title}</VideoTitle>
        </div>
      </HeaderWrapper>
    );
  };

  const renderMobileView = () => (
    <VideoWrapperMobile>
      {renderTitleArea()}
      <video ref={videoRef} width="600" height="400">
        <source src={data.playback_url} type="application/x-mpegURL" />
      </video>
      <BottomWrapper>
        <Link to={'/'} onClick={handleClose}>
          <BackButton>
            <img src={getImage('icons/backArrow.png')} alt="Back" />
          </BackButton>
        </Link>
        <div />
        <Logo src={getImage('VCLight.svg')} alt="VideoCoin" />
      </BottomWrapper>
    </VideoWrapperMobile>
  );

  const renderDesktopView = () => (
    <VideoWrapperDesktop>
      {renderTitleArea()}
      <Link to={'/'} onClick={handleClose}>
        <BackButtonDesktop>
          <img src={getImage('icons/close.png')} alt="Back" />
        </BackButtonDesktop>
      </Link>
      <video ref={videoRef}>
        <source src={data.playback_url} type="application/x-mpegURL" />
      </video>
      <LogoDesktop src={getImage('VCLight.svg')} alt="VideoCoin" />
    </VideoWrapperDesktop>
  );

  return (
    <SlideInPage
      open={Boolean(id)}
      background={COLORS.PURPLE_BLACK2}
      padding="0"
    >
      {data && !isDesktop && renderMobileView()}
      {data && isDesktop && renderDesktopView()}
    </SlideInPage>
  );
};

ViewLiveCastInner.propTypes = {
  id: PropTypes.string.isRequired,
  screenWidth: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

export const ViewLiveCast = withScreenWidth(ViewLiveCastInner);
