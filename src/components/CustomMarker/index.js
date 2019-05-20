/* eslint-disable import/no-unresolved */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import FastImage from 'react-native-fast-image';

import { Marker } from 'react-native-maps';

import styles from './styles';

import rampMarker from '~/images/marker-ramp.png';
import tatileMarker from '~/images/marker-tatile.png';

const CustomMarker = ({ marker }) => (
  <Marker
    coordinate={{
      latitude: Number(marker.latitude),
      longitude: Number(marker.longitude),
    }}
    key={`${marker._id}_${Date.now()}`}
    title={marker.type === 'ramp' ? 'Rampa' : 'Piso'}
    description={marker.address}
  >
    <FastImage source={marker.type === 'ramp' ? rampMarker : tatileMarker} style={styles.image} />
  </Marker>
);

CustomMarker.propTypes = {
  marker: PropTypes.objectOf.isRequired,
};

export default CustomMarker;
