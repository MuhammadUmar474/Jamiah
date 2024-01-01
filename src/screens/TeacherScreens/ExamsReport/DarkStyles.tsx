import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../shared/themes';

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
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
    borderWidth: 0.5,
    padding: 10,
    paddingVertical: 2,
    borderRadius: 5,
    marginVertical: hp('0.5%'),
    backgroundColor: COLORS.white,
    width: wp('90%'),
    height: hp('15%'),
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
    alignSelf: 'flex-start',
    marginTop: hp('0.5%'),
    zIndex: -3,
  },
  dropDown: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.2,
    padding: 15,
    paddingVertical: 2,
    minHeight: 45,
    borderRadius: 5,
    marginTop: hp('0.5%'),
    width: wp('90%'),
  },
  dropDownItems: {
    borderWidth: 0.2,
    paddingVertical: 5,
    maxHeight: hp('30%'),
    borderRadius: 5,
    width: wp('90%'),
  },
  imageView: {height: 40, width: 40, borderRadius: 20},
  dropDownboxStyle: {
    marginHorizontal: wp('1%'),
    width: 20,
    height: 20,
  },
});

export default darkStyles;
