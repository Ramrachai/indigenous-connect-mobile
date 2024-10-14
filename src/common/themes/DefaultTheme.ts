import {DefaultTheme as DTheme, Theme} from '@react-navigation/native';
import {MD3Theme, MD3LightTheme as PaperLightTheme} from 'react-native-paper';

const DefaultTheme: Theme & MD3Theme = {
  ...DTheme,
  ...PaperLightTheme,
  colors: {
    ...DTheme.colors,
    ...PaperLightTheme.colors,
  },
};

export default DefaultTheme;
