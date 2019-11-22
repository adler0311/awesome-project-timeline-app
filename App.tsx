import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Loading from './src/components/Loading';
import LoginScreen from './src/components/login/LoginScreen';
import MainScreen from './src/components/MainScreen';
import CreateAccount from './src/components/login/CreateAccount';
import ForgotPassword from './src/components/login/ForgotPassword';
import AddEventScreen from './src/components/homeTab/AddEventScreen';

const App = createSwitchNavigator(
  {
    Loading,
    LoginScreen,
    MainScreen,
    CreateAccount,
    ForgotPassword,
    AddEventScreen,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(App);
