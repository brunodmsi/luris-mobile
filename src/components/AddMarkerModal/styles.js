import { StyleSheet, Dimensions } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 200,
  },

  modalBtn: {
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    margin: metrics.baseMargin * 2,
  },

  text: {
    fontSize: 30,
    color: colors.secondary,
  },

  image: {
    width: 20,
    height: 30,
  },

  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
