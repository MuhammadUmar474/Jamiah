import React from 'react';
import {View, Image} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {profileAvatar} from '../../../shared/icons';
import {COLORS} from '../../../shared/themes';

import {Text10, Text12, Text8} from '../../Text';
import styles from './Styles';

const TeacherCard = ({item}: any) => {
  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);
  return (
    <View style={styles.container}>
      <Image
        source={
          item?.teacher?.profile_photo_path
            ? {uri: item?.teacher?.profile_photo_path}
            : profileAvatar
        }
        style={{
          ...styles.imgStyle,
          borderWidth: item?.class_head === 1 ? 2 : 0,
          borderColor: item?.class_head === 1 ? COLORS.primary : 'transparent',
        }}
      />
      <Text12
        textStyle={{
          marginTop: hp('0.5%'),
          color: appMode === 'DARK' && COLORS.black,
        }}>
        {item?.teacher?.full_name}
      </Text12>
      <Text10
        textStyle={{
          marginTop: hp('0.5%'),
          color: appMode === 'DARK' ? COLORS.black : COLORS.gray,
        }}>
        {item?.subject?.name}
      </Text10>
      {item?.class_head === 1 ? (
        <View style={styles.classHeadTxt}>
          <Text8
            textStyle={{
              color: COLORS.white,
            }}>
            Class Teacher
          </Text8>
        </View>
      ) : null}
    </View>
  );
};

export default TeacherCard;
