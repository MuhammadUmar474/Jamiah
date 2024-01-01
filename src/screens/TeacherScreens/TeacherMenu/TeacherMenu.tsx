import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {Text14, Text16, Text20} from '../../../components/Text';
import {logOutAction} from '../../../redux/actions/auth';
import {
  assignmentDarkIcon,
  assignmentIcon,
  classesDark,
  exams_Dark,
  logoutIcon,
  stdAttendence_Dark,
  userDark,
} from '../../../shared/icons';
import {COLORS} from '../../../shared/themes';
import darkStyles from './DarkStyles';
import styles from './Styles';

const TeacherMenu = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topView}>
          <View style={styles.underTop}>
            <Text20
              textStyle={{
                fontFamily: 'Poppins-Medium',
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Menu
            </Text20>
          </View>
          <TouchableOpacity
            style={styles.underTop}
            onPress={() => {
              dispatch(logOutAction());
            }}>
            <Image
              source={logoutIcon}
              style={{height: 15, width: 15, marginTop: hp('0.5%')}}
            />
            <Text14
              textStyle={{
                marginHorizontal: wp('2%'),
                marginTop: hp('0.5%'),
                fontFamily: 'Poppins-Medium',
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Logout
            </Text14>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginHorizontal: wp('5%'), marginTop: hp('3%')}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.navigate('Teacher-Profile')}>
          <Image
            source={userDark}
            style={{...styles.iconsStyle, borderRadius: 9}}
          />
          <Text16
            textStyle={{fontFamily: 'Poppins-Medium', marginLeft: wp('2%')}}>
            Profile
          </Text16>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp('3#%'),
          }}
          onPress={() => navigation.navigate('Teacher-Classes')}>
          <Image source={classesDark} style={{width: 19, height: 15}} />
          <Text16
            textStyle={{fontFamily: 'Poppins-Medium', marginLeft: wp('2%')}}>
            Classes
          </Text16>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp('3#%'),
          }}
          onPress={() => navigation.navigate('Std-Attendence-Stack')}>
          <Image source={stdAttendence_Dark} style={{height: 17, width: 16}} />
          <Text16
            textStyle={{fontFamily: 'Poppins-Medium', marginLeft: wp('2%')}}>
            Student's Attendance
          </Text16>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp('3#%'),
          }}
          onPress={() => {
            navigation.navigate('Std-Exam-Report');
          }}>
          <Image source={exams_Dark} style={{height: 15, width: 15}} />
          <Text16
            textStyle={{fontFamily: 'Poppins-Medium', marginLeft: wp('2%')}}>
            Exams Report
          </Text16>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp('3#%'),
          }}
          onPress={() => navigation.navigate('Teacher-Curriculum')}>
          <Image source={curriculum_Dark} style={styles.iconsStyle} />
          <Text16
            textStyle={{fontFamily: 'Poppins-Medium', marginLeft: wp('2%')}}>
            Curriculam
          </Text16>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default TeacherMenu;
