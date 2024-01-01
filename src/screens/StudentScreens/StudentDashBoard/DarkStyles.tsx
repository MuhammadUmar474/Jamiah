import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../shared/themes';

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    width: wp('90%'),
    backgroundColor: COLORS.lightGrey,
    marginVertical: hp('1%'),
  },
  infoImage: {
    height: 55,
    width: 55,
    marginHorizontal: wp('2%'),
  },
});

export default darkStyles;
