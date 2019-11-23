import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';

import HomeTab from './tabNavigators/HomeTab';
import OthersTab from './tabNavigators/OthersTab';

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    HomeTab,
    OthersTab,
  },
  {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: 'white',
      },
      indicatorStyle: {
        backgroundColor: 'white',
      },
      activeTintColor: 'black',
      inactiveTintColor: '#A9A9A9',
    },
  },
);

const AppTabContainer = createAppContainer(AppTabNavigator);

const MainScreen = function() {
  return <AppTabContainer />;
};

MainScreen.navigationOptions = () => ({
  header: null,
});

export default MainScreen;
