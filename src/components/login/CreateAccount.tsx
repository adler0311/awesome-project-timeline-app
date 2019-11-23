import React, {useState} from 'react';
import Form from './Form';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import Wallpaper from '../Wallpaper';

export default function CreateAccount({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('handle sign up');
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Main'))
      .catch(error => console.error(error)); // 로그인이 성공하면 resolve되는 듯 하다.
  };

  return (
    <Wallpaper>
      <View style={{flex: 1}}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Create Account</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Form setEmail={setEmail} setPassword={setPassword} />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            activeOpacity={1}>
            <Text style={styles.text}>SIGNUP</Text>
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
    backgroundColor: '#F035E0',
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
  text: {
    color: 'white',
  },
});
