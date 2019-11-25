import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Logo from './Logo';
import Form from './Form';
import Wallpaper from '../Wallpaper';
import ButtonSubmit from '../ButtonSubmit';
import SignupSection from './SignupSection';

import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Wallpaper>
      <Logo />
      <View style={{flex: 1}}>
        <Form setEmail={setEmail} setPassword={setPassword} />
        <ButtonSubmit email={email} password={password} />
        <SignupSection navigation={navigation} />
      </View>
    </Wallpaper>
  );
};

const LoginScreen = createAppContainer(
  createStackNavigator(
    {
      Login,
      ForgotPassword,
      CreateAccount,
    },
    {
      defaultNavigationOptions: {
        header: null,
      },
    },
  ),
);
export default LoginScreen;
