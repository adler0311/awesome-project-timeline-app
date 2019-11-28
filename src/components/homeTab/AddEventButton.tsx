import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {darkTheme} from '../../theme';

const AddEventButton = ({upButtonHandler}) => (
  <TouchableOpacity
    onPress={upButtonHandler}
    style={[styles.floatingButton, {backgroundColor: darkTheme.buttonColor}]}>
    <Icon name="ios-add" style={{color: darkTheme.fontColor}} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 0,
    borderRadius: 30,
    elevation: 8,
  },
});

export default AddEventButton;
