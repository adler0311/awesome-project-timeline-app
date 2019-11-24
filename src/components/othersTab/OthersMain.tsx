import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Container, Header} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import UserItem from './UserItem';
import TabHeader from '../TabHeader';
import {inject} from 'mobx-react';
import {observer} from 'mobx-react-lite';

const OthersMain = ({navigation, getUsers, users}) => {
  // const getTimelines = async () => {
  //   const timelines = [];

  //   const usersRef = await firestore()
  //     .collection('users')
  //     .get();

  //   let user;
  //   for (user of usersRef.docs) {
  //     const {username, position, year} = user._data;
  //     const timeline = {uid: user.id, events: [], username, position, year};
  //     const eventsRef = await firestore()
  //       .collection('users')
  //       .doc(user.id)
  //       .collection('events')
  //       .get();

  //     let event;
  //     for (event of eventsRef.docs) {
  //       timeline.events.push(event._data);
  //     }
  //     timelines.push(timeline);
  //   }

  //   setTimelines(timelines);
  // };

  const _getUsers = async () => {
    await getUsers();
  };

  useEffect(() => {
    _getUsers();
  }, []);

  const renderItem = ({item: user}) => {
    return <UserItem user={user} navigation={navigation} />;
  };

  return (
    <Container>
      <TabHeader navigation={navigation} isMain={true} />
      <View conetntComponentStyle={styles.container}>
        {users.length > 0 ? (
          <FlatList
            // style={{flex: 1}}
            data={users}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text>there is no user timelines</Text>
        )}
      </View>
    </Container>
  );
};

OthersMain.navigationOptions = {
  headerTitle: () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>구경하기</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default inject(({userStore}) => ({
  getUsers: userStore.getUsers,
  users: userStore.users,
}))(observer(OthersMain));
