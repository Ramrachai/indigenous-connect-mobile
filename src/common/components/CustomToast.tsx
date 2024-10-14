import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {Keyboard, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Portal, Snackbar, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ToastContext = createContext<ToastMethods | null>(null);

type ToastType = 'info' | 'normal' | 'success' | 'warning' | 'error';
type ToastPosition = 'top' | 'bottom' | 'middle';

interface ToastParams {
  /** The message to show */
  message: string;
  /** Type of toast */
  type: ToastType;
  /**  Position of the toast */
  position: ToastPosition;
  /** Toast duration */
  duration: number;
  /** Toast Visibility */
  visibility: boolean;
  /** Toast Action onPress */
  action?: () => void;
  /** Toast Action Label */
  actionLabel: string;
}

/** All params are optional */
export type ToastOptions = Partial<ToastParams>;

interface ToastMethods {
  /** Show a new toast */
  show(options: ToastOptions): void;
  /** Hide toast that are on display */
  hide(): void;
}

export interface ToastProviderProps {
  children?: any;
  overrides?: ToastOptions;
}

enum ToastActionType {
  SHOW = 'SHOW',
  HYDRATE = 'HYDRATE',
  HIDE = 'HIDE',
}

interface ToastAction {
  type: ToastActionType;
  payload?: ToastOptions;
}

type ToastIconType = {
  [key in ToastType]: string;
};

type ToastStyles = {
  [key in ToastType]: StyleProp<ViewStyle>;
};

const defaults: ToastParams = {
  message: 'Hello React Native Paper Toast!',
  type: 'normal',
  position: 'bottom',
  duration: 2000,
  visibility: false,
  action: undefined,
  actionLabel: 'DONE',
};

const reducer = (state: ToastParams, action: ToastAction) => {
  switch (action.type) {
    case ToastActionType.SHOW:
      return {...state, ...action.payload};

    case ToastActionType.HYDRATE:
      return {...state, ...action.payload, visibility: false};

    case ToastActionType.HIDE:
      return {...state, visibility: false};

    default:
      return state;
  }
};

const ToastProvider: React.FC<ToastProviderProps> = ({children, overrides}) => {
  const initialState = useMemo(
    () => ({...defaults, ...overrides}),
    [overrides],
  );
  const [state, dispatch] = useReducer(reducer, initialState);

  const insets = useSafeAreaInsets();

  const toast = useMemo(
    () => ({
      show(options: ToastOptions) {
        const newState: ToastParams = {
          ...initialState,
          ...options,
          visibility: true,
        };
        newState.position === 'bottom' && Keyboard.dismiss();
        dispatch({type: ToastActionType.SHOW, payload: newState});
      },
      hide() {
        dispatch({type: ToastActionType.HIDE});
      },
    }),
    [initialState],
  );

  const computedStyle = useMemo(() => {
    const base: StyleProp<ViewStyle> = {
      position: 'absolute',
      left: insets.left,
      right: insets.right,
      width: undefined,
    };
    let style: StyleProp<ViewStyle>;
    if (state.position === 'bottom') {
      style = {
        ...base,
        bottom: insets.bottom,
      };
      return style;
    }
    if (state.position === 'top') {
      style = {
        ...base,
        top: insets.top,
        bottom: undefined,
      };
      return style;
    }
    style = {
      ...base,
      top: insets.top,
      bottom: insets.bottom,
      justifyContent: 'center',
    };
    return style;
  }, [insets, state.position]);

  const boxStyle = useMemo(() => {
    const base: StyleProp<ViewStyle> = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      left: insets.left,
      right: insets.right,
    };
    let style: StyleProp<ViewStyle>;
    if (state.position === 'bottom') {
      style = {
        ...base,
      };
      return style;
    }
    if (state.position === 'top') {
      style = {
        ...base,
      };
      return style;
    }
    style = {
      ...base,
    };
    return style;
  }, [insets, state.position]);

  useEffect(() => {
    dispatch({type: ToastActionType.HYDRATE, payload: initialState});
  }, [initialState]);

  return (
    <ToastContext.Provider value={toast}>
      <Portal.Host>{children}</Portal.Host>
      <Portal>
        <Snackbar
          onDismiss={toast.hide}
          style={types[state.type]}
          wrapperStyle={computedStyle}
          duration={state.duration}
          visible={state.visibility}
          action={
            state.action
              ? {label: state.actionLabel, onPress: state.action}
              : undefined
          }>
          <View style={boxStyle}>
            <Icon size={20} name={icons[state.type]} color="#ffffff" />
            <Text style={styles.message}>{` ${state.message}`}</Text>
          </View>
        </Snackbar>
      </Portal>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const toast = useContext(ToastContext);
  if (!toast) {
    throw new Error('useToast must be used within a ToastProvider.');
  }
  return toast;
};

const icons: ToastIconType = {
  normal: 'information-outline',
  info: 'information-outline',
  warning: 'alert-circle-outline',
  success: 'check-circle-outline',
  error: 'close-circle-outline',
};

const common: ViewStyle = {
  borderRadius: 20,
};

const types: ToastStyles = {
  info: {
    ...common,
    backgroundColor: 'rgba(81,98,188,0.9)',
  },
  normal: {
    ...common,
    backgroundColor: 'rgba(72,77,81,0.9)',
  },
  success: {
    ...common,
    backgroundColor: 'rgba(75,153,79,0.9)',
  },
  warning: {
    ...common,
    backgroundColor: 'rgba(254,177,25,0.9)',
  },
  error: {
    ...common,
    backgroundColor: 'rgba(216,25,25,0.9)',
  },
};

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
    color: '#ffffff',
  },
});

export {ToastProvider, useToast};
