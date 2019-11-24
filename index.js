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

const eventStore = new EventStore();
const userStore = new UserStore();

AppRegistry.registerComponent(
  appName,
  () =>
    function() {
      return (
        <Provider eventStore={eventStore} userStore={userStore}>
          <App />
        </Provider>
      );
    },
);
