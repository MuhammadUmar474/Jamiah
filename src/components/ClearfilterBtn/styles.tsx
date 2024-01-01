import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  clearfilterBtn: {
    alignSelf: 'flex-end',
    marginRight: wp('5%'),
    marginTop: hp('1.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: -3,
  },
  cancelIcon: {height: 10, width: 10, marginRight: wp('2%')},
});

export default styles;
