import React from 'react';
import {View, Text} from 'react-native';
import {Left, Header, Right, Body} from 'native-base';
import {Icon} from 'native-base';
import auth from '@react-native-firebase/auth';
import {withNavigation} from 'react-navigation';

const colorTheme = '#FF5FF1';

const TabHeader = ({title, navigation, isMain = false}) => {
  return (
    <Header
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      {isMain ? null : (
        <Left style={{flex: 1, marginLeft: 20}}>
          <Icon name="md-arrow-back" onPress={() => navigation.goBack()} />
        </Left>
      )}
      <Body>
        <Text style={{fontSize: 20}}>{title ? title : ''}</Text>
      </Body>
      <Right style={{flex: 1, marginRight: 10}}>
        <Icon
          type="MaterialCommunityIcons"
          name="logout"
          onPress={() => auth().signOut()}
          color={colorTheme}
        />
      </Right>
    </Header>
  );
};

export default withNavigation(TabHeader);