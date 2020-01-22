import styled from 'styled-components';
import { Title } from '../../styles';
import { COLORS } from '../../styles/vars';

export const Header = styled.div`
  padding: 20px 0;
`;

export const PageTitle = Title('p', COLORS.WHITE);

export const BackButton = styled.div`
  height: 56px;
  width: 56px;
  padding: 11px;
  background-color: transparent;
  border-color: transparent;
  img {
    width: 100%;
  }
`;

export const Placeholder = styled.div`
  width: 30px;
`;
