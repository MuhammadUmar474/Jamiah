import {Platform, StyleSheet} from 'react-native';
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
    paddingBottom: 10,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 10,
    backgroundColor: COLORS.primaryLight,
  },
  underTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noClassView: {
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
  titleView: {
    borderWidth: 0.2,
    padding: 15,
    borderRadius: 5,
    marginVertical: hp('0.5%'),
    backgroundColor: COLORS.white,
    width: wp('90%'),
  },
  descriptionView: {
    borderWidth: 0.2,
    padding: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: hp('0.5%'),
    backgroundColor: COLORS.white,
    width: wp('90%'),
    height: hp('15%'),
  },
  errMsg: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: hp('0.5%'),
    zIndex: -5,
  },
});

export default styles;