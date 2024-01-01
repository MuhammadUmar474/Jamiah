import React, {useState, memo} from 'react';
import {Image, Platform, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../shared/themes';
import {Text12} from '../Text';
import styles from './styles';
import {profileAvatar} from '../../shared/icons';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectSpecificStdAction,
  unSelectSpecificStdAction,
} from '../../redux/actions/examReport';

const StdListCard = ({item}: any) => {
  const dispatch = useDispatch();

  const classStudents =
    useSelector((state: any) => state?.examReportReducer?.classStudents) || [];

  const [checked, setChecked] = useState(item.checked ? true : false);

  return (
    <View style={styles.dropDownItems}>
      {Platform.OS == 'ios' ? (
        <CheckBox
          style={styles.dropDownboxStyle}
          boxType="square"
          value={checked}
          uncheckedColor={COLORS.normal_grey}
          onAnimationType="fill"
          ofAnimationType="fade"
          //@ts-ignore
          tintColors={COLORS.primary}
          onTintColor={COLORS.primary}
          onCheckColor={COLORS.primary}
          onValueChange={() => {
            setChecked(!checked);
            if (checked) {
              dispatch(unSelectSpecificStdAction(item, classStudents));
            } else dispatch(selectSpecificStdAction(item, classStudents));
          }}
        />
      ) : (
        <CheckBox
          style={{marginTop: hp('0.5%')}}
          tintColors={{true: COLORS.primary, false: COLORS.normal_grey}}
          disabled={false}
          value={checked}
          onValueChange={() => {
            setChecked(!checked);
            if (checked) {
              dispatch(unSelectSpecificStdAction(item?.id, classStudents));
            } else dispatch(selectSpecificStdAction(item?.id, classStudents));
          }}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: wp('2%'),
        }}>
        <Image
          source={item?.image ? {uri: item?.image} : profileAvatar}
          style={styles.imageView}
        />
        <Text12
          textStyle={{
            marginLeft: wp('2%'),
            width: wp('50%'),
          }}>
          {item?.name}
        </Text12>
      </View>
    </View>
  );
};

export default memo(StdListCard);
