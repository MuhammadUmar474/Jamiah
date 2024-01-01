import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.greyish,
    padding: 5,
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

export default styles;
