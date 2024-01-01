import React, {useState, memo} from 'react';
import {View, Pressable, Image, TouchableOpacity, Linking} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../shared/themes';
import {Text16, Text16Bold, Text18} from '../Text';
import styles from './Styles';
import {useSelector} from 'react-redux';
import {
  addAssignmentIcon,
  downloadAssignmentIcon,
  editExamTypeIcon,
} from '../../shared/icons';
import {CurrentDate} from '../../utils/currentdate';
import {useNavigation} from '@react-navigation/native';

const AssignmentView = ({name, data}: {name: any; data: any}) => {
  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  return (
    <View style={styles.bodyData}>
      <Text18
        textStyle={{
          marginTop: hp('1%'),
          marginLeft: wp('2%'),
          width: wp('30%'),
          color: appMode === 'DARK' && COLORS.black,
        }}>
        {name}
      </Text18>
      <Text18
        textStyle={{
          marginTop: hp('1%'),
          width: wp('40%'),
          color: appMode === 'DARK' && COLORS.black,
        }}>
        {data}
      </Text18>
    </View>
  );
};

const StudentAssignmentsCard = ({item}: any) => {
  const navigation = useNavigation();
  const current_date = CurrentDate();
  const [showResult, setShowResult] = useState(false);

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const onEdit = () => {
    // @ts-ignore
    navigation.navigate('Std-Assignment-Submission', {currentAssignment: item});
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
          <Text16
            textStyle={{
              marginLeft: wp('2%'),
              width: wp('60%'),
              color: appMode === 'DARK' && COLORS.black,
            }}>
            {item?.name}
          </Text16>
        </View>
        <FontAwesome
          name={showResult ? 'angle-up' : 'angle-down'}
          size={20}
          style={{marginRight: wp('1%')}}
        />
      </View>
      {showResult ? (
        <View style={{marginTop: hp('2%')}}>
          <View style={styles.horizontalLine} />
          <Text16Bold
            textStyle={{
              marginTop: hp('1%'),
              marginLeft: wp('2%'),
              color: appMode === 'DARK' && COLORS.grey,
            }}>
            DETAILS
          </Text16Bold>
          <AssignmentView name={'Deadline'} data={item?.assignment_deadline} />
          <View style={styles.bodyData}>
            <Text18
              textStyle={{
                marginTop: hp('1%'),
                marginLeft: wp('2%'),
                width: wp('35%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Attachments
            </Text18>
            <TouchableOpacity
              style={{width: wp('40%')}}
              onPress={() => {
                if (item?.assignment_file) {
                  Linking.openURL(item?.assignment_file);
                }
              }}>
              <Image
                source={downloadAssignmentIcon}
                style={styles.downloadIcon}
              />
            </TouchableOpacity>
          </View>
          <AssignmentView name={'Status'} data={'Pending'} />
          <AssignmentView name={'Total Marks'} data={item?.total_mark} />
          <AssignmentView
            name={'Obtained'}
            data={item?.mark ? item?.mark : '_'}
          />

          <View style={styles.bodyData}>
            <Text18
              textStyle={{
                marginTop: hp('1%'),
                marginLeft: wp('2%'),
                width: wp('35%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Actions
            </Text18>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: wp('40%'),
              }}>
              {current_date < item?.assignment_deadline ? (
                <TouchableOpacity
                  onPress={() => {
                    // @ts-ignore
                    navigation.navigate('Std-Assignment-Submission', {
                      currentAssignmentId: item?.id,
                    });
                  }}>
                  <Image
                    source={addAssignmentIcon}
                    style={styles.addAssignmentIconStyle}
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: wp('40%'),
                  }}>
                  <TouchableOpacity onPress={onEdit}>
                    <Image
                      source={editExamTypeIcon}
                      style={styles.editIconStyle}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      ) : null}
    </Pressable>
  );
};

export default memo(StudentAssignmentsCard);
