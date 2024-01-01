import React, {useState, useEffect} from 'react';
import {View, ListRenderItemInfo, RefreshControl} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {Text14Bold, Text16, Text18Bold} from '../../../components/Text';
import styles from './Styles';
import TimeTableCard from '../../../components/TimeTableCard/TimeTableCard';
import ItemsList from '../../../components/ItemsList/ItemsList';

import {timeTableAction} from '../../../redux/actions/myTimeTable';
import AppLoader from '../../../components/AppLoader/AppLoader';
import {COLORS} from '../../../shared/themes';
import ClearfilterBtn from '../../../components/ClearfilterBtn/ClearfilterBtn';
import Header from '../../../components/Header/Header';
import DropDownPick from '../../../components/DropDownPicker/DropDownPicker';
import darkStyles from './DarkStyles';

const TimtTable = () => {
  const dispatch = useDispatch();
  const CURRENT_DAY = new Date().toLocaleDateString('en-US', {weekday: 'long'});

  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  const [filter, setFilter] = useState(false);
  const [openDay, setOpenDay] = useState(false);
  const [valueDay, setValueDay] = useState(null);

  const std_timeTable =
    useSelector((state: any) => state?.myTimeTableReducer?.timeTable) || {};

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const class_weekDays = [
    {value: '1', label: 'Monday'},
    {value: '2', label: 'Tuesday'},
    {value: '3', label: 'Wednesday'},
    {value: '4', label: 'Thursday'},
    {value: '5', label: 'Friday'},
    {value: '6', label: 'Saturday'},
  ];

  const onClearFilters = () => {
    setFilter(false);
    setValueDay(null);
  };

  const pullToRefresh = () => {
    dispatch(timeTableAction(valueDay));
  };

  useEffect(() => {
    dispatch(timeTableAction(valueDay));
  }, [valueDay]);

  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={styles.topContainer}>
        <Header name="Timetable" onFilterPress={() => setFilter(!filter)} />
        {filter ? (
          <View style={{marginTop: hp('1%')}}>
            <View
              style={{
                marginHorizontal: wp('5%'),
              }}>
              <Text16
                textStyle={{
                  fontFamily: 'Poppins-Medium',
                  color: appMode === 'DARK' && COLORS.black,
                }}>
                Day
              </Text16>
              <View style={{marginTop: hp('1%')}}>
                <DropDownPick
                  open={openDay}
                  value={valueDay}
                  items={class_weekDays}
                  setOpen={setOpenDay}
                  setValue={(value: any) => {
                    setValueDay(value);
                  }}
                />
              </View>
            </View>
            <ClearfilterBtn
              styleBtn={{marginTop: hp('2%')}}
              onPress={onClearFilters}
            />
          </View>
        ) : null}
      </View>
      <Text18Bold
        textStyle={{
          marginHorizontal: wp('5%'),
          marginTop: hp('3%'),
          zIndex: -1,
        }}>
        {std_timeTable?.day}
      </Text18Bold>
      {isLoading ? (
        <AppLoader
          styleLoader={{marginTop: hp('30%')}}
          color={COLORS.primary}
          size={'large'}
        />
      ) : (
        <View style={{zIndex: -1}}>
          {std_timeTable?.calendarData?.length > 0 ? (
            <View
              style={{
                height: hp('76%'),
                marginBottom: hp('2.5%'),
              }}>
              <View
                style={{
                  marginTop: hp('3%'),
                  flexDirection: 'row',
                  marginLeft: wp('8%'),
                }}>
                <Text14Bold textStyle={{width: wp('30%')}}>Subject</Text14Bold>
                <Text14Bold textStyle={{width: wp('40%')}}>Teacher</Text14Bold>
                <Text14Bold textStyle={{width: wp('30%')}}>Time</Text14Bold>
              </View>
              <ItemsList
                showsVerticalScrollIndicator={false}
                data={std_timeTable?.calendarData}
                renderItem={({item}: ListRenderItemInfo<[]>) => (
                  <TimeTableCard item={item} />
                )}
                refreshControl={
                  <RefreshControl
                    onRefresh={pullToRefresh}
                    refreshing={isLoading}
                    tintColor={COLORS.white}
                  />
                }
              />
            </View>
          ) : (
            <View style={styles.noClassView}>
              <Text18Bold>
                {std_timeTable?.day
                  ? 'NO RESULT FOUND'
                  : 'YOU ARE NOT ENROLLED IN ANY CLASS'}
              </Text18Bold>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default TimtTable;
