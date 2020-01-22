import styled from 'styled-components';
import { OverlayContainer } from '../../styles';
import { Header } from './SharedLiveCastStyles';
import { COLORS, DEVICE, MARGIN } from '../../styles/vars';

export const CameraWrapper = styled(OverlayContainer)`
  z-index: 600;
  background-color: ${COLORS.PURPLE_BLACK2};
  padding: 0;
`;

export const CameraInnerWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 100%;

  @media ${DEVICE.LAPTOP} {
    display: flex;
    flex-flow: column;
    height: 100%;
    margin-top: 56px;
    max-width: 1400px;
  }
`;

export const HeaderWithLogo = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: ${MARGIN.MOBILE}px;
  padding-right: ${MARGIN.MOBILE}px;
`;

export const HeaderImageWrapper = styled.div`
  width: 100px;

  .closeButton {
    width: 36px;
    height: 36px;
  }

  .logoImg {
    max-width: 100%;
  }
`;
export const CameraView = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media ${DEVICE.TABLET} {
    display: block;
    flex: 1 1 auto;
    video {
      height: 80%;
      border-radius: 36px;
    }
  }
`;

export const MobileCameraView = styled(CameraView)`
  position: relative;
`;

export const DesktopCameraView = styled(CameraView)`
  opacity: 0.8;
`;
