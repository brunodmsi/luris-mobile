import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import api from '~/services/api';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import DropdownAlert from 'react-native-dropdownalert';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';

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
    name: '',
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

  goToSignIn = () => {
    const { navigation } = this.props;
    const { fadeAnim } = this.state;

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
    }).start();

    navigation.navigate('SignIn');
  };

  signUp = async () => {
    const { name, email, password } = this.state;

    this.setState({ loading: true });

    if (email.length === 0 || password.length === 0 || name.length === 0) {
      this.dropdown.alertWithType('error', 'Erro', 'Preencha os campos para continuar!');
      this.setState({ loading: false });
    } else {
      try {
        await api.post('users', {
          name,
          email,
          password,
        });

        this.dropdown.alertWithType(
          'success',
          'Sucesso',
          'Sua conta foi criada! Redirecionando...',
        );

        setTimeout(this.goToSignIn, 3000);
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
          <Text style={styles.text}>Cadastre-se agora!</Text>
          <Text style={styles.text}>Nos informe seu</Text>
          <Text style={styles.text}>nome, e-mail e senha.</Text>

          <View style={styles.form}>
            <Fumi
              label="Nome"
              iconClass={Icon}
              iconName="user"
              iconColor={colors.secondary}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={text => this.setState({ name: text })}
              style={styles.input}
            />

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

            <TouchableOpacity style={styles.button} onPress={this.signUp}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInButton} onPress={this.goToSignIn}>
              <Text style={styles.signInText}>Ja tem uma conta?</Text>
              <Text style={styles.signInText}>Entre agora!</Text>
            </TouchableOpacity>
          </View>
          <KeyboardSpacer />
          <DropdownAlert ref={ref => (this.dropdown = ref)} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
