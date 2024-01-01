import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.white,
    borderWidth: 1,
    padding: 10,
    width: wp('90%'),
    marginVertical: hp('1%'),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  organizationLogo: {
    height: 36,
    width: 36,
    borderRadius: 18,
    marginHorizontal: wp('2%'),
  },
  forwardArrow: {
    height: 10,
    width: 14,
    marginHorizontal: wp('2%'),
  },
});

export default darkStyles;
