import React, {Ref, useState, useEffect} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from './RootNavigator';

import {profileAvatar} from '../shared/icons';
import LogIn from '../screens/LogIn/LogIn';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import Exam from '../screens/StudentScreens/Exam/Exam';
import TimtTable from '../screens/StudentScreens/TimeTable/TimeTable';
import StudentDashBoard from '../screens/StudentScreens/StudentDashBoard/StudentDashBoard';
import Curriculum from '../screens/TeacherScreens/Curriculum/Curriculum';
import AddCurriculum from '../screens/TeacherScreens/AddCurriculum/AddCurriculum';
import StudentLeaves from '../screens/StudentScreens/StudentLeaves/StudentLeaves';
import StudentProfile from '../screens/StudentScreens/StudentProfile/StudentProfile';
import ApplyLeave from '../screens/StudentScreens/ApplyLeave/ApplyLeave';
import OrgaizationId from '../screens/OrgaizationId/OrgaizationId';
import {COLORS} from '../shared/themes';
import {profileAction} from '../redux/actions/profile';
import {menuIcon} from '../shared/icons';
import TeacherDashBoard from '../screens/TeacherScreens/TeacherDashBoard/TeacherDashBoard';
import TeacherMenu from '../screens/TeacherScreens/TeacherMenu/TeacherMenu';
import TeacherProfile from '../screens/TeacherScreens/TeacherProfile/TeacherProfile';
import TeacherTimeTable from '../screens/TeacherScreens/TeacherTimeTable/TeacherTimeTable';
import TeacherLeaves from '../screens/TeacherScreens/TeacherLeaves/TeacherLeaves';
import TeacherApplyLeave from '../screens/TeacherScreens/TeacherApplyLeave/TeacherApplyLeave';
import TeacherExams from '../screens/TeacherScreens/TeacherExam/TeacherExam';
import TeacherClasses from '../screens/TeacherScreens/TeacherClasses/TeacherClasses';
import StdLeavesTeacher from '../screens/TeacherScreens/StdLeavesTeacher/StdLeavesTeacher';
import MarkStdAttendence from '../screens/TeacherScreens/MarkStdAttendence/MarkStdAttendence';
import ExamsReport from '../screens/TeacherScreens/ExamsReport/ExamsReport';
import DownloadReport from '../screens/TeacherScreens/DownloadReport/DownloadReport';
import AddExam from '../screens/TeacherScreens/AddExam/AddExam';
import {checkUserLoginAction} from '../redux/actions/auth';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import ExamType from '../screens/TeacherScreens/ExamType/ExamType';
import EditTeacherExam from '../screens/TeacherScreens/EditTeacherExam/EditTeacherExam';
import AddExamMarks from '../screens/TeacherScreens/AddExamMarks/AddExamMarks';
import EditExamMarks from '../screens/TeacherScreens/EditExamMarks/EditExamMarks';
import ExamResult from '../screens/TeacherScreens/ExamResult/ExamResult';
import CurriculumDetails from '../screens/TeacherScreens/CurriculumDetails/CurriculumDetails';
import {getItemFromAsyncStorage} from '../utils/storage/asyncStorage';
import Assignments from '../screens/TeacherScreens/AssignmentsModule/Assignments/Assignments';
import AddAssignment from '../screens/TeacherScreens/AssignmentsModule/AddAssignment/AddAssignment';
import AssignmentSubmission from '../screens/TeacherScreens/AssignmentsModule/AssignmentSubmission/AssignmentSubmission';
import EditAssignment from '../screens/TeacherScreens/AssignmentsModule/EditAssignment/EditAssignment';
import StdAssignments from '../screens/StudentScreens/StdAssignmentsModule/StdAssignments/StdAssignments';
import StdAssignmentSubmission from '../screens/StudentScreens/StdAssignmentsModule/StdAssignmentSubmission/StdAssignmentSubmission';
import ParentDashBoard from '../screens/ParentScreens/ParentDashBoard/ParentDashBoard';

