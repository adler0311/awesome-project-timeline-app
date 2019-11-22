import React from 'react';
import Timeline from '../../Timeline';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';

const colorTheme = '#FF5FF1';

export default function UserItemDetail({navigation}) {
  const userData = navigation.getParam('userData');

  const onEventPress = data => {
    navigation.navigate('EventDetail', {event: data});
  };

  return (
    <>
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
            <Text>{userData.username}</Text>
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
      <Timeline
        data={userData.events}
        onEventPress={onEventPress}
        columnFormat="single-column-left"
        detailContainerStyle={{
          padding: 10,
          marginVertical: 20,
        }}
        titleStyle={{color: colorTheme}}
        descriptionStyle={{color: 'black'}}
        lineColor={colorTheme}
      />
    </>
  );
}
