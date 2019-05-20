import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: metrics.basePadding * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    flex: 1,
    width: metrics.screenWidth * 0.7,
    height: 90,
    resizeMode: 'contain',
  },

  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },

  text: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.light,
    lineHeight: 21,
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },

  success: {
    color: colors.success,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },

  form: {
    marginTop: metrics.baseMargin * 2,
  },

  input: {
    borderRadius: metrics.baseRadius,
    marginTop: metrics.baseMargin,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: metrics.baseRadius,
    height: 44,
    marginTop: metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },

  signInButton: {
    padding: metrics.basePadding,
    marginTop: metrics.baseMargin,
    width: metrics.screenWidth * 0.7,
  },

  signInText: {
    color: colors.light,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default styles;
