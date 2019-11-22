import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import OthersMain from '../othersTab/OthersMain';
import UserItemDetail from '../othersTab/UserItemDetail';
import EventDetail from '../EventDetail';

export default createAppContainer(
  createStackNavigator({
    OthersMain,
    UserItemDetail,
    EventDetail,
  }),
);
