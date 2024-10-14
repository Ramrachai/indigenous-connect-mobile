import {useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {useRootStore} from '../../stores/rootStore';

const useIsDarkTheme = () => {
  const {userColorScheme} = useRootStore();
  const systemColorScheme = useColorScheme();

  const isDark = useMemo(
    () =>
      userColorScheme === 'dark' ||
      (!userColorScheme && systemColorScheme === 'dark'),
    [systemColorScheme, userColorScheme],
  );

  return [isDark, !userColorScheme];
};

export default useIsDarkTheme;
