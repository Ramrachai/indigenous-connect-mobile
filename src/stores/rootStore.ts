import {flow, types} from 'mobx-state-tree';
import createPersistentStore from 'mst-persistent-store';
import {MMKV} from 'react-native-mmkv';
import {secureStorageKey} from '../../App';

const RootStore = types
  .model('RootStore', {
    userColorScheme: types.maybeNull(
      types.union(types.literal('light'), types.literal('dark')),
    ),
    hydrated: false,
  })
  .actions(self => ({
    setUserColorScheme(colorScheme: typeof self.userColorScheme | 'auto') {
      if (colorScheme === 'auto') {
        self.userColorScheme = null;
      } else {
        self.userColorScheme = colorScheme;
      }
    },
    hydrate: flow(function* hydrate() {
      try {
        self.hydrated = true;
      } catch (error) {
        console.error(error);
        self.hydrated = true;
      }
    }),
  }))
  .views(self => ({
    get currentColorScheme() {
      if (self.userColorScheme) {
        return self.userColorScheme;
      }
      return 'auto';
    },
  }));

export const mmkv = new MMKV({
  id: 'mmkv.default',
  encryptionKey: secureStorageKey,
});
mmkv.recrypt(secureStorageKey);
const setItem = (key: string, value: any) =>
  mmkv.set(key, JSON.stringify(value));

const getItem = (key: string) => {
  const value = mmkv.getString(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};
const removeItem = (key: string) => mmkv.delete(key);

const secureStorage = {
  setItem,
  getItem,
  removeItem,
};

export const [RootStoreProvider, useRootStore] = createPersistentStore(
  RootStore,
  secureStorage,
  {
    hydrated: false,
  },
);
