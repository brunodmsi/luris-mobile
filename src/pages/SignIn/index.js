import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import DropdownAlert from 'react-native-dropdownalert';
import { Fumi } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '~/services/api';

import logo from '~/images/LURISFULL.png';

import styles from './styles';
import { colors } from '~/styles';

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
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    const { fadeAnim } = this.state;

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
    }).start();
  }

  goToSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate('SignUp');
  };

  saveUser = async data => {
    const userData = JSON.stringify(data);
    await AsyncStorage.setItem('@Luris:user', userData);
  };

  signIn = async () => {
    const { email, password, fadeAnim } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });

    if (email.length === 0 || password.length === 0) {
      this.setState({ loading: false });
      this.dropdown.alertWithType('error', 'Erro', 'Preencha os campos para continuar!');
    } else {
      try {
        const user = await api.post('sessions', {
          email,
          password,
        });

        await this.saveUser(user.data);

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 100,
        }).start();

        navigation.navigate('Map');
      } catch (err) {
        this.setState({ loading: false });
        this.dropdown.alertWithType('error', 'Erro', err.response.data.error);
      }
    }
  };

  render() {
    const { loading, fadeAnim } = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <StatusBar hidden />

          <Image source={logo} style={styles.logo} />
          <Text style={styles.text}>Entre agora! Mas antes...</Text>
          <Text style={styles.text}>precisamos que você</Text>
          <Text style={styles.text}>informe o seu e-mail e senha.</Text>

          <View style={styles.form}>
            <Fumi
              label="E-mail"
              iconClass={Icon}
              iconName="envelope"
              iconColor={colors.secondary}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => this.setState({ email: text })}
              style={styles.input}
              keyboardType="email-address"
            />

            <Fumi
              label="Senha"
              iconClass={Icon}
              iconName="lock"
              iconColor={colors.secondary}
              iconSize={20}
              inputPadding={16}
              iconWidth={40}
              style={styles.input}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={this.signIn}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpButton} onPress={this.goToSignUp}>
              <Text style={styles.signUpText}>Nao tem uma conta?</Text>
              <Text style={styles.signUpText}>Cadastre-se agora!</Text>
            </TouchableOpacity>
          </View>
          <KeyboardSpacer />
          <DropdownAlert ref={ref => (this.dropdown = ref)} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
