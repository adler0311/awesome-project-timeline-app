import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';
import {captureScreen} from 'react-native-view-shot';

import Timeline from '../../Timeline';
import FloatingButton from './AddEventButton';
import {Container, Switch} from 'native-base';
import TabHeader from '../TabHeader';
import {darkTheme} from '../../theme';

import auth from '@react-native-firebase/auth';
import {NavigationEvents} from 'react-navigation';

const MyTimeline = ({
  navigation,
  fetchEvent,
  timeline,
  updateMyTimelineExposure,
  getUser,
  user,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const _getUser = async () => {
    console.log(auth().currentUser);
    await getUser(auth().currentUser.uid);
  };

  const _fetchEvent = async () => {
    await fetchEvent(auth().currentUser.uid);
  };

  useEffect(() => {
    _fetchEvent().then(() => {
      setIsLoading(false);
    });
    _getUser();
  }, [isLoading]);

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
        // borderWidth: 1,
        // borderColor: darkTheme.borderColor,
        // borderRadius: 10,
      }}
      titleStyle={{color: darkTheme.fontColor}}
      descriptionStyle={{
        color: darkTheme.fontColor,
      }}
      separator={false}
      lineColor={darkTheme.lineColor}
      inputCircleStyle={{backgroundColor: darkTheme.buttonColor}}
    />
  );

  const handleToggleSwitchChange = e => {
    updateMyTimelineExposure(auth().currentUser.uid, e.nativeEvent.value);
  };

  return (
    <Container style={styles.container}>
      <TabHeader isMain={true} />
      <NavigationEvents
        onWillFocus={() => {
          setIsLoading(true);
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 20,
          justifyContent: 'space-between',
        }}>
        <View style={{marginLeft: 20}}>
          <TouchableOpacity onPress={onCapture} style={styles.captureButton}>
            <Text style={{color: darkTheme.fontColor}}>화면 캡쳐</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginRight: 20}}>
          <Switch
            value={user ? user.timelineExposure : false}
            onChange={handleToggleSwitchChange}
            trackColor={{
              false: darkTheme.fontColor,
              true: darkTheme.buttonColor,
            }}
            thumbColor={darkTheme.buttonColor}
          />
        </View>
      </View>

      <View style={{flex: 1, marginBottom: 20}}>
        {!isLoading && timeline.length > 0 ? (
          renderTimeline()
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
              {isLoading
                ? '로딩 중입니다...'
                : '아직 이벤트가 없습니다. 추가해보세요!'}
            </Text>
          </View>
        )}

        <FloatingButton upButtonHandler={floatingButtonHandler} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
  },
  captureButton: {
    width: 120,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: darkTheme.buttonColor,
  },
});

export default inject(({eventStore, userStore}) => ({
  fetchEvent: eventStore.fetchMyEvents,
  timeline: eventStore.dateConvertedEvents,
  updateMyTimelineExposure: userStore.updateMyTimelineExposure,
  getUser: userStore.getUser,
  user: userStore.user,
}))(observer(MyTimeline));
