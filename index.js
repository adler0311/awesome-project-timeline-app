/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';

import EventStore from './src/stores/events';
import UserStore from './src/stores/users';
import {Provider} from 'mobx-react';
import SplashScreen from 'react-native-splash-screen';

const eventStore = new EventStore();
const userStore = new UserStore();

AppRegistry.registerComponent(
  appName,
  () =>
    function() {
      SplashScreen.hide();
      return (
        <Provider eventStore={eventStore} userStore={userStore}>
          <App />
        </Provider>
      );
    },
);
