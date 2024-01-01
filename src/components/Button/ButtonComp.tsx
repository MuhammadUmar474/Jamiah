import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text16Bold} from '../Text';
import styles from './styles';

const ButtonComp = (props: any) => {
  return (
    <TouchableOpacity
      testID={props?.testID}
      style={{
        ...styles.buttonLogin,
        ...props.styleBtn,
      }}
      onPress={props.onPress}
      disabled={props?.disabled}>
      <Text16Bold textStyle={[styles.logInTxt, props.styleTxt]}>
        {props.btnName}
      </Text16Bold>
    </TouchableOpacity>
  );
};

export default memo(ButtonComp);
