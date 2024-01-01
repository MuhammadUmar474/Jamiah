import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {profileAvatar} from '../../shared/icons';
import {COLORS} from '../../shared/themes';

import {Text10, Text12, Text14} from '../Text';
import styles from './Styles';

const DashBoardClassesCard = ({item}: any) => {
  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text14
          textStyle={{
            textAlign: 'left',
            color: appMode === 'DARK' && COLORS.black,
          }}>
          {item?.start_at?.substr(0, 5)}
        </Text14>
        <Text12
          textStyle={{
            textAlign: 'left',
            color: appMode === 'DARK' && COLORS.black,
          }}>
          {item?.start_at?.substr(0, 2) < '12' ? 'AM' : 'PM'}
        </Text12>
      </View>
      <View style={styles.verticalLine} />
      <View>
        <Text14
          textStyle={{
            color: appMode === 'DARK' && COLORS.black,
          }}>
          {item?.subject?.name}
        </Text14>
        <View
          style={{
            marginTop: hp('0.5%'),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={
              item?.teacher?.profile_photo_path
                ? {uri: item?.teacher?.profile_photo_path}
                : profileAvatar
            }
            style={styles.imageView}
          />
          <Text12
            textStyle={{
              color: COLORS.gray,
              marginLeft: wp('2%'),
            }}>
            {item?.teacher?.full_name}
          </Text12>
        </View>
      </View>
    </View>
  );
};

export default memo(DashBoardClassesCard);
