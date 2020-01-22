import { createGlobalStyle } from 'styled-components';
import { COLORS } from './vars';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Hind:300,400,500,600,700&display=swap');
  
  body {
    padding: 0;
    margin: 0;
    color: ${COLORS.PURPLE_BLACK};
    font-family: 'Hind', sans-serif;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
  }
`;
