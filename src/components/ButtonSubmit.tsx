import React, {useState} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  View,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default function ButtonSubmit({email, password}) {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonAnimated] = useState(new Animated.Value(0));
  const [growAnimated] = useState(new Animated.Value(0));

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => null)
      .catch(error => console.error(error));
  };

  const _onPress = () => {
    if (email.length === 0 && password.length === 0) return;
    if (isLoading) return;
    setIsLoading(true);

    Animated.timing(buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      _onGrow();
    }, 2000);

    setTimeout(() => {
      login();
      setIsLoading(false);
    }, 2300);
  };

  const _onGrow = () => {
    Animated.timing(growAnimated, {
      toValue: 1,
      duration: 2200,
      easing: Easing.linear,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          width: buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
          }),
        }}>
        <TouchableOpacity
          style={
            email.length > 0 && password.length > 0
              ? styles.button
              : styles.buttonDisabled
          }
          onPress={_onPress}
          activeOpacity={1}>
          {isLoading ? (
            <Image source={spinner} style={styles.image} />
          ) : (
            <Text
              style={
                email.length > 0 && password.length > 0
                  ? styles.buttonText
                  : styles.buttonTextDisabled
              }>
              로그인
            </Text>
          )}
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [
                {
                  scale: growAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, MARGIN],
                  }),
                },
              ],
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(240, 53, 224, 1)',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  buttonDisabled: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(240, 53, 224, 0.2)',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: 'rgba(240, 53, 224, 0)',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: 'rgba(240, 53, 224, 0)',
  },
  circleDisabled: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  buttonText: {
    color: 'rgba(255,255,255, 1)',
    backgroundColor: 'transparent',
  },
  buttonTextDisabled: {
    color: 'rgba(255,255,255, 0.2)',
    backgroundColor: 'transparent',
  },

  image: {
    width: 24,
    height: 24,
  },
});
