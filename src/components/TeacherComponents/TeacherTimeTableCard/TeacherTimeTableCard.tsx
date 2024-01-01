import React, {memo} from 'react';
import {View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {COLORS} from '../../../shared/themes';

import {Text14} from '../../Text';
import styles from './Styles';

const TeacherTimeTableCard = ({item}: any) => {
  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);
  return (
    <View style={styles.container}>
      <Text14
        textStyle={{
          width: wp('36%'),
          textAlign: 'left',
          color: appMode === 'DARK' && COLORS.black,
        }}>
        {item?.class?.grades?.name}
      </Text14>
      <Text14
        textStyle={{
          width: wp('33%'),
          textAlign: 'left',
          color: appMode === 'DARK' && COLORS.black,
        }}>
        {item?.class?.divisions?.name}
      </Text14>
      <Text14
        textStyle={{
          width: wp('30%'),
          textAlign: 'left',
          color: appMode === 'DARK' && COLORS.black,
        }}>
        {item.start_at.substring(0, 5)}
      </Text14>
    </View>
  );
};

export default memo(TeacherTimeTableCard);
