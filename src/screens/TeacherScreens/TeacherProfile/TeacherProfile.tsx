import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text14, Text16, Text18} from '../../../components/Text';
import {COLORS} from '../../../shared/themes';
import styles from './Styles';
import {logoutIcon, profileAvatar} from '../../../shared/icons';
import {logOutAction} from '../../../redux/actions/auth';
import darkStyles from './DarkStyles';
import BackArrowSvg from '../../../assets/svgs/BackArrowSvg';

const TeacherProfile = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  // Getting Profile From Student Profile Reducer
  const teacher_profile = useSelector(
    (state: any) => state?.userProfileReducer?.profile,
  );

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const InfoView = ({lable, text}: {lable: String; text: String}) => {
    return (
      <View style={styles.infoViewStyle}>
        <Text16
          textStyle={{
            fontFamily: 'Poppins-Medium',
            marginTop: hp('0.5%'),
            color: appMode === 'DARK' && COLORS.black,
          }}>
          {lable}
        </Text16>
        <Text14
          textStyle={{
            marginTop: hp('1%'),
            color: COLORS.gray,
          }}>
          {text}
        </Text14>
      </View>
    );
  };

  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topView}>
          <View style={styles.underTop}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <BackArrowSvg height={17} width={10} />
            </TouchableOpacity>
            <Text18
              textStyle={{
                fontFamily: 'Poppins-Medium',
                marginLeft: wp('4%'),
                marginTop: hp('0.3%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Profile
            </Text18>
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

      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: hp('2%'),
        }}>
        <Image
          source={
            teacher_profile?.profileImage
              ? {uri: teacher_profile?.profileImage}
              : profileAvatar
          }
          style={{height: 112, width: 112, borderRadius: 56}}
        />
        <Text16
          textStyle={{
            fontFamily: 'Poppins-Medium',
            marginTop: hp('2%'),
          }}>
          {teacher_profile?.profileName}
        </Text16>
        <Text16
          textStyle={{
            fontFamily: 'Poppins-Medium',
            marginTop: hp('1%'),
            color: COLORS.gray,
          }}>
          {teacher_profile?.className}
        </Text16>
      </View>

      <View style={{marginTop: hp('5%'), marginHorizontal: wp('5%')}}>
        <InfoView lable="Email Address" text={teacher_profile?.profileEmail} />
        <InfoView lable="Phone No" text={teacher_profile?.mobileNo} />
      </View>
    </View>
  );
};

export default TeacherProfile;
