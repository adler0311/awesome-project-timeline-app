import React from 'react';
import {StyleSheet, View, TextInput, Image, Dimensions} from 'react-native';
import {darkTheme} from '../theme';

type PropUserInput = {
  source: any;
  placeholder: string;
  secureTextEntry: boolean;
  autoCorrect: boolean;
  autoCapitalize: string;
  returnKeyType: string;
  onChangeText: (changeText: string) => void;
  placeholderTextColor: string;
};

export default function UserInput({
  source,
  placeholder,
  secureTextEntry,
  autoCorrect,
  autoCapitalize,
  returnKeyType,
  onChangeText,
  placeholderTextColor = 'white',
}: PropUserInput) {
  return (
    <View style={styles.inputWrapper}>
      <Image source={source} style={styles.inlineImg} />
      <TextInput
        style={source ? styles.input : [styles.input, {paddingLeft: 20}]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        placeholderTextColor={placeholderTextColor}
        underlineColorAndroid="transparent"
        onChangeText={text => onChangeText(text)}
      />
    </View>
  );
}
const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 50,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 10,
    color: 'white',
  },
  inputWrapper: {
    marginTop: 10,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
});
