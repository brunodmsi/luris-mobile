import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import '~/config/ReactotronConfig';
import CodePush from 'react-native-code-push';

import SplashScreen from '~/components/SplashScreen';
import createNavigator from './routes';
import api from '~/services/api';

class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
    isLoading: true,
  };

  async componentDidMount() {
    const data = await AsyncStorage.getItem('@Luris:user');
    let tokenValid = false;

    if (data) {
      const { token } = JSON.parse(data);
      try {
        const isVerified = await api.get(`checktoken/${token}`);

        if (Number(isVerified.data.exp) === 0) tokenValid = true;
        else await AsyncStorage.clear();
      } catch (err) {
        console.tron.log(err);
      }
    }

    this.setState({ userChecked: true, userLogged: tokenValid, isLoading: false });
  }

  render() {
    const { userChecked, userLogged, isLoading } = this.state;

    if (isLoading) {
      return <SplashScreen />;
    }

    if (!userChecked) return null;

    const Routes = createNavigator(userLogged);

    return <Routes />;
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
