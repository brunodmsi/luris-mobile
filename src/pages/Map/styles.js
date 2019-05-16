import { StyleSheet, Dimensions } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },

  addBtn: {
    flex: 1,
  },

  btnContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default styles;
