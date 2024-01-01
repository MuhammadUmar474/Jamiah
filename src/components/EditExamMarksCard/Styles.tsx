import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginVertical: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageView: {height: 40, width: 40, borderRadius: 20},
  examMarkView: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: wp('20%'),
    height: hp('5.5%'),
  },
  errMsg: {
    color: 'red',
    alignSelf: 'flex-end',
  },
});

export default styles;
