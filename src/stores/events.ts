import {observable, action, computed, runInAction} from 'mobx';
import {convertToDateString} from '../utils';
import firestore from '@react-native-firebase/firestore';

type Event = {
  title: string;
  description: string;
  date: any;
};

type EventSnapshot = {
  _data: Event;
};

export default class EventStore {
  @observable events: Event[] = [];

  /**
   * date를 객체로 저장하고 있음.
   */
  @action
  put = async (event, uid) => {
    this.events.push(event);

    await firestore()
      .collection('users')
      .doc(uid)
      .collection('events')
      .add(event);

    return;
  };

  @action
  clearEvents = () => {
    this.events = [];
  };

  @action
  fetchMyEvents = async (uid = 'rbxlBStx7GJUbkPvfdaa') => {
    const timeline = [];
    const eventsRef = await firestore()
      .collection('users')
      .doc(uid)
      .collection('events')
      .orderBy('date', 'desc')
      .get();

    eventsRef.docs
      .map((eventSnapshot: EventSnapshot) => eventSnapshot._data)
      .map((event: Event) => {
        timeline.push({...event, date: event.date.toDate()});
      });

    runInAction(() => {
      this.events = timeline;
    });
  };

  @computed
  get dateConvertedEvents() {
    if (this.events.length === 0) return this.events;
    return this.events.map(event => ({
      ...event,
      date: convertToDateString(event.date),
    }));
  }
}
