/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-useless-return */
import React, { Component } from 'react';
import {
  View, AsyncStorage, TouchableOpacity, Text, StatusBar,
} from 'react-native';

import DropdownAlert from 'react-native-dropdownalert';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';

import Header from '~/components/Header';
import AddMarkerModal from '~/components/AddMarkerModal';
import FilterModal from '~/components/FilterModal';

import CustomMarker from '~/components/CustomMarker';

import styles from './styles';
import { colors } from '~/styles';

import api from '~/services/api';

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
    renderAddBtn: true,
    addMarkerModal: false,
    typeSelected: '',
    filterModal: false,
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const region = {
          latitude,
          longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.0071,
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
      .then((res) => {
        this.setState({ markers: res.data, isMarkersLoaded: true });
      });
  }

  onRegionChange = (region) => {
    const { isRegionSet } = this.state;
    if (!isRegionSet) return;
    this.setState({ region });
  };

  _handleFilterModal = () => {
    const { filterModal } = this.state;

    this.setState({ filterModal: !filterModal });
  };

  setFilteredMarkers = async (type, str) => {
    const { token } = JSON.parse(await AsyncStorage.getItem('@Luris:user'));
    this.setState({ isMarkersLoaded: false, filterModal: false, markers: [] });

    await api
      .get(`/access?type=${type}&street=${str}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.setState({ markers: res.data, isMarkersLoaded: true });
      })
      .catch(err => alert(JSON.stringify(err.response)));
  };

  _addMarkerModal = () => {
    const { addMarkerModal, renderAddBtn } = this.state;

    if (addMarkerModal && !renderAddBtn) {
      this.setState({
        addMarkerModal: false,
        renderAddBtn: true,
      });
    } else if (!addMarkerModal && renderAddBtn) {
      this.setState({ addMarkerModal: true, renderAddBtn: false });
    } else if (!addMarkerModal && !renderAddBtn) {
      this.setState({ renderAddBtn: true });
    }
  };

  _handleMarkerSelect = (type) => {
    this.setState({
      typeSelected: type,
      addMarkerModal: false,
      isTypeSelected: true,
    });
  };

  renderMarker = marker => <CustomMarker marker={marker} />;

  async createMarker(coords) {
    const { isTypeSelected, typeSelected, markers } = this.state;

    if (!isTypeSelected) return;

    const { token } = JSON.parse(await AsyncStorage.getItem('@Luris:user'));
    const res = await api
      .post(
        'access',
        {
          latitude: String(coords.latitude),
          longitude: String(coords.longitude),
          type: typeSelected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .catch(() => {
        this.dropdown.alertWithType('error', 'Erro', 'Ocorreu um erro ao adicionar o ponto!');
      });

    this.setState({
      markers: [...markers, res.data],
      renderAddBtn: true,
      isTypeSelected: false,
    });

    const { data } = res;
    this.renderMarker(data);

    this.dropdown.alertWithType('success', 'Sucesso', 'Ponto adicionado com sucesso!');
  }

  render() {
    const {
      region,
      markers,
      isMarkersLoaded,
      renderAddBtn,
      addMarkerModal,
      filterModal,
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <Header title="LURIS" handleFilterModal={this._handleFilterModal} />
        <MapView
          provider="google"
          style={{ flex: 1 }}
          initialRegion={region}
          showsUserLocation
          loadingEnabled
          showsMyLocationButton
          showsTraffic={false}
          rotateEnabled={false}
          onPress={event => this.createMarker(event.nativeEvent.coordinate)}
        >
          {isMarkersLoaded && markers.map(marker => this.renderMarker(marker))}
        </MapView>
        {/* <TouchableOpacity style={styles.addBtn} onPress={this._addMarkerModal}> */}
        {/* <Icon name="add-location" size={64} color={colors.primary} solid /> */}
        {renderAddBtn ? (
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={this._addMarkerModal}>
              <Icon name="add-location" size={35} reverse color={colors.secondary} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={this._addMarkerModal}>
              <Icon name="cancel" size={35} reverse color={colors.secondary} />
            </TouchableOpacity>
          </View>
        )}

        {addMarkerModal ? (
          <AddMarkerModal
            addMarkerModal={addMarkerModal}
            handleAddMarkerModal={this._addMarkerModal}
            handleMarkerSelect={this._handleMarkerSelect}
          />
        ) : null}

        {filterModal ? (
          <FilterModal
            filterModal={filterModal}
            handleFilterModal={this._handleFilterModal}
            setNewMarkers={this.setFilteredMarkers}
          />
        ) : null}
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>
    );
  }
}
