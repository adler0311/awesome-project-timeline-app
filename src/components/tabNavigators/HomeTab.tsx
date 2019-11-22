import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import MyTimeline from '../homeTab/MyTimeline';
import AddEventScreen from '../homeTab/AddEventScreen';
import EventDetail from '../EventDetail';

export default createAppContainer(
  createStackNavigator({
    MyTimeline,
    AddEventScreen,
    EventDetail,
  }),
);
