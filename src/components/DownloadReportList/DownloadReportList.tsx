import React, {useState, memo} from 'react';
import {View, Image, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';

import {profileAvatar} from '../../shared/icons';
import {COLORS} from '../../shared/themes';

import {Text12} from '../Text';
import styles from './Styles';

const DownloadReportList = (item: any) => {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={profileAvatar}
          style={{height: 40, width: 40, borderRadius: 20}}
        />
        <Text12 textStyle={{marginLeft: wp('2%')}}>Abdullah</Text12>
      </View>

      {Platform.OS == 'ios' ? (
        <CheckBox
          style={styles.boxStyle}
          boxType="square"
          status={checked ? 'checked' : 'unchecked'}
          uncheckedColor={COLORS.normal_grey}
          onAnimationType="fill"
          ofAnimationType="fade"
          //@ts-ignore
          tintColors={COLORS.primary}
          onTintColor={COLORS.primary}
          onCheckColor={COLORS.primary}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      ) : (
        <CheckBox
          style={{marginTop: hp('0.5%')}}
          tintColors={{true: COLORS.primary, false: COLORS.normal_grey}}
          disabled={false}
          value={checked}
          onValueChange={newValue => setChecked(newValue)}
        />
      )}
    </View>
  );
};

export default memo(DownloadReportList);
