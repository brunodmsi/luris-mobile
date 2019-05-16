import { StyleSheet, Dimensions } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    height: 250,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: metrics.baseMargin,
  },

  inputs: {
    width: metrics.screenWidth * 0.8,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: metrics.baseMargin,
  },

  button: {
    backgroundColor: colors.primary,
    // borderRadius: metrics.baseRadius,
    height: 60,
    marginTop: metrics.baseMargin,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
