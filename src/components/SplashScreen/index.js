import React, { Component } from 'react';
// import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import animation from '~/animations/splash.json';

import styles from './styles';

export default class SplashScreen extends Component {
  jtg = () => {};

  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.text}>LURIS</Text>
      // </View>
      <LottieView source={animation} autoPlay loop style={styles.container} />
    );
  }
}
