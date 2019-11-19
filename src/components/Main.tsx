import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Main({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Text>Main Page</Text>
      </View>
      <View style={{flex: 1, marginHorizontal: 20}}>
        <Button title="logout" onPress={() => auth().signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
