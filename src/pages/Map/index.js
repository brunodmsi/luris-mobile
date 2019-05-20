/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-useless-return */
import React, { Component } from 'react';
import { AsyncStorage, Animated, StatusBar } from 'react-native';

import DropdownAlert from 'react-native-dropdownalert';
import MapView from 'react-native-maps';

import Header from '~/components/Header';
import AddMarkerModal from '~/components/AddMarkerModal';
import FilterModal from '~/components/FilterModal';
import FadingButton from '~/components/FadingButton';

import CustomMarker from '~/components/CustomMarker';

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
    fadeAnim: new Animated.Value(0),
  };

  async componentDidMount() {
    const { fadeAnim } = this.state;

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
      {
        // enableHighAccuracy: true,
        // timeout: 2000,
        // maximumAge: 0,
        // samples: 1,
      },
    );

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
    }).start();

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

  _setFilteredMarkers = async (type, str) => {
    const { token } = JSON.parse(await AsyncStorage.getItem('@Luris:user'));
    this.setState({ isMarkersLoaded: false, filterModal: false });

    await api
      .get(`/access?type=${type}&street=${str}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.setState({ markers: res.data, isMarkersLoaded: true });
      })
      .catch(err => this.dropdown.alertWithType('error', 'Erro', JSON.stringify(err.response)));
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
      fadeAnim,
    } = this.state;

    return (
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
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

        {renderAddBtn ? (
          <FadingButton addMarkerModal={this._addMarkerModal} icon="add-location" />
        ) : (
          <FadingButton addMarkerModal={this._addMarkerModal} icon="cancel" />
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
            setFilteredMarkers={this._setFilteredMarkers}
          />
        ) : null}
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </Animated.View>
    );
  }
}
