import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

const darkStyles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 5,
    marginVertical: hp('0.5%'),
    backgroundColor: COLORS.black,
    color: COLORS.white,
    fontFamily: 'SourceSansPro-Regular',
    width: wp('90%'),
  },
});

export default darkStyles;
