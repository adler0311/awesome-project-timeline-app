import {observable, action, computed, runInAction} from 'mobx';
import firestore from '@react-native-firebase/firestore';

type CurrentUser = {
  email: string;
  uid: string;
};

type User = {
  username: string;
  position: string;
  year: number;
  timelineExposure: boolean;
};

export default class UserStore {
  @observable users: User[] = [];
  @observable user: User = null;

  @action
  getUsers = async () => {
    const users = [];
    const usersRef = await firestore()
      .collection('users')
      .where('timelineExposure', '==', true)
      .get();

    let user;
    for (user of usersRef.docs) {
      users.push({...user._data, id: user.id});
    }

    runInAction(() => {
      this.users = users;
    });
  };

  @action
  setUser = async (user: CurrentUser, position: string, year: number) => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .set({
        position,
        year,
        email: user.email,
        timelineExposure: true,
      });
  };

  @action
  updateMyTimelineExposure = async (uid: string, timelineExposure) => {
    await firestore()
      .collection('users')
      .doc(uid)
      .update({timelineExposure: !timelineExposure});
  };

  @action
  getUser = async uid => {
    const user = await firestore()
      .collection('users')
      .doc(uid)
      .get();

    runInAction(() => {
      this.user = user;
    });
  };
}
