import { css } from 'styled-components';
import { BREAKPOINTS } from './vars';

export const respondTo = Object.keys(BREAKPOINTS).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (min-width: ${BREAKPOINTS[label]}) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);

