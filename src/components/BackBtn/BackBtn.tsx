import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import BackArrowSvg from '../../assets/svgs/BackArrowSvg';

const BackBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <BackArrowSvg height={18} width={12} />
    </TouchableOpacity>
  );
};

export default memo(BackBtn);
