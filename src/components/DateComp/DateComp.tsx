import React, {useEffect, useState, memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Calendar} from 'react-native-calendars';

import {Text14, Text16} from '../Text';
import styles from './styles';
import {COLORS} from '../../shared/themes';
import {useSelector} from 'react-redux';

const DateComp = ({
  onDateSelect,
  DateName,
  selectedDate,
  minDate,
  maxDate,
  DateStyle,
}: {
  onDateSelect: any;
  DateName: string;
  selectedDate?: string;
  minDate?: any;
  maxDate?: any;
  DateStyle?: any;
}) => {
  const [showCalendarFrom, setShowCalendarFrom] = useState(false);

  const [selectedDateFrom, setSelectedDateFrom] = useState({
    dateString: selectedDate,
  });

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  useEffect(() => {
    // @ts-ignore
    onDateSelect(selectedDateFrom.dateString);
  }, [selectedDateFrom]);
  return (
    <View style={{marginTop: hp('1.5%')}}>
      <Text16
        textStyle={{
          color: appMode === 'DARK' && COLORS.black,
          ...DateStyle,
        }}>
        {DateName}
      </Text16>
      <TouchableOpacity
        style={styles.calendarContainer}
        onPress={() => {
          setShowCalendarFrom(!showCalendarFrom);
        }}>
        <Text14 textStyle={{color: COLORS.grey}}>
          {selectedDateFrom.dateString
            ? selectedDateFrom.dateString
            : 'Select Date'}
        </Text14>
        <FontAwesome name="calendar" size={20} />
      </TouchableOpacity>

      <View style={{marginTop: hp('1.3%')}}>
        {showCalendarFrom ? (
          <Calendar
            style={styles.calendarStyle}
            initialDate={selectedDate}
            onDayPress={day => {
              setSelectedDateFrom(day), setShowCalendarFrom(false);
            }}
            markedDates={{
              // @ts-ignore
              [selectedDateFrom?.dateString]: {
                selected: true,
                selectedColor: COLORS.primary,
              },
            }}
            minDate={minDate}
            maxDate={maxDate}
          />
        ) : null}
      </View>
    </View>
  );
};

export default memo(DateComp);
