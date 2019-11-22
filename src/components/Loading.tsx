import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Loading({navigation}) {
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      navigation.navigate(user ? 'MainScreen' : 'LoginScreen'); // 해당 네비게이션이 없으면 아무런 동작을 하지 않는다.
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
