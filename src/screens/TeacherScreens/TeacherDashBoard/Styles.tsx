import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../shared/themes';
import {isAndroid} from '../../../utils/platformUtils/platformCheck';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  attendenceContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    width: wp('40%'),
    backgroundColor: COLORS.dimBlue,
    marginRight: wp('2%'),
  },

  examsContainer: {
    flexDirection: 'row',
    padding: isAndroid() ? 4 : 10,
    paddingTop: 12,
    borderRadius: 8,
    width: wp('50%'),
    backgroundColor: COLORS.lightGreen,
    marginVertical: hp('0.5%'),
  },
  infoContainer: {
    flexDirection: 'row',
    padding: isAndroid() ? 4 : 10,
    paddingTop: 12,
    borderRadius: 8,
    width: wp('50%'),
    backgroundColor: COLORS.lightPink,
    marginVertical: hp('0.5%'),
  },
  notificationIcon: {
    height: 22,
    width: 20,
    marginTop: hp('1%'),
  },
  infoImage: {
    height: 45,
    width: 45,
    marginHorizontal: wp('2%'),
  },
  nameTxt: {
    marginLeft: wp('2%'),
  },
  noAssignmentsView: {
    backgroundColor: COLORS.greyish,
    padding: 10,
    paddingVertical: 40,
    width: wp('90%'),
    marginVertical: hp('1%'),
    borderRadius: 8,
  },
});

export default styles;
