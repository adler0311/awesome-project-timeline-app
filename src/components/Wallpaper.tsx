import React, {Component} from 'react';
import {StyleSheet, ImageBackground, KeyboardAvoidingView} from 'react-native';

import bgSrc from '../images/wallpaper.png';

export default function Wallpaper({children}) {
  return (
    <ImageBackground style={styles.picture} source={bgSrc}>
      <KeyboardAvoidingView style={{flex: 1}}>{children}</KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
