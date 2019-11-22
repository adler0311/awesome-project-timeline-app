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
