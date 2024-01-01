import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.greyish,
    padding: 15,
    width: wp('90%'),
    marginVertical: hp('1%'),
    marginRight: wp('1%'),
    borderRadius: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000AA',
  },
  modalView: {
    margin: 10,
    backgroundColor: COLORS.white,
    width: wp('90%'),
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 15,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
});

export default styles;
