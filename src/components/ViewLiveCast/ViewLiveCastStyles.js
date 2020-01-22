import styled from 'styled-components';
import { COLORS } from '../../styles/vars';
import { Logo } from '../../styles';

export const HeaderWrapper = styled.div`
  position: absolute;
  margin: 20px;
  z-index: 700;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  .videoInfoArea {
    text-align: left;
  }
`;

export const CornerImage = styled.img`
  margin-right: 20px;
  border-radius: 50%;
  border: 2px solid ${COLORS.WHITE};
  height: 36px;
  width: 36px;
`;

export const VideoWrapperMobile = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  
  video {
    position: absolute;
    z-index: 600;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const VideoWrapperDesktop = styled.div`
  position: relative;
  margin: 20px auto;
  width: 396px;
  height: 860px;
  max-height: 100vh;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 36px;
  }
`;

export const BackButton = styled.button`
  height: 56px;
  width: 56px;
  padding: 11px;
  border-radius: 16px;
  background-color: ${COLORS.GRAPE};
  border-color: transparent;

  img {
    width: 100%;
  }
`;

export const BackButtonDesktop = styled(BackButton)`
  position: absolute;
  right: -100px;
`;

export const LogoDesktop = styled(Logo)`
  position: absolute;
  max-height: 30px;
  left: 20px;
  bottom: 20px;
`;
