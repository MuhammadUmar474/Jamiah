import React, {useState} from 'react';
import {View, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text14, Text14Bold, Text16, Text18Bold} from '../../../components/Text';
import {COLORS} from '../../../shared/themes';
import styles from './Styles';
import {logOutAction} from '../../../redux/actions/auth';
import {logoutIcon, profileAvatar} from '../../../shared/icons';
import {
  getActiveUserFromAsyncStorage,
  getUserListFromAsyncStorage,
} from '../../../utils/storage/saveUserList';
import darkStyles from './DarkStyles';
import {getItemFromAsyncStorage} from '../../../utils/storage/asyncStorage';

const StudentProfile = () => {
  const dispatch = useDispatch();

  // Getting Profile From Student Profile Reducer
  const std_profile = useSelector(
    (state: any) => state?.userProfileReducer?.profile,
  );
  const [parentLogin, setParentLogin] = useState('');

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  async function getParent() {
    const parent = await getItemFromAsyncStorage('parentLogin');
    if (parent !== null) {
      setParentLogin(parent);
    }
  }
  getParent();

  const [usersList, setUsersList] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  async function getUsersList() {
    const usersList = await getUserListFromAsyncStorage();
    if (usersList !== null) {
      setUsersList(usersList);
    }
  }
  if (usersList.length === 0) {
    getUsersList();
  }
  async function getActiveUser() {
    const activeUser = await getActiveUserFromAsyncStorage();
    if (activeUser !== null) {
      setActiveUser(activeUser);
    }
  }
  getActiveUser();

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
    <SafeAreaView
      style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={styles.topView}>
        <View style={styles.underTop}>
          <Text18Bold>Profile</Text18Bold>
        </View>
        {parentLogin ? null : (
          <TouchableOpacity
            style={styles.underTop}
            onPress={() => {
              dispatch(logOutAction());
            }}>
            <Image
              source={logoutIcon}
              style={{height: 15, width: 15, marginTop: hp('0.5%')}}
            />

            <Text14Bold
              textStyle={{marginHorizontal: wp('2%'), marginTop: hp('0.5%')}}>
              Logout
            </Text14Bold>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          alignSelf: 'center',
          marginTop: hp('2%'),
          alignItems: 'center',
          flex: 1.5,
        }}>
        <Image
          source={
            std_profile?.profileImage
              ? {uri: std_profile?.profileImage}
              : profileAvatar
          }
          style={{height: 112, width: 112, borderRadius: 56}}
        />
        <Text16 textStyle={{fontFamily: 'Poppins-Medium', marginTop: hp('2%')}}>
          {std_profile?.profileName}
        </Text16>
        <Text16
          textStyle={{
            fontFamily: 'Poppins-Medium',
            marginTop: hp('1%'),
            color: COLORS.gray,
            alignSelf: 'center',
          }}>
          {std_profile?.className}
        </Text16>
      </View>

      <View
        style={{
          marginHorizontal: wp('5%'),
          flex: 3,
          zIndex: -1,
        }}>
        <InfoView lable={'Parent'} text={std_profile?.fatherName} />
        <InfoView lable={'Email Address'} text={std_profile?.profileEmail} />
        <InfoView lable={'Serial No'} text={std_profile?.profileRollNo} />
        <InfoView lable={'Phone No'} text={std_profile?.mobileNo} />
      </View>
      {/* <SwitchAccount usersList={usersList} activeUser={activeUser} /> */}
    </SafeAreaView>
  );
};

export default StudentProfile;
