import React, {useState, memo} from 'react';
import {
  View,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../shared/themes';
import {Text14, Text16, Text16Bold, Text18} from '../Text';
import styles from './Styles';
import {useDispatch, useSelector} from 'react-redux';
import {downloadAssignmentIcon, profileAvatar} from '../../shared/icons';
import {addAssignmentMarksOfStdAction} from '../../redux/actions/assignment';

const TeacherAssignmentSubmissionCard = ({item}: any) => {
  const dispatch = useDispatch();
  const [showResult, setShowResult] = useState(false);
  const [marks, setMarks] = useState('');
  const [marksError, setMarksError] = useState({
    error: false,
    msg: '',
  });

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const stdList = useSelector(
    (state: any) => state?.examReducer?.students_to_add_mark,
  );

  const onaddAssignmentMarks = () => {
    if (marks > item?.total_mark) {
      setMarksError({
        error: true,
        msg: `Obtained marks must be less than total marks ${item?.total_mark}`,
      });
    }
    dispatch(addAssignmentMarksOfStdAction(item, marks, stdList));
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setShowResult(!showResult);
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item?.profile_photo_path
                ? {uri: item?.profile_photo_path}
                : profileAvatar
            }
            style={styles.imageView}
          />
          <Text16
            textStyle={{
              marginLeft: wp('2%'),
              width: wp('40%'),
              color: appMode === 'DARK' && COLORS.black,
            }}>
            Name
          </Text16>
        </View>
        <FontAwesome
          name={showResult ? 'angle-up' : 'angle-down'}
          size={20}
          style={{marginRight: wp('1%')}}
        />
      </View>
      {showResult ? (
        <View style={{marginTop: hp('2%'), marginLeft: wp('2%')}}>
          <View style={styles.horizontalLine} />
          <Text16Bold
            textStyle={{
              marginTop: hp('1%'),
              color: appMode === 'DARK' && COLORS.grey,
            }}>
            DETAILS
          </Text16Bold>
          <View style={styles.bodyData}>
            <Text18
              textStyle={{
                marginTop: hp('1%'),
                width: wp('35%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Attachments
            </Text18>
            <TouchableOpacity style={{width: wp('40%')}}>
              <Image
                source={downloadAssignmentIcon}
                style={styles.downloadIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyData}>
            <Text18
              textStyle={{
                marginTop: hp('1%'),
                width: wp('35%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Marks
            </Text18>
            <View
              style={{
                width: wp('40%'),
              }}>
              <View style={styles.examMarkView}>
                <TextInput
                  keyboardType="number-pad"
                  editable={true}
                  placeholder="N/A"
                  style={{
                    color: appMode === 'DARK' ? COLORS.black : COLORS.grey,
                  }}
                  // @ts-ignore
                  placeholderTextColor={appMode === 'DARK' && COLORS.black}
                  maxLength={3}
                  value={marks}
                  onChangeText={(value: any) => {
                    setMarks(value);
                    setMarksError({error: false, msg: ''});
                  }}
                  onBlur={() => {
                    onaddAssignmentMarks();
                  }}
                />
              </View>
            </View>
          </View>
          {marksError.error && (
            <Text14 style={styles.errMsg}>{marksError.msg}</Text14>
          )}
        </View>
      ) : null}
    </Pressable>
  );
};

export default memo(TeacherAssignmentSubmissionCard);
