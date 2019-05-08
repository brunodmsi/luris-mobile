/* eslint-disable no-useless-return */
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import Header from '~/components/Header';

import api from '../../services/api';
import custom from './mapCustomStyle';

import ramp from '../../images/ramp.png';
import tatile from '../../images/tatile.jpeg';

export default class Map extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    region: null,
    isTypeSelected: false,
    isRegionSet: false,
    isMarkersLoaded: false,
    markers: [],
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const region = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        };

        this.setState({ region, isRegionSet: true });
      },
      error => alert(JSON.stringify(error)),
      // {
      //   enableHighAccuracy: true,
      //   timeout: 20000,
      //   maximumAge: 0,
      //   samples: 1,
      // },
    );

    const { token } = JSON.parse(await AsyncStorage.getItem('@Luris:user'));

    await api
      .get('/access', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        this.setState({ markers: res.data, isMarkersLoaded: true });
      });
  }

  onRegionChange = region => {
    const { isRegionSet } = this.state;
    if (!isRegionSet) return;
    this.setState({ region });
  };

  async createMarker(coords) {
    const { isTypeSelected } = this.state;

    if (!isTypeSelected) return;
  }

  render() {
    const { region, markers, isMarkersLoaded } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Header title="LURIS" />
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
          showsUserLocation
          loadingEnabled
          customMapStyle={custom}
          onPress={event => this.createMarker(event.nativeEvent.coordinate)}
        >
          {isMarkersLoaded &&
            markers.map(marker => (
              <Marker
                coordinate={{
                  latitude: Number(marker.latitude),
                  longitude: Number(marker.longitude),
                }}
                icon={marker.type === 'ramp' ? ramp : tatile}
                style={{ height: 2, width: 2 }}
                key={marker._id}
              />
            ))}
        </MapView>
      </View>
    );
  }
}
