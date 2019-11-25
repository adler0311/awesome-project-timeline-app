import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

const UserItem = ({user, navigation}) => {
  const handlePress = () => {
    navigation.navigate('UserItemDetail', {userData: user});
  };

  return (
    <TouchableOpacity
      style={{
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginVertical: 20,
        marginHorizontal: 30,
        paddingBottom: 20,
      }}
      onPress={handlePress}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Icon name="ios-person" />
      </View>
      <View style={{flex: 4}}>
        <View>
          <Text>{user.email}</Text>
        </View>
        <View>
          <Text>{user.position}</Text>
        </View>
        <View>
          <Text>{user.year}년차</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserItem;
