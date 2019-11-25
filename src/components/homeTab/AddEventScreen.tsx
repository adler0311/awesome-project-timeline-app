import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Textarea, Container} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {inject, observer} from 'mobx-react';
import ImagePicker from 'react-native-image-picker';

import UserInput from '../UserInput';
import {convertToDateString} from '../../utils';

import Wallpaper from '../Wallpaper';
import TabHeader from '../TabHeader';

const AddEventScreen = ({navigation, onPut}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  const handleChoosePhoto = () => {
    const options = {};
    ImagePicker.showImagePicker(options, response => {
      console.log(response);
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  useEffect(() => {
    console.log('here');
    console.log(title.length);
    console.log(description.length);
    if (title.length > 0 && description.length > 0) {
      console.log('done?');
      setDone(true);
    }
  }, [title, description]);

  const handleDonePress = () => {
    if (!(title && description)) {
      return;
    }

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

  const onPressEmptySpace = () => {
    Keyboard.dismiss();
  };

  const handleTitleChange = text => {
    setTitle(text);
  };

  const handleDescriptionChange = text => {
    setDescription(text);
  };

  return (
    <Container>
      <TabHeader navigation={navigation} />
      <Wallpaper>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={onPressEmptySpace}>
          <View style={{flex: 1}}>
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
                onChangeText={handleTitleChange}
              />
              <Textarea
                rowSpan={5}
                placeholder="설명"
                placeholderTextColor="white"
                style={styles.textArea}
                value={description}
                onChangeText={handleDescriptionChange}
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

              <Text style={{color: 'white', fontSize: 16}}>
                {convertToDateString(date)}
              </Text>
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
            <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
              <Text style={{color: 'white', fontSize: 16}}>이미지 추가</Text>
            </TouchableOpacity>
            {photo && (
              <Image
                source={{uri: photo.uri}}
                style={{width: 300, height: 300}}
              />
            )}
            <TouchableOpacity
              style={done ? styles.button : styles.doneButtonDisabled}
              onPress={handleDonePress}>
              <Text style={done ? styles.doneText : styles.doneTextDisabled}>
                추가
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Wallpaper>
    </Container>
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
    height: 40,
  },
  doneButtonDisabled: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 30,
    borderRadius: 10,
    height: 40,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  doneText: {color: 'white', fontSize: 16},
  doneTextDisabled: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.2)',
  },
});

export default inject(({eventStore}) => ({
  onPut: eventStore.put,
}))(observer(AddEventScreen));
