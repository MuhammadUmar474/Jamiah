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
  imageView: {height: 40, width: 40, borderRadius: 20},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000AA',
  },
  modalView: {
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white',
    width: wp('90%'),
    borderRadius: 10,
    padding: 10,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  daysView: {
    alignItems: 'center',
    marginHorizontal: wp('1.8%'),
  },
  attendenceIcon: {height: 24, width: 24, marginTop: hp('1%'), opacity: 0.7},
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