const MainStack = createNativeStackNavigator();
function MainScreens() {
  const [orgId, setOrgId] = useState('');

  async function getOrgId() {
    const orgId = await getItemFromAsyncStorage('orgId');
    if (orgId !== null) {
      setOrgId(orgId);
    }
  }

  useEffect(() => {
    getOrgId();
    return () => {};
  }, []);
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      {orgId ? (
        <MainStack.Screen name="Main" component={AuthScreens} />
      ) : (
        <MainStack.Screen
          name="Organizations"
          component={WithoutOrganization}
        />
      )}
    </MainStack.Navigator>
  );
}

const OrganizationStack = createNativeStackNavigator();
function WithoutOrganization() {
  return (
    <OrganizationStack.Navigator screenOptions={{headerShown: false}}>
      <OrganizationStack.Screen
        name="Organization-id"
        component={OrgaizationId}
      />

      <OrganizationStack.Screen name="Log-in" component={LogIn} />
      <AuthStack.Screen name="Find-Org" component={WithoutOrganization} />
      <OrganizationStack.Screen
        name="Forgot-Password"
        component={ForgotPassword}
      />
      <OrganizationStack.Screen
        name="Reset-Password"
        component={ResetPassword}
      />
    </OrganizationStack.Navigator>
  );
}

const AuthStack = createNativeStackNavigator();
function AuthScreens() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Log-in" component={LogIn} />
      <AuthStack.Screen name="Forgot-Password" component={ForgotPassword} />
      <AuthStack.Screen name="Reset-Password" component={ResetPassword} />
      <AuthStack.Screen name="Home-Tabs" component={TabsScreen} />
      <AuthStack.Screen name="Find-Org" component={WithoutOrganization} />
    </AuthStack.Navigator>
  );
}

const ParentStack = createNativeStackNavigator();
function ParentScreens() {
  return (
    <ParentStack.Navigator screenOptions={{headerShown: false}}>
      <ParentStack.Screen name="Parent-Home" component={ParentDashBoard} />
      <ParentStack.Screen name="Child-Home" component={StudentTabsScreen} />
    </ParentStack.Navigator>
  );
}

function TabsScreen() {
  const [userRole, setUserRole] = useState('');

  async function getUser() {
    const userInfo = await AsyncStorage.getItem('user_role');
    if (userInfo !== null) {
      setUserRole(userInfo);
    }
  }
  getUser();

  return userRole === 'Student' ? (
    <StudentTabsScreen />
  ) : userRole === 'Teacher' ? (
    <TeacherTabsScreen />
  ) : (
    <ParentScreens />
  );
}

