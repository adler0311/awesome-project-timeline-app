import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const UpButton = ({upButtonHandler, backgroundColor}) => (
  <TouchableOpacity
    onPress={upButtonHandler}
    style={[styles.upButton, {backgroundColor}]}>
    <Icon name="ios-add" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  upButton: {
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

export default UpButton;
