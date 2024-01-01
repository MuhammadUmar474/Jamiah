import React, {useEffect, useState} from 'react';
import {View, ListRenderItemInfo} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {Text16, Text18Bold} from '../../../../components/Text';
import styles from './Styles';

import ItemsList from '../../../../components/ItemsList/ItemsList';
import {COLORS} from '../../../../shared/themes';
import AppLoader from '../../../../components/AppLoader/AppLoader';
import darkStyles from './DarkStyles';
import Header from '../../../../components/Header/Header';
import TeacherAssignmentsCard from '../../../../components/TeacherAssignmentsCard/TeacherAssignmentsCard';
import AddBtn from '../../../../components/AddBtn/AddBtn';
import ClearfilterBtn from '../../../../components/ClearfilterBtn/ClearfilterBtn';
import DropDownPicker from '../../../../components/DropDownPicker/DropDownPicker';
import {filteredAssignmentsAction} from '../../../../redux/actions/assignment';
import {getClassSubjectsAction} from '../../../../redux/actions/exam';

const Assignments = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const [filter, setFilter] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

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

  const onClearFilters = () => {
    setFilter(false);
    setValueClass(null);
    setValueSubject(null);
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    setPagination(true);
  };

  const assignments =
    useSelector((state: any) => state?.assignmentReducer?.assignments) || [];
  const filtered_assignments =
    useSelector(
      (state: any) => state?.assignmentReducer?.filtered_assignments,
    ) || [];

  // Calling Student Exam Api
  useEffect(() => {
    dispatch(getClassSubjectsAction(valueClass));
    if (currentPage > 1) {
      setPagination(true);
    }
  }, [currentPage, valueClass]);

  useEffect(() => {
    if (valueClass || valueSubject) {
      dispatch(
        filteredAssignmentsAction(
          valueClass ? valueClass : null,
          valueSubject ? valueSubject : null,
        ),
      );
    }
  }, [valueClass, valueSubject]);

  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={styles.topContainer}>
        <Header
          backBtn={true}
          name="Assignments"
          onFilterPress={() => setFilter(!filter)}
        />
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
            <View style={{marginTop: hp('2%'), zIndex: -1}}>
              <Text16
                textStyle={{
                  fontFamily: 'Poppins-Medium',
                  color: appMode === 'DARK' && COLORS.black,
                }}>
                Subject
              </Text16>
              <View style={{marginTop: hp('1%')}}>
                <DropDownPicker
                  open={openSubject}
                  value={valueSubject}
                  items={subjectsData}
                  setOpen={setOpenSubject}
                  setValue={setValueSubject}
                />
              </View>
            </View>

            <ClearfilterBtn onPress={onClearFilters} />
          </View>
        ) : null}
      </View>
      <View
        style={{marginHorizontal: wp('5%'), marginTop: hp('3%'), zIndex: -2}}>
        {isLoading ? (
          <AppLoader
            styleLoader={{marginTop: hp('30%')}}
            color={COLORS.primary}
            size={'large'}
          />
        ) : (
          <View>
            {assignments?.length > 0 || filtered_assignments.length > 0 ? (
              <View
                style={{
                  height: hp('76%'),
                  marginBottom: hp('2.5%'),
                }}>
                <View>
                  <Text16>Name</Text16>
                </View>

                <ItemsList
                  showsVerticalScrollIndicator={false}
                  data={
                    valueClass || valueSubject
                      ? filtered_assignments
                      : assignments
                  }
                  renderItem={({item}: ListRenderItemInfo<[]>) => (
                    <TeacherAssignmentsCard item={item} />
                  )}
                  keyExtractor={(index: any) => index.id}
                  onEndReachedThreshold={0.9}
                  onEndReached={loadMoreItem}
                />
                <View>
                  {(valueClass || valueSubject) &&
                  filtered_assignments?.length < 1 ? (
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
                  ...styles.noAssignmentView,
                  marginTop: filter ? hp('10%') : hp('30%'),
                }}>
                <Text18Bold>NO RESULT FOUND</Text18Bold>
              </View>
            )}
          </View>
        )}
      </View>
      <AddBtn onPress={() => navigation.navigate('Add-Assignment')} />
    </View>
  );
};

export default Assignments;

{
  /* <View>
            {assignments?.length > 0 ? (
              <View>
                <Text16>Name</Text16>
                <ItemsList
                  showsVerticalScrollIndicator={false}
                  data={assignments}
                  renderItem={({item}: ListRenderItemInfo<[]>) => (
                    <TeacherAssignmentsCard item={item} />
                  )}
                  keyExtractor={(index: any) => index.id}
                />
              </View>
            ) : (
              <View style={styles.noDataView}>
                <Text18Bold>NO RESULT FOUND</Text18Bold>
              </View>
            )}
          </View> */
}
