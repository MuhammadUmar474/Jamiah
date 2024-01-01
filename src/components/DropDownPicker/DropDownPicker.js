import React, {memo} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {COLORS} from '../../shared/themes';

const DropDownPick = props => {
  return (
    <DropDownPicker
      style={{borderWidth: 1, borderColor: COLORS.borderColor}}
      placeholder={'Select'}
      dropDownContainerStyle={{
        backgroundColor: COLORS.white,
        borderWidth: 0.2,
        borderColor: COLORS.borderColor,
        zIndex: 1,
      }}
      textStyle={{
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: COLORS.grey,
      }}
      zIndex={1}
      zIndexInverse={1}
      {...props}
    />
  );
};

export default memo(DropDownPick);
