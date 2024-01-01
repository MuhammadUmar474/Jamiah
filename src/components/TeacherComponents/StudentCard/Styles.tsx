import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../shared/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.greyish,
    padding: 5,
    paddingBottom: 10,
    width: wp('30%'),
    marginHorizontal: hp('0.5%'),
    borderRadius: 5,
    alignItems: 'center',
  },
  imgStyle: {height: 60, width: 60, borderRadius: 30, marginTop: hp('0.5%')},
  classHeadtxt: {
    width: wp('25%'),
    marginTop: hp('0.5%'),
    backgroundColor: COLORS.pink,
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 2,
  },
});

export default styles;
