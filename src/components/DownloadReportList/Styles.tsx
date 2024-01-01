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
  },
  boxStyle: {
    marginHorizontal: wp('1%'),
    marginTop: hp('1%'),
    width: 16,
    height: 16,
  },
});

export default styles;
