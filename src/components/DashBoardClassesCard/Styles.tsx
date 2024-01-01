import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.greyish,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: wp('70%'),
    marginVertical: hp('1%'),
    marginRight: wp('2%'),
    borderRadius: 8,
    flexDirection: 'row',
  },
  verticalLine: {
    height: hp('5%'),
    width: 1,
    backgroundColor: COLORS.grey,
    marginHorizontal: wp('3%'),
  },
  imageView: {
    height: 18,
    width: 18,
    borderRadius: 9,
  },
});

export default styles;
