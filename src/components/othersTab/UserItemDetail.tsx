import React, {useState, useEffect} from 'react';
import Timeline from '../../Timeline';
import {View, Text} from 'react-native';
import {Icon, Container} from 'native-base';
import TabHeader from '../TabHeader';
import {inject, observer} from 'mobx-react';

const colorTheme = '#FF5FF1';

const UserItemDetail = ({navigation, timeline, fetchMyEvents, clearEvents}) => {
  const userData = navigation.getParam('userData');
  const [isLoading, setIsLoading] = useState(true);

  const _fetchEvent = async () => {
    await fetchMyEvents(userData.id);
    setIsLoading(false);
  };

  useEffect(() => {
    _fetchEvent();
  }, []);

  const onEventPress = data => {
    navigation.navigate('EventDetail', {event: data});
  };

  return (
    <Container>
      <TabHeader navigation={navigation} />
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          marginVertical: 20,
          alignItems: 'center',
          paddingBottom: 20,
          borderBottomWidth: 1,
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="ios-person" />
        </View>
        <View style={{flex: 4}}>
          <View style={{marginBottom: 10}}>
            <Text>{userData.email}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{marginRight: 10}}>
              <Text>{userData.position}</Text>
            </View>
            <View>
              <Text>{userData.year}년차</Text>
            </View>
          </View>
        </View>
      </View>
      {!isLoading ? (
        <Timeline
          data={timeline}
          onEventPress={onEventPress}
          detailContainerStyle={{
            padding: 10,
            marginVertical: 20,
          }}
          titleStyle={{color: colorTheme}}
          lineColor={colorTheme}
          separator={false}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Waiting...</Text>
        </View>
      )}
    </Container>
  );
};

export default inject(({eventStore}) => ({
  fetchMyEvents: eventStore.fetchMyEvents,
  timeline: eventStore.dateConvertedEvents,
  clearEvents: eventStore.clearEvents,
}))(observer(UserItemDetail));
