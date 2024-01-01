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
    marginTop: hp('10%'),
  },
  noRecordView: {
    alignSelf: 'center',
    marginTop: hp('-40%'),
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
  calendarStyle: {
    bottom: 9,
    borderWidth: 0.2,
    borderColor: COLORS.gray,
    borderRadius: 5,
    padding: 1,
  },

  addExamBtn: {
    marginTop: hp('80%'),
    marginLeft: wp('80%'),
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  errMsg: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: hp('1%'),
  },
});

export default styles;
