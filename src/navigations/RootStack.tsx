import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import Loader from '../auth/Loader';
import Login from '../auth/Login';
import {StatusBar} from 'react-native';

export type RootStackScreensParams = {
  Loader: undefined | {delay?: number; text?: string};
  Login: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackScreensParams {}
  }
}

export type RootStackScreens = keyof RootStackScreensParams;

export type RootStackScreenProp<T extends RootStackScreens> =
  NativeStackScreenProps<RootStackScreensParams, T>;

const {Navigator, Screen} =
  createNativeStackNavigator<RootStackScreensParams>();

const RootStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Loader" component={Loader} />
      <Screen name="Login" component={Login} />
    </Navigator>
  );
};

export default RootStack;
