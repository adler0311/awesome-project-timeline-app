import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Loading from './src/components/Loading';
import LoginScreen from './src/components/LoginScreen';
import Main from './src/components/Main';
import CreateAccount from './src/components/CreateAccount';
import ForgotPassword from './src/components/ForgotPassword';

const App = createSwitchNavigator(
  {
    Loading,
    LoginScreen,
    Main,
    CreateAccount,
    ForgotPassword,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(App);
