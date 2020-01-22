import styled from 'styled-components';
import { Body, Title } from '../../styles';
import { COLORS } from '../../styles/vars';


export const InputLabel = Title('p', COLORS.WHITE, 0.7);

export const InputWrapper = styled.div`
  padding: 20px 0;
`;

export const InputArea = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: ${COLORS.WHITE};
  font-size: 28px;
  font-weight: bold;
  line-height: 42px;
`;

export const InputCaption = styled(Body('p', COLORS.WHITE, 0.7))`
  padding-top: 25px;
`;
