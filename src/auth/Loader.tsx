import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {useTheme} from 'react-native-paper';
import CustomContainer from '../common/components/CustomContainer';
import delay from '../common/services/delay';
import {RootStackScreenProp} from '../navigations/RootStack';
import {useRootStore} from '../stores/rootStore';

const Loader = observer<RootStackScreenProp<'Loader'>>(
  ({navigation, route}) => {
    const {hydrate, hydrated} = useRootStore();
    const theme: any = useTheme();

    useEffect(() => {
      if (hydrated) {
        delay(route.params?.delay).then(() => navigation.replace('Login'));
      }
    }, [hydrated, navigation, route.params?.delay]);

    useEffect(() => {
      (async () => {
        try {
          if (await BootSplash.isVisible()) {
            await delay(500);
            await BootSplash.hide({fade: true});
            hydrate();
          } else if (!hydrated) {
            hydrate();
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }, [hydrate, hydrated]);
    return (
      <CustomContainer style={styles.main}>
        <Text
          style={{
            color: theme.colors.text,
          }}>
          This is loader screen
        </Text>
      </CustomContainer>
    );
  },
);

export default Loader;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
