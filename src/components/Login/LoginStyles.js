import styled from 'styled-components';
import img from '../../styles/images/rings.png';
import { BREAKPOINTS, COLORS, DEVICE } from '../../styles/vars';
import { ButtonTitle, BottomWrapper, OverlayContainer } from '../../styles';

export const RingBackground = styled(OverlayContainer)`
  background-image: url(${img});
  background-size: cover;
`;

export const InnerContainer = styled.div`
  @media ${DEVICE.LAPTOP} {
    max-width: ${BREAKPOINTS.LAPTOP}px;
    margin: 0 auto;
    margin-top: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const LoginWrapper = styled.div``;

export const AppStoreWrapper = styled.div`
  display: none;
  text-align: center;

  @media ${DEVICE.LAPTOP} {
    display: block;
  }
`;

export const Header = styled.header`
  display: none;

  @media ${DEVICE.LAPTOP} {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    padding-top: 36px;
  }
`;

export const Footer = styled(BottomWrapper)`
  display: none;

  @media ${DEVICE.LAPTOP} {
    bottom: 0;
    max-width: ${BREAKPOINTS.LAPTOP}px;
    margin: 0 auto;
    height: 125px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 36px 72px;
    background-color: ${COLORS.WHITE};
    border-radius: 36px 36px 0 0;
    box-shadow: 0 12px 40px 0 rgba(26, 24, 37, 0.14);
  }
`;

export const LogoWrapper = styled.div`
  margin-top: 20%;
  text-align: center;

  @media ${DEVICE.LAPTOP} {
    margin-top: 0;
  }
`;

export const LogoGlobeImage = styled.div`
  text-align: center;
  img {
    width: 256px;
  }
`;

export const LogoTextImage = styled.div`
  text-align: center;
  padding-bottom: 15px;
  img {
    width: 130px;
  }
`;

export const SignInBottomWrapper = styled(BottomWrapper)`
  @media ${DEVICE.LAPTOP} {
    position: relative;
    bottom: auto;
    left: 0;
    right: 0;
    display: block;
    margin: 0 auto;
  }
`;

export const SignInButtonOuter = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 40px;
  margin: 0 auto;
  margin-bottom: 20px;
  background-color: ${COLORS.WHITE2};
  border-radius: 28px;
  border: 2px solid ${COLORS.PURPLE_BLACK};
  box-shadow: 0 8px 16px 0 rgba(26, 24, 37, 0.08);

  @media ${DEVICE.LAPTOP} {
    margin-top: 100px;
  }
`;

export const ButtonImage = styled.img`
  margin-right: 20px;
`;

export const ButtonText = ButtonTitle('p', COLORS.PURPLE_BLACK);

export const VCLogoImage = styled.div`
  text-align: center;
  img {
    width: 109px;
  }

  @media ${DEVICE.LAPTOP} {
    display: none;
  }
`;

export const AppButtonWrapper = styled.div`
  a:first-child {
    margin-right: 20px;
  }
`;

export const GithubWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 20px;
  }
`;
