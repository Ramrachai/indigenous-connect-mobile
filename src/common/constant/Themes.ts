import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const SIZES = {
  width,
  height,
};
export const COLORS = {
  // base colors
  primary: '#299647',
  secondary: '#5C5C5C', // gray
  border: '#9C9C9E', // border
  lightGray: '#B6C1CF', //lightgray
  darkGray: '#6C6C6E',

  // colors
  black: '#000000',
  white: '#FFFFFF',
  red: '#E61C53',
  redish: '#FF5C58',
  sayn: '#40BDFF',
  blue: '#4D5AFF',
  messageColor: '#707BFF',
  yellow: '#FFC014',
  orange: '#FF7821',
  green: '#7DD63C',
  lightYellow: '#FFCC00',
  lightBlue: '#EAEDFF',
  lightBlack: '#7A7A7A',
  lightRed: '#EE5C51',
  blackish: '#111111DE',
  sunColor: '#F2C800',
  maroon: '#B54896',
  whitesmoke: 'whitesmoke',
  darkBlue: '#1084F1',
  warning: '#F78C12',
};

const appTheme = {COLORS, SIZES};

export default appTheme;
