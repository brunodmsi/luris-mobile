import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
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
