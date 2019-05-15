import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
  Image,
} from 'react-native';

import api from '~/services/api';

import logo from '~/images/LURIS.png';

import styles from './styles';

export default class SignIn extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',
    loading: false,
    error: '',
  };

  goToSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  };

  logInUser = async (email, password) => {
    try {
      const user = await api.post('sessions', {
        email,
        password,
      });

      return { failed: false, user };
    } catch (err) {
      return { failed: true, error: err.response };
    }
  };

  saveUser = async (data) => {
    const userData = JSON.stringify(data);
    await AsyncStorage.setItem('@Luris:user', userData);
  };

  signIn = async () => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });

    if (email.length === 0 || password.length === 0) {
      this.setState({ error: 'Preencha os campos para continuar!', loading: false });
    } else {
      try {
        const response = await this.logInUser(email, password);
        if (response.failed) throw response.error.data.error;
        await this.saveUser(response.user.data);

        navigation.navigate('Map');
      } catch (err) {
        this.setState({ loading: false, error: err });
      }
    }
  };

  render() {
    const {
      email, password, loading, error,
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* <Text style={styles.title}>Luris</Text>
        <Text style={styles.text}>Entre agora! Mas antes...</Text>
        <Text style={styles.text}>precisamos que você</Text>
        <Text style={styles.text}>informe o seu e-mail e senha.</Text> */}
        <Image source={logo} />
        {error.length !== 0 && <Text style={styles.error}>{error}</Text>}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu e-mail"
            underlineColorAndroid="transparent"
            keyboardType="email-address"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite sua senha"
            underlineColorAndroid="transparent"
            value={password}
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />

          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpButton} onPress={this.goToSignUp}>
            <Text style={styles.signUpText}>Nao tem uma conta? Cadastre-se agora!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
