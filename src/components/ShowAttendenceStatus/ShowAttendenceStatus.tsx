import React, {memo} from 'react';
import {View} from 'react-native';

import {COLORS} from '../../shared/themes';

import {Text14, Text16Bold} from '../Text';

const ShowAttendenceStatus = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text14>
        <Text16Bold textStyle={{color: COLORS.green}}>P</Text16Bold>
        {'  '}
        Present
      </Text14>
      <Text14>
        <Text16Bold textStyle={{color: COLORS.red}}>A</Text16Bold>
        {'  '}
        Absent
      </Text14>
      <Text14>
        <Text16Bold textStyle={{color: COLORS.primary}}>L</Text16Bold>
        {'  '}
        Leave
      </Text14>
    </View>
  );
};

export default memo(ShowAttendenceStatus);
