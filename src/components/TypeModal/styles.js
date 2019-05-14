import { StyleSheet, Dimensions } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: colors.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },

  modalBtn: {
    backgroundColor: colors.darker,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingBottom: metrics.basePadding,
    paddingTop: metrics.basePadding,
    marginBottom: metrics.baseMargin,
  },

  modalText: {
    fontSize: 30,
    color: colors.white,
  },
});

export default styles;
