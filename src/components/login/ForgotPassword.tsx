import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

import UserInput from '../UserInput';
import Wallpaper from '../Wallpaper';
import usernameImg from '../../images/username.png';
import TabHeader from '../TabHeader';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');

  const handlePasswordResetEmail = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => navigation.navigate('LoginScreen'))
      .catch(error => console.log(error));
  };

  const renderChildren = () => (
    <>
      <TabHeader isLoggedIn={false} />
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Text style={{fontSize: 32, color: 'white'}}>비밀번호 찾기</Text>
      </View>
      <View style={styles.inputButtonContainer}>
        <View style={{marginBottom: 20}}>
          <UserInput
            secureTextEntry={false}
            source={usernameImg}
            placeholder="이메일"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            onChangeText={setEmail}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePasswordResetEmail}
            activeOpacity={1}>
            <Text style={styles.text}>메일 전송</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return <Wallpaper children={renderChildren()} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'purple',
  },
  inputButtonContainer: {
    flex: 1,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: 40,
    borderRadius: 10,
    zIndex: 100,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});
