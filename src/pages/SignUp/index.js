import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import api from '~/services/api';

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
    success: '',
  };

  goToSignIn = () => {
    const { navigation } = this.props;
    navigation.navigate('SignIn');
  };

  signUpUser = async (email, password) => {
    try {
      const user = await api.post('users', {
        email,
        password,
      });

      return { failed: false, user };
    } catch (err) {
      return { failed: true, error: err.response };
    }
  };

  signUp = async () => {
    const { email, password } = this.state;

    this.setState({ loading: true });

    if (email.length === 0 || password.length === 0) {
      this.setState({ error: 'Preencha os campos para continuar!', loading: false });
    } else {
      try {
        const user = await this.signUpUser(email, password);
        if (user.failed) throw user.error.data.error;
        this.setState({ success: 'Conta criada com sucesso! Indo para o Login...', error: '' });

        setTimeout(this.goToSignIn, 3000);
      } catch (err) {
        this.setState({ loading: false, error: err });
      }
    }
  };

  render() {
    const {
      email, password, loading, error, success,
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>Luris</Text>
        <Text style={styles.text}>Cadastre-se agora</Text>
        <Text style={styles.text}>e junte-se a Luris!</Text>

        {error.length !== 0 && <Text style={styles.error}>{error}</Text>}
        {success.length !== 0 && <Text style={styles.success}>{success}</Text>}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Digite seu e-mail"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite sua senha "
            underlineColorAndroid="transparent"
            value={password}
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />

          <TouchableOpacity style={styles.button} onPress={this.signUp}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={this.goToSignIn}>
            <Text style={styles.signInText}>Voltar para o Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
