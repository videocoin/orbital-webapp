import React, { useRef, useState, useEffect } from 'react';
import { remoteConfigObj } from '../../firebase';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';

import { VIDEO_STATUS } from '../../constants';
import { getImage } from '../../utils';
import { storageRef, videosRef } from '../../firebase';
import { VCApi } from '../../api';
import { BottomWrapperSingleButton } from '../../styles';
import {
  CameraWrapper,
  CameraInnerWrapper,
  CameraView,
  HeaderWithLogo,
  HeaderImageWrapper,
} from './CreateLiveCastStyles';
import { PageTitle } from './SharedLiveCastStyles';
import { Loading } from '../Common/Loading';
import { withScreenWidth, BREAKPOINT_NAMES } from '../HOC/withScreenWidth';
import { Button } from '../Common/Button';
import { Modal } from '../Common/Modal';

const VIDEO_DIMS = {
  DESKTOP: {
    width: 1400,
    height: 500,
  },
  LAPTOP: {
    width: 983,
    height: 553,
  },
  MOBILE_DEMO: {
    width: 360,
    height: 782,
  },
  MOBILE: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

const LIVE_STATES = {
  IDLE: 'idle',
  PENDING_INIT: 'pending',
  PENDING_STREAM_PREPARED: 'pendingStreamPrepared',
  PENDING_STREAM_READY: 'pendingStreamReady',
  LIVE: 'live',
  ERROR: 'error',
};

export const CreateLiveCastInner = ({
  title,
  screenWidth,
  handleClose,
  user,
}) => {
  const [isLive, setIsLive] = useState(LIVE_STATES.IDLE);
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [currentLivecast, setCurrentLivecast] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [streamId, setStreamId] = useState('');
  const [token, setToken] = useState('');
  const videoRef = useRef();

  useEffect(() => {
    const fetchFBRemoteConfig = async () => {
      try {
        await remoteConfigObj.fetchAndActivate();
        setToken(remoteConfigObj.getValue('API_KEY').asString());
        setProfileId(remoteConfigObj.getValue('STREAM_PROFILE_ID').asString());
      } catch (e) {
        console.log('error', e);
      }
    };

    fetchFBRemoteConfig();
  }, []);

  const getVideoConstraints = (isMobileDemo = false) => {
    const videoConstraints = {
      facingMode: 'user',
      audio: true,
    };

    if (isMobileDemo) {
      return {
        ...videoConstraints,
        video: VIDEO_DIMS.MOBILE_DEMO,
      };
    }

    switch (screenWidth) {
      case BREAKPOINT_NAMES.DESKTOP:
        return {
          ...videoConstraints,
          video: VIDEO_DIMS.DESKTOP,
        };
      case BREAKPOINT_NAMES.LAPTOP:
        return {
          ...videoConstraints,
          video: VIDEO_DIMS.LAPTOP,
        };
      default:
        return {
          ...videoConstraints,
          video: VIDEO_DIMS.MOBILE,
        };
    }
  };

  const startRTCSession = async streamId => {
    try {
      const { pc, offer } = await createRTCStream();
      const { sdp } = await VCApi.connectWebRTCServer(
        streamId,
        offer.sdp,
        token
      );
      await initRTCSession(sdp, pc);
    } catch (e) {
      handleError(e);
    }
  };

  const handleStreamPrepared = async streamId => {
    try {
      await startRTCSession(streamId);
      setIsLive(LIVE_STATES.PENDING_STREAM_READY);

      VCApi.setIsStreamStatusReadyInterval(streamId, token, handleStreamReady);
    } catch (e) {
      handleError(e);
    }
  };

  const handleStreamReady = async (streamId, outputUrl) => {
    try {
      await addLivecastDataToFB(outputUrl, streamId);
      setIsLive(LIVE_STATES.LIVE);
    } catch (e) {
      handleError(e);
    }
  };

  const createRTCStream = async () => {
    try {
      const pc = new RTCPeerConnection();
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        getVideoConstraints()
      );
      mediaStream.getTracks().forEach(track => {
        pc.addTrack(track);
      });
      const offer = await pc.createOffer();
      pc.setLocalDescription(offer);
      return { pc, offer };
    } catch (e) {
      handleError(e);
    }
  };

  const initRTCSession = async (sdp, pc) => {
    try {
      const answer = new RTCSessionDescription({
        type: 'answer',
        sdp,
      });
      await pc.setRemoteDescription(answer);
    } catch (e) {
      handleError(e);
    }
  };

  const createLivecastEntry = (outputUrl, streamId, imageUrl) => ({
    client: 'web',
    created_at: Date.now(),
    duration: '0',
    status: VIDEO_STATUS.LIVE,
    image_url: imageUrl,
    stream_id: streamId,
    title,
    playback_url: outputUrl,
    creator_img_url: user.profile_img_url,
    creator_name: user.name,
  });

  const startGoLive = async () => {
    setIsLive(LIVE_STATES.PENDING_INIT);
    try {
      const streamId = await VCApi.createStream(token, profileId);
      setStreamId(streamId);

      await VCApi.runStream(streamId, token);
      setIsLive(LIVE_STATES.PENDING_STREAM_PREPARED);

      VCApi.setIsStreamStatusPreparedInterval(
        streamId,
        token,
        handleStreamPrepared
      );
    } catch (e) {
      handleError(e);
    }
  };

  const handleError = e => {
    console.log('Error', e);
    setIsLive(LIVE_STATES.ERROR);
    setErrorModalOpen(true);
  };

  const addLivecastDataToFB = async (outputUrl, streamId) => {
    const imageUrl = await storeScreenshotInFB(streamId);
    const newLivecastEntry = createLivecastEntry(outputUrl, streamId, imageUrl);
    const vidRes = await videosRef.add(newLivecastEntry);
    setCurrentLivecast({
      ...newLivecastEntry,
      id: vidRes.id,
    });
  };

  const updateLivecastDataInFB = async () => {
    await videosRef.doc(currentLivecast.id).update({
      id: currentLivecast.id,
      duration: Date.now() - currentLivecast.created_at,
      status: VIDEO_STATUS.ENDED,
    });
  };

  const storeScreenshotInFB = async streamId => {
    if (videoRef && videoRef.current) {
      const base64image = await videoRef.current.getScreenshot();
      const ref = storageRef.child(`images/${streamId}.png`);
      await ref.putString(base64image, 'data_url');
      const url = ref.getDownloadURL();

      return url;
    }
  };

  const endLiveCast = () => {
    setEndModalOpen(true);
  };

  const handleConfirmEndLiveCast = async () => {
    try {
      await updateLivecastDataInFB();
      await VCApi.stopStream(streamId, token);
      setIsLive(LIVE_STATES.IDLE);
      handleClose();
    } catch (e) {
      handleError(e);
    }
  };

  const cancelGoLive = () => {
    setIsLive(LIVE_STATES.IDLE);
    handleClose();
  };

  const handleEndOnClose = () => {
    if (isLive === LIVE_STATES.IDLE) {
      handleClose();
      return;
    }

    endLiveCast();
  };

  const renderFooterButton = () => {
    switch (isLive) {
      case LIVE_STATES.PENDING_INIT:
      case LIVE_STATES.PENDING_STREAM_PREPARED:
      case LIVE_STATES.PENDING_STREAM_READY:
        return <Button text="Cancel" handleClick={cancelGoLive} size="sm" />;
      case LIVE_STATES.LIVE:
        return <Button text="End" handleClick={endLiveCast} size="sm" />;
      case LIVE_STATES.ERROR:
        return <Button text="Go Live" disabled={true} size="sm" />
      default:
        return (
          <Button
            text="Go Live"
            disabled={!token}
            handleClick={startGoLive}
            size="sm"
          />
        );
    }
  };

  return (
    <CameraWrapper>
      <CameraInnerWrapper>
        <HeaderWithLogo>
          <HeaderImageWrapper>
            <img
              className="closeButton"
              onClick={handleEndOnClose}
              src={getImage('icons/close.png')}
              alt="Back"
            />
          </HeaderImageWrapper>
          <PageTitle>Go Live</PageTitle>
          <HeaderImageWrapper>
            <img
              className="logoImg"
              src={getImage('VCLight.svg')}
              alt="Video Coin"
            />
          </HeaderImageWrapper>
        </HeaderWithLogo>
        <CameraView>
          <Webcam
            ref={videoRef}
            screenshotFormat="image/jpeg"
            videoConstraints={getVideoConstraints()}
          />
        </CameraView>
        {!token && isLive !== LIVE_STATES.ERROR && <Loading />}
        {isLive !== LIVE_STATES.LIVE &&
          isLive !== LIVE_STATES.IDLE &&
          token && (
            <Loading title="Going Live" text="This could take a few moments." />
          )}
        <BottomWrapperSingleButton>
          {renderFooterButton()}
        </BottomWrapperSingleButton>
        {endModalOpen && (
          <Modal
            title="End LiveCast?"
            handleClose={() => setEndModalOpen(false)}
            handleButtonClick={handleConfirmEndLiveCast}
            buttonText="End"
            secondaryButtonText="Cancel"
            handleSecondaryButtonClick={() => setEndModalOpen(false)}
            text="This will end your Live Cast and return you to the home screen."
          />
        )}
        {errorModalOpen && (
          <Modal
            title="Error"
            handleClose={() => setErrorModalOpen(false)}
            handleButtonClick={() => setErrorModalOpen(false)}
            buttonText="Ok"
            text="Sorry, we're can't process your request at the moment."
          />
        )}
      </CameraInnerWrapper>
    </CameraWrapper>
  );
};

CreateLiveCastInner.propTypes = {
  title: PropTypes.string,
  screenWidth: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string.isRequired,
    profile_img_url: PropTypes.string.isRequired,
    livecast_time_limit: PropTypes.number,
  }),
};

export const CreateLiveCast = withScreenWidth(CreateLiveCastInner);
