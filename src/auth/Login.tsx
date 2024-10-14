import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import CustomContainer from '../common/components/CustomContainer';
import CustomInput from '../common/components/CustomInput';
import {useToast} from '../common/components/CustomToast';
import Row from '../common/components/Row';
import {httpRequest} from '../common/constant/httpRequest';
import {api} from '../utils/api';

const Login = () => {
  const [isShowEyeIcon, setIsShowEyeIcon] = useState(false);
  const {control, handleSubmit, setValue, reset, watch} = useForm();
  const toaster = useToast();

  const onSubmit = async () => {
    const api_params = {
      url: api.login,
      data: {
        email: watch('login'),
        password: watch('password'),
      },
      method: 'post',
      isConsole: true,
    };
    const res = await httpRequest(api_params, () => {});
    // toaster.show({message: res?.message, type: 'warning'});
    // console.log(JSON.stringify(res, null, 2));
  };

  return (
    <CustomContainer style={styles.main}>
      <Row rowWidth="100%" direction="column">
        <CustomInput
          control={control}
          name={'login'}
          label="Email or Phone number"
          placeholder="Email or Phone number"
          setValue={setValue}
        />
      </Row>

      <Row rowWidth="100%" direction="column" rowStyle={styles.pass}>
        <CustomInput
          control={control}
          secureTextEntry={!isShowEyeIcon}
          name={'password'}
          label="Password"
          placeholder="Password"
          setValue={setValue}
          rightIcon={isShowEyeIcon ? 'eye' : 'eye-off'}
          rightIconPress={() => setIsShowEyeIcon(!isShowEyeIcon)}
        />
      </Row>

      {/* <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Login</Text>
      </TouchableOpacity> */}
    </CustomContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    padding: 16,
  },
  pass: {
    marginTop: 16,
  },
});
