import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import UserInput from '../UserInput';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';

export default function Form({setEmail, setPassword}) {
  return (
    <View behavior="padding" style={styles.container}>
      <UserInput
        source={usernameImg}
        placeholder="Email"
        autoCapitalize={'none'}
        returnKeyType={'done'}
        autoCorrect={false}
        onChangeText={setEmail}
      />
      <UserInput
        source={passwordImg}
        secureTextEntry={true}
        placeholder="Password"
        returnKeyType={'done'}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={setPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({container: {}});
