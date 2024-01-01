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
    fontFamily: 'Poppins-Medium',
    marginLeft: wp('4%'),
    marginTop: hp('0.3%'),
  },
  infoHeader: {
    marginTop: hp('3%'),
    flexDirection: 'row',
    marginHorizontal: wp('8%'),
  },
  teacherInfoContainer: {
    backgroundColor: COLORS.greyish,
    padding: 15,
    width: wp('90%'),
    marginVertical: hp('1%'),
    marginHorizontal: wp('5%'),
    borderRadius: 5,
    flexDirection: 'row',
  },
  teacherTxt: {
    fontFamily: 'Poppins-Medium',
    marginLeft: wp('4%'),
    marginTop: hp('2%'),
  },
  noClassView: {
    alignSelf: 'center',
    marginTop: hp('30%'),
  },
});

export default darkStyles;
