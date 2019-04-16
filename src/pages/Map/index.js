import React, { Component } from 'react';
import { View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import Header from '~/components/Header';

export default class Map extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    console.tron.log('montou');
  }

  render() {
    const region = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    };

    return (
      <View style={{ flex: 1 }}>
        <Header title="LURIS" />
        <MapView style={{ flex: 1 }} region={region} showsUserLocation loadingEnabled />
      </View>
    );
  }
}
