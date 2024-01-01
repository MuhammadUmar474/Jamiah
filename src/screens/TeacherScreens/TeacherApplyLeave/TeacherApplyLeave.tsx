import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {format} from 'date-fns';

import ButtonComp from '../../../components/Button/ButtonComp';
import {Text16, Text18} from '../../../components/Text';
import styles from './Styles';
import {backArrow} from '../../../shared/icons';
import {ApplyLeavesAction, LeavesAction} from '../../../redux/actions/Leaves';
import DropDownPick from '../../../components/DropDownPicker/DropDownPicker';
import DateComp from '../../../components/DateComp/DateComp';
import AppLoader from '../../../components/AppLoader/AppLoader';
import {COLORS} from '../../../shared/themes';
import darkStyles from './DarkStyles';

const TeacherApplyLeave = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  const [selectedDateFromError, setSelectedDateFromError] = useState({
    error: false,
    msg: '',
  });
  const [selectedDateToError, setSelectedDateToError] = useState({
    error: false,
    msg: '',
  });
  const [seletedTypeError, setSeletedTypeError] = useState({
    error: false,
    msg: '',
  });
  const [reasonError, setReasonError] = useState({error: false, msg: ''});

  const [reason, setReason] = useState('');
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);

  const [openLeaveType, setOpenLeaveType] = useState(false);
  const [valueLeaveType, setValueLeaveType] = useState(null);

  const leave_types =
    useSelector((state: any) => state?.leavesReducer?.leaveTypes) || [];

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const leaveTypesData = leave_types?.map((data: any) => {
    return {
      label: data?.value,
      value: data?.key,
    };
  });

  const onSubmitLeave = () => {
    if (!selectedDateFrom) {
      setSelectedDateFromError({
        error: true,
        msg: 'Please select from date',
      });
      if (!selectedDateTo) {
        setSelectedDateToError({error: true, msg: 'Please select to date'});
      }
      if (!valueLeaveType) {
        setSeletedTypeError({error: true, msg: 'Please select leave status'});
      }
      if (!reason) {
        setReasonError({error: true, msg: 'Please enter reason'});
      }

      return;
    }
    // @ts-ignore
    if (selectedDateFrom > selectedDateTo) {
      setSelectedDateFromError({
        error: true,
        msg: 'Select from date must be less than Select to date',
      });
      return;
    }

    if (!selectedDateTo) {
      setSelectedDateToError({error: true, msg: 'Please select to date'});
      if (!valueLeaveType) {
        setSeletedTypeError({error: true, msg: 'Please select leave status'});
      }
      if (!reason) {
        setReasonError({error: true, msg: 'Please enter reason'});
      }
      return;
    }
    if (!valueLeaveType) {
      setSeletedTypeError({error: true, msg: 'Please select leave status'});
      if (!reason) {
        setReasonError({error: true, msg: 'Please enter reason'});
      }

      return;
    }
    if (!reason) {
      setReasonError({error: true, msg: 'Please enter reason'});
      return;
    }
    dispatch(
      ApplyLeavesAction(
        selectedDateFrom,
        selectedDateTo,
        valueLeaveType,
        reason,
        successCall,
      ),
    );
  };

  const newDate = new Date();
  const CURRENT_DATE = format(newDate, 'yyyy-MM-dd');

  const successCall = () => {
    setReason('');
    setValueLeaveType(null);
    setSelectedDateFrom(null);
    setSelectedDateTo(null);
    dispatch(LeavesAction());
    navigation.navigate('Teacher-Leaves');
  };

  const onSelectDateFrom = (selectedDate: any) => {
    setSelectedDateFrom(selectedDate);
    setSelectedDateFromError({error: false, msg: ''});
  };
  const onSelectDateTo = (selectedDate: any) => {
    setSelectedDateTo(selectedDate);
    setSelectedDateToError({error: false, msg: ''});
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
            <Text18 textStyle={{...styles.classesTxt, color: COLORS.black}}>
              Apply Leave
            </Text18>
          </View>
        </View>
      </View>
      <ScrollView
        style={{marginHorizontal: wp('5%')}}
        showsVerticalScrollIndicator={false}>
        <View style={{zIndex: -1}}>
          <DateComp
            onDateSelect={onSelectDateFrom}
            DateName="From Date"
            minDate={CURRENT_DATE}
            DateStyle={{color: appMode === 'DARK' && COLORS.white}}
          />
        </View>
        {selectedDateFromError.error && (
          <Text style={styles.errMsg}>{selectedDateFromError.msg}</Text>
        )}
        <View style={{zIndex: -2}}>
          <DateComp
            onDateSelect={onSelectDateTo}
            DateName="To Date"
            minDate={CURRENT_DATE}
            DateStyle={{color: appMode === 'DARK' && COLORS.white}}
          />
        </View>
        {selectedDateToError.error && (
          <Text style={styles.errMsg}>{selectedDateToError.msg}</Text>
        )}

        <View>
          <Text16>Leave Type</Text16>
          <View style={{marginTop: hp('1%')}}>
            <DropDownPick
              open={openLeaveType}
              value={valueLeaveType}
              items={leaveTypesData}
              setOpen={setOpenLeaveType}
              setValue={(value: any) => {
                setValueLeaveType(value);
                setSeletedTypeError({error: false, msg: ''});
              }}
            />
          </View>
        </View>
        {seletedTypeError.error && (
          <Text style={{...styles.errMsg, marginTop: hp('0.5%')}}>
            {seletedTypeError.msg}
          </Text>
        )}

        <View style={{marginTop: hp('2%'), zIndex: -1}}>
          <Text16>Reason</Text16>

          <View style={styles.descriptionView}>
            <TextInput
              multiline
              maxLength={255}
              editable={true}
              placeholder="Add a Reason (Max length 255 Characters)"
              // @ts-ignore
              placeholderTextColor={appMode === 'DARK' && COLORS.black}
              style={{
                padding: 5,
                color: COLORS.black,
                flex: Platform.OS === 'ios' ? 1 : 0,
              }}
              value={reason}
              onChangeText={value => {
                setReason(value), setReasonError({error: false, msg: ''});
              }}
            />
          </View>
          {reasonError.error && (
            <Text style={styles.errMsg}>{reasonError.msg}</Text>
          )}

          <ButtonComp
            btnName={
              isLoading ? (
                <AppLoader size={'small'} color={COLORS.white} />
              ) : (
                'Add'
              )
            }
            onPress={onSubmitLeave}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TeacherApplyLeave;
