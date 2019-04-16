import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Map from '~/pages/Map';

const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator(
    {
      SignIn,
      SignUp,
      Map,
    },
    {
      initialRouteName: userLogged ? 'Map' : 'SignIn',
    },
  ),
);

export default Routes;
