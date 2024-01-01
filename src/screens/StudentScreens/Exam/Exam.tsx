import React, {useEffect, useState} from 'react';
import {View, ListRenderItemInfo} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import ExamsCard from '../../../components/ExamsCard/ExamsCard';
import ItemsList from '../../../components/ItemsList/ItemsList';
import {Text14Bold, Text16, Text18Bold} from '../../../components/Text';
import {
  allExamsAction,
  filteredStdExamsAction,
} from '../../../redux/actions/exam';
import styles from './Styles';
import {COLORS} from '../../../shared/themes';
import AppLoader from '../../../components/AppLoader/AppLoader';
import ShowExamStatus from '../../../components/ShowExamStatus/ShowExamStatus';
import ClearfilterBtn from '../../../components/ClearfilterBtn/ClearfilterBtn';
import Header from '../../../components/Header/Header';
import DateComp from '../../../components/DateComp/DateComp';
import DropDownPick from '../../../components/DropDownPicker/DropDownPicker';
import darkStyles from './DarkStyles';

const Exam = () => {
  const dispatch = useDispatch();

  // Getting Exams From Student Exam Reducer
  const exams = useSelector((state: any) => state?.examReducer?.exams) || [];

  // Getting Filtered Exams from Exam Reducer
  const filtered_exams =
    useSelector((state: any) => state?.examReducer?.filtered_exams) || [];

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const [filter, setFilter] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);

  const [openExamStatus, setOpenExamStatus] = useState(false);
  const [valueExamStatus, setValueExamStatus] = useState(null);

  const exams_status = [
    {value: '1', label: 'Pending'},
    {value: '2', label: 'Taken - Marked'},
    {value: '3', label: 'Taken - Unmarked'},
  ];

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    setPagination(true);
  };

  const onClearFilters = () => {
    setFilter(false);
    setValueExamStatus(null);
    setSelectedDateFrom(null);
    setSelectedDateTo(null);
  };

  const onSelectDateFrom = (selectedDate: any) => {
    setSelectedDateFrom(selectedDate);
  };
  const onSelectDateTo = (selectedDate: any) => {
    setSelectedDateTo(selectedDate);
  };

  // Calling Student Exam Api
  useEffect(() => {
    dispatch(allExamsAction(currentPage, pagination));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    if (currentPage > 1) {
      setPagination(true);
    }
  }, [currentPage]);

  useEffect(() => {
    if (valueExamStatus || selectedDateFrom || selectedDateTo) {
      dispatch(
        filteredStdExamsAction(
          valueExamStatus,
          selectedDateFrom,
          selectedDateTo,
        ),
      );
    }
  }, [valueExamStatus, selectedDateFrom, selectedDateTo]);

  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={styles.topContainer}>
        <Header name="Exams" onFilterPress={() => setFilter(!filter)} />
        {filter ? (
          <View style={{marginTop: hp('1%')}}>
            <View style={{marginHorizontal: wp('5%')}}>
              <Text16
                textStyle={{
                  color: appMode === 'DARK' && COLORS.black,
                }}>
                Exam Status
              </Text16>
              <View style={{marginTop: hp('1%')}}>
                <DropDownPick
                  open={openExamStatus}
                  value={valueExamStatus}
                  items={exams_status}
                  setOpen={setOpenExamStatus}
                  setValue={(value: any) => {
                    setValueExamStatus(value);
                  }}
                />
              </View>
            </View>

            <View style={{marginHorizontal: wp('5%'), zIndex: -1}}>
              <DateComp onDateSelect={onSelectDateFrom} DateName="From Date" />
            </View>

            <View style={{marginHorizontal: wp('5%'), zIndex: -2}}>
              <DateComp onDateSelect={onSelectDateTo} DateName="To Date" />
            </View>
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
          {exams?.length > 0 || filtered_exams?.length > 0 ? (
            <View
              style={{
                height: hp('76%'),
                marginBottom: hp('2.5%'),
              }}>
              <ShowExamStatus />
              <View
                style={{
                  marginTop: hp('1%'),
                  flexDirection: 'row',
                  marginLeft: wp('9%'),
                }}>
                <Text14Bold textStyle={{width: wp('27%')}}>Subject</Text14Bold>
                <Text14Bold textStyle={{width: wp('18%')}}>Time</Text14Bold>
                <Text14Bold textStyle={{width: wp('26%')}}>Date</Text14Bold>
                <Text14Bold textStyle={{width: wp('17%')}}>Marks</Text14Bold>
              </View>

              <ItemsList
                showsVerticalScrollIndicator={false}
                data={
                  valueExamStatus || selectedDateFrom || selectedDateTo
                    ? filtered_exams
                    : exams
                }
                renderItem={({item}: ListRenderItemInfo<[]>) => (
                  <ExamsCard item={item} />
                )}
                keyExtractor={(index: any) => index.id}
                onEndReachedThreshold={0.9}
                onEndReached={loadMoreItem}
              />

              <View>
                {(valueExamStatus || selectedDateFrom || selectedDateTo) &&
                filtered_exams?.length < 1 ? (
                  <View
                    style={{
                      ...styles.noRecordView,
                      marginTop: filter ? hp('-55%') : hp('-40%'),
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
    </View>
  );
};

export default Exam;
