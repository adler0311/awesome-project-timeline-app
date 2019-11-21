import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default function SignupSection({navigation}) {
  const handlePressCreateAccount = () => navigation.navigate('CreateAccount');
  const handlePressForgotPassword = () => navigation.navigate('ForgotPassword');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressCreateAccount} transparent>
        <Text style={styles.text}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressForgotPassword} transparent>
        <Text style={styles.text}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});
