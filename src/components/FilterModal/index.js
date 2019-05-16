import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';

import { View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modalbox';

import styles from './styles';

export default class FilterModal extends Component {
  static propTypes = {
    filterModal: PropTypes.bool.isRequired,
    setFilteredMarkers: PropTypes.func,
    setFilteredMarkers: PropTypes.func,
  };

  state = {
    data: [
      {
        label: 'Todos',
        value: '',
      },
      {
        label: 'Rampa de Acesso',
        value: 'ramp',
      },
      {
        label: 'Piso Tatil',
        value: 'tatile',
      },
    ],
    dropSelected: '',
    streetFilter: '',
  };

  handleSelectDrop = (val) => {
    this.setState({ dropSelected: val });
  };

  handleStreetChange = (val) => {
    this.setState({ streetFilter: val });
  };

  render() {
    const { handleFilterModal, filterModal, setFilteredMarkers } = this.props;
    const { data, dropSelected, streetFilter } = this.state;

    return (
      <Modal
        isOpen={filterModal}
        onClosed={handleFilterModal}
        backdropPressToClose
        style={[styles.modal, styles.modal4]}
        backdropOpacity={0.6}
        swipeToClose
        animationDuration={100}
        position="top"
        entry="top"
        ref="modal4"
        backButtonClose
      >
        <View style={styles.container}>
          <Text style={styles.text}>FILTROS</Text>
          <View style={styles.inputs}>
            <Dropdown
              // containerStyle={{ marginTop: 20 }}
              label="Selecione o tipo"
              data={data}
              onChangeText={this.handleSelectDrop}
              value={dropSelected}
              dropdownOffset={{ top: 60, left: 0 }}
            />

            <TextField
              label="Filtrar por rua, cidade, bairro..."
              value={streetFilter}
              onChangeText={this.handleStreetChange}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setFilteredMarkers(dropSelected, streetFilter)}
          resizeMode="contain"
        >
          <Text style={styles.buttonText}>Filtrar</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}
