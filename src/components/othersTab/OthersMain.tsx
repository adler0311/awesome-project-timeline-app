import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Container, Header} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import UserItem from './UserItem';
import TabHeader from '../TabHeader';
import {inject} from 'mobx-react';
import {observer} from 'mobx-react-lite';

const OthersMain = ({navigation, getUsers, users}) => {
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
            data={users}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text>아직 타임라인이 없어요😂</Text>
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
