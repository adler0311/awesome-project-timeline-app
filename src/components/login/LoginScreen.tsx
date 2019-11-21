import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from '../Wallpaper';
import ButtonSubmit from '../ButtonSubmit';
import SignupSection from './SignupSection';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Wallpaper>
      <Logo />
      <View style={{flex: 1}}>
        <Form
          setEmail={setEmail}
          setPassword={setPassword}
          email={email}
          password={password}
        />
        <ButtonSubmit email={email} password={password} />
        <SignupSection navigation={navigation} />
      </View>
    </Wallpaper>
  );
}

const styles = StyleSheet.create({});
