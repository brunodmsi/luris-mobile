import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_DIM = Dimensions.get('window');

const styles = StyleSheet.create({
  marker: {
    height: 2,
    width: 2,
  },
  image: {
    height: 70,
    width: 70,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  addModalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowRadius: 10,
    // width: SCREEN_DIM.width / 2,
    // height: 200
  },
  modalCloseButton: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    flex: 0,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  addButton: {
    width: '100%',
    backgroundColor: '#2c3e50',
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default styles;
