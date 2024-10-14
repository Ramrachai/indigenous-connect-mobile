import {useTheme} from '@react-navigation/native';
import React, {Fragment} from 'react';
import {Controller} from 'react-hook-form';
import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import {TextInput, useTheme as paperTheme} from 'react-native-paper';

interface Props {
  control: any;
  name: any;
  rules?: {};
  placeholder?: string;
  secureTextEntry?: boolean;
  label?: string;
  disabled?: boolean;
  multiline?: boolean;
  rightIcon?: string;
  leftIcon?: string;
  rightIconPress?: () => void;
  leftIconPress?: () => void;
  keyboardType?: KeyboardTypeOptions;
  textInputStyle?: {};
  setValue?: any;
  onChange?: any;
  selectionColor?: string;
}

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
  label,
  disabled = false,
  multiline,
  rightIconPress,
  leftIconPress,
  rightIcon,
  leftIcon,
  keyboardType = 'default',
  textInputStyle,
  setValue,
  onChange,
  selectionColor,
}: Props) => {
  const theme = useTheme() && paperTheme();
  const handleChange = (e: string) => {
    if (onChange) {
      onChange(e);
    } else {
      setValue(name, e);
    }
  };

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {value, onBlur}, fieldState: {error}}) => (
          <Fragment>
            <View>
              <TextInput
                style={[textInputStyle]}
                mode="outlined"
                label={label}
                placeholder={placeholder || 'Type something'}
                outlineColor={error ? theme.colors.error : theme.colors.primary}
                activeOutlineColor={theme.colors.primary}
                multiline={multiline}
                selectionColor={selectionColor || 'black'}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                editable={!disabled}
                value={value}
                onBlur={onBlur}
                onChangeText={e => handleChange(e)}
                right={
                  rightIcon ? (
                    <TextInput.Icon icon={rightIcon} onPress={rightIconPress} />
                  ) : null
                }
                left={
                  leftIcon ? (
                    <TextInput.Icon icon={leftIcon} onPress={leftIconPress} />
                  ) : null
                }
              />
            </View>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
