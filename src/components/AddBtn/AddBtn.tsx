import {TouchableOpacity, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {COLORS} from '../../shared/themes';

const AddBtn = (props: any) => {
  return (
    <TouchableOpacity style={styles.addExamBtn} onPress={props?.onPress}>
      <FontAwesome name="plus" size={20} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default memo(AddBtn);

export const styles = StyleSheet.create({
  addExamBtn: {
    marginTop: hp('84%'),
    alignSelf: 'center',
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
