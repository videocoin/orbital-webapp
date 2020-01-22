import styled from 'styled-components';

import { DEVICE, MARGIN, BREAKPOINTS } from './vars';

export const Container = styled.div`
  margin: 0 ${MARGIN.MOBILE}px;

  @media ${DEVICE.LAPTOP} {
    margin: 0 ${MARGIN.LAPTOP}px;
  }

  @media ${DEVICE.DESKTOP} {
    width: ${BREAKPOINTS.DESKTOP - MARGIN.DESKTOP * 2}px;
    margin: 0 auto;
  }
`;

export const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0 ${MARGIN.MOBILE}px;
`;

export const CenteringContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SectionWrapper = styled.div`
  padding: 12px 0 30px 0;
`;

export const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 3000;
  left: ${MARGIN.MOBILE}px;
  right: ${MARGIN.MOBILE}px;
  bottom: 20px;
`;

export const BottomWrapperSingleButton = styled(BottomWrapper)`
  justify-content: center;
`;

export const ContentCentered = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img`
  height: 100px;
  width: auto;
`;
