import React, {useState, memo, useRef} from 'react';
import {RadioButton} from 'react-native-paper';

import {
  View,
  Image,
  Pressable,
  Modal,
  Animated,
  ListRenderItemInfo,
} from 'react-native';
import {format} from 'date-fns';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  absentIcon,
  leaveIcon,
  presentIcon,
  profileAvatar,
} from '../../shared/icons';
import {COLORS} from '../../shared/themes';
import {isIOS} from '../../utils/platformUtils/platformCheck';
import ButtonComp from '../Button/ButtonComp';
import ItemsList from '../ItemsList/ItemsList';

import {Text12, Text14Bold, Text16, Text16Bold} from '../Text';
import styles from './Styles';
import {storeAttendenceAction} from '../../redux/actions/attendence';

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

const StdAttendenceList = ({item}: any) => {
  const dispatch = useDispatch();
  const newDate = new Date();
  const CURRENT_DATE = format(newDate, 'yyyy-MM-dd');

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

  const [modalVisible, setModalVisible] = useState(false);
  const [present, setPresent] = useState(false);
  const [absent, setAbsent] = useState(false);
  const [leave, setLeave] = useState(false);
  const [shift, setShift] = useState('morning');

  const slideAnimation = useRef(new Animated.Value(0)).current;

  const attendence =
    useSelector((state: any) => state?.attendenceReducer?.attendence) || {};

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  // const [morningSwitch, setMorningSwitch] = useState(
  //   item?.mark1 == 1 ? true : false,
  // );
  // const [eveningSwitch, setEveningSwitch] = useState(
  //   item?.mark2 == 2 ? true : false,
  // );

  // const stdAttendence = useSelector(
  //   (state: any) => state?.attendenceReducer?.stdAttendence,
  // );

  // const addMorningAttendence = () => {
  //   setMorningSwitch(!morningSwitch);
  //   dispatch(
  //     !morningSwitch
  //       ? markStdAction(item, stdAttendence)
  //       : removeStdAction(item, stdAttendence),
  //   );
  // };
  // const addEveningAttendence = () => {
  //   setEveningSwitch(!eveningSwitch);
  //   dispatch(
  //     !eveningSwitch
  //       ? markStdAction(item, stdAttendence, true)
  //       : removeStdAction(item, stdAttendence, true),
  //   );
  // };

  // const nextStudent = () => {
  //   Animated.timing(slideAnimation, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     setStdCount((stdCount + 1) % item?.length);
  //     slideAnimation.setValue(0);
  //   });
  // };
  const checkAttendenceStatus = () => {
    if (
      attendence?.attendance_mode === 'single' &&
      item?.today_attendance_status == 3
    ) {
      return true;
    }
    if (
      shift === 'morning' &&
      attendence?.attendance_mode === 'double' &&
      (item?.today_attendance_status == 1 || item?.today_attendance_status == 3)
    ) {
      return true;
    }
    if (
      shift === 'evening' &&
      attendence?.attendance_mode === 'double' &&
      (item?.today_attendance_status == 2 || item?.today_attendance_status == 3)
    ) {
      return true;
    }
  };

  const onPresentPress = () => {
    // nextStudent();
    if (shift === 'morning' && attendence?.attendance_mode === 'double') {
      setPresent(true);
      setAbsent(false);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: item?.id,
          mark1: 1,
          mark2:
            item?.today_attendance_status === 2 ||
            item?.today_attendance_status === 3
              ? 2
              : null,
        }),
      );
    } else if (
      shift === 'evening' &&
      attendence?.attendance_mode === 'double'
    ) {
      setPresent(true);
      setAbsent(false);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: item?.id,
          mark2: 2,
          mark1:
            item?.today_attendance_status === 1 ||
            item?.today_attendance_status === 3
              ? 1
              : null,
        }),
      );
    } else {
      setPresent(true);
      setAbsent(false);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: item?.id,
          mark1: 1,
          mark2: null,
        }),
      );
    }
  };
  const onAbsentPress = () => {
    if (shift === 'morning' && attendence?.attendance_mode === 'double') {
      setPresent(true);
      setAbsent(false);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: item?.id,
          mark1: 0,
          mark2:
            item?.today_attendance_status === 2 ||
            item?.today_attendance_status === 3
              ? 2
              : null,
        }),
      );
    } else if (
      shift === 'evening' &&
      attendence?.attendance_mode === 'double'
    ) {
      setPresent(true);
      setAbsent(false);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: item?.id,
          mark2: 0,
          mark1:
            item?.today_attendance_status === 1 ||
            item?.today_attendance_status === 3
              ? 1
              : null,
        }),
      );
    } else {
      setPresent(false);
      setAbsent(true);
      setLeave(false);
      dispatch(
        storeAttendenceAction({
          user_id: item?.id,
          mark1: 0,
          mark2: 0,
        }),
      );
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => setModalVisible(true)}
      key={item?.id}>
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
                source={require('../../assets/images/cancelIcon.png')}
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
                transform: [
                  {
                    translateX: slideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -300],
                    }),
                  },
                ],
                width: wp('50%'),
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: hp('1%'),
              }}>
              <Image
                source={
                  item.profile_photo_path
                    ? {
                        uri: item?.profile_photo_path,
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
                  {item?.fullname}
                </Text16Bold>
                <Text12
                  textStyle={{
                    color: appMode === 'DARK' && COLORS.black,
                  }}>
                  {item?.serial_no}
                </Text12>
              </View>
            </Animated.View>

            {/* <View
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
              <TouchableOpacity
                onPress={() => {
                  if (stdCount < item?.length - 1) {
                    setStdCount(stdCount + 1);
                  }
                  if (stdCount == item?.length - 1) {
                    setModalVisible(false);
                  }
                }}>
                <Image
                  source={swipeRightIcon}
                  style={{
                    height: 27,
                    width: 27,
                    opacity:
                      stdCount == item?.length - 1 ? 0.3 : 1,
                  }}
                />
              </TouchableOpacity>
            </View> */}
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
                data={item?.monthDay}
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
                  color: checkAttendenceStatus() ? COLORS.white : COLORS.black,
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
                    (attendence?.attendance_mode === 'single' || 'double') &&
                    item?.today_attendance_status == 0
                      ? COLORS.white
                      : COLORS.black,
                  fontSize: 12,
                }}
                styleBtn={{
                  width: wp('27%'),
                  marginLeft: wp('2%'),
                  backgroundColor:
                    (attendence?.attendance_mode === 'single' || 'double') &&
                    (item?.today_attendance_status == 0
                      ? COLORS.red
                      : COLORS.silverLight),
                }}
                btnName="Absent"
              />
              <ButtonComp
                onPress={() => {
                  setPresent(false);
                  setAbsent(false);
                  setLeave(true);
                }}
                styleTxt={{
                  color:
                    (attendence?.attendance_mode === 'single' || 'double') &&
                    item?.today_attendance_status == 4
                      ? COLORS.white
                      : COLORS.black,
                  fontSize: 12,
                }}
                styleBtn={{
                  width: wp('27%'),
                  marginLeft: wp('2%'),
                  backgroundColor:
                    (attendence?.attendance_mode === 'single' || 'double') &&
                    item?.today_attendance_status == 4
                      ? COLORS.blue
                      : COLORS.silverLight,
                }}
                btnName="On Leave"
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            item?.profile_photo_path
              ? {uri: item?.profile_photo_path}
              : profileAvatar
          }
          style={styles.imageView}
        />
        <Text12
          textStyle={{
            marginLeft: wp('2%'),
            width: wp('35%'),
          }}>
          {item?.fullname}
        </Text12>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {attendence?.attendance_mode === 'single' ? (
          item?.attendance_status == '4' ? (
            <Text14Bold
              textStyle={{
                color: COLORS.red,
                width: wp('20%'),
              }}>
              Leave
            </Text14Bold>
          ) : (
            <Text16Bold
              textStyle={{
                marginRight: wp('6%'),
                color:
                  item?.today_attendance_status === 4
                    ? COLORS.primary
                    : item?.today_attendance_status === 0
                    ? COLORS.red
                    : COLORS.green,
              }}>
              {item?.today_attendance_status === 4
                ? 'L'
                : item?.today_attendance_status === 0
                ? 'A'
                : 'P'}
            </Text16Bold>
          )
        ) : (
          <View style={{flexDirection: 'row'}}>
            {item?.attendance_status == '4' ? (
              <Text14Bold
                textStyle={{
                  color: COLORS.red,
                  width: wp('20%'),
                }}>
                Leave
              </Text14Bold>
            ) : (
              <Text16Bold
                textStyle={{
                  marginRight: wp('18%'),
                  color:
                    item?.today_attendance_status === 4
                      ? COLORS.primary
                      : item?.today_attendance_status === 1 ||
                        item?.today_attendance_status === 3
                      ? COLORS.green
                      : COLORS.red,
                }}>
                {item?.today_attendance_status === 4
                  ? 'L'
                  : item?.today_attendance_status === 1 ||
                    item?.today_attendance_status === 3
                  ? 'P'
                  : 'A'}
              </Text16Bold>
            )}

            {item?.attendance_status == '4' ? (
              <Text14Bold
                textStyle={{
                  color: COLORS.red,
                  width: wp('12%'),
                }}>
                Leave
              </Text14Bold>
            ) : (
              <Text16Bold
                textStyle={{
                  marginRight: wp('4%'),
                  color:
                    item?.today_attendance_status === 4
                      ? COLORS.primary
                      : item?.today_attendance_status === 2 ||
                        item?.today_attendance_status === 3
                      ? COLORS.green
                      : COLORS.red,
                }}>
                {item?.today_attendance_status === 4
                  ? 'L'
                  : item?.today_attendance_status === 2 ||
                    item?.today_attendance_status === 3
                  ? 'P'
                  : 'A'}
              </Text16Bold>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default memo(StdAttendenceList);
