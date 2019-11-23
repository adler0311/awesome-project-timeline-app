import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Textarea} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {inject, observer} from 'mobx-react';

import UserInput from '../UserInput';
import {convertToDateString} from '../../utils';

import Wallpaper from '../Wallpaper';

const AddEventScreen = ({navigation, onPut}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleDonePress = () => {
    onPut({title, description, date});
    navigation.navigate('MyTimeline');
  };

  const datepicker = () => {
    setShow(true);
  };

  const handleDateTimePickerChange = (event, changedDate) => {
    setShow(false);
    const newDate = changedDate || date;
    setDate(newDate);
  };

  return (
    <Wallpaper>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 30,
              flex: 1,
            }}>
            <Text style={{fontSize: 28, color: 'white'}}>이벤트 추가</Text>
          </View>
          <View>
            <UserInput
              source={null}
              secureTextEntry={false}
              placeholder="타이틀"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={setTitle}
            />
            <Textarea
              rowSpan={5}
              placeholder="설명"
              placeholderTextColor="white"
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={datepicker}
              style={[
                styles.button,
                {paddingHorizontal: 30, marginHorizontal: 0},
              ]}>
              <Text style={{color: 'white'}}>날짜 선택</Text>
            </TouchableOpacity>

            <Text style={{color: 'white'}}>{convertToDateString(date)}</Text>
          </View>
          {show && (
            <DateTimePicker
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={handleDateTimePickerChange}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={handleDonePress}>
            <Text style={{color: 'white'}}>DONE</Text>
          </TouchableOpacity>
          <View style={{flex: 1}}></View>
        </View>
      </KeyboardAvoidingView>
    </Wallpaper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textArea: {
    borderRadius: 10,
    margin: 20,
    marginTop: 20,
    color: 'white',
    padding: 10,
    paddingLeft: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  button: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 30,
    borderRadius: 10,
    borderColor: 'white',
    height: 30,
  },
});

export default inject(({eventStore}) => ({
  onPut: eventStore.put,
}))(observer(AddEventScreen));
