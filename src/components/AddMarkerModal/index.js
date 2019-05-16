import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View, TouchableOpacity, Text, Image,
} from 'react-native';
import Modal from 'react-native-modalbox';

import markerRamp from '~/images/marker-ramp.png';
import markerTatile from '~/images/marker-tatile.png';

import styles from './styles';

export default class AddMarkerModal extends Component {
  static propTypes = {
    addMarkerModal: PropTypes.bool.isRequired,
    handleAddMarkerModal: PropTypes.func,
    handleMarkerSelect: PropTypes.func,
  };

  justToGetOut = () => {};

  render() {
    const { addMarkerModal, handleAddMarkerModal, handleMarkerSelect } = this.props;

    return (
      <Modal
        isOpen={addMarkerModal}
        onClosed={handleAddMarkerModal}
        backdropPressToClose
        style={[styles.modal, styles.modal4]}
        backdropOpacity={0.6}
        swipeToClose
        animationDuration={100}
        position="bottom"
        entry="bottom"
        ref="modal4"
        backButtonClose
      >
        <TouchableOpacity
          onPress={() => handleMarkerSelect('ramp')}
          style={styles.modalBtn}
          resizeMode="contain"
        >
          <View style={styles.button}>
            <Text style={styles.text}>RAMPA</Text>
            <Image source={markerRamp} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleMarkerSelect('tatile')}
          style={styles.modalBtn}
          resizeMode="contain"
        >
          <View style={styles.button}>
            <Text style={styles.text}>PISO</Text>
            <Image source={markerTatile} />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}
