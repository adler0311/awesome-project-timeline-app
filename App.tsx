import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Loading from './src/components/Loading';
import LoginScreen from './src/components/LoginScreen';
import Main from './src/components/Main';
import CreateAccount from './src/components/CreateAccount';
import ForgotPassword from './src/components/ForgotPassword';
import AddEventScreen from './src/components/AddEventScreen';

const App = createSwitchNavigator(
  {
    Loading,
    LoginScreen,
    Main,
    CreateAccount,
    ForgotPassword,
    AddEventScreen,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(App);
