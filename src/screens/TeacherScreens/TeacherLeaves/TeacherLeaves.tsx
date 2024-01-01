import React, {useState, useEffect} from 'react';
import {View, ListRenderItemInfo} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {Text14Bold, Text16, Text18Bold} from '../../../components/Text';
import styles from './Styles';
import ItemsList from '../../../components/ItemsList/ItemsList';
import StudentLeavesCard from '../../../components/StudentLeaves/StudentLeavesCard';
import AppLoader from '../../../components/AppLoader/AppLoader';
import {COLORS} from '../../../shared/themes';
import {
  FilteredLeavesAction,
  LeavesAction,
} from '../../../redux/actions/Leaves';
import Header from '../../../components/Header/Header';
import ClearfilterBtn from '../../../components/ClearfilterBtn/ClearfilterBtn';
import DropDownPick from '../../../components/DropDownPicker/DropDownPicker';
import DateComp from '../../../components/DateComp/DateComp';
import AddBtn from '../../../components/AddBtn/AddBtn';
import ShowLeaveStatus from '../../../components/ShowLeaveStatus/ShowLeaveStatus';
import darkStyles from './DarkStyles';

const TeacherLeaves = ({navigation}: {navigation: any}) => {
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

  const leave_types =
    useSelector((state: any) => state?.leavesReducer?.leaveTypes) || [];

  const leaveTypesData = leave_types?.map((data: any) => {
    return {
      label: data?.value,
      value: data?.key,
    };
  });

  const [openLeaveType, setOpenLeaveType] = useState(false);
  const [valueLeaveType, setValueLeaveType] = useState(null);

  const onClearFilters = () => {
    setFilter(false);
    setValueLeaveType(null);
    setSelectedDateFrom(null);
    setSelectedDateTo(null);
  };

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
    if (valueLeaveType || selectedDateFrom || selectedDateTo) {
      dispatch(
        FilteredLeavesAction(valueLeaveType, selectedDateFrom, selectedDateTo),
      );
    }
  }, [valueLeaveType, selectedDateFrom, selectedDateTo]);

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    setPagination(true);
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
          <View style={{marginTop: hp('1%'), marginHorizontal: wp('5%')}}>
            <View>
              <Text16
                textStyle={{
                  fontFamily: 'Poppins-Medium',
                  color: appMode === 'DARK' && COLORS.black,
                }}>
                Leave Type
              </Text16>
              <View style={{marginTop: hp('1%')}}>
                <DropDownPick
                  open={openLeaveType}
                  value={valueLeaveType}
                  items={leaveTypesData}
                  setOpen={setOpenLeaveType}
                  setValue={(value: any) => {
                    setValueLeaveType(value);
                  }}
                />
              </View>
            </View>

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
                  valueLeaveType || selectedDateFrom || selectedDateTo
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
                {(valueLeaveType || selectedDateFrom || selectedDateTo) &&
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
                marginTop: filter ? hp('20%') : hp('30%'),
              }}>
              <Text18Bold>NO RESULT FOUND</Text18Bold>
            </View>
          )}
        </View>
      )}
      <AddBtn onPress={() => navigation.navigate('Teacher-Apply-Leave')} />
    </View>
  );
};

export default TeacherLeaves;
