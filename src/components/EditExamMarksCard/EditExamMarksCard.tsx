import React, {useState, memo} from 'react';
import {View, Image, TextInput} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {addmarksOfStdAction} from '../../redux/actions/exam';

import {profileAvatar} from '../../shared/icons';
import {COLORS} from '../../shared/themes';
import {Text12, Text14} from '../Text';
import styles from './Styles';

const EditExamMarksCard = ({item}: any) => {
  const dispatch = useDispatch();
  const stdList = useSelector((state: any) => state?.examReducer?.students);

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const [marks, setMarks] = useState(item?.mark);
  const [marksError, setMarksError] = useState({
    error: false,
    msg: '',
  });

  const onaddMark = () => {
    if (marks > item?.totalMarks) {
      setMarksError({
        error: true,
        msg: `Obtained marks must be less than total marks ${item?.totalMarks}`,
      });
    }
    dispatch(addmarksOfStdAction(item, marks, stdList));
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item?.profile_photo_path
                ? {uri: item?.profile_photo_path}
                : profileAvatar
            }
            style={styles.imageView}
          />
          <Text12
            textStyle={{
              marginLeft: wp('2%'),
              width: wp('40%'),
            }}>
            {item?.firstname + ' ' + item?.lastname}
          </Text12>
        </View>
        <View style={styles.examMarkView}>
          <TextInput
            style={{alignSelf: 'center'}}
            keyboardType="numeric"
            editable={true}
            placeholder="N/A"
            // @ts-ignore
            placeholderTextColor={appMode === 'DARK' && COLORS.black}
            maxLength={3}
            value={marks}
            onChangeText={value => {
              setMarks(value);
              setMarksError({error: false, msg: ''});
            }}
            onBlur={() => {
              onaddMark();
            }}
          />
        </View>
      </View>
      {marksError.error && (
        <Text14 style={styles.errMsg}>{marksError.msg}</Text14>
      )}
    </View>
  );
};

export default memo(EditExamMarksCard);
