import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DocumentPickerHandler from 'react-native-document-picker';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';

import {Text14, Text16, Text20} from '../../../../components/Text';
import styles from './Styles';
import {backArrow} from '../../../../shared/icons';
import {getClassSubjectsAction} from '../../../../redux/actions/exam';
import DateComp from '../../../../components/DateComp/DateComp';
import ButtonComp from '../../../../components/Button/ButtonComp';
import AppLoader from '../../../../components/AppLoader/AppLoader';
import {COLORS} from '../../../../shared/themes';
import {loadingAction} from '../../../../redux/actions/loading';
import DropDownPick from '../../../../components/DropDownPicker/DropDownPicker';
import darkStyles from './DarkStyles';
import {addAssignmentAction} from '../../../../redux/actions/assignment';

const AddAssignment = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  const newDate = new Date();
  const CURRENT_DATE = format(newDate, 'yyyy-MM-dd');

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

  const [openSubject, setOpenSubject] = useState(false);
  const [valueSubject, setValueSubject] = useState(null);
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

  const [name, setName] = useState('');
  const [totalMark, setTotalMark] = useState('');
  const [file, setFile] = useState({});
  const [base64File, setBase64File] = useState('');
  const [fileError, setFileError] = useState({
    error: false,
    msg: '',
  });

  const [description, setDescription] = useState('');

  const [nameError, setNameError] = useState({
    error: false,
    msg: '',
  });
  const [totalMarkError, setTotalMarkError] = useState({
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
      if (!valueSubject) {
        setSelectedSubjectError({error: true, msg: 'Please Select Subject!'});
      }
      if (!selectedDate) {
        setSelectedDateError({
          error: true,
          msg: 'Please Select Date',
        });
      }

      if (!name) {
        setNameError({
          error: true,
          msg: 'Please Enter Name',
        });
      }

      if (!totalMark) {
        setTotalMarkError({
          error: true,
          msg: 'Please Enter Total Marks',
        });
      }
      if (Object.keys(file).length === 0) {
        setFileError({
          error: true,
          msg: 'Please Choose File',
        });
      }
      return;
    }

    if (!valueSubject) {
      setSelectedSubjectError({error: true, msg: 'Please Select Subject!'});
      if (!name) {
        setNameError({
          error: true,
          msg: 'Please Enter Name',
        });
      }

      if (!totalMark) {
        setTotalMarkError({
          error: true,
          msg: 'Please Enter Total Marks',
        });
      }
      if (Object.keys(file).length === 0) {
        setFileError({
          error: true,
          msg: 'Please Choose File',
        });
      }
      return;
    }

    if (!name) {
      setNameError({
        error: true,
        msg: 'Please Enter Name',
      });

      if (!totalMark) {
        setTotalMarkError({
          error: true,
          msg: 'Please Enter Total Marks',
        });
      }
      if (Object.keys(file).length === 0) {
        setFileError({
          error: true,
          msg: 'Please Choose File',
        });
      }
      return;
    }

    if (!selectedDate) {
      setSelectedDateError({
        error: true,
        msg: 'Please Select Date',
      });

      if (!totalMark) {
        setTotalMarkError({
          error: true,
          msg: 'Please Enter Total Marks',
        });
      }
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
      addAssignmentAction(
        valueClass,
        valueSubject,
        name,
        selectedDate,
        totalMark,
        base64File,
        description,
        successCall,
      ),
    );
  };

  const successCall = () => {
    navigation.goBack();
  };
  const onDocumentSelect = async () => {
    try {
      const file = await DocumentPickerHandler.pick({
        type: [DocumentPickerHandler.types.allFiles],
      });
      setFile(file[0]);
      RNFetchBlob.fs
        .readFile(file[0].uri, 'base64')
        .then(data => {
          setBase64File(data);
        })
        .catch(err => {
          console.log('Error while converting file to base64', err);
        });
      setFileError({
        error: false,
        msg: '',
      });
    } catch (error) {
      console.log('onDocumentSelect error', error);
    }
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
              Add Assignment
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
          style={{
            marginHorizontal: wp('5%'),
            zIndex: -2,
            marginTop: hp('0.5%'),
          }}>
          <DateComp
            onDateSelect={onSelectDate}
            DateName="Deadline"
            minDate={CURRENT_DATE}
            DateStyle={{color: appMode === 'DARK' && COLORS.white}}
          />
          {selectedDateError.error && (
            <Text style={styles.errMsg}>{selectedDateError.msg}</Text>
          )}
        </View>

        <View
          style={{
            marginTop: hp('1%'),
            marginHorizontal: wp('5%'),
            zIndex: -2,
          }}>
          <Text16>Name</Text16>

          <View style={styles.descriptionView}>
            <TextInput
              editable={true}
              maxLength={25}
              style={{
                color: appMode === 'DARK' ? COLORS.black : COLORS.grey,
                marginLeft: wp('3%'),
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

        <View style={{marginTop: hp('1%'), marginHorizontal: wp('5%')}}>
          <Text16>Marks</Text16>

          <View style={styles.descriptionView}>
            <TextInput
              editable={true}
              keyboardType={'numeric'}
              maxLength={4}
              style={{
                color: appMode === 'DARK' ? COLORS.black : COLORS.grey,
                marginLeft: wp('3%'),
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

        <View
          style={{
            marginTop: hp('1%'),
            marginHorizontal: wp('5%'),
            zIndex: -2,
          }}>
          <Text16>Choose File</Text16>

          <View style={styles.descriptionView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.fileButton}
                onPress={onDocumentSelect}>
                <Text16 textStyle={{color: appMode === 'DARK' && COLORS.black}}>
                  Choose
                </Text16>
              </TouchableOpacity>
              <Text16
                textStyle={{
                  marginLeft: wp('2%'),
                  width: wp('60%'),
                  color: appMode === 'DARK' && COLORS.black,
                }}>
                {Object.keys(file).length === 0
                  ? 'No File Choosen'
                  : // @ts-ignore
                    file?.name}
              </Text16>
            </View>
          </View>
          {fileError.error && (
            <Text14 style={styles.errMsg}>{fileError.msg}</Text14>
          )}
        </View>

        <View style={{marginTop: hp('1%'), marginHorizontal: wp('5%')}}>
          <Text16>Description</Text16>
          <View style={styles.assignmentDescriptionView}>
            <TextInput
              multiline
              editable={true}
              placeholder="Type Here"
              // @ts-ignore
              placeholderTextColor={appMode === 'DARK' && COLORS.black}
              style={{
                padding: 5,
                color: COLORS.black,
                flex: Platform.OS === 'ios' ? 1 : 0,
              }}
              value={description}
              onChangeText={value => {
                setDescription(value);
              }}
            />
          </View>
        </View>

        <ButtonComp
          styleBtn={{marginHorizontal: wp('5%')}}
          btnName={
            isLoading ? (
              <AppLoader size={'small'} color={COLORS.white} />
            ) : (
              'Add Assignment'
            )
          }
          onPress={() => onSubmit()}
        />
      </ScrollView>
    </View>
  );
};

export default AddAssignment;
