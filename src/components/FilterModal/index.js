import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';

import { View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

export default class FilterModal extends Component {
  static propTypes = {
    filterModal: PropTypes.bool.isRequired,
    handleFilterModal: PropTypes.func,
    setNewMarkers: PropTypes.func,
  };

  state = {
    data: [{
      label: 'Todos',
      value: 'all',
    }, {
      label: 'Rampa de Acesso',
      value: 'ramp',
    }, {
      label: 'Piso Tatil',
      value: 'tatile',
    }],
    dropSelected: '',
    streetFilter: '',
  }

  handleSelectDrop = (val) => {
    this.setState({ dropSelected: val });
  }

  handleStreetChange = (val) => {
    this.setState({ streetFilter: val });
  }

  render() {
    const { handleFilterModal, filterModal, setNewMarkers } = this.props;
    const { data, dropSelected, streetFilter } = this.state;

    return (
      <Modal
        isVisible={filterModal}
        onBackdropPress={() => handleFilterModal()}
        swipeDirection="left"
        onSwipeComplete={() => handleFilterModal()}
        backdropOpacity={0.5}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Dropdown
              containerStyle={{ marginTop: 20 }}
              label="Selecione o tipo"
              data={data}
              onChangeText={this.handleSelectDrop}
              value={dropSelected}
            />

            <TextField
              label="Filtre uma rua, cidade, bairro..."
              value={streetFilter}
              onChangeText={this.handleStreetChange}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => setNewMarkers(dropSelected, streetFilter)}
            >
              <Text style={styles.buttonText}>Filtrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
