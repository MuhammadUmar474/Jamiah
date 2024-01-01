import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoStyle: {
    height: 70,
    width: 280,
    alignSelf: 'center',
  },
  orgLogoStyle: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },

  bottomView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: hp('25%'),
  },
  alreadyAccountTxt: {
    alignSelf: 'center',
    color: COLORS.black,
  },
  forgotPasswordTxt: {
    color: COLORS.black,
  },
  errMsg: {
    color: 'red',
    alignSelf: 'flex-start',
  },
  signIntxt: {
    color: COLORS.primary,
  },
});

export default styles;
