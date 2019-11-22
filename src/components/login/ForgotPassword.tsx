import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

import UserInput from '../UserInput';
import Wallpaper from '../Wallpaper';
import usernameImg from '../../images/username.png';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');

  const handlePasswordResetEmail = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => navigation.navigate('LoginScreen'))
      .catch(error => console.log(error));
  };

  return (
    <Wallpaper>
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Text style={{fontSize: 32, color: 'white'}}>
          Forgot Password Screen
        </Text>
      </View>
      <View style={styles.inputButtonContainer}>
        <View style={{marginBottom: 20}}>
          <UserInput
            source={usernameImg}
            placeholder="Email"
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
            <Text style={styles.text}>Send Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Wallpaper>
  );
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
    borderRadius: 20,
    zIndex: 100,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
