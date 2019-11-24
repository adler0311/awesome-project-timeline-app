import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Icon} from 'native-base';

import OthersMain from '../othersTab/OthersMain';
import UserItemDetail from '../othersTab/UserItemDetail';
import EventDetail from '../EventDetail';

const OthersTab = createAppContainer(
  createStackNavigator(
    {
      OthersMain,
      UserItemDetail,
      EventDetail,
    },
    {
      defaultNavigationOptions: {
        header: null,
      },
    },
  ),
);

OthersTab.navigationOptions = {
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-people" style={{color: tintColor}} />
  ),
};

export default OthersTab;
