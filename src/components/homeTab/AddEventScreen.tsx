import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Textarea, Container} from 'native-base';
import {inject, observer} from 'mobx-react';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';

import UserInput from '../UserInput';
import {convertToDateString} from '../../utils';

import Wallpaper from '../Wallpaper';
import TabHeader from '../TabHeader';
import {darkTheme} from '../../theme';

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
    if (title.length > 0 && description.length > 0) {
      setDone(true);
    }
  }, [title, description]);

  const handleDonePress = () => {
    if (!(title && description)) {
      return;
    }

    onPut({title, description, date}, auth().currentUser.uid);
    navigation.navigate('MyTimeline');
  };

  const datepicker = () => {
    setShow(true);
  };

  const handleDateTimePickerChange = (_, changedDate) => {
    setShow(false);
    const newDate = changedDate || date;
    setDate(newDate);
  };

  const onPressEmptySpace = () => {
    Keyboard.dismiss();
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleDescriptionChange = text => {
    setDescription(text);
  };

  const renderChildren = () => (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={onPressEmptySpace}>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
            flex: 1,
          }}>
          <Text style={{fontSize: 28, color: darkTheme.fontColor}}>
            이벤트 추가
          </Text>
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
            placeholderTextColor={darkTheme.fontColor}
            inputTextColor={darkTheme.fontColor}
          />
          <Textarea
            rowSpan={5}
            placeholder="설명"
            placeholderTextColor={darkTheme.fontColor}
            style={styles.textArea}
            value={description}
            onChangeText={handleDescriptionChange}
            borderWidth={1}
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
            <Text style={{color: darkTheme.fontColor}}>날짜 선택</Text>
          </TouchableOpacity>

          <Text style={{color: darkTheme.fontColor, fontSize: 16}}>
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
          <Text style={{color: darkTheme.fontColor, fontSize: 16}}>
            이미지 추가
          </Text>
        </TouchableOpacity>
        {photo && (
          <Image source={{uri: photo.uri}} style={{width: 300, height: 300}} />
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
  );

  return (
    <Container style={styles.container}>
      <TabHeader navigation={navigation} />
      {renderChildren()}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
  },
  textArea: {
    borderRadius: 10,
    margin: 20,
    marginTop: 20,
    color: darkTheme.fontColor,
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
    borderColor: darkTheme.borderColor,
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
    borderColor: darkTheme.fontColorDisabled,
    backgroundColor: darkTheme.fontColorDisabled,
  },
  doneText: {color: darkTheme.fontColor, fontSize: 16},
  doneTextDisabled: {
    fontSize: 16,
    color: darkTheme.fontColorDisabled,
  },
});

export default inject(({eventStore}) => ({
  onPut: eventStore.put,
}))(observer(AddEventScreen));
