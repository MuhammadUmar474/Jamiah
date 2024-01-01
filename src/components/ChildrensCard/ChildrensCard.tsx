import React, {memo} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Text14} from '../Text';
import styles from './Styles';
import {profileAvatar} from '../../shared/icons';
import darkStyles from './DarkStyles';
import {ParentChildlogInAction} from '../../redux/actions/auth';
import {COLORS} from '../../shared/themes';

const ChildrensCard = ({children}: any) => {
  const dispatch = useDispatch();

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const Color = () => {
    if (children?.student_status === 1) {
      return COLORS.red;
    } else if (children?.student_status === 2) {
      return COLORS.grey;
    } else if (children?.student_status === 3) {
      return COLORS.orange;
    } else if (children?.student_status === 4) {
      return COLORS.black;
    } else {
      return COLORS.green;
    }
  };

  const StudentStatus = () => {
    if (children?.student_status === 1) {
      return <Text14 textStyle={{color: Color()}}>Left</Text14>;
    } else if (children?.student_status === 2) {
      return <Text14 textStyle={{color: Color()}}>Expelled</Text14>;
    } else if (children?.student_status === 3) {
      return <Text14 textStyle={{color: Color()}}>Deactivated</Text14>;
    } else if (children?.student_status === 4) {
      return <Text14 textStyle={{color: Color()}}>Passed Out</Text14>;
    } else {
      return <Text14 textStyle={{color: Color()}}>Active</Text14>;
    }
  };

  const onPressChildren = async () => {
    dispatch(ParentChildlogInAction(children?.id));
  };
  return (
    <View
      key={children?.id}
      style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            children?.profile_photo_path
              ? {uri: children?.profile_photo_path}
              : profileAvatar
          }
          style={styles.organizationLogo}
        />
        <View>
          <Text14>{children?.full_name}</Text14>
          {StudentStatus()}
        </View>
      </View>
      {children?.student_status == null ? (
        <TouchableOpacity onPress={onPressChildren}>
          <Text14 textStyle={{marginRight: '2%', color: COLORS.primary}}>
            Login
          </Text14>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default memo(ChildrensCard);
