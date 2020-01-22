import styled from 'styled-components';
import { Title } from '../../styles';
import { COLORS } from '../../styles/vars';

export const LogoButton = styled.button`
  position: relative;
  z-index: 3000;
  height: 40px;
  width: 40px;
  border: none;
  background: transparent;

  img {
    border-radius: 50%;
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
  }
`;

export const InfoPage = styled.div`
  text-align: center;
`;

export const LogoGlobeImage = styled.div`
  text-align: center;
  img {
    width: 256px;
  }
`;

export const InfoPageTitle = Title('p', COLORS.PURPLE_BLACK);
