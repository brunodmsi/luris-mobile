import { StyleSheet, Platform } from 'react-native';
import { colors, metrics } from '~/styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 54 + getStatusBarHeight() : 54;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: STATUS_BAR_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryEEE,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: metrics.basePadding,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.lighter,
  },

  icon: {
    color: colors.lighter,
  },
});

export default styles;
