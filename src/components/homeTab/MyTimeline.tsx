import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';
import {captureScreen} from 'react-native-view-shot';

import Timeline from '../../Timeline';
import FloatingButton from './AddEventButton';
import {Container} from 'native-base';
import TabHeader from '../TabHeader';
import {colorTheme} from '../../theme';

import auth from '@react-native-firebase/auth';

type CurrentUser = {
  email: string;
  uid: string;
};

const MyTimeline = ({navigation, fetchEvents, timeline}) => {
  const _fetchEvents = async () => {
    await fetchEvents(auth().currentUser.uid);
  };

  useEffect(() => {
    _fetchEvents();
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

  const renderTimeline = () => (
    <Timeline
      data={timeline}
      onEventPress={onEventPress}
      detailContainerStyle={{
        padding: 10,
        marginVertical: 15,
      }}
      titleStyle={{color: colorTheme}}
      // separator={true}
      lineColor={colorTheme}
    />
  );

  return (
    <Container style={styles.container}>
      <TabHeader isMain={true} />
      <View style={{padding: 20, alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={onCapture} style={styles.captureButton}>
          <Text style={{color: 'white'}}>화면 캡쳐</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginBottom: 20}}>
        {timeline.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>아직 이벤트가 없습니다. 추가해보세요!</Text>
          </View>
        ) : (
          renderTimeline()
        )}
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
  fetchEvents: eventStore.fetchMyEvents,
  timeline: eventStore.dateConvertedEvents,
}))(observer(MyTimeline));
