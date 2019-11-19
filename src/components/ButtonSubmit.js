import React, {useState, useEffect} from 'react';

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

import spinner from '../images/loading.gif';

import auth from '@react-native-firebase/auth';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default function ButtonSubmit({email, password, navigation}) {
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
          style={styles.button}
          onPress={_onPress}
          activeOpacity={1}>
          {isLoading ? (
            <Image source={spinner} style={styles.image} />
          ) : (
            <Text style={styles.text}>LOGIN</Text>
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
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
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
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});
