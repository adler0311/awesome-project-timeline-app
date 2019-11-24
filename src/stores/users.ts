import {observable, action, computed, runInAction} from 'mobx';
import {convertToDateString} from '../utils';
import firestore from '@react-native-firebase/firestore';

type User = {
  username: string;
  position: string;
  year: number;
};

export default class UserStore {
  @observable users: User[] = [];

  @action
  getUsers = async () => {
    const users = [];
    const usersRef = await firestore()
      .collection('users')
      .get();

    let user;
    for (user of usersRef.docs) {
      users.push({...user._data, id: user.id});
    }

    runInAction(() => {
      this.users = users;
    });
  };
}
