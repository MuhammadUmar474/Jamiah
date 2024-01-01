import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const styles = StyleSheet.create({
  buttonLogin: {
    width: wp('90%'),
    height: hp('6%'),
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
    borderColor: 'transparent',
    borderWidth: 1,
  },
  logInTxt: {
    color: COLORS.white,
  },
});

export default styles;
