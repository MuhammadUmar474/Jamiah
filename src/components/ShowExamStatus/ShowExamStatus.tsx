import React, {memo} from 'react';
import {View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {COLORS} from '../../shared/themes';

import {Text12Bold} from '../Text';

const ShowExamStatus = () => {
  return (
    <View
      style={{
        margin: wp('5%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text12Bold textStyle={{color: COLORS.blue}}>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 3,
            backgroundColor: COLORS.blue,
          }}
        />
        {'  '}
        Pending
      </Text12Bold>
      <Text12Bold textStyle={{color: COLORS.green}}>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 3,
            backgroundColor: COLORS.green,
          }}
        />
        {'  '}Taken - Marked
      </Text12Bold>
      <Text12Bold textStyle={{color: COLORS.red}}>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 3,
            backgroundColor: COLORS.red,
          }}
        />
        {'  '}Taken - UnMarked
      </Text12Bold>
    </View>
  );
};

export default memo(ShowExamStatus);
