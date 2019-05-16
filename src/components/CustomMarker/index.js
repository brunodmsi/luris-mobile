/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Image } from 'react-native';

import { Marker, Callout } from 'react-native-maps';

import styles from './styles';

import rampSmall from '~/images/marker-ramp-small.png';
import tatileSmall from '~/images/marker-tatile-small.png';

const CustomMarker = ({ marker }) => (
  <Marker
    coordinate={{
      latitude: Number(marker.latitude),
      longitude: Number(marker.longitude),
    }}
    image={marker.type === 'ramp' ? rampSmall : tatileSmall}
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
