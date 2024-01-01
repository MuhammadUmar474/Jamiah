import React, {useState, useEffect, useRef} from 'react';
import {RadioButton} from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
  View,
  ListRenderItemInfo,
  Modal,
  Pressable,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {format} from 'date-fns';

import {
  Text12,
  Text14Bold,
  Text16,
  Text16Bold,
  Text18Bold,
} from '../../../components/Text';
import styles from './Styles';
import ItemsList from '../../../components/ItemsList/ItemsList';
import StdAttendenceList from '../../../components/StdAttendenceList/StdAttendenceList';
import ButtonComp from '../../../components/Button/ButtonComp';
import {COLORS} from '../../../shared/themes';
import Header from '../../../components/Header/Header';
import ClearfilterBtn from '../../../components/ClearfilterBtn/ClearfilterBtn';
import {
  classTeacherClassesAction,
  clearAttendenceAction,
  stdAttendenceViewAction,
  storeAttendenceAction,
} from '../../../redux/actions/attendence';
import ShowAttendenceStatus from '../../../components/ShowAttendenceStatus/ShowAttendenceStatus';
import StdViewAttendenceList from '../../../components/StdViewAttendenceList/StdViewAttendenceList';

import DateComp from '../../../components/DateComp/DateComp';
import darkStyles from './DarkStyles';
import {
  absentIcon,
  leaveIcon,
  presentIcon,
  profileAvatar,
  swipeRightIcon,
} from '../../../shared/icons';

const DaysView = ({monthDay}: any) => {
  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);
  return (
    <View style={styles.daysView}>
      <Text12
        textStyle={{
          fontFamily: 'Poppins-SemiBold',
          color: appMode === 'DARK' && COLORS.black,
        }}>
        {monthDay?.dayOfWeek?.substring(0, 3)}
      </Text12>
      <Image
        source={
          monthDay?.status == 0
            ? absentIcon
            : monthDay?.status == 1
            ? presentIcon
            : leaveIcon
        }
        style={styles.attendenceIcon}
      />
    </View>
  );
};

