import React, {memo} from 'react';
import {TouchableOpacity, Image} from 'react-native';

import {cancelIcon} from '../../shared/icons';
import {COLORS} from '../../shared/themes';
import {Text14Bold} from '../Text';
import styles from './styles';

const ClearfilterBtn = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={[styles.clearfilterBtn, props.styleBtn]}>
      <Image source={cancelIcon} style={styles.cancelIcon} />
      <Text14Bold textStyle={{color: COLORS.primary}}>Clear Filters</Text14Bold>
    </TouchableOpacity>
  );
};

export default memo(ClearfilterBtn);
