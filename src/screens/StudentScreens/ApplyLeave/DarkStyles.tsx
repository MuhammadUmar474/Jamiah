import {Platform, StyleSheet} from 'react-native';
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
    paddingBottom: 20,
  },
  topView: {
    marginHorizontal: wp('5%'),
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: COLORS.primaryLight,
  },
  underTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classesTxt: {
    marginLeft: wp('4%'),
    marginTop: hp('0.3%'),
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
    zIndex: -1,
  },
});

export default darkStyles;
