import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../../shared/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topContainer: {
    backgroundColor: COLORS.primaryLight,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 10,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 10,
    backgroundColor: COLORS.primaryLight,
  },
  underTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxStyle: {
    marginHorizontal: wp('1%'),
    marginTop: hp('1%'),
    width: 16,
    height: 16,
  },
  calendarContainer: {
    borderWidth: 0.2,
    borderColor: COLORS.grey,
    marginTop: hp('0.5%'),
    width: wp('90%'),
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionView: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: hp('0.5%'),
    backgroundColor: COLORS.white,
    width: wp('90%'),
    height: hp('6%'),
  },
  timeView: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: hp('0.5%'),
    backgroundColor: COLORS.white,
    width: wp('90%'),
    height: hp('6%'),
  },
  calendarStyle: {
    bottom: 9,
    borderWidth: 0.2,
    borderColor: COLORS.gray,
    borderRadius: 5,
    padding: 1,
  },
  errMsg: {
    color: 'red',
    marginTop: hp('0.5%'),
    zIndex: -1,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000AA',
  },
  assignmentDescriptionView: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    padding: 10,
    paddingVertical: 2,
    borderRadius: 5,
    marginVertical: hp('0.5%'),
    backgroundColor: COLORS.white,
    width: wp('89.5%'),
    height: hp('15%'),
  },
  fileButton: {
    marginLeft: wp('2%'),
    width: wp('25%'),
    height: hp('4%'),
    backgroundColor: COLORS.white,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: hp('3%'),
    borderColor: COLORS.black,
    borderWidth: 0.5,
  },
});

export default styles;
