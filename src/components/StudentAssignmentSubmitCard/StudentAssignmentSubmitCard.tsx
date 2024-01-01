import React, {memo, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DocumentPickerHandler from 'react-native-document-picker';

import {COLORS} from '../../shared/themes';
import {Text14, Text16, Text16Bold, Text18} from '../Text';
import styles from './Styles';
import {useDispatch, useSelector} from 'react-redux';

const AssignmentView = ({name, data}: {name: any; data: any}) => {
  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  return (
    <View style={styles.bodyData}>
      <Text18
        textStyle={{
          marginTop: hp('1%'),
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

const StudentAssignmentSubmitCard = ({item}: any) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState({});
  const [base64File, setBase64File] = useState('');
  const [fileError, setFileError] = useState({
    error: false,
    msg: '',
  });

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const onDocumentSelect = async () => {
    try {
      const file = await DocumentPickerHandler.pick({
        type: [DocumentPickerHandler.types.allFiles],
      });
      setFile(file[0]);
      RNFetchBlob.fs
        .readFile(file[0].uri, 'base64')
        .then(data => {
          setBase64File(data);
        })
        .catch(err => {
          console.log('Error while converting file to base64', err);
        });
      setFileError({
        error: false,
        msg: '',
      });
    } catch (error) {
      console.log('onDocumentSelect error', error);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text16
          textStyle={{
            marginLeft: wp('2%'),
            width: wp('40%'),
            color: appMode === 'DARK' && COLORS.black,
          }}>
          Name
        </Text16>
        <View style={{marginTop: hp('2%'), marginLeft: wp('2%')}}>
          <View style={styles.horizontalLine} />
          <Text16Bold
            textStyle={{
              marginTop: hp('1%'),
              color: appMode === 'DARK' && COLORS.grey,
            }}>
            DETAILS
          </Text16Bold>
          <AssignmentView name={'Class'} data={'08/04/22'} />
          <AssignmentView name={'Teacher'} data={'08/04/22'} />
          <AssignmentView name={'Subject'} data={'Pending'} />
          <AssignmentView name={'Deadline'} data={'08/04/22'} />
          <AssignmentView name={'Total Marks'} data={'15'} />
          <AssignmentView name={'Description'} data={'Aho'} />
        </View>
      </View>
      <View
        style={{
          marginTop: hp('1%'),
        }}>
        <View style={styles.descriptionView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.fileButton}
              onPress={onDocumentSelect}>
              <Text16 textStyle={{color: appMode === 'DARK' && COLORS.black}}>
                Choose
              </Text16>
            </TouchableOpacity>
            <Text16
              textStyle={{
                marginLeft: wp('2%'),
                width: wp('60%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              {Object.keys(file).length === 0
                ? 'No File Choosen'
                : // @ts-ignore
                  file?.name}
            </Text16>
          </View>
        </View>
        {fileError.error && (
          <Text14 style={styles.errMsg}>{fileError.msg}</Text14>
        )}
      </View>
    </View>
  );
};

export default memo(StudentAssignmentSubmitCard);
