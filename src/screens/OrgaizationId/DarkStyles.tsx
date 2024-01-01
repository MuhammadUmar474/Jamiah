import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  logoStyle: {
    height: 70,
    width: 280,
    alignSelf: 'center',
  },
  signInTxt: {
    color: COLORS.black,
  },
  loggedinTxt: {
    color: COLORS.black,
    marginTop: hp('1.5%'),
    marginHorizontal: wp('1.5%'),
  },
  forgotPasswordTxt: {
    color: COLORS.primary,
    marginTop: hp('1.5%'),
  },
  errMsg: {
    color: 'red',
    alignSelf: 'flex-start',
    // position: 'absolute',
  },
  boxStyle: {
    marginHorizontal: wp('1%'),
    marginTop: 14,
    width: 15,
    height: 15,
  },
});

export default darkStyles;
