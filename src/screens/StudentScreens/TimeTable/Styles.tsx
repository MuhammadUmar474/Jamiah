import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../shared/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topContainer: {
    backgroundColor: COLORS.primaryLight,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
  },
  noClassView: {
    alignSelf: 'center',
    marginTop: hp('30%'),
  },
  calendarContainer: {
    borderWidth: 0.2,
    borderColor: COLORS.grey,
    marginTop: hp('0.5%'),
    width: wp('90%'),
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calenderStyle: {
    bottom: 9,
    borderWidth: 0.2,
    borderColor: COLORS.gray,
    borderRadius: 5,
    padding: 1,
  },
});

export default styles;
