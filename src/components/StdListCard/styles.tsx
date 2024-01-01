import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const styles = StyleSheet.create({
  dropDownItems: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  imageView: {height: 40, width: 40, borderRadius: 20},
  dropDownboxStyle: {
    marginHorizontal: wp('1%'),
    width: 20,
    height: 20,
  },
});

export default styles;
