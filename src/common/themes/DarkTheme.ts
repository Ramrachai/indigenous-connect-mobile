import {DarkTheme as RNDarkTheme, Theme} from '@react-navigation/native';
import {MD3Theme, MD3DarkTheme as PaperDarkTheme} from 'react-native-paper';

const DarkTheme: Theme & MD3Theme = {
  ...RNDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...RNDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

export default DarkTheme;
