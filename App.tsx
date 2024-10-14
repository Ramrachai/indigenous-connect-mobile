import {baseURLL, secretKeyy, secureStorageKeyy} from '@env';
import {
  LinkingOptions,
  NavigationContainer,
  NavigationContainerRef,
  Theme,
} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useMemo, useRef} from 'react';
import {Linking} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {MD3Theme, PaperProvider} from 'react-native-paper';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {ToastProvider} from './src/common/components/CustomToast';
import useIsDarkTheme from './src/common/hooks/useIsDarkTheme';
import delay from './src/common/services/delay';
import DarkTheme from './src/common/themes/DarkTheme';
import DefaultTheme from './src/common/themes/DefaultTheme';
import RootStack, {RootStackScreensParams} from './src/navigations/RootStack';
import {RootStoreProvider, useRootStore} from './src/stores/rootStore';
import axios from 'axios';

export const BaseURL = baseURLL;
export const secureStorageKey = secureStorageKeyy;
export const secretKey = secretKeyy;

axios.defaults.baseURL = BaseURL;

const linking: LinkingOptions<any> = {
  prefixes: [
    /* your linking prefixes */
    BaseURL,
  ],
  config: {
    /* configuration for matching screens with paths */
    initialRouteName: 'Loader',
    screens: {
      Loader: {
        path: 'loader/:delay?/:text?',
        parse: {
          delay: ms => Number(ms),
          text: text => decodeURIComponent(text),
        },
        stringify: {
          delay: ms => String(ms),
          text: text => encodeURIComponent(text),
        },
      },
    },
  },
};

const Main = observer(() => {
  const {hydrate} = useRootStore();
  const nav = useRef<NavigationContainerRef<RootStackScreensParams>>(null);
  const [isDark] = useIsDarkTheme();
  const theme: Theme & MD3Theme = useMemo(() => {
    if (isDark) {
      return DarkTheme;
    }
    return DefaultTheme;
  }, [isDark]);

  const onReady = useCallback(async () => {
    try {
      const uri = await Linking.getInitialURL();
      if (uri) {
        await delay(500);
        await hydrate();
        BootSplash.hide({fade: true});
      }
    } catch (error) {
      console.error(error);
    }
  }, [hydrate]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={theme}>
        <ToastProvider>
          <NavigationContainer
            linking={linking}
            theme={theme}
            ref={nav}
            onReady={onReady}>
            <RootStack />
          </NavigationContainer>
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
});

const App = () => {
  return (
    <RootStoreProvider>
      <Main />
    </RootStoreProvider>
  );
};

export default App;
