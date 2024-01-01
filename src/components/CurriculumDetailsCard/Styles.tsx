import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 15,
    marginVertical: hp('1%'),
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: COLORS.greyish,
    borderRadius: 5,
  },
  imageView: {height: 40, width: 40, borderRadius: 20},
  horizontalLine: {
    height: 0.2,
    backgroundColor: COLORS.grey,
    marginVertical: hp('0.5%'),
  },
});

export default styles;
