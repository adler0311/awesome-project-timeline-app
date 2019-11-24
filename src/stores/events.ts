import {observable, action, computed, runInAction} from 'mobx';
import {convertToDateString} from '../utils';
import firestore from '@react-native-firebase/firestore';

type Event = {
  title: string;
  description: string;
  date: Date;
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
  put = async event => {
    this.events.push(event);

    const result = await firestore()
      .collection('users')
      .doc('rbxlBStx7GJUbkPvfdaa')
      .collection('events')
      .add(event);

    console.log(result);

    return;
  };

  @action
  clearEvents = () => {
    this.events = [];
  };

  @action
  fetchMyEvents = async (id = 'rbxlBStx7GJUbkPvfdaa') => {
    const timeline = [];
    const myEventsRef = await firestore()
      .collection('users')
      .doc(id)
      .collection('events')
      .get();

    myEventsRef.docs
      .map((eventSnapshot: EventSnapshot) => eventSnapshot._data)
      .map((event: Event) => {
        timeline.push(event);
      });

    runInAction(() => {
      this.events = timeline;
    });
  };

  /**
   * firestore에 Date 객체로 저장한 경우에만 사용
   */
  @computed
  get dateConvertedEvents() {
    if (this.events.length === 0) return this.events;
    return this.events.map(event => ({
      ...event,
      date: convertToDateString(event.date),
    }));
  }
}
