import React, {useState} from 'react';
import Form from './Form';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import Wallpaper from '../Wallpaper';
import TabHeader from '../TabHeader';

export default function CreateAccount({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (email.length === 0 || password.length === 0) return;

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Main'))
      .catch(error => {
        if (error.toString().indexOf('email-already-in-use')) {
          alert('이미 사용중인 이메일 입니다.');
        } else {
          console.error(error);
        }
      });
  };

  return (
    <Wallpaper>
      <TabHeader />
      <View style={{flex: 1}}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>계정 생성</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Form setEmail={setEmail} setPassword={setPassword} />
          <TouchableOpacity
            style={
              email.length > 0 && password.length > 0
                ? styles.button
                : styles.buttonDisabled
            }
            onPress={handleSignUp}>
            <Text
              style={
                email.length > 0 && password.length > 0
                  ? styles.buttonText
                  : styles.buttonTextDisabled
              }>
              가입하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Wallpaper>
  );
}

const MARGIN = 40;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 32,
    color: 'white',
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(240, 53, 224, 1)',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonDisabled: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(240, 53, 224, 0.2)',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
    marginHorizontal: 20,
    marginTop: 20,
  },

  input: {
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
  },
  buttonTextDisabled: {
    color: 'rgba(255,255,255,0.2)',
  },
});
