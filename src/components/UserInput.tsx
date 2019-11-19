import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Dimensions,
  Text,
} from 'react-native';

type PropUserInput = {
  source: number;
  placeholder: string;
  secureTextEntry: boolean;
  autoCorrect: boolean;
  autoCapitalize: string;
  returnKeyType: string;
  onChangeText: (changeText: string) => null;
};

export default function UserInput({
  source,
  placeholder,
  secureTextEntry,
  autoCorrect,
  autoCapitalize,
  returnKeyType,
  onChangeText,
}: PropUserInput) {
  return (
    <View style={styles.inputWrapper}>
      <Image source={source} style={styles.inlineImg} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        onChangeText={text => onChangeText(text)}
      />
    </View>
  );
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
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
