import React, {useEffect, useState} from 'react';
import {View, ListRenderItemInfo, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {Text14Bold, Text16, Text18Bold} from '../../../components/Text';
import {
  allExamsAction,
  filteredExamsAction,
  getClassSubjectsAction,
} from '../../../redux/actions/exam';
import styles from './Styles';
import {COLORS} from '../../../shared/themes';
import AppLoader from '../../../components/AppLoader/AppLoader';
import ItemsList from '../../../components/ItemsList/ItemsList';
import TeacherExamsCard from '../../../components/TeacherComponents/TeacherExamsCard/TeacherExamsCard';
import Header from '../../../components/Header/Header';
import ClearfilterBtn from '../../../components/ClearfilterBtn/ClearfilterBtn';
import AddBtn from '../../../components/AddBtn/AddBtn';
import DropDownPick from '../../../components/DropDownPicker/DropDownPicker';
import DateComp from '../../../components/DateComp/DateComp';
import darkStyles from './DarkStyles';

const TeacherExams = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  // Getting Exams From Student Exam Reducer
  let exams = useSelector((state: any) => state?.examReducer?.exams) || [];

  let filtered_exams =
    useSelector((state: any) => state?.examReducer?.filtered_exams) || [];

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const [openClass, setOpenClass] = useState(false);
  const [valueClass, setValueClass] = useState(null);

  const classTecaherClasses =
    useSelector((state: any) => state?.examReducer?.teacher_classes) || [];

  const classData = classTecaherClasses?.map((data: any) => {
    return {
      label: data?.value,
      value: data?.key,
    };
  });

  const [openSubject, setOpenSubject] = useState(false);
  const [valueSubject, setValueSubject] = useState(null);

  const subjects =
    useSelector((state: any) => state?.examReducer?.subjects) || [];
  const subjectsData = subjects?.map((data: any) => {
    return {
      label: data?.value,
      value: data?.key,
    };
  });

  const [openExamType, setOpenExamType] = useState(false);
  const [valueExamType, setValueExamType] = useState(null);

  const examTypes = useSelector(
    (state: any) => state?.examTypeReducer?.allExamTypes,
  );

  const examTypesData = examTypes?.map((data: any) => {
    return {
      label: data?.name,
      value: data?.id,
    };
  });

  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [pagination, setPagination] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Calling Student Exam Api
  useEffect(() => {
    dispatch(getClassSubjectsAction(valueClass ? valueClass : ''));
    dispatch(allExamsAction(currentPage, pagination));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    if (currentPage > 1) {
      setPagination(true);
    }
  }, [currentPage]);

  useEffect(() => {
    if (valueClass || valueSubject || valueExamType || selectedDate) {
      dispatch(
        filteredExamsAction(
          valueClass ? valueClass : null,
          valueSubject ? valueSubject : null,
          valueExamType ? valueExamType : null,
          selectedDate ? selectedDate : null,
        ),
      );
    }
  }, [valueClass, valueSubject, valueExamType, selectedDate]);

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    setPagination(true);
  };
  const onSelectDate = (selectedDate: any) => {
    setSelectedDate(selectedDate);
  };

  const onClearFilters = () => {
    setFilter(false);
    setValueClass(null);
    setValueSubject(null);
    setValueExamType(null);
    setSelectedDate(null);
  };

  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={styles.topContainer}>
        <Header name="Exams" onFilterPress={() => setFilter(!filter)} />
        {filter ? (
          <View style={{marginTop: hp('1%'), marginHorizontal: wp('5%')}}>
            <View>
              <Text16
                textStyle={{
                  fontFamily: 'Poppins-Medium',
                  color: appMode === 'DARK' && COLORS.black,
                }}>
                Class
              </Text16>
              <View style={{marginTop: hp('1%')}}>
                <DropDownPick
                  label="Select"
                  open={openClass}
                  value={valueClass}
                  items={classData}
                  setOpen={setOpenClass}
                  setValue={setValueClass}
                />
              </View>
            </View>
            <View style={{marginTop: hp('2%'), zIndex: -1}}>
              <Text16
                textStyle={{
                  fontFamily: 'Poppins-Medium',
                  color: appMode === 'DARK' && COLORS.black,
                }}>
                Subject
              </Text16>
              <View style={{marginTop: hp('1%')}}>
                <DropDownPick
                  open={openSubject}
                  value={valueSubject}
                  items={subjectsData}
                  setOpen={setOpenSubject}
                  setValue={setValueSubject}
                />
              </View>
            </View>
            <View style={{marginTop: hp('2%'), zIndex: -2}}>
              <Text16
                textStyle={{
                  color: appMode === 'DARK' && COLORS.black,
                }}>
                Exam Type
              </Text16>
              <View style={{marginTop: hp('1%')}}>
                <DropDownPick
                  open={openExamType}
                  value={valueExamType}
                  items={examTypesData}
                  setOpen={setOpenExamType}
                  setValue={setValueExamType}
                />
              </View>
            </View>

            <ScrollView
              style={{zIndex: -5}}
              showsVerticalScrollIndicator={false}>
              <DateComp onDateSelect={onSelectDate} DateName="Date" />
            </ScrollView>
            <ClearfilterBtn onPress={onClearFilters} />
          </View>
        ) : null}
      </View>

      {isLoading ? (
        <AppLoader
          styleLoader={{marginTop: hp('30%')}}
          color={COLORS.primary}
          size={'large'}
        />
      ) : (
        <View>
          {exams?.length > 0 || filtered_exams.length > 0 ? (
            <View
              style={{
                height: hp('76%'),
                marginBottom: hp('2.5%'),
              }}>
              <View
                style={{
                  marginTop: hp('3%'),
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Text14Bold>Name</Text14Bold>
                <Text14Bold>Date & Time</Text14Bold>
                <Text14Bold>Actions</Text14Bold>
              </View>

              <ItemsList
                showsVerticalScrollIndicator={false}
                data={
                  valueClass || valueSubject || valueExamType || selectedDate
                    ? filtered_exams
                    : exams
                }
                renderItem={({item}: ListRenderItemInfo<[]>) => (
                  <TeacherExamsCard item={item} />
                )}
                keyExtractor={(index: any) => index.id}
                onEndReachedThreshold={0.9}
                onEndReached={loadMoreItem}
              />
              <View>
                {(valueClass ||
                  valueSubject ||
                  valueExamType ||
                  selectedDate) &&
                filtered_exams?.length < 1 ? (
                  <View
                    style={{
                      ...styles.noRecordView,
                      marginTop: filter ? hp('-60%') : hp('-40%'),
                    }}>
                    <Text18Bold>NO RESULT FOUND</Text18Bold>
                  </View>
                ) : null}
              </View>
            </View>
          ) : (
            <View
              style={{
                ...styles.noClassView,
                marginTop: filter ? hp('10%') : hp('30%'),
              }}>
              <Text18Bold>NO RESULT FOUND</Text18Bold>
            </View>
          )}
        </View>
      )}
      <AddBtn onPress={() => navigation.navigate('Add-Exam')} />
    </View>
  );
};

export default TeacherExams;
