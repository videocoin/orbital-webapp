import styled from 'styled-components';
import 'hind';
import { COLORS } from './vars';

const getRepeatedStyles = (color = COLORS.PURPLE_BLACK, opacity = 1) => `
  color: ${color};
  opacity: ${opacity};
  font-family: 'hind', sans-serif;
`;

export const Display = (tag = 'p', color, opacity) => styled(tag)`
  font-size: 28px;
  font-weight: 700;
  line-height: 42px;
  ${getRepeatedStyles(color, opacity)}
`;

export const Title = (tag = 'p', color, opacity) => styled(tag)`
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
  ${getRepeatedStyles(color, opacity)}
`;

export const Subtitle = (tag = 'p', color, opacity) => styled(tag)`
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
  ${getRepeatedStyles(color, opacity)}
`;

export const Body = (tag = 'p', color, opacity) => styled(tag)`
  line-height: 24px;
  font-size: 16px;
  ${getRepeatedStyles(color, opacity)}
`;

export const BodyAlt = (tag = 'p', color, opacity) => styled(tag)`
  font-weight: 500;
  line-height: 24px;
  font-size: 16px;
  ${getRepeatedStyles(color, opacity)}
`;

export const ButtonTitle = (tag = 'p', color, opacity) => styled(tag)`
  font-weight: 700;
  line-height: 24px;
  font-size: 16px;
  ${getRepeatedStyles(color, opacity)}
`;

export const SmallBody = (tag = 'p', color, opacity) => styled(tag)`
  line-height: 21px;
  ${getRepeatedStyles(color, opacity)}
`;

export const SmallBodyAlt = (tag = 'p', color, opacity) => styled(tag)`
  font-weight: 500;
  line-height: 21px;
  ${getRepeatedStyles(color, opacity)}
`;

export const Caption = (tag = 'p', color, opacity) => styled(tag)`
  font-size: 12px;
  line-height: 20px;
  ${getRepeatedStyles(color, opacity)}
`;

export const SmallText = (tag = 'p', color, opacity) => styled(tag)`
  font-size: 10px;
  font-weight: normal;
  line-height: 16px;
  ${getRepeatedStyles(color, opacity)}
`;

export const TitlePaddingBottom = tag => styled(tag)`
  padding-bottom: 24px;
`;

export const TitleDefault = Title();

export const BodyDefault = Body();
