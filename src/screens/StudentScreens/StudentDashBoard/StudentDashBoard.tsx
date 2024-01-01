import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import AnnouncementCard from '../../../components/AnnouncementCard/AnnouncementCard';
import DashBoardAssignmentCard from '../../../components/DashBoardAssignmentCard/DashBoardAssignmentCard';
import DashBoardClassesCard from '../../../components/DashBoardClassesCard/DashBoardClassesCard';
import ItemsList from '../../../components/ItemsList/ItemsList';

import {Text12, Text14, Text16, Text20Bold} from '../../../components/Text';
import {allAssignmentsAction} from '../../../redux/actions/assignment';
import {dashBoardAction} from '../../../redux/actions/dashBoard';
import {getTeacherClassesAction} from '../../../redux/actions/exam';
import {LeavesTypesAction} from '../../../redux/actions/Leaves';
import {profileAction} from '../../../redux/actions/profile';
import {
  attendenceIcon,
  backArrow,
  notificationIcon,
  resultsIcon,
  upExamIcon,
} from '../../../shared/icons';
import {COLORS} from '../../../shared/themes';
import checkInternetConnection from '../../../utils/internetConnection';
import {
  getItemFromAsyncStorage,
  saveItemInAsyncStorage,
} from '../../../utils/storage/asyncStorage';
import darkStyles from './DarkStyles';
import styles from './Styles';
import BackArrowSvg from '../../../assets/svgs/BackArrowSvg';

const StudentDashBoard = ({navigation}: any) => {
  const dispatch = useDispatch();
  // const listRef = useRef(null);

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

  // const onBackBtnPress = async () => {
  //   const parentToken = await getItemFromAsyncStorage('parentToken');
  //   if (parentToken !== null) {
  //     await saveItemInAsyncStorage('token', parentToken);
  //   }
  //   navigation.navigate('Parent');
  //   await saveItemInAsyncStorage('user_role', 'Parent');
  // };

  useEffect(() => {
    checkInternetConnection();
    dispatch(profileAction());
    dispatch(dashBoardAction());
    dispatch(allAssignmentsAction());
    dispatch(LeavesTypesAction());
  }, []);

  // useEffect(() => {
  //   const backAction = () => {
  //     // Call your function here
  //     onBackBtnPress();
  //     return true; // Return true to prevent default behavior (exit app)
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove(); // Remove the event listener on unmount
  // }, []);

  // Getting dashBoard info From dashBoard Reducer
  let dashBoard =
    useSelector((state: any) => state?.dashBoardReducer?.dashBoard) || {};

  // @ts-ignore
  // listRef?.current?.scrollToOffset({
  //   animated: true,
  //   offset: {x: 0, y: dashBoard?.allNotices?.length},
  // });
  return (
    <SafeAreaView
      style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={{marginHorizontal: wp('5%'), marginTop: hp('2%')}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {parentLogin ? (
              <TouchableOpacity onPress={() => {}}>
                <BackArrowSvg
                  height={17}
                  width={10}
                  style={{marginTop: hp('0.5%')}}
                />
                {/* <Image
                  source={backArrow}
                  style={{height: 17, width: 10, marginTop: hp('0.5%')}}
                /> */}
              </TouchableOpacity>
            ) : null}

            <View
              style={{
                marginLeft: wp('5%'),
              }}>
              <Text16
                textStyle={{color: COLORS.black, fontFamily: 'Poppins-Medium'}}>
                Hello,
              </Text16>
              <Text20Bold
                textStyle={{
                  color: appMode === 'DARK' && COLORS.white,
                  marginTop: hp('1%'),
                }}>
                {dashBoard?.studentName}
              </Text20Bold>
            </View>
          </View>

          <Image source={notificationIcon} style={styles.notificationIcon} />
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}>
          <View>
            <View style={{marginTop: hp('3%'), ...styles.attendenceContainer}}>
              <Image source={attendenceIcon} style={styles.infoImage} />
              <View>
                <Text12
                  textStyle={{
                    color: COLORS.Blue,
                    fontFamily: 'Poppins-Medium',
                    marginTop: hp('3%'),
                  }}>
                  My Attendance
                </Text12>
                <Text20Bold textStyle={{color: COLORS.Blue}}>
                  {dashBoard?.studentAttendance?.toFixed(2)}%
                </Text20Bold>
              </View>
            </View>
          </View>
          <View>
            <View style={{marginTop: hp('3%'), ...styles.infoContainer}}>
              <Image source={upExamIcon} style={styles.infoImage} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Exam');
                }}>
                <Text12 textStyle={{color: COLORS.MediumPink}}>
                  Upcoming Exams
                </Text12>
                <Text20Bold textStyle={{color: COLORS.MediumPink}}>
                  {dashBoard?.upcomingExam}
                </Text20Bold>
              </TouchableOpacity>
            </View>
            <View style={styles.examsContainer}>
              <Image source={resultsIcon} style={styles.infoImage} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Exam');
                }}>
                <Text12 textStyle={{color: COLORS.Green}}>Results</Text12>
                <Text20Bold textStyle={{color: COLORS.Green}}>
                  {dashBoard?.result}
                </Text20Bold>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: hp('2%'),
          }}>
          <Text14>ANNOUNCEMENTS ({dashBoard?.allNotices?.length})</Text14>
        </View>
        {dashBoard?.allNotices?.length > 0 ? (
          <ItemsList
            // ref={listRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentOffset={{x: 0, y: dashBoard?.allNotices?.length}}
            data={dashBoard?.allNotices}
            renderItem={({item}: ListRenderItemInfo<[]>) => (
              <AnnouncementCard item={item} />
            )}
          />
        ) : (
          <View style={styles.noAssignmentsView}>
            <Text14 textStyle={{alignSelf: 'center'}}>
              No Announcement Found
            </Text14>
          </View>
        )}

        <View
          style={{
            marginTop: hp('2%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text14>CLASSES ({dashBoard?.classes?.length})</Text14>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Time-Table');
            }}>
            <Text14
              textStyle={{fontFamily: 'Poppins-Medium', color: COLORS.primary}}>
              See all
            </Text14>
          </TouchableOpacity>
        </View>
        {dashBoard?.classes?.length > 0 ? (
          <ItemsList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={dashBoard?.classes}
            renderItem={({item}: ListRenderItemInfo<[]>) => (
              <DashBoardClassesCard item={item} />
            )}
          />
        ) : (
          <View style={styles.noAssignmentsView}>
            <Text14 textStyle={{alignSelf: 'center'}}>No Classes Found</Text14>
          </View>
        )}
        <View
          style={{
            marginTop: hp('2%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text14>ASSIGNMENTS ({dashBoard?.assignments?.length})</Text14>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Std-Assignment');
            }}>
            <Text14
              textStyle={{fontFamily: 'Poppins-Medium', color: COLORS.primary}}>
              See all
            </Text14>
          </TouchableOpacity>
        </View>
        {dashBoard?.assignments?.length > 0 ? (
          <ItemsList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={dashBoard?.assignments}
            renderItem={({item}: ListRenderItemInfo<[]>) => (
              <DashBoardAssignmentCard item={item} />
            )}
          />
        ) : (
          <View style={styles.noAssignmentsView}>
            <Text14 textStyle={{alignSelf: 'center'}}>
              No Assignment Found
            </Text14>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default StudentDashBoard;

// navigation.navigate('Std-Assignment');
