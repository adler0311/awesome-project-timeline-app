import React from 'react';
import {StyleSheet, View} from 'react-native';

import UserInput from '../UserInput';
import usernameImg from '../../images/username.png';
import passwordImg from '../../images/password.png';

export default function Form({setEmail, setPassword}) {
  return (
    <View behavior="padding" style={styles.container}>
      <UserInput
        secureTextEntry={false}
        source={usernameImg}
        placeholder="이메일"
        autoCapitalize={'none'}
        returnKeyType={'done'}
        autoCorrect={false}
        onChangeText={setEmail}
      />
      <UserInput
        source={passwordImg}
        secureTextEntry={true}
        placeholder="비밀번호"
        returnKeyType={'done'}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={setPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({container: {}});
