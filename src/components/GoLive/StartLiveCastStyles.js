import styled from 'styled-components';

import { DEVICE } from '../../styles/vars';

export const ButtonWrapper = styled.div`
  width: 100%;

  @media ${DEVICE.LAPTOP} {
    width: auto;
    float: right;
  }
`;
