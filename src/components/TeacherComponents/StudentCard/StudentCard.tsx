import React from 'react';
import {View, Image} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {profileAvatar} from '../../../shared/icons';
import {COLORS} from '../../../shared/themes';

import {Text12, Text8} from '../../Text';
import styles from './Styles';

const StudentCard = ({item}: any) => {
  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);
  return (
    <View style={styles.container}>
      <Image
        source={
          item?.student?.profile_photo_path
            ? {uri: item?.student?.profile_photo_path}
            : profileAvatar
        }
        style={{
          ...styles.imgStyle,
          borderWidth:
            item?.class_monitor || item?.deputy_monitor === 1 ? 2 : 0,
          borderColor:
            item?.class_monitor === 1
              ? COLORS.pink
              : item?.deputy_monitor === 1
              ? COLORS.lightBlue
              : 'transparent',
        }}
      />
      <Text12
        textStyle={{
          marginTop: hp('0.5%'),
          color: appMode === 'DARK' && COLORS.black,
        }}>
        {item?.student?.full_name}
      </Text12>
      <View
        style={{
          ...styles.classHeadtxt,
          backgroundColor:
            item?.class_monitor === 1
              ? COLORS.pink
              : item?.deputy_monitor === 1
              ? COLORS.lightBlue
              : 'transparent',
        }}>
        <Text8
          textStyle={{
            color: COLORS.white,
          }}>
          {item?.class_monitor === 1
            ? 'Moniter'
            : item?.deputy_monitor === 1
            ? 'Deputy Moniter'
            : ''}
        </Text8>
      </View>
    </View>
  );
};

export default StudentCard;
