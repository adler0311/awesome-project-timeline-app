import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Container, Header} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import UserItem from './UserItem';

export default function OthersTab({navigation}) {
  const [timelines, setTimelines] = useState([]);

  const getTimelines = async () => {
    const timelines = [];

    const usersRef = await firestore()
      .collection('users')
      .get();

    let user;
    for (user of usersRef.docs) {
      const {username, position, year} = user._data;
      const timeline = {uid: user.id, events: [], username, position, year};
      const eventsRef = await firestore()
        .collection('users')
        .doc(user.id)
        .collection('events')
        .get();

      let event;
      for (event of eventsRef.docs) {
        timeline.events.push(event._data);
      }
      timelines.push(timeline);
    }

    setTimelines(timelines);
  };

  useEffect(() => {
    getTimelines();
  }, []);

  const renderItem = ({item}) => {
    return <UserItem item={item} navigation={navigation} />;
  };

  return (
    <Container>
      <Header style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20}}>Others</Text>
      </Header>
      <View conetntComponentStyle={styles.container}>
        {timelines.length > 0 ? (
          <FlatList
            // style={{flex: 1}}
            data={timelines}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text>there is no user timelines</Text>
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});