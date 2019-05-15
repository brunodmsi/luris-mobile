import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  View, Text, TouchableOpacity, AsyncStorage,
} from 'react-native';

import { MaterialIndicator } from 'react-native-indicators';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    handleFilterModal: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    isLoggingOut: false,
  };

  signOut = async () => {
    const { navigation } = this.props;

    await AsyncStorage.clear();

    navigation.navigate('SignIn');
  };

  handleSignOut = () => {
    this.setState({ isLoggingOut: true });

    setTimeout(this.signOut, 2000);
  };

  render() {
    const { title, handleFilterModal } = this.props;
    const { isLoggingOut } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.handleSignOut}>
          {isLoggingOut ? (
            <MaterialIndicator color="#333" size={16} />
          ) : (
            <Icon name="sign-out" size={16} style={styles.icon} />
          )}
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity style={styles.button} onPress={() => handleFilterModal()}>
          <Icon name="filter" size={16} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Header);
