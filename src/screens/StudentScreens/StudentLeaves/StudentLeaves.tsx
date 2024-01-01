import React, {useState, useEffect} from 'react';
import {View, ListRenderItemInfo} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {Text14Bold, Text18Bold} from '../../../components/Text';
import styles from './Styles';
import ItemsList from '../../../components/ItemsList/ItemsList';
import StudentLeavesCard from '../../../components/StudentLeaves/StudentLeavesCard';
import AppLoader from '../../../components/AppLoader/AppLoader';
import {COLORS} from '../../../shared/themes';
import {
  clearLeavesAction,
  FilteredLeavesAction,
  LeavesAction,
} from '../../../redux/actions/Leaves';
import ClearfilterBtn from '../../../components/ClearfilterBtn/ClearfilterBtn';
import Header from '../../../components/Header/Header';
import DateComp from '../../../components/DateComp/DateComp';
import AddBtn from '../../../components/AddBtn/AddBtn';
import ShowLeaveStatus from '../../../components/ShowLeaveStatus/ShowLeaveStatus';
import darkStyles from './DarkStyles';

const StudentLeaves = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  const std_all_leaves =
    useSelector((state: any) => state?.leavesReducer?.allLeaves) || [];

  const std_filtered_leaves =
    useSelector((state: any) => state?.leavesReducer?.filteredLeaves) || [];

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const [filter, setFilter] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);

  useEffect(() => {
    dispatch(LeavesAction(currentPage, pagination));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    if (currentPage > 1) {
      setPagination(true);
    }
  }, [currentPage]);

  useEffect(() => {
    if (selectedDateFrom || selectedDateTo) {
      dispatch(FilteredLeavesAction(selectedDateFrom, selectedDateTo));
    }
  }, [selectedDateFrom, selectedDateTo]);

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    setPagination(true);
  };

  const onClearFilters = () => {
    setFilter(false);
    setSelectedDateFrom(null);
    setSelectedDateTo(null);
  };

  const onSelectDateFrom = (selectedDate: any) => {
    setSelectedDateFrom(selectedDate);
  };
  const onSelectDateTo = (selectedDate: any) => {
    setSelectedDateTo(selectedDate);
  };

  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={styles.topContainer}>
        <Header name="Leaves" onFilterPress={() => setFilter(!filter)} />
        {filter ? (
          <View style={{marginHorizontal: wp('5%'), marginTop: hp('1%')}}>
            <View style={{zIndex: -1}}>
              <DateComp onDateSelect={onSelectDateFrom} DateName="From Date" />
            </View>

            <View style={{zIndex: -2}}>
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
          {std_all_leaves?.length > 0 || std_filtered_leaves.length > 0 ? (
            <View
              style={{
                height: hp('76%'),
                marginBottom: hp('2.5%'),
              }}>
              <ShowLeaveStatus />
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: wp('10%'),
                }}>
                <Text14Bold textStyle={{width: wp('30%')}}>Type</Text14Bold>
                <Text14Bold
                  textStyle={{width: wp('30%'), marginLeft: wp('5%')}}>
                  From
                </Text14Bold>
                <Text14Bold textStyle={{width: wp('30%')}}>To</Text14Bold>
              </View>

              <ItemsList
                showsVerticalScrollIndicator={false}
                data={
                  selectedDateFrom || selectedDateTo
                    ? std_filtered_leaves
                    : std_all_leaves
                }
                renderItem={({item}: ListRenderItemInfo<[]>) => (
                  <StudentLeavesCard item={item} />
                )}
                keyExtractor={(index: any) => index.id}
                onEndReachedThreshold={0.9}
                onEndReached={loadMoreItem}
              />
              <View>
                {(selectedDateFrom || selectedDateTo) &&
                std_filtered_leaves?.length < 1 ? (
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
      <AddBtn
        onPress={() => {
          navigation.navigate('Apply-Leave');
          dispatch(clearLeavesAction());
        }}
      />
    </View>
  );
};

export default StudentLeaves;
