import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {profileAvatar} from '../../shared/icons';
import {COLORS} from '../../shared/themes';
import {Text12, Text14Bold, Text16Bold} from '../Text';
import styles from './Styles';

const StdViewAttendenceList = ({item}: any) => {
  const attendence =
    useSelector((state: any) => state?.attendenceReducer?.attendence) || {};

  return (
    <View style={styles.container}>
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
            width: wp('40%'),
          }}>
          {item?.fullname}
        </Text12>
      </View>
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
  );
};

export default memo(StdViewAttendenceList);
