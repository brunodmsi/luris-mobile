import React, { Component } from 'react';
import LottieView from 'lottie-react-native';

import animation from '~/animations/splash.json';

import styles from './styles';

export default class SplashScreen extends Component {
  jtg = () => {};

  render() {
    return <LottieView source={animation} autoPlay loop style={styles.container} />;
  }
}
