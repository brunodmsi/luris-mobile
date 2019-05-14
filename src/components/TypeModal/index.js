import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';

import Separator from '~/components/Separator';

import styles from './styles';

export default class TypeModal extends Component {
  static propTypes = {
    typeModal: PropTypes.bool.isRequired,
    handleTypeModal: PropTypes.func,
    handleTypeSelect: PropTypes.func,
  };

  justToGetOut = () => {};

  render() {
    const { typeModal, handleTypeModal, handleTypeSelect } = this.props;

    return (
      <Modal
        isVisible={typeModal}
        onBackdropPress={() => handleTypeModal()}
        swipeDirection="left"
        onSwipeComplete={() => handleTypeModal()}
        backdropOpacity={0.5}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => handleTypeSelect('ramp')}
              style={styles.modalBtn}
              resizeMode="contain"
            >
              <Text style={styles.modalText}>RAMPA</Text>
            </TouchableOpacity>

            <Separator />
            <Separator />
            <Separator />

            <TouchableOpacity
              onPress={() => handleTypeSelect('tatile')}
              style={styles.modalBtn}
              resizeMode="contain"
            >
              <Text style={styles.modalText}>PISO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
