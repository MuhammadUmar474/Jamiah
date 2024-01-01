import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {Text14, Text16, Text20} from '../../../components/Text';
import styles from './Styles';
import {backArrow} from '../../../shared/icons';
import DropDownPick from '../../../components/DropDownPicker/DropDownPicker';
import ButtonComp from '../../../components/Button/ButtonComp';
import AppLoader from '../../../components/AppLoader/AppLoader';
import {COLORS} from '../../../shared/themes';
import {ToastMessage} from '../../../utils/toastMessage';
import {
  addCurriculumAction,
  getMainHeadingsAction,
  getSubHeadAction,
} from '../../../redux/actions/Curriculum';

const AddCurriculum = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  const [openGrade, setOpenGrade] = useState(false);
  const [valueGrade, setValueGrade] = useState(null);
  const [selectedGradeError, setSelectedGradeError] = useState({
    error: false,
    msg: '',
  });

  const [openSubject, setOpenSubject] = useState(false);
  const [valueSubject, setValueSubject] = useState(null);
  const [selectedSubjectError, setSelectedSubjectError] = useState({
    error: false,
    msg: '',
  });

  const [openMCat, setOpenMCat] = useState(false);
  const [valueMCat, setValueMCat] = useState(null);
  const [selectedMCatError, setSelectedMCatError] = useState({
    error: false,
    msg: '',
  });

  const [openSCat, setOpenSCat] = useState(false);
  const [valueSCat, setValueSCat] = useState(null);
  const [selectedSCatError, setSelectedSCatError] = useState({
    error: false,
    msg: '',
  });

  const [title, setTitle] = useState('');
  const [titleError, settitleError] = useState({
    error: false,
    msg: '',
  });

  const [description, setDescription] = useState('');

  const curriculum =
    useSelector((state: any) => state?.curriculumReducer?.subjectsGrades) || {};

  const GradeData = curriculum?.grades?.map((data: any) => {
    return {
      label: data?.name,
      value: data?.id,
    };
  });

  const SubjectData = curriculum?.subjects?.map((data: any) => {
    return {
      label: data?.name,
      value: data?.id,
    };
  });

  const mainHeading =
    useSelector((state: any) => state?.curriculumReducer?.mainHeadings) || [];

  const mainHeadingData = mainHeading?.map((data: any) => {
    return {
      label: data?.name,
      value: data?.id,
    };
  });

  const subHeading =
    useSelector((state: any) => state?.curriculumReducer?.subHeadings) || [];

  const subHeadingData = subHeading?.map((data: any) => {
    return {
      label: data?.name,
      value: data?.id,
    };
  });

  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  const onSubmit = () => {
    if (!valueGrade) {
      setSelectedGradeError({
        error: true,
        msg: 'Please Select Grade!',
      });
      return;
    }

    if (!valueSubject) {
      setSelectedSubjectError({error: true, msg: 'Please Select Subject!'});
      return;
    }

    if (!valueMCat) {
      setSelectedMCatError({error: true, msg: 'Please Select Main Category!'});
      return;
    }
    if (!title) {
      settitleError({error: true, msg: 'Please Add Title!'});
      return;
    }

    dispatch(
      addCurriculumAction(
        title,
        description ? description : '',
        valueGrade,
        valueSubject,
        valueMCat,
        SuccessCall,
      ),
    );
  };

  const SuccessCall = () => {
    navigation.goBack();
    ToastMessage('Curriculum Added Succesfully', 3000);
  };

  useEffect(() => {
    if (valueGrade && valueSubject) {
      dispatch(
        getMainHeadingsAction(
          valueGrade ? valueGrade : null,
          valueSubject ? valueSubject : null,
        ),
      );
    }
    dispatch(getSubHeadAction(valueMCat));
  }, [valueGrade, valueSubject]);

  return (
    <View style={styles.container}>
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
              textStyle={{fontFamily: 'Poppins-Medium', marginLeft: wp('2%')}}>
              Add Curriculum
            </Text20>
          </View>
        </View>
      </View>
      <ScrollView
        style={{marginTop: hp('2%'), marginHorizontal: wp('4.5%')}}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text16
            textStyle={{
              fontFamily: 'Poppins-Medium',
            }}>
            Grade
          </Text16>
          <View style={{marginTop: hp('0.5%')}}>
            <DropDownPick
              open={openGrade}
              value={valueGrade}
              items={GradeData}
              setOpen={setOpenGrade}
              setValue={(value: any) => {
                setValueGrade(value);
                setSelectedGradeError({
                  error: false,
                  msg: '',
                });
              }}
            />
          </View>
        </View>
        {selectedGradeError.error && (
          <Text14 style={styles.errMsg}>{selectedGradeError.msg}</Text14>
        )}

        <View style={{marginTop: hp('2%'), zIndex: -1}}>
          <Text16
            textStyle={{
              fontFamily: 'Poppins-Medium',
            }}>
            Subject
          </Text16>
          <View style={{marginTop: hp('0.5%')}}>
            <DropDownPick
              open={openSubject}
              value={valueSubject}
              items={SubjectData}
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
        </View>
        {selectedSubjectError.error && (
          <Text14 style={styles.errMsg}>{selectedSubjectError.msg}</Text14>
        )}

        <View style={{marginTop: hp('2%'), zIndex: -2}}>
          <Text16
            textStyle={{
              fontFamily: 'Poppins-Medium',
            }}>
            Main Category
          </Text16>
          <View style={{marginTop: hp('0.5%')}}>
            <DropDownPick
              open={openMCat}
              value={valueMCat}
              items={mainHeadingData}
              setOpen={setOpenMCat}
              setValue={(value: any) => {
                setValueMCat(value);
                setSelectedMCatError({
                  error: false,
                  msg: '',
                });
              }}
            />
          </View>
        </View>
        {selectedMCatError.error && (
          <Text14 style={styles.errMsg}>{selectedMCatError.msg}</Text14>
        )}

        <View style={{marginTop: hp('2%'), zIndex: -3}}>
          <Text16
            textStyle={{
              fontFamily: 'Poppins-Medium',
            }}>
            Sub Category
          </Text16>
          <View style={{marginTop: hp('0.5%')}}>
            <DropDownPick
              open={openSCat}
              value={valueSCat}
              items={subHeadingData}
              setOpen={setOpenSCat}
              setValue={(value: any) => {
                setValueSCat(value);
                setSelectedSCatError({
                  error: false,
                  msg: '',
                });
              }}
            />
          </View>
        </View>
        {selectedSCatError.error && (
          <Text14 style={styles.errMsg}>{selectedSCatError.msg}</Text14>
        )}

        <View style={{marginTop: hp('2%'), zIndex: -4}}>
          <Text16>Title</Text16>
          <View style={styles.titleView}>
            <TextInput
              editable={true}
              placeholder="Type Here "
              value={title}
              onChangeText={value => {
                setTitle(value), settitleError({error: false, msg: ''});
              }}
            />
          </View>
        </View>
        {titleError.error && (
          <Text14 style={styles.errMsg}>{titleError.msg}</Text14>
        )}

        <View style={{marginTop: hp('2%'), zIndex: -4}}>
          <Text16>Description</Text16>
          <View style={styles.descriptionView}>
            <TextInput
              editable={true}
              placeholder="Type Here "
              value={description}
              onChangeText={value => {
                setDescription(value);
              }}
            />
          </View>
        </View>

        <ButtonComp
          styleBtn={{bottom: 5}}
          btnName={
            isLoading ? (
              <AppLoader size={'small'} color={COLORS.white} />
            ) : (
              'Add'
            )
          }
          onPress={() => onSubmit()}
        />
      </ScrollView>
    </View>
  );
};

export default AddCurriculum;
