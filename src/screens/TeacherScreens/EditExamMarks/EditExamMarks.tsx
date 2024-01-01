import React, {useEffect} from 'react';
import {View, TouchableOpacity, Image, ListRenderItemInfo} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {Text14Bold, Text16, Text20} from '../../../components/Text';
import styles from './Styles';
import {backArrow} from '../../../shared/icons';
import ButtonComp from '../../../components/Button/ButtonComp';
import AppLoader from '../../../components/AppLoader/AppLoader';
import {COLORS} from '../../../shared/themes';
import ItemsList from '../../../components/ItemsList/ItemsList';
import EditExamMarksCard from '../../../components/EditExamMarksCard/EditExamMarksCard';
import {
  getStdToAddEditExamMarksAction,
  updateStdExamMarksAction,
} from '../../../redux/actions/exam';
import darkStyles from './DarkStyles';

const EditExamMarks = ({navigation, route}: {navigation: any; route: any}) => {
  const totalMarks = route?.params?.totalMarks;
  const examId = route?.params?.examId;

  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const exam_details = useSelector(
    (state: any) => state?.examReducer?.exam_details,
  );

  const studToEditExamMarks = useSelector(
    (state: any) => state?.examReducer?.students,
  );
  studToEditExamMarks.forEach((item: any) => {
    item.totalMarks = totalMarks;
  });
  const studentsToEditExamMarks = useSelector(
    (state: any) => state?.examReducer?.students_to_add_mark,
  );
  const studentsToEditMarksList = studentsToEditExamMarks.map((item: any) => ({
    student_id: item?.student_id,
    mark: item?.mark,
  }));

  const marksChk = studentsToEditMarksList.map((item: any) => item?.mark);

  const btnDisableChk = (element: number) => element > exam_details?.total_mark;

  const onEditExamMarks = () => {
    dispatch(
      updateStdExamMarksAction(examId, studentsToEditMarksList, successCall),
    );
  };

  const successCall = () => {
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(getStdToAddEditExamMarksAction(examId));
  }, []);

  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topView}>
          <View style={styles.underTop}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={backArrow} style={{height: 17, width: 10}} />
            </TouchableOpacity>
            <Text20
              textStyle={{
                fontFamily: 'Poppins-Medium',
                marginLeft: wp('4%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Edit Marks
            </Text20>
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: wp('5%')}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text16
            textStyle={{fontFamily: 'Poppins-Medium', marginTop: hp('3%')}}>
            Exam: {exam_details?.subject_name}
          </Text16>
          <Text16
            textStyle={{fontFamily: 'Poppins-Medium', marginTop: hp('3%')}}>
            Total Marks: {exam_details?.total_mark}
          </Text16>
        </View>

        <View
          style={{
            marginTop: hp('3%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text14Bold>Students</Text14Bold>
          <Text14Bold>Obtained Marks</Text14Bold>
        </View>
        <View style={{height: hp('50%')}}>
          {isLoading ? (
            <AppLoader
              styleLoader={{marginTop: hp('20%')}}
              color={COLORS.black}
              size={'large'}
            />
          ) : (
            <ItemsList
              showsVerticalScrollIndicator={false}
              data={studToEditExamMarks}
              renderItem={({item}: ListRenderItemInfo<[]>) => (
                <EditExamMarksCard item={item} />
              )}
            />
          )}
        </View>

        <View>
          <ButtonComp
            disabled={marksChk.some(btnDisableChk) ? true : false}
            styleBtn={{
              backgroundColor: marksChk.some(btnDisableChk)
                ? COLORS.red
                : COLORS.green,
            }}
            btnName={
              isLoading ? (
                <AppLoader size={'small'} color={COLORS.white} />
              ) : (
                'Update Marks'
              )
            }
            onPress={onEditExamMarks}
          />
        </View>
      </View>
    </View>
  );
};

export default EditExamMarks;