const StudentTabs = createBottomTabNavigator();
function StudentTabsScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileAction());
    return () => {};
  }, []);

  // Getting Profile From Student Profile Reducer
  const std_profile = useSelector(
    (state: any) => state?.userProfileReducer?.profile,
  );

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  return (
    <StudentTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarActiveBackgroundColor:
          appMode === 'DARK' ? COLORS.black : COLORS.white,
        tabBarInactiveBackgroundColor:
          appMode === 'DARK' ? COLORS.black : COLORS.white,
        headerShown: false,
      }}>
      <StudentTabs.Screen
        name="Home"
        component={StudentDashBoardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/home.png')}
              style={{
                height: 22,
                width: 24,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
      <StudentTabs.Screen
        name="Time-Table"
        component={TimtTable}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/timetable.png')}
              style={{
                height: 20,
                width: 18,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
      <StudentTabs.Screen
        name="Leaves"
        component={StudentLeavesScreen}
        options={{
          tabBarLabel: 'Leaves',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/leave.png')}
              style={{
                height: 22,
                width: 28,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
      <StudentTabs.Screen
        name="Exam"
        component={Exam}
        options={{
          tabBarLabel: 'Exam',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/exams.png')}
              style={{
                height: 22,
                width: 18,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
      <StudentTabs.Screen
        name="Profile"
        component={StudentProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Image
              source={
                std_profile?.profileImage
                  ? {uri: std_profile?.profileImage}
                  : profileAvatar
              }
              style={{
                height: 22,
                width: 22,
                borderRadius: 11,
              }}
            />
          ),
        }}
      />
    </StudentTabs.Navigator>
  );
}

const StudentDashBoardStack = createNativeStackNavigator();
function StudentDashBoardScreen() {
  return (
    <StudentDashBoardStack.Navigator screenOptions={{headerShown: false}}>
      <StudentDashBoardStack.Screen
        name="DashBoard"
        component={StudentDashBoard}
      />
      <StudentDashBoardStack.Screen
        name="Std-Assignment"
        component={StdAssignments}
      />
      <StudentDashBoardStack.Screen
        name="Std-Assignment-Submission"
        component={StdAssignmentSubmission}
      />
      <StudentDashBoardStack.Screen name="Parent" component={ParentScreens} />
    </StudentDashBoardStack.Navigator>
  );
}

const StudentProfileStack = createNativeStackNavigator();
function StudentProfileScreen() {
  return (
    <StudentProfileStack.Navigator screenOptions={{headerShown: false}}>
      <StudentProfileStack.Screen
        name="Std-Profile"
        component={StudentProfile}
      />
      <StudentProfileStack.Screen name="Auth" component={AuthScreens} />
    </StudentProfileStack.Navigator>
  );
}

const StudentLeavesStack = createNativeStackNavigator();
function StudentLeavesScreen() {
  return (
    <StudentLeavesStack.Navigator screenOptions={{headerShown: false}}>
      <StudentLeavesStack.Screen name="Std-Leaves" component={StudentLeaves} />
      <StudentLeavesStack.Screen name="Apply-Leave" component={ApplyLeave} />
    </StudentLeavesStack.Navigator>
  );
}

const TeacherTabs = createBottomTabNavigator();
function TeacherTabsScreen() {
  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  return (
    <TeacherTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarActiveBackgroundColor:
          appMode === 'DARK' ? COLORS.black : COLORS.white,
        tabBarInactiveBackgroundColor:
          appMode === 'DARK' ? COLORS.black : COLORS.white,
        headerShown: false,
      }}>
      <TeacherTabs.Screen
        name="Home"
        component={TeacherDashBoardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/home.png')}
              style={{
                height: 22,
                width: 24,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
      <TeacherTabs.Screen
        name="Time-Table"
        component={TeacherTimeTable}
        options={{
          tabBarLabel: 'TimeTable',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/timetable.png')}
              style={{
                height: 20,
                width: 18,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
      <TeacherTabs.Screen
        name="Leaves"
        component={TeacherLeavesScreen}
        options={{
          tabBarLabel: 'Leaves',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/leave.png')}
              style={{
                height: 22,
                width: 28,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
      <TeacherTabs.Screen
        name="Exam"
        component={TeacherExamsScreen}
        options={{
          tabBarLabel: 'Exam',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/exams.png')}
              style={{
                height: 22,
                width: 18,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
      <TeacherTabs.Screen
        name="Menu"
        component={TeacherMenuStackScreens}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({focused}) => (
            <Image
              source={menuIcon}
              style={{
                height: 22,
                width: 22,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          ),
        }}
      />
    </TeacherTabs.Navigator>
  );
}

const TeacherDashBoardStack = createNativeStackNavigator();
function TeacherDashBoardScreen() {
  return (
    <TeacherDashBoardStack.Navigator screenOptions={{headerShown: false}}>
      <TeacherDashBoardStack.Screen
        name="DashBoard"
        component={TeacherDashBoard}
      />
      <TeacherDashBoardStack.Screen
        name="Teacher-Assignment"
        component={TeacherAssignmentsScreen}
      />
    </TeacherDashBoardStack.Navigator>
  );
}

const TeacherMenuStack = createNativeStackNavigator();
function TeacherMenuStackScreens() {
  return (
    <TeacherMenuStack.Navigator screenOptions={{headerShown: false}}>
      <TeacherMenuStack.Screen name="Teacher-Main" component={TeacherMenu} />
      <TeacherMenuStack.Screen
        name="Teacher-Profile"
        component={TeacherProfile}
      />
      <TeacherMenuStack.Screen
        name="Teacher-Classes"
        component={TeacherClasses}
      />
      <TeacherMenuStack.Screen
        name="Std-Attendence-Stack"
        component={StudentAttendenceScreen}
      />

      <TeacherMenuStack.Screen
        name="Std-Exam-Report"
        component={StudentExamReportScreen}
      />
      <TeacherMenuStack.Screen
        name="Teacher-Assignments"
        component={TeacherAssignmentsScreen}
      />
      <TeacherMenuStack.Screen
        name="Teacher-Curriculum"
        component={CurriculumScreens}
      />
    </TeacherMenuStack.Navigator>
  );
}

const TeacherAssignmentsStack = createNativeStackNavigator();
function TeacherAssignmentsScreen() {
  return (
    <TeacherAssignmentsStack.Navigator screenOptions={{headerShown: false}}>
      <TeacherAssignmentsStack.Screen
        name="Assignments"
        component={Assignments}
      />
      <TeacherAssignmentsStack.Screen
        name="Add-Assignment"
        component={AddAssignment}
      />
      <TeacherAssignmentsStack.Screen
        name="Edit-Assignment"
        component={EditAssignment}
      />
      <TeacherAssignmentsStack.Screen
        name="Assignment-Submission"
        component={AssignmentSubmission}
      />
    </TeacherAssignmentsStack.Navigator>
  );
}

const TeacherExamsStack = createNativeStackNavigator();
function TeacherExamsScreen() {
  return (
    <TeacherExamsStack.Navigator screenOptions={{headerShown: false}}>
      <TeacherExamsStack.Screen name="Teacher-Exams" component={TeacherExams} />
      <TeacherExamsStack.Screen name="Add-Exam" component={AddExam} />
      <TeacherExamsStack.Screen name="Edit-Exam" component={EditTeacherExam} />
      <TeacherExamsStack.Screen name="Add-Marks" component={AddExamMarks} />
      <TeacherExamsStack.Screen name="Edit-Marks" component={EditExamMarks} />
      <TeacherExamsStack.Screen name="Exam-Result" component={ExamResult} />
    </TeacherExamsStack.Navigator>
  );
}
const TeacherLeavesStack = createNativeStackNavigator();
function TeacherLeavesScreen() {
  return (
    <TeacherLeavesStack.Navigator screenOptions={{headerShown: false}}>
      <TeacherLeavesStack.Screen
        name="Teacher-Leaves"
        component={TeacherLeaves}
      />
      <TeacherLeavesStack.Screen
        name="Teacher-Apply-Leave"
        component={TeacherApplyLeave}
      />
    </TeacherLeavesStack.Navigator>
  );
}
const StdExamReportStack = createNativeStackNavigator();
function StudentExamReportScreen() {
  return (
    <StdExamReportStack.Navigator screenOptions={{headerShown: false}}>
      <StdExamReportStack.Screen name="Exam-Report" component={ExamsReport} />
      <TeacherExamsStack.Screen name="Exam-Result" component={ExamResult} />
      <StdExamReportStack.Screen
        name="Download-Report"
        component={DownloadReport}
      />
    </StdExamReportStack.Navigator>
  );
}
const StdAttendenceStack = createNativeStackNavigator();
function StudentAttendenceScreen() {
  return (
    <StdAttendenceStack.Navigator screenOptions={{headerShown: false}}>
      <StdAttendenceStack.Screen
        name="Std-Mark-Attendence"
        component={MarkStdAttendence}
      />
    </StdAttendenceStack.Navigator>
  );
}

const CurriculumStack = createNativeStackNavigator();
function CurriculumScreens() {
  return (
    <CurriculumStack.Navigator screenOptions={{headerShown: false}}>
      <CurriculumStack.Screen name="Curriculum-Main" component={Curriculum} />
      <CurriculumStack.Screen name="Add-Curriculum" component={AddCurriculum} />
      <CurriculumStack.Screen
        name="Curriculum-Details"
        component={CurriculumDetails}
      />
    </CurriculumStack.Navigator>
  );
}

function Route() {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');

  const isLoggedIn = useSelector(
    (state: any) => state?.authReducer?.isLoggedIn,
  );

  useEffect(() => {
    dispatch(checkUserLoginAction());
    if (!isLoggedIn) {
      setToken('');
    }
    return () => {};
  }, [isLoggedIn]);

  async function getUser() {
    const userToken = await AsyncStorage.getItem('token');
    if (userToken !== null) {
      setToken(userToken);
    }
  }
  getUser();

  return (
    <NavigationContainer
      ref={navigationRef as Ref<NavigationContainerRef<any>>}>
      {token ? <TabsScreen /> : <MainScreens />}
    </NavigationContainer>
  );
}

export default Route;
