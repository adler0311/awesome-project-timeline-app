import React from 'react';
import {Icon} from 'native-base';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import MyTimeline from '../homeTab/MyTimeline';
import AddEventScreen from '../homeTab/AddEventScreen';
import EventDetail from '../EventDetail';

const HomeTab = createAppContainer(
  createStackNavigator({
    MyTimeline,
    AddEventScreen,
    EventDetail,
  }),
);

HomeTab.navigationOptions = {
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-home" style={{color: tintColor}} />
  ),
};

export default HomeTab;
