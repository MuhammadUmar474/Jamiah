import React, {useEffect, useState} from 'react';
import {View, ListRenderItemInfo} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Text14,
  Text14Bold,
  Text16,
  Text18,
  Text18Bold,
} from '../../../components/Text';
import styles from './Styles';
import ItemsList from '../../../components/ItemsList/ItemsList';
import TeacherCard from '../../../components/TeacherComponents/TeacherCard/TeacherCard';
import StudentCard from '../../../components/TeacherComponents/StudentCard/StudentCard';
import darkStyles from './DarkStyles';
import {COLORS} from '../../../shared/themes';
import Header from '../../../components/Header/Header';
import ClearfilterBtn from '../../../components/ClearfilterBtn/ClearfilterBtn';
import DropDownPicker from '../../../components/DropDownPicker/DropDownPicker';
import {teacherClassesAction} from '../../../redux/actions/TeacherClasses';

const TeacherClasses = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(false);

  // Getting Teacher Classes data From Teacher Classes Reducer
  const teacher_classes = useSelector(
    (state: any) => state?.teacherClassesReducer?.teacherClasses,
  );

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

  const onClearFilters = () => {
    setFilter(false);
    setValueClass(null);
  };

  useEffect(() => {
    if (valueClass) {
      dispatch(teacherClassesAction(valueClass));
    }
  }, [valueClass]);
  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={styles.topContainer}>
        <Header
          backBtn={true}
          name="Classes"
          onFilterPress={() => setFilter(!filter)}
        />
        {filter ? (
          <View style={{marginTop: hp('1%'), marginHorizontal: wp('5%')}}>
            <View style={{zIndex: 1}}>
              <Text16
                textStyle={{
                  fontFamily: 'Poppins-Medium',
                  color: appMode === 'DARK' && COLORS.black,
                }}>
                Class
              </Text16>
              <View style={{marginTop: hp('1%')}}>
                <DropDownPicker
                  label="Select"
                  open={openClass}
                  value={valueClass}
                  items={classData}
                  setOpen={setOpenClass}
                  setValue={setValueClass}
                />
              </View>
            </View>

            <ClearfilterBtn onPress={onClearFilters} />
          </View>
        ) : null}
      </View>
      {teacher_classes?.length < 1 ? (
        <View style={styles.noClassView}>
          <Text18Bold>NO RESULT FOUND</Text18Bold>
        </View>
      ) : (
        <View style={{zIndex: -1}}>
          <View style={styles.infoHeader}>
            <Text14Bold textStyle={{width: wp('30%')}}>Grade</Text14Bold>
            <Text14Bold textStyle={{width: wp('38%')}}>Division</Text14Bold>
            <Text14Bold textStyle={{width: wp('28%')}}>Session</Text14Bold>
          </View>
          <View style={styles.teacherInfoContainer}>
            <Text14
              textStyle={{
                width: wp('35%'),
                textAlign: 'left',
                color: appMode === 'DARK' && COLORS.black,
              }}>
              {teacher_classes?.grades?.name}
            </Text14>
            <Text14
              textStyle={{
                width: wp('27%'),
                textAlign: 'left',
                color: appMode === 'DARK' && COLORS.black,
              }}>
              {teacher_classes?.divisions?.name}
            </Text14>
            <Text14
              textStyle={{
                width: wp('40%'),
                textAlign: 'left',
                color: appMode === 'DARK' && COLORS.black,
              }}>
              {teacher_classes?.academic_sessions?.name}
            </Text14>
          </View>

          <Text18 textStyle={styles.teacherTxt}>Teachers</Text18>
          <View style={{marginTop: hp('1%'), marginLeft: wp('2.5%')}}>
            {teacher_classes?.class_teacher?.length > 0 ? (
              <ItemsList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={teacher_classes?.class_teacher}
                renderItem={({item}: ListRenderItemInfo<[]>) => (
                  <TeacherCard item={item} />
                )}
              />
            ) : (
              <View style={styles.noTecaherView}>
                <Text18Bold>NO RESULT FOUND</Text18Bold>
              </View>
            )}
          </View>

          <Text18 textStyle={styles.teacherTxt}>Students</Text18>
          <View style={{marginTop: hp('1%'), marginLeft: wp('2.5%')}}>
            {teacher_classes?.class_student?.length > 0 ? (
              <ItemsList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={teacher_classes?.class_student}
                renderItem={({item}: ListRenderItemInfo<[]>) => (
                  <StudentCard item={item} />
                )}
              />
            ) : (
              <View style={styles.noTecaherView}>
                <Text18Bold>NO RESULT FOUND</Text18Bold>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default TeacherClasses;
