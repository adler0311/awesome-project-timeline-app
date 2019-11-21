import React, {useState, useEffect} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {inject, observer} from 'mobx-react';

import Timeline from '../Timeline';
import UpButton from './UpButton';

const colorTheme = '#FF5FF1';

const Main = ({navigation, events}) => {
  const onEventPress = () => {
    alert('!!!');
  };

  const upButtonHandler = () => {
    navigation.navigate('AddEventScreen');
  };

  return (
    <View style={styles.container}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <Text style={{fontSize: 30}}>My Project Timeline</Text>
      </View>
      <View style={{flex: 1, marginVertical: 40}}>
        <Timeline
          data={events}
          onEventPress={onEventPress}
          columnFormat="single-column-left"
          detailContainerStyle={{
            padding: 10,
            marginVertical: 20,
          }}
          titleStyle={{color: colorTheme}}
          // separator={true}
          descriptionStyle={{color: 'black'}}
          lineColor={colorTheme}
        />
        <UpButton
          backgroundColor={colorTheme}
          upButtonHandler={upButtonHandler}
        />
      </View>

      <Button
        title="logout"
        onPress={() => auth().signOut()}
        color={colorTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default inject(({eventStore}) => ({
  events: eventStore.dateConvertedEvents,
}))(observer(Main));
