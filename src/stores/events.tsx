import {observable, action, computed} from 'mobx';
import {dateStringToKorean, convertToDateString} from '../utils';

type Event = {
  title: string;
  description: string;
  date: Date;
};

export default class EventStore {
  @observable events: Event[] = [];

  @action
  put = event => {
    this.events.push(event);
    return;
  };

  @computed
  get dateConvertedEvents() {
    return this.events.map(event => ({
      ...event,
      date: convertToDateString(event.date),
    }));
  }
}
