import React, {useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ListRenderItemInfo,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import AnnouncementCard from '../../../components/AnnouncementCard/AnnouncementCard';
import DashBoardAssignmentCard from '../../../components/DashBoardAssignmentCard/DashBoardAssignmentCard';
import DashboardChart from '../../../components/DashboardChart/DashboardChart';
import ItemsList from '../../../components/ItemsList/ItemsList';

import {Text12, Text14, Text16, Text20Bold} from '../../../components/Text';
import {allAssignmentsAction} from '../../../redux/actions/assignment';
import {stdAttendenceViewAction} from '../../../redux/actions/attendence';
import {
  allCurriculumsAction,
  getSubjectsGradesAction,
} from '../../../redux/actions/Curriculum';
import {dashBoardAction} from '../../../redux/actions/dashBoard';
import {
  getClassSubjectsAction,
  getTeacherClassesAction,
} from '../../../redux/actions/exam';
import {getExamTypesAction} from '../../../redux/actions/examTypeCrud';
import {LeavesTypesAction} from '../../../redux/actions/Leaves';
import {profileAction} from '../../../redux/actions/profile';
import {teacherClassesAction} from '../../../redux/actions/TeacherClasses';
import {
  attendenceIcon,
  notificationIcon,
  resultsIcon,
  upExamIcon,
} from '../../../shared/icons';
import {COLORS} from '../../../shared/themes';
import checkInternetConnection from '../../../utils/internetConnection';
import darkStyles from './DarkStyles';
import styles from './Styles';

const TeacherDashBoard = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  // Calling Common Api's
  useEffect(() => {
    checkInternetConnection();
    dispatch(dashBoardAction());
    dispatch(profileAction());
    dispatch(LeavesTypesAction());
    dispatch(getExamTypesAction());
    dispatch(allCurriculumsAction());
    dispatch(teacherClassesAction());
    dispatch(getClassSubjectsAction());
    dispatch(allAssignmentsAction());
    dispatch(getTeacherClassesAction());
    dispatch(getSubjectsGradesAction());
    dispatch(stdAttendenceViewAction(''));
  }, []);

  // Getting teacher dashBoard info From dashBoard Reducer
  let dashBoard =
    useSelector((state: any) => state?.dashBoardReducer?.dashBoard) || [];
  return (
    <SafeAreaView
      style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={{marginHorizontal: wp('5%'), marginTop: hp('2%')}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text16
              textStyle={{color: COLORS.black, fontFamily: 'Poppins-Medium'}}>
              Hello,
            </Text16>
            <Text20Bold
              textStyle={{
                color: appMode === 'DARK' && COLORS.white,
                marginTop: hp('1%'),
              }}>
              {dashBoard?.teacher_name}
            </Text20Bold>
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
                  {dashBoard?.teacherAttendance?.toFixed(2)}%
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
                  {dashBoard?.results}
                </Text20Bold>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: hp('55%')}}>
          {dashBoard?.studentAttendance?.length > 0 ? (
            <View
              style={{
                marginTop: hp('2%'),
              }}>
              <Text14>ATTENDANCE SUMMARY</Text14>
              <DashboardChart />
            </View>
          ) : null}

          <View
            style={{
              marginTop: hp('2%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text14>ANNOUCMENTS ({dashBoard?.allNotices?.length})</Text14>
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
            <Text14>ASSIGNMENTS ({dashBoard?.assignments?.length})</Text14>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Teacher-Assignment');
              }}>
              <Text14
                textStyle={{
                  fontFamily: 'Poppins-Medium',
                  color: COLORS.primary,
                }}>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TeacherDashBoard;
