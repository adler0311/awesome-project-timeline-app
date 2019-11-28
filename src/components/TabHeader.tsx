import React from 'react';
import {Text} from 'react-native';
import {Left, Header, Right, Body} from 'native-base';
import {Icon} from 'native-base';
import auth from '@react-native-firebase/auth';
import {withNavigation} from 'react-navigation';
import {darkTheme} from '../theme';

const TabHeader = ({title, navigation, isMain = false, isLoggedIn = true}) => {
  const handlePress = () => {
    navigation.goBack();
  };
  return (
    <Header
      style={{
        backgroundColor: darkTheme.backgroundColor,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBotttomColor: darkTheme.borderColor,
      }}>
      <Left style={{flex: 1, marginLeft: 20}}>
        {isMain ? null : (
          <Icon
            name="md-arrow-back"
            onPress={handlePress}
            style={{color: darkTheme.fontColor}}
          />
        )}
      </Left>
      <Body>
        <Text style={{fontSize: 20}}>{title ? title : ''}</Text>
      </Body>
      <Right style={{flex: 1, marginRight: 10}}>
        {!isLoggedIn ? null : (
          <Icon
            type="MaterialCommunityIcons"
            name="logout"
            onPress={() => auth().signOut()}
            style={{color: darkTheme.fontColor}}
          />
        )}
      </Right>
    </Header>
  );
};

export default withNavigation(TabHeader);
