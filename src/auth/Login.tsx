import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import CustomContainer from '../common/components/CustomContainer';
import CustomInput from '../common/components/CustomInput';

const Login = () => {
  const {control, handleSubmit, setValue, reset} = useForm();
  return (
    <CustomContainer style={styles.main}>
      <CustomInput
        control={control}
        name={'Login'}
        label="Email or Phone number"
        setValue={setValue}
      />
    </CustomContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    padding: 16,
  },
});
