import { StyleSheet, Dimensions } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    backgroundColor: colors.white,
  },

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
