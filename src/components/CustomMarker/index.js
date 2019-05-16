/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';

import { Marker, Callout } from 'react-native-maps';

import styles from './styles';

import markerRamp from '~/images/marker-ramp.png';
import markerTatile from '~/images/marker-tatile.png';

const CustomMarker = ({ marker }) => (
  <Marker
    coordinate={{
      latitude: Number(marker.latitude),
      longitude: Number(marker.longitude),
    }}
    image={marker.type === 'ramp' ? markerRamp : markerTatile}
    // style={styles.marker}
    key={marker._id}
  >
    <Callout tooltip>
      <View style={styles.callout}>
        <Text style={styles.calloutText}>{marker.formatted_address}</Text>
      </View>
    </Callout>
  </Marker>
);

CustomMarker.propTypes = {
  marker: PropTypes.any.isRequired,
};

export default CustomMarker;
