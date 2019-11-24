import React from 'react';
import {View, Text} from 'react-native';
import TabHeader from './TabHeader';
import {Container} from 'native-base';

export default function EventDetail({navigation}) {
  const event = navigation.getParam('event');

  // homeTab에서 뒤로가기를 누르면 OtherTab으로 가는 버그가 있다.

  return (
    <Container>
      <TabHeader />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{event.title}</Text>
        <Text>{event.description}</Text>
        <Text>{event.date}</Text>
      </View>
    </Container>
  );
}
