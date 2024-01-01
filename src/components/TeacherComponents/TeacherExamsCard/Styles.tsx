import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../shared/themes';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: COLORS.greyish,
    padding: 15,
    width: wp('90%'),
    marginVertical: hp('1%'),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMarksIconStyle: {
    height: 18,
    width: 18,
    marginLeft: wp('5%'),
  },
  eyeIconStyle: {
    height: 15,
    width: 20,
    marginRight: wp('3%'),
  },
  editIconStyle: {
    height: 16,
    width: 14,
    marginRight: wp('5%'),
  },
  deleteIconStyle: {
    height: 16,
    width: 12,
  },
  editExamMarkIconStyle: {
    height: 18.5,
    width: 18.5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000AA',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    width: wp('90%'),
    borderRadius: 5,
    padding: 10,
    paddingVertical: 25,
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
