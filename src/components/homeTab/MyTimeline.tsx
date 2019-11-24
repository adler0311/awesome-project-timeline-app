import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';
import {captureScreen} from 'react-native-view-shot';

import Timeline from '../../Timeline';
import FloatingButton from './AddEventButton';
import {Container} from 'native-base';
import TabHeader from '../TabHeader';

const colorTheme = '#FF5FF1';

const MyTimeline = ({navigation, fetchMyEvents, timeline}) => {
  const _fetchMyEvents = async () => {
    await fetchMyEvents();
  };

  useEffect(() => {
    _fetchMyEvents();
  }, []);

  const onEventPress = event => {
    navigation.navigate('EventDetail', {event});
  };

  const floatingButtonHandler = () => {
    navigation.navigate('AddEventScreen');
  };

  const onCapture = () => {
    console.log('on capture');
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(
      uri => console.log('Image saved to', uri),
      error => console.error('Oops, snapshot failed', error),
    );
  };

  return (
    <Container style={styles.container}>
      <TabHeader isMain={true} />
      <View style={{padding: 20, alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={onCapture} style={styles.captureButton}>
          <Text style={{color: 'white'}}>화면 캡쳐</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginBottom: 20}}>
        <Timeline
          data={timeline}
          onEventPress={onEventPress}
          columnFormat="single-column-left"
          detailContainerStyle={{
            padding: 10,
            marginVertical: 15,
          }}
          titleStyle={{color: colorTheme}}
          // separator={true}
          descriptionStyle={{color: 'black'}}
          lineColor={colorTheme}
        />
        <FloatingButton
          backgroundColor={colorTheme}
          upButtonHandler={floatingButtonHandler}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  captureButton: {
    borderWidth: 1,
    width: 120,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colorTheme,
    borderColor: 'white',
  },
});

export default inject(({eventStore}) => ({
  fetchMyEvents: eventStore.fetchMyEvents,
  timeline: eventStore.events,
}))(observer(MyTimeline));
