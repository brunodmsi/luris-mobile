import { StyleSheet, Dimensions } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  callout: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 4,
  },

  calloutText: {
    color: colors.white,
  },
});

export default styles;
