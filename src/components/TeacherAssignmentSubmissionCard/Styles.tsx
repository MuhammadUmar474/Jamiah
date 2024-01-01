import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 20,
    marginVertical: hp('1%'),
    borderRadius: 5,
    backgroundColor: COLORS.lightGrey,
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
  imageView: {height: 40, width: 40, borderRadius: 20},
  horizontalLine: {
    height: 0.2,
    backgroundColor: COLORS.grey,
    marginVertical: hp('0.5%'),
  },
  bodyData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  downloadIcon: {height: 20, width: 90, marginTop: hp('1%')},
  editIconStyle: {
    height: 16,
    width: 14,
    marginRight: wp('5%'),
  },
  deleteIconStyle: {
    height: 16,
    width: 12,
  },
  addAssignmentIconStyle: {
    height: 16,
    width: 16,
  },
  examMarkView: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: wp('25%'),
    height: hp('5%'),
  },
  errMsg: {
    marginTop: hp('1%'),
    color: 'red',
  },
});

export default styles;
