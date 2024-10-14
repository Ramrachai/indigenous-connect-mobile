import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import CustomContainer from '../common/components/CustomContainer';

const Login = () => {
  const theme: any = useTheme();

  return (
    <CustomContainer>
      <Text
        style={{
          color: theme.colors.text,
        }}>
        This is login screen
      </Text>
    </CustomContainer>
  );
};

export default Login;

const styles = StyleSheet.create({});