const MarkStdAttendence = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [shift, setShift] = useState('morning');
  const [modalVisible, setModalVisible] = useState(true);
  const [present, setPresent] = useState(false);
  const [absent, setAbsent] = useState(false);
  const [leave, setLeave] = useState(false);
  const [stdCount, setStdCount] = useState(0);

  const slideAnimation = useRef(new Animated.Value(0)).current;

  const isAttendenceMarked =
    useSelector(
      (state: any) => state?.attendenceReducer?.storeAttendenceSuccess,
    ) || {};

  const attendence =
    useSelector((state: any) => state?.attendenceReducer?.attendence) || {};
  const classTeacherError =
    useSelector((state: any) => state?.attendenceReducer?.classTeacherError) ||
    '';

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const newDate = new Date();
  const CURRENT_DATE = format(newDate, 'yyyy-MM-dd');

  const nextStudent = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setStdCount((stdCount + 1) % attendence?.attendances?.length);
      slideAnimation.setValue(0);
    });
  };

  const checkAttendenceStatus = () => {
    if (
      attendence?.attendance_mode === 'single' &&
      attendence &&
      attendence?.attendances &&
      attendence?.attendances[stdCount]?.today_attendance_status == 3
    ) {
      return true;
    }
    if (
      shift === 'morning' &&
      attendence?.attendance_mode === 'double' &&
      attendence &&
      attendence?.attendances &&
      (attendence?.attendances[stdCount]?.today_attendance_status == 1 ||
        attendence?.attendances[stdCount]?.today_attendance_status == 3)
    ) {
      return true;
    }
    if (
      shift === 'evening' &&
      attendence?.attendance_mode === 'double' &&
      attendence &&
      attendence?.attendances &&
      (attendence?.attendances[stdCount]?.today_attendance_status == 2 ||
        attendence?.attendances[stdCount]?.today_attendance_status == 3)
    ) {
      return true;
    }
  };

  const onClearFilters = () => {
    setFilter(false);
    setSelectedDate(null);
  };

  const onSelectDate = (selectedDate: any) => {
    setSelectedDate(selectedDate);
  };

  useEffect(() => {
    dispatch(classTeacherClassesAction());
  }, []);

  useEffect(() => {
    dispatch(stdAttendenceViewAction(selectedDate));
    // if (isAttendenceMarked?.success) {
    //   navigation.goBack();
    // }
    return () => {
      dispatch(clearAttendenceAction());
    };
  }, [selectedDate, isAttendenceMarked?.success]);
  const dayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = dayName[new Date().getDay()];
  const onPresentPress = () => {
    nextStudent();
    if (shift === 'morning' && attendence?.attendance_mode === 'double') {
      if (stdCount < attendence?.attendances?.length - 1) {
        setStdCount(stdCount + 1);
      }
      setPresent(true);
      setAbsent(false);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: attendence?.attendances[stdCount]?.id,
          mark1: 1,
          mark2:
            attendence?.attendances[stdCount]?.today_attendance_status === 2 ||
            attendence?.attendances[stdCount]?.today_attendance_status === 3
              ? 2
              : null,
        }),
      );
      if (stdCount == attendence?.attendances?.length - 1) {
        setModalVisible(false);
      }
    } else if (
      shift === 'evening' &&
      attendence?.attendance_mode === 'double'
    ) {
      if (stdCount < attendence?.attendances?.length - 1) {
        setStdCount(stdCount + 1);
      }
      setPresent(true);
      setAbsent(false);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: attendence?.attendances[stdCount]?.id,
          mark2: 2,
          mark1:
            attendence?.attendances[stdCount]?.today_attendance_status === 1 ||
            attendence?.attendances[stdCount]?.today_attendance_status === 3
              ? 1
              : null,
        }),
      );
      if (stdCount == attendence?.attendances?.length - 1) {
        setModalVisible(false);
      }
    } else {
      if (stdCount < attendence?.attendances?.length - 1) {
        setStdCount(stdCount + 1);
      }
      setPresent(true);
      setAbsent(false);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: attendence?.attendances[stdCount]?.id,
          mark1: 1,
          mark2: null,
        }),
      );
      if (stdCount == attendence?.attendances?.length - 1) {
        setModalVisible(false);
      }
    }
  };
  const onAbsentPress = () => {
    nextStudent();
    if (shift === 'morning' && attendence?.attendance_mode === 'double') {
      if (stdCount < attendence?.attendances?.length - 1) {
        setStdCount(stdCount + 1);
      }
      setPresent(true);
      setAbsent(false);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: attendence?.attendances[stdCount]?.id,
          mark1: 0,
          mark2:
            attendence?.attendances[stdCount]?.today_attendance_status === 2 ||
            attendence?.attendances[stdCount]?.today_attendance_status === 3
              ? 2
              : null,
        }),
      );
      if (stdCount == attendence?.attendances?.length - 1) {
        setModalVisible(false);
      }
    } else if (
      shift === 'evening' &&
      attendence?.attendance_mode === 'double'
    ) {
      if (stdCount < attendence?.attendances?.length - 1) {
        setStdCount(stdCount + 1);
      }
      setPresent(true);
      setAbsent(false);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: attendence?.attendances[stdCount]?.id,
          mark2: 0,
          mark1:
            attendence?.attendances[stdCount]?.today_attendance_status === 1 ||
            attendence?.attendances[stdCount]?.today_attendance_status === 3
              ? 1
              : null,
        }),
      );
      if (stdCount == attendence?.attendances?.length - 1) {
        setModalVisible(false);
      }
    } else {
      if (stdCount < attendence?.attendances?.length - 1) {
        setStdCount(stdCount + 1);
      }
      setPresent(false);
      setAbsent(true);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: attendence?.attendances[stdCount]?.id,
          mark1: 0,
          mark2: 0,
        }),
      );
    }
  };
  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <GestureRecognizer onSwipeLeft={onPresentPress}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={{
                  alignSelf: 'flex-end',
                  marginRight: wp('2%'),
                  marginTop: hp('0.5%'),
                }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  source={require('../../../assets/images/cancelIcon.png')}
                  style={{height: 25, width: 25}}
                />
              </Pressable>
              <Text16
                textStyle={{
                  fontFamily: 'Poppins-SemiBold',
                  color: appMode === 'DARK' && COLORS.black,
                }}>
                {day}, {CURRENT_DATE}
              </Text16>
              {attendence?.attendance_mode == 'double' ? (
                <RadioButton.Group
                  onValueChange={value => setShift(value)}
                  value={shift}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton.Item label="Morning" value="morning" />
                    <RadioButton.Item label="Evening" value="evening" />
                  </View>
                </RadioButton.Group>
              ) : null}
              <Animated.View
                style={{
                  alignItems: 'center',
                  transform: [
                    {
                      translateX: slideAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -300],
                      }),
                    },
                  ],
                }}>
                <View
                  style={{
                    width: wp('50%'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: hp('1%'),
                  }}>
                  <Image
                    source={
                      attendence &&
                      attendence?.attendances &&
                      attendence?.attendances[stdCount]?.profile_photo_path
                        ? {
                            uri:
                              attendence &&
                              attendence?.attendances &&
                              attendence?.attendances[stdCount]
                                ?.profile_photo_path,
                          }
                        : profileAvatar
                    }
                    style={{height: 70, width: 70, borderRadius: 35}}
                  />
                  <View style={{marginLeft: wp('3%')}}>
                    <Text16Bold
                      textStyle={{
                        color: appMode === 'DARK' && COLORS.black,
                        width: wp('50%'),
                        marginTop: hp('1%'),
                      }}>
                      {attendence &&
                        attendence?.attendances &&
                        attendence?.attendances[stdCount]?.fullname}
                    </Text16Bold>
                    <Text12
                      textStyle={{
                        color: appMode === 'DARK' && COLORS.black,
                      }}>
                      {attendence &&
                        attendence?.attendances &&
                        attendence?.attendances[stdCount]?.serial_no}
                    </Text12>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: hp('1%'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: wp('80%'),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (stdCount > 0) {
                        setStdCount(stdCount - 1);
                      }
                    }}>
                    <Image
                      source={swipeRightIcon}
                      style={{
                        height: 27,
                        width: 27,
                        opacity: stdCount == 0 ? 0.3 : 1,
                        transform: [{rotate: '180deg'}],
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onAbsentPress}>
                    <Image
                      source={swipeRightIcon}
                      style={{
                        height: 27,
                        width: 27,
                        opacity:
                          stdCount == attendence?.attendances?.length - 1
                            ? 0.3
                            : 1,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginTop: hp('2%'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: wp('70%'),
                  }}>
                  <ItemsList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={
                      attendence && attendence?.attendances
                        ? attendence?.attendances[stdCount]?.monthDay
                        : []
                    }
                    renderItem={({item}: ListRenderItemInfo<[]>) => (
                      <DaysView monthDay={item} />
                    )}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <ButtonComp
                    onPress={onPresentPress}
                    styleTxt={{
                      color: checkAttendenceStatus()
                        ? COLORS.white
                        : COLORS.black,
                      fontSize: 12,
                    }}
                    styleBtn={{
                      width: wp('27%'),
                      backgroundColor: checkAttendenceStatus()
                        ? COLORS.green
                        : COLORS.silverLight,
                    }}
                    btnName="Present"
                  />
                  <ButtonComp
                    onPress={onAbsentPress}
                    styleTxt={{
                      color:
                        (attendence?.attendance_mode === 'single' ||
                          'double') &&
                        attendence &&
                        attendence?.attendances &&
                        attendence?.attendances[stdCount]
                          ?.today_attendance_status == 0
                          ? COLORS.white
                          : COLORS.black,
                      fontSize: 12,
                    }}
                    styleBtn={{
                      width: wp('27%'),
                      marginLeft: wp('2%'),
                      backgroundColor:
                        (attendence?.attendance_mode === 'single' ||
                          'double') &&
                        (attendence &&
                        attendence?.attendances &&
                        attendence?.attendances[stdCount]
                          ?.today_attendance_status == 0
                          ? COLORS.red
                          : COLORS.silverLight),
                    }}
                    btnName="Absent"
                  />
                  <ButtonComp
                    onPress={() => {
                      if (stdCount < attendence?.attendances?.length - 1) {
                        setStdCount(stdCount + 1);
                      }
                      setPresent(false);
                      setAbsent(false);
                      setLeave(true);
                    }}
                    styleTxt={{
                      color:
                        (attendence?.attendance_mode === 'single' ||
                          'double') &&
                        attendence &&
                        attendence?.attendances &&
                        attendence?.attendances[stdCount]
                          ?.today_attendance_status == 4
                          ? COLORS.white
                          : COLORS.black,
                      fontSize: 12,
                    }}
                    styleBtn={{
                      width: wp('27%'),
                      marginLeft: wp('2%'),
                      backgroundColor:
                        (attendence?.attendance_mode === 'single' ||
                          'double') &&
                        attendence &&
                        attendence?.attendances &&
                        attendence?.attendances[stdCount]
                          ?.today_attendance_status == 4
                          ? COLORS.blue
                          : COLORS.silverLight,
                    }}
                    btnName="On Leave"
                  />
                </View>
              </Animated.View>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
      <View style={styles.topContainer}>
        <Header
          backBtn={true}
          name="Student's Attendence"
          onFilterPress={() => setFilter(!filter)}
        />
        {filter ? (
          <View style={{marginTop: hp('1%'), marginHorizontal: wp('5%')}}>
            <View style={{zIndex: -1}}>
              <DateComp
                onDateSelect={onSelectDate}
                DateName="Date"
                maxDate={CURRENT_DATE}
              />
            </View>

            <ClearfilterBtn
              styleBtn={{marginTop: hp('0.5%'), zIndex: -1}}
              onPress={onClearFilters}
            />
          </View>
        ) : null}
      </View>
      {Object.keys(attendence).length === 0 ? (
        <Text18Bold
          textStyle={{
            alignSelf: 'center',
            marginTop: hp('30%'),
          }}>
          {classTeacherError}
        </Text18Bold>
      ) : attendence?.edit_mood === 'true' ? (
        attendence?.attendances?.length > 0 ? (
          <View style={{marginHorizontal: wp('5%'), marginTop: hp('3%')}}>
            <Text16>
              {attendence?.class + ' , ' + attendence?.attendance_date}
            </Text16>

            <View
              style={{
                marginTop: hp('3%'),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text14Bold>Students</Text14Bold>
              <View>
                {attendence?.attendance_mode === 'single' ? (
                  <Text14Bold textStyle={{marginRight: wp('2%')}}>
                    Status
                  </Text14Bold>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text14Bold
                      textStyle={{
                        fontFamily: 'Poppins-Medium',
                        marginRight: wp('5%'),
                      }}>
                      Morning
                    </Text14Bold>
                    <Text14Bold>Evening</Text14Bold>
                  </View>
                )}
              </View>
            </View>
            <View style={{height: hp('50%')}}>
              <ItemsList
                showsVerticalScrollIndicator={false}
                data={attendence?.attendances}
                renderItem={({item}: ListRenderItemInfo<[]>) => (
                  <StdAttendenceList item={item} />
                )}
              />
            </View>

            {/* <View>
              // To mark attedence collectively
              <ButtonComp
                btnName={
                  isLoading ? (
                    <AppLoader size={'small'} color={COLORS.white} />
                  ) : (
                    'Mark Attendence'
                  )
                }
                onPress={onMarkAttendence}
              />
            </View> */}
          </View>
        ) : (
          <Text18Bold textStyle={{alignSelf: 'center', marginTop: hp('30%')}}>
            NO RESULT FOUND
          </Text18Bold>
        )
      ) : attendence?.attendances?.length > 0 ? (
        <View style={{marginHorizontal: wp('5%'), marginTop: hp('3%')}}>
          <ShowAttendenceStatus />
          <Text16
            textStyle={{fontFamily: 'Poppins-Medium', marginTop: hp('3%')}}>
            {attendence?.class + ' , ' + attendence?.attendance_date}
          </Text16>

          <View
            style={{
              marginTop: hp('3%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text14Bold>Students</Text14Bold>
            <Text14Bold>Status</Text14Bold>
          </View>
          <View style={{height: hp('60%')}}>
            <ItemsList
              showsVerticalScrollIndicator={false}
              data={attendence?.attendances}
              renderItem={({item}: ListRenderItemInfo<[]>) => (
                <StdViewAttendenceList item={item} />
              )}
            />
          </View>
        </View>
      ) : (
        <Text18Bold textStyle={{alignSelf: 'center', marginTop: hp('30%')}}>
          NO RESULT FOUND
        </Text18Bold>
      )}
    </View>
  );
};

export default MarkStdAttendence;
