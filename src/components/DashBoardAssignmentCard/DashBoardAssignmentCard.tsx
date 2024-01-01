import React, {memo} from 'react';
import {View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';
import {getLeftActivationDays} from '../../utils/getLeftActivationDays';

import {Text10, Text12} from '../Text';
import styles from './Styles';

const DashBoardAssignmentCard = ({item}: any) => {
  const DEAD_LINE = getLeftActivationDays(item?.assignment_deadline);

  return (
    <View
      style={{
        backgroundColor: DEAD_LINE <= 3 ? COLORS.lightPink : COLORS.lightGreen,
        ...styles.container,
      }}>
      <Text12 textStyle={{color: COLORS.gray}}>{item?.subjects?.name}</Text12>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: hp('1%'),
        }}>
        <View
          style={{
            height: 6,
            width: 6,
            borderRadius: 3,
            backgroundColor: DEAD_LINE <= 3 ? COLORS.red : COLORS.green,
          }}
        />
        <Text12 textStyle={{marginLeft: wp('1%')}}>
          {DEAD_LINE} days left
        </Text12>
      </View>

      <Text12 textStyle={{marginTop: hp('1%')}}>{item?.name}</Text12>
    </View>
  );
};

export default memo(DashBoardAssignmentCard);
