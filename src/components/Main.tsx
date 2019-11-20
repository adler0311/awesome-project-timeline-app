import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

import Timeline from '../Timeline';

const data = [
  {time: '19/10/18', title: '퇴사', description: '이스트 소프트 퇴사'},
  {time: '19/10/25', title: '리액트 학습', description: '리액트 학습 끝'},
  {
    time: '19/11/01',
    title: '심플한 앱 제작 및 배포',
    description: '투두 앱, 날씨 앱 만들어서 안드로이드 마켓에 배포함',
  },
  {
    time: '19/11/14',
    title: '인스타그램 UI 클론',
    description: '인스타 UI 따라 만들기',
  },
  {
    time: '19/10/26',
    title: '휴식',
    description: '...',
  },
  {
    time: '19/10/27',
    title: '휴식2',
    description: '...',
  },
  {
    time: '19/11/20',
    title: '타임라인 앱 제작',
    description: '타임라인 메인 페이지 구현',
  },
];

export default function Main({navigation}) {
  const onEventPress = () => {
    alert('!!!');
  };

  return (
    <View style={styles.container}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <Text style={{fontSize: 30}}>My Project Timeline</Text>
      </View>
      <View style={{flex: 1, marginVertical: 40}}>
        <Timeline
          data={data}
          onEventPress={onEventPress}
          columnFormat="single-column-left"
          detailContainerStyle={{
            padding: 10,
            marginVertical: 20,
          }}
          titleStyle={{color: '#F035E0'}}
          // separator={true}
          descriptionStyle={{color: 'black'}}
        />
      </View>
      <Button title="logout" onPress={() => auth().signOut()} color="#F035E0" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
