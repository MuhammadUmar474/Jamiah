import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Image,
  ListRenderItemInfo,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';

import ButtonComp from '../../../components/Button/ButtonComp';
import {Text14, Text16, Text20} from '../../../components/Text';
import styles from './Styles';
import {backArrow} from '../../../shared/icons';
import AppLoader from '../../../components/AppLoader/AppLoader';
import {COLORS} from '../../../shared/themes';
import DropDownPick from '../../../components/DropDownPicker/DropDownPicker';
import {getTeacherClassesAction} from '../../../redux/actions/exam';
import {getExamTypesAction} from '../../../redux/actions/examTypeCrud';
import DateComp from '../../../components/DateComp/DateComp';
import {
  getAllStudentsAction,
  getExamReportAction,
  selectAllStdAction,
  unSelectAllStdAction,
} from '../../../redux/actions/examReport';
import StdListCard from '../../../components/StdListCard/StdListCard';
import ItemsList from '../../../components/ItemsList/ItemsList';
import darkStyles from './DarkStyles';

const ExamsReport = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const [showResult, setShowResult] = useState(false);

  const [openClass, setOpenClass] = useState(false);
  const [valueClass, setValueClass] = useState(null);
  const [selectedClassError, setSelectedClassError] = useState({
    error: false,
    msg: '',
  });

  const classTecaherClasses =
    useSelector((state: any) => state?.examReducer?.teacher_classes) || [];

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const classData = classTecaherClasses?.map((data: any) => {
    return {
      label: data?.value,
      value: data?.key,
    };
  });

  const [openExamType, setOpenExamType] = useState(false);
  const [valueExamType, setValueExamType] = useState(null);
  const [examTypeError, setExamTypeError] = useState({
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

  const classStudents =
    useSelector((state: any) => state?.examReportReducer?.classStudents) || [];

  const checked = classStudents?.map((data: any) => {
    return data?.checked;
  });
  const checkAll = checked.every((i: any) => i === true);
  const stdListForReport = classStudents
    .filter((i: any) => i.checked === true)
    .map((i: any) => i.id);
  const [isLoading, setIsLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const [selectedDate, setSelectedDate] = useState({});
  const [selectedDateError, setSelectedDateError] = useState({
    error: false,
    msg: '',
  });

  const onSelectDateFrom = (selectedDate: any) => {
    setSelectedDate(selectedDate);
    setSelectedDateError({
      error: false,
      msg: '',
    });
  };

  const OnViewReport = () => {
    if (!valueClass) {
      setSelectedClassError({
        error: true,
        msg: 'Please Select Class!',
      });
      setExamTypeError({
        error: true,
        msg: 'Please Select Exam Type!',
      });
      setSelectedDateError({
        error: true,
        msg: 'Please Select Date',
      });
      return;
    }

    if (!valueExamType) {
      setExamTypeError({
        error: true,
        msg: 'Please Select Exam Type!',
      });
      setSelectedDateError({
        error: true,
        msg: 'Please Select Date',
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

    dispatch(
      getExamReportAction(
        valueClass,
        valueExamType,
        selectedDate,
        stdListForReport,
      ),
    );
  };

  useEffect(() => {
    if (checkAll) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
    dispatch(getTeacherClassesAction());
    dispatch(getExamTypesAction());
  }, [classStudents?.length, checkAll]);

  useEffect(() => {
    dispatch(getAllStudentsAction(valueClass));
  }, [valueClass]);

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
              Exams Report
            </Text20>
          </View>
        </View>
      </View>

      <View style={{marginTop: hp('2%'), marginHorizontal: wp('4.9%')}}>
        <View>
          <Text16>Select Class</Text16>
          <View>
            <DropDownPick
              label="Select"
              open={openClass}
              value={valueClass}
              items={classData}
              setOpen={setOpenClass}
              setValue={(value: any) => {
                setValueClass(value),
                  setSelectedClassError({
                    error: false,
                    msg: '',
                  });
              }}
            />
          </View>
        </View>
        {selectedClassError.error && (
          <Text14 style={styles.errMsg}>{selectedClassError.msg}</Text14>
        )}

        <View style={{marginTop: hp('1%'), zIndex: -1}}>
          <Text16>Exam Type</Text16>
          <View style={{marginTop: hp('0.5%%')}}>
            <DropDownPick
              open={openExamType}
              value={valueExamType}
              items={examTypesData}
              setOpen={setOpenExamType}
              setValue={(value: any) => {
                setValueExamType(value),
                  setExamTypeError({
                    error: false,
                    msg: '',
                  });
              }}
            />
          </View>
        </View>
        {examTypeError.error && (
          <Text14 style={styles.errMsg}>{examTypeError.msg}</Text14>
        )}

        <View style={{zIndex: -2}}>
          <DateComp
            onDateSelect={onSelectDateFrom}
            DateName="Date"
            DateStyle={{color: appMode === 'DARK' && COLORS.white}}
          />
        </View>
        {selectedDateError.error && (
          <Text14 style={styles.errMsg}>{selectedDateError.msg}</Text14>
        )}

        <View
          style={{
            marginTop: hp('1%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: -2,
          }}>
          <Text16>Select Students</Text16>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: -2,
            }}>
            {Platform.OS == 'ios' ? (
              <CheckBox
                style={styles.boxStyle}
                boxType="square"
                value={selectAll}
                uncheckedColor={COLORS.normal_grey}
                onAnimationType="fill"
                ofAnimationType="fade"
                //@ts-ignore
                tintColors={COLORS.primary}
                onTintColor={COLORS.primary}
                onCheckColor={COLORS.primary}
                onValueChange={() => {
                  setSelectAll(!selectAll);
                  setShowResult(false);
                  if (selectAll) {
                    dispatch(unSelectAllStdAction(classStudents));
                  } else dispatch(selectAllStdAction(classStudents));
                }}
              />
            ) : (
              <CheckBox
                style={{marginTop: hp('0.5%')}}
                tintColors={{true: COLORS.primary, false: COLORS.normal_grey}}
                disabled={false}
                value={selectAll}
                onValueChange={() => {
                  setSelectAll(!selectAll);
                  setShowResult(false);
                  if (selectAll) {
                    dispatch(unSelectAllStdAction(classStudents));
                  } else dispatch(selectAllStdAction(classStudents));
                }}
              />
            )}
            <Text16
              textStyle={{
                marginLeft: wp('2%'),
                marginTop: hp('1%'),
                fontFamily: 'Poppins-Medium',
                zIndex: -2,
              }}>
              Select All
            </Text16>
          </View>
        </View>
        <View style={{zIndex: -2}}>
          <TouchableOpacity
            // @ts-ignore
            style={{
              ...styles.dropDown,
              borderWidth: 1,
              borderColor: appMode === 'DARK' && COLORS.white,
            }}
            onPress={() => setShowResult(!showResult)}>
            <Text14>Select </Text14>
            <FontAwesome
              name={showResult ? 'angle-up' : 'angle-down'}
              size={20}
            />
          </TouchableOpacity>
          {showResult ? (
            <View
              // @ts-ignore
              style={{
                ...styles.dropDownItems,
                borderWidth: 1,
                borderColor: appMode === 'DARK' && COLORS.white,
              }}>
              <ItemsList
                showsVerticalScrollIndicator={false}
                data={classStudents}
                extraData={classStudents}
                renderItem={({item}: ListRenderItemInfo<[]>) => (
                  <StdListCard item={item} />
                )}
              />
            </View>
          ) : null}

          <View style={{marginTop: hp('5%')}}>
            <ButtonComp
              btnName={
                isLoading ? (
                  <AppLoader size={'small'} color={COLORS.white} />
                ) : (
                  'View Report'
                )
              }
              onPress={OnViewReport}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExamsReport;
