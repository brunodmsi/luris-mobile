/* eslint-disable no-useless-return */
import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  TouchableOpacity,
  Text,
  Image
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";

import Header from "~/components/Header";
import Separator from "~/components/Separator";

import styles from "./styles";
import custom from "./mapCustomStyle";
import { colors } from "~/styles";

import api from "~/services/api";

import ramp from "~/images/rampTest.png";
import tatile from "~/images/tatileTest.png";

export default class Map extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    region: null,
    isTypeSelected: false,
    isRegionSet: false,
    isMarkersLoaded: false,
    markers: [],
    renderAddBtn: true,
    renderModalType: false,
    typeModal: false,
    typeSelected: ""
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const region = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134
        };

        this.setState({ region, isRegionSet: true });
      },
      error => alert(JSON.stringify(error))
      // {
      //   enableHighAccuracy: true,
      //   timeout: 20000,
      //   maximumAge: 0,
      //   samples: 1,
      // },
    );

    const { token } = JSON.parse(await AsyncStorage.getItem("@Luris:user"));

    await api
      .get("/access", {
        headers: {
          Authorization: `Bearer ${token}`
        }
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

  _handleTypeModal = () => {
    const { typeModal, renderAddBtn } = this.state;

    if (typeModal && !renderAddBtn) {
      this.setState({
        typeModal: false,
        renderAddBtn: true
      });
    } else if (!typeModal && renderAddBtn) {
      this.setState({ typeModal: true, renderAddBtn: false });
    } else if (!typeModal && !renderAddBtn) {
      this.setState({ renderAddBtn: true });
    }
  };

  _renderMarker = (latitude, longitude, type, _id) => (
    <Marker
      coordinate={{
        latitude: Number(latitude),
        longitude: Number(longitude)
      }}
      icon={type === "ramp" ? ramp : tatile}
      style={styles.marker}
      key={_id}
    />
  );

  async createMarker(coords) {
    const { isTypeSelected, typeSelected, markers } = this.state;

    if (!isTypeSelected) return;

    const { token } = JSON.parse(await AsyncStorage.getItem("@Luris:user"));
    const res = await api
      .post(
        "access",
        {
          latitude: String(coords.latitude),
          longitude: String(coords.longitude),
          type: typeSelected
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .catch(function(err) {
        alert("Ocorreu um erro ao adicionar o ponto");
      });

    this.setState({
      markers: [...markers, res.data],
      renderAddBtn: true,
      isTypeSelected: false
    });

    const data = res.data;
    this._renderMarker(data.latitude, data.longitude, data.type, data._id);

    alert("Ponto adicionado com sucesso!");
  }

  render() {
    const {
      region,
      markers,
      isMarkersLoaded,
      renderAddBtn,
      typeModal
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Header title="LURIS" />
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
          showsUserLocation
          loadingEnabled
          showsMyLocationButton={true}
          customMapStyle={custom}
          onPress={event => this.createMarker(event.nativeEvent.coordinate)}
        >
          {isMarkersLoaded &&
            markers.map(marker =>
              this._renderMarker(
                marker.latitude,
                marker.longitude,
                marker.type,
                marker._id
              )
            )}
        </MapView>

        {renderAddBtn ? (
          <View style={styles.addBtnContainer}>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={this._handleTypeModal}
            >
              <Icon
                name="add-location"
                size={64}
                color={colors.primary}
                solid
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cancelBtnContainer}>
            <View style={styles.addText}>
              <Text>Selecione um ponto</Text>
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={this._handleTypeModal}
            >
              <Icon name="cancel" size={64} color={colors.primary} solid />
            </TouchableOpacity>
          </View>
        )}

        <Modal isVisible={typeModal} onBackdropPress={this._handleTypeModal}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    typeSelected: "ramp",
                    isTypeSelected: true,
                    typeModal: false
                  })
                }
                style={styles.modalBtn}
                resizeMode="contain"
              >
                <Text style={styles.modalText}>RAMPA</Text>
              </TouchableOpacity>

              <Separator />

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    typeSelected: "tatile",
                    isTypeSelected: true,
                    typeModal: false
                  })
                }
                style={styles.modalBtn}
                resizeMode="contain"
              >
                <Text style={styles.modalText}>PISO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
