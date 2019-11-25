import React, {useState} from 'react';
import Form from './Form';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Picker,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Wallpaper from '../Wallpaper';
import TabHeader from '../TabHeader';
import {inject, observer} from 'mobx-react';

import {Container} from 'native-base';
import UserInput from '../UserInput';

const DEVICE_WIDTH = Dimensions.get('window').width;

type FirebaseUser = {
  email: string;
  uid: string;
};

type CreateUserResponse = {
  user: FirebaseUser;
};

const CreateAccount = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [year, setYear] = useState('~2년차');

  const onReady = () => {
    return (
      email.length > 0 &&
      password.length > 0 &&
      position.length > 0 &&
      year.length > 0
    );
  };

  const onPressEmptySpace = () => {
    Keyboard.dismiss();
  };

  const handleSignUp = () => {
    if (email.length === 0 || password.length === 0) return;

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response: CreateUserResponse) => {
        return response.user;
      })
      .then((user: FirebaseUser) => {
        setUser(user, position, year);
      })

      .catch(error => {
        console.log(error);
        if (error.toString().indexOf('email-already-in-use') > -1) {
          alert('이미 사용중인 이메일 입니다.');
        } else {
          console.error(error);
        }
      });
  };

  return (
    <Container>
      <TabHeader />
      <Wallpaper>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={onPressEmptySpace}>
          <View style={{flex: 1}}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>계정 생성</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Form setEmail={setEmail} setPassword={setPassword} />
              <UserInput
                source={null}
                secureTextEntry={false}
                placeholder="직무"
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={setPosition}
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={year}
                  onValueChange={year => setYear(year)}
                  style={{marginHorizontal: 10, color: 'white'}}>
                  <Picker.Item label="~2년차" value="~2년차" />
                  <Picker.Item label="3~5년차" value="3~5년차" />
                  <Picker.Item label="5~7년차" value="5~7년차" />
                  <Picker.Item label="7~10년차" value="7~10년차" />
                  <Picker.Item label="10년차~" value="10년차~" />
                </Picker>
              </View>
              <TouchableOpacity
                style={onReady() ? styles.button : styles.buttonDisabled}
                onPress={handleSignUp}>
                <Text
                  style={
                    onReady() ? styles.buttonText : styles.buttonTextDisabled
                  }>
                  가입하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Wallpaper>
    </Container>
  );
};

const MARGIN = 40;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    flex: 0.3,
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
  pickerWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 10,
    color: '#ffffff',
    marginTop: 10,
  },
});

export default inject(({userStore}) => ({
  setUser: userStore.setUser,
}))(observer(CreateAccount));
