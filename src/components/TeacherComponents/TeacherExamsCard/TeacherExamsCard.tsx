import {useNavigation} from '@react-navigation/native';
import React, {useState, memo} from 'react';
import {format} from 'date-fns';
import {Image, Modal, Pressable, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {
  addMarksIcon,
  deleteExamTypeIcon,
  editExamMarksIcon,
  editExamTypeIcon,
  eyeIcon,
} from '../../../shared/icons';
import {COLORS} from '../../../shared/themes';
import ButtonComp from '../../Button/ButtonComp';

import {Text14, Text16} from '../../Text';
import styles from './Styles';
import {deleteExamAction} from '../../../redux/actions/exam';
import {examResultAction} from '../../../redux/actions/attendence';

const TeacherExamsCard = ({item}: any) => {
  const dispatch = useDispatch();

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const navigation = useNavigation();

  const newDate = new Date();
  const CURRENT_DATE = format(newDate, 'yyyy-MM-dd');
  const CURRENT_TIME =
    newDate.getHours() +
    ':' +
    newDate.getMinutes() +
    ':' +
    newDate.getSeconds();

  const [modalVisible, setModalVisible] = useState(false);
  const onEdit = () => {
    // @ts-ignore
    navigation.navigate('Edit-Exam', {currentExam: item});
  };

  const onAddExamMarks = () => {
    // @ts-ignore
    navigation.navigate('Add-Marks', {currentExamId: item?.id});
  };

  const onEditExamMarks = () => {
    // @ts-ignore
    navigation.navigate('Edit-Marks', {
      totalMarks: item?.total_mark,
      examId: item?.id,
    });
  };

  const onViewExamReport = () => {
    dispatch(examResultAction(item?.id));

    // @ts-ignore
    navigation.navigate('Exam-Result', {currentExamId: item?.id});
  };

  const onDelete = () => {
    setModalVisible(true);
  };

  const onDeleteExam = () => {
    dispatch(deleteExamAction(item?.id));
    setModalVisible(false);
  };

  const IconShow = () => {
    if (
      CURRENT_DATE >= item?.exam_date &&
      CURRENT_TIME > item?.time_from &&
      item?.exam_marks?.length < 1
    ) {
      return (
        <TouchableOpacity onPress={onAddExamMarks}>
          <Image source={addMarksIcon} style={styles.addMarksIconStyle} />
        </TouchableOpacity>
      );
    } else if (
      CURRENT_DATE >= item?.exam_date &&
      item?.exam_marks?.length > 0
    ) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onViewExamReport}>
            <Image source={eyeIcon} style={styles.eyeIconStyle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onEditExamMarks}>
            <Image
              source={editExamMarksIcon}
              style={styles.editExamMarkIconStyle}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onEdit}>
            <Image source={editExamTypeIcon} style={styles.editIconStyle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Image source={deleteExamTypeIcon} style={styles.deleteIconStyle} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <Pressable style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text16
              textStyle={{
                fontFamily: 'Poppins-Bold',
                alignSelf: 'center',
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Are you sure you want to delete it?
            </Text16>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <ButtonComp
                onPress={() => {
                  setModalVisible(false);
                }}
                styleTxt={{color: COLORS.black}}
                styleBtn={{
                  width: wp('40%'),
                  backgroundColor: COLORS.silverLight,
                }}
                btnName="Cancel"
              />
              <ButtonComp
                onPress={onDeleteExam}
                styleBtn={{
                  width: wp('40%'),
                  backgroundColor: COLORS.red,
                }}
                btnName="Delete"
              />
            </View>
          </View>
        </View>
      </Modal>
      <Text14
        textStyle={{
          width: wp('25%'),
          textAlign: 'left',
          color: appMode === 'DARK' && COLORS.black,
        }}>
        {item?.name}
      </Text14>
      <Text14
        textStyle={{
          width: wp('45%'),
          textAlign: 'left',
          color: appMode === 'DARK' && COLORS.black,
        }}>
        {item?.exam_date + '   ' + item?.time_from?.substr(0, 5)}
      </Text14>
      {IconShow()}
    </Pressable>
  );
};

export default memo(TeacherExamsCard);
