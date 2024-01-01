import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';

import {Text14, Text16, Text20} from '../../../components/Text';
import styles from './Styles';
import {backArrow} from '../../../shared/icons';
import {
  addExamAction,
  getClassSubjectsAction,
} from '../../../redux/actions/exam';
import DateComp from '../../../components/DateComp/DateComp';
import ButtonComp from '../../../components/Button/ButtonComp';
import AppLoader from '../../../components/AppLoader/AppLoader';
import {COLORS} from '../../../shared/themes';
import {loadingAction} from '../../../redux/actions/loading';
import {ToastMessage} from '../../../utils/toastMessage';
import DropDownPick from '../../../components/DropDownPicker/DropDownPicker';
import darkStyles from './DarkStyles';

const EditTeacherExam = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const dispatch = useDispatch();
  const currentExamdata = route?.params?.currentExam;

  const newDate = new Date();
  const CURRENT_DATE = format(newDate, 'yyyy-MM-dd');

  const [openClass, setOpenClass] = useState(false);
  const [valueClass, setValueClass] = useState(currentExamdata?.class_id);
  const [selectedClassError, setSelectedClassError] = useState({
    error: false,
    msg: '',
  });

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const classTecaherClasses =
    useSelector((state: any) => state?.examReducer?.teacher_classes) || [];

  const classData = classTecaherClasses?.map((data: any) => {
    return {
      label: data?.value,
      value: data?.key,
    };
  });

  const [openSubject, setOpenSubject] = useState(false);
  const [valueSubject, setValueSubject] = useState(currentExamdata?.subject_id);
  const [selectedSubjectError, setSelectedSubjectError] = useState({
    error: false,
    msg: '',
  });

  const subjects =
    useSelector((state: any) => state?.examReducer?.subjects) || [];

  const subjectsData = subjects?.map((data: any) => {
    return {
      label: data?.value,
      value: data?.key,
    };
  });

  const [openExamType, setOpenExamType] = useState(false);
  const [valueExamType, setValueExamType] = useState(
    currentExamdata?.exam_type_id,
  );
  const [selectedExamTypeError, setSelectedExamTypeError] = useState({
    error: false,
    msg: '',
  });

  const examTypes = useSelector(
    (state: any) => state?.examTypeReducer?.allExamTypes,
  );

  const examTypesData = examTypes?.map((data: any) => {
    return {
      label: data?.name,
      value: data?.id,
    };
  });

  const [name, setName] = useState(currentExamdata?.name);
  const [roomNo, setRoomNo] = useState(currentExamdata?.room);
  const [totalMark, setTotalMark] = useState(
    currentExamdata?.total_mark?.toString(),
  );
  const [fromTime, setFromTime] = useState(currentExamdata?.time_from);
  const [toTime, setToTime] = useState(currentExamdata?.time_to);
  const [nameError, setNameError] = useState({
    error: false,
    msg: '',
  });
  const [roomNoError, setroomNoError] = useState({
    error: false,
    msg: '',
  });
  const [totalMarkError, setTotalMarkError] = useState({
    error: false,
    msg: '',
  });
  const [fromTimeError, setfromTimeError] = useState({
    error: false,
    msg: '',
  });
  const [toTimeError, setToTimeError] = useState({
    error: false,
    msg: '',
  });

  const [selectedDate, setSelectedDate] = useState({});
  const [selectedDateError, setSelectedDateError] = useState({
    error: false,
    msg: '',
  });

  const teacher_classes =
    useSelector((state: any) => state?.examReducer?.teacher_classes) || [];

  const errors = useSelector((state: any) => state?.examReducer?.errors) || {};

  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  const onSelectDate = (selectedDate: any) => {
    setSelectedDate(selectedDate);
    setSelectedDateError({
      error: false,
      msg: '',
    });
  };

  useEffect(() => {
    if (teacher_classes?.length > 0) {
      dispatch(getClassSubjectsAction(valueClass));
    }
  }, [valueClass]);

  const onSubmit = () => {
    if (!valueClass) {
      setSelectedClassError({
        error: true,
        msg: 'Please Select Class!',
      });
      return;
    }

    if (!valueSubject) {
      setSelectedSubjectError({error: true, msg: 'Please Select Subject!'});
      return;
    }

    if (!name) {
      setNameError({
        error: true,
        msg: 'Please Enter Name',
      });
      return;
    }

    if (!valueExamType) {
      setSelectedExamTypeError({
        error: true,
        msg: 'Please Select Exam Type!',
      });
      return;
    }

    if (!selectedDate) {
      setSelectedDateError({
        error: true,
        msg: 'Please Select Date',
      });
      return;
    }

    if (!fromTime) {
      setfromTimeError({
        error: true,
        msg: 'Please Enter Starting Time',
      });
      return;
    }

    if (!toTime) {
      setToTimeError({
        error: true,
        msg: 'Please Enter Ending Time',
      });
      return;
    }

    if (!roomNo) {
      setroomNoError({
        error: true,
        msg: 'Please Enter Room No',
      });
      return;
    }

    if (!totalMark) {
      setTotalMarkError({
        error: true,
        msg: 'Please Enter Total Marks',
      });
      return;
    }

    dispatch(loadingAction());

    dispatch(
      addExamAction(
        valueClass,
        valueSubject,
        name,
        valueExamType,
        // @ts-ignore
        selectedDate,
        fromTime,
        toTime,
        roomNo,
        totalMark,
        successCall,
        currentExamdata?.id,
      ),
    );
  };

  const successCall = () => {
    navigation.navigate('Teacher-Exams');
    ToastMessage('Exam Added Succesfully', 3000);
  };

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
                marginLeft: wp('2%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Edit Exam
            </Text20>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: hp('2%'),
        }}>
        <View style={{marginHorizontal: wp('5%')}}>
          <Text16>Class</Text16>
          <View style={{marginTop: hp('1%')}}>
            <DropDownPick
              label="Select"
              open={openClass}
              value={valueClass}
              items={classData}
              setOpen={setOpenClass}
              setValue={(value: any) => {
                setValueClass(value);
                setSelectedClassError({
                  error: false,
                  msg: '',
                });
              }}
            />
          </View>

          {selectedClassError.error && (
            <Text14 style={styles.errMsg}>{selectedClassError.msg}</Text14>
          )}
        </View>

        <View
          style={{marginTop: hp('2%'), marginHorizontal: wp('5%'), zIndex: -1}}>
          <Text16>Subject</Text16>
          <View style={{marginTop: hp('1%')}}>
            <DropDownPick
              open={openSubject}
              value={valueSubject}
              items={subjectsData}
              setOpen={setOpenSubject}
              setValue={(value: any) => {
                setValueSubject(value);
                setSelectedSubjectError({
                  error: false,
                  msg: '',
                });
              }}
            />
          </View>
          {selectedSubjectError.error && (
            <Text14 style={styles.errMsg}>{selectedSubjectError.msg}</Text14>
          )}
        </View>

        <View
          style={{marginTop: hp('2%'), marginHorizontal: wp('5%'), zIndex: -2}}>
          <Text16>Name</Text16>

          <View style={styles.descriptionView}>
            <TextInput
              editable={true}
              maxLength={25}
              style={{
                color: appMode === 'DARK' ? COLORS.black : COLORS.grey,
              }}
              placeholder="Type Here "
              // @ts-ignore
              placeholderTextColor={appMode === 'DARK' && COLORS.black}
              value={name}
              onChangeText={value => {
                setName(value), setNameError({error: false, msg: ''});
              }}
            />
          </View>
          {nameError.error && (
            <Text14 style={styles.errMsg}>{nameError.msg}</Text14>
          )}
        </View>

        <View style={{marginTop: hp('2%'), marginHorizontal: wp('5%')}}>
          <Text16>Exam Type</Text16>
          <View style={{marginTop: hp('1%')}}>
            <DropDownPick
              open={openExamType}
              value={valueExamType}
              items={examTypesData}
              setOpen={setOpenExamType}
              setValue={(value: any) => {
                setValueExamType(value);
                setSelectedExamTypeError({
                  error: false,
                  msg: '',
                });
              }}
            />
          </View>
          {selectedExamTypeError.error && (
            <Text14 style={styles.errMsg}>{selectedExamTypeError.msg}</Text14>
          )}
        </View>

        <View style={{marginHorizontal: wp('5%'), zIndex: -1}}>
          <DateComp
            onDateSelect={onSelectDate}
            DateName="Date"
            // @ts-ignore
            selectedDate={currentExamdata?.exam_date}
            minDate={CURRENT_DATE}
            DateStyle={{color: appMode === 'DARK' && COLORS.white}}
          />
          {selectedDateError.error && (
            <Text style={styles.errMsg}>{selectedDateError.msg}</Text>
          )}
        </View>

        <View
          style={{marginTop: hp('1%'), marginHorizontal: wp('5%'), zIndex: -1}}>
          <Text16>From</Text16>

          <View style={styles.descriptionView}>
            <TextInput
              editable={true}
              placeholder="_ _ : _ _  _ _"
              value={fromTime}
              onChangeText={value => {
                setFromTime(value), setfromTimeError({error: false, msg: ''});
              }}
            />
          </View>
          {fromTimeError.error && (
            <Text14 style={styles.errMsg}>{fromTimeError.msg}</Text14>
          )}
        </View>
        <View
          style={{marginTop: hp('1%'), marginHorizontal: wp('5%'), zIndex: -1}}>
          <Text16>To Time</Text16>

          <View style={styles.descriptionView}>
            <TextInput
              editable={true}
              placeholder="_ _ : _ _  _ _"
              value={toTime}
              onChangeText={value => {
                setToTime(value), setToTimeError({error: false, msg: ''});
              }}
            />
          </View>
          {toTimeError.error && (
            <Text14 style={styles.errMsg}>{toTimeError.msg}</Text14>
          )}
          {errors &&
          errors?.errors &&
          errors?.errors?.time_to &&
          errors?.errors?.time_to[0]?.length > 0 ? (
            <Text14 style={styles.errMsg}>{errors?.errors?.time_to[0]}</Text14>
          ) : null}
        </View>

        <View style={{marginTop: hp('1%'), marginHorizontal: wp('5%')}}>
          <Text16>Room No</Text16>

          <View style={styles.descriptionView}>
            <TextInput
              editable={true}
              keyboardType={'numeric'}
              maxLength={3}
              style={{
                color: appMode === 'DARK' ? COLORS.black : COLORS.grey,
              }}
              placeholder="Room No"
              // @ts-ignore
              placeholderTextColor={appMode === 'DARK' && COLORS.black}
              value={roomNo}
              onChangeText={value => {
                setRoomNo(value), setroomNoError({error: false, msg: ''});
              }}
            />
          </View>
          {roomNoError.error && (
            <Text14 style={styles.errMsg}>{roomNoError.msg}</Text14>
          )}
        </View>

        <View style={{marginTop: hp('1%'), marginHorizontal: wp('5%')}}>
          <Text16>Total Marks</Text16>

          <View style={styles.descriptionView}>
            <TextInput
              editable={true}
              keyboardType={'numeric'}
              maxLength={4}
              style={{
                color: appMode === 'DARK' ? COLORS.black : COLORS.grey,
              }}
              placeholder="Total Mark"
              // @ts-ignore
              placeholderTextColor={appMode === 'DARK' && COLORS.black}
              value={totalMark}
              onChangeText={value => {
                setTotalMark(value), setTotalMarkError({error: false, msg: ''});
              }}
            />
          </View>
          {totalMarkError.error && (
            <Text14 style={styles.errMsg}>{totalMarkError.msg}</Text14>
          )}
          {errors &&
          errors?.errors &&
          errors?.errors?.total_mark &&
          errors?.errors?.total_mark[0]?.length > 0 ? (
            <Text14 style={styles.errMsg}>
              {errors?.errors?.total_mark[0]}
            </Text14>
          ) : null}
        </View>

        <ButtonComp
          styleBtn={{
            marginHorizontal: wp('5%'),
            bottom: 5,
            backgroundColor: COLORS.green,
          }}
          btnName={
            isLoading ? (
              <AppLoader size={'small'} color={COLORS.white} />
            ) : (
              'Update Exam'
            )
          }
          onPress={() => onSubmit()}
        />
      </ScrollView>
    </View>
  );
};

export default EditTeacherExam;
