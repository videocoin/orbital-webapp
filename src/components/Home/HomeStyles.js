import styled from 'styled-components';
import { COLORS, DEVICE, MARGIN } from '../../styles/vars';
import { BottomWrapper } from '../../styles';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const CurrentLiveCasts = styled.div`
  display: flex;
  overflow: scroll;
  margin-right: -${MARGIN.MOBILE}px;
  padding-right: ${MARGIN.MOBILE}px;
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${DEVICE.LAPTOP} {
    margin-right: 0;
    padding-right: 0;
    display: grid;
    overflow: auto;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 48px;
    grid-row-gap: 56px;
    overflow: hidden;
  }
`;

export const RecentLiveCasts = styled.div`
  display: block;

  @media ${DEVICE.LAPTOP} {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 48px;
    grid-row-gap: 56px;
  }
`;

export const CurrentCard = styled.div`
  position: relative;
  margin-right: ${MARGIN.MOBILE}px;
  height: 330px;
  min-width: 200px;

  .videoInfoArea {
    position: absolute;
    z-index: 200;
    top: 15px;
    left: 40px;
  }

  @media ${DEVICE.LAPTOP} {
    height: 400px;
    margin-right: 0;
  }
`;

export const RecentCard = styled.div`
  position: relative;
  height: 100px;
  margin-bottom: 10px;
`;

export const RecentCardInner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .imageArea {
    min-width: 70px;
  }

  .videoInfoArea {
    margin-left: 25px;
  }
`;

export const RecentCardDesktop = styled.div`
  position: relative;
  margin-right: ${MARGIN.MOBILE}px;
  height: 267px;
  min-width: 169px;
  padding: 20px;

  .videoInfoArea {
    position: absolute;
    z-index: 200;
    bottom: 15px;
  }

  @media ${DEVICE.LAPTOP} {
    margin-right: 0;
    min-height: 200px;
    min-width: auto;
  }
`;

export const CornerImage = styled.img`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  border-radius: 50%;
  border: 2px solid ${COLORS.WHITE};
  height: 36px;
  width: 36px;
`;

export const CoverImage = styled.img`
  position: absolute;
  max-height: calc(100% - 10px);
  z-index: 1;
  top: 5px;
  left: 5px;
  border-radius: 24px;
  width: 100%;
  height: 100%;
  object-fit: cover;

`;

export const CornerImageRecent = styled(CornerImage)`
  border: 1px solid ${COLORS.WHITE};
  height: 24px;
  width: 24px;
`;

export const CoverImageRecent = styled(CoverImage)`
  border-radius: 12px;
  width: 70px;
`;

export const Footer = styled(BottomWrapper)`
  display: inline-block;
  margin: 0 auto;
`;
