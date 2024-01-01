import React from 'react';
import {View, ListRenderItemInfo, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {Text16, Text18Bold, Text20} from '../../../../components/Text';
import styles from './Styles';

import ItemsList from '../../../../components/ItemsList/ItemsList';
import {COLORS} from '../../../../shared/themes';
import AppLoader from '../../../../components/AppLoader/AppLoader';
import darkStyles from './DarkStyles';
import TeacherAssignmentSubmissionCard from '../../../../components/TeacherAssignmentSubmissionCard/TeacherAssignmentSubmissionCard';
import {backArrow} from '../../../../shared/icons';
import ButtonComp from '../../../../components/Button/ButtonComp';
import {storeStdAssignmentMarksAction} from '../../../../redux/actions/assignment';
import StudentAssignmentSubmitCard from '../../../../components/StudentAssignmentSubmitCard/StudentAssignmentSubmitCard';

const StdAssignmentSubmission = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const currentAssignmentId = route?.params?.currentAssignmentId;
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const assignments =
    useSelector((state: any) => state?.assignmentReducer?.assignments) || [];

  const onSubmit = () => {
    // dispatch(
    //   storeStdAssignmentMarksAction(
    //     currentAssignmentId,
    //     studentsToAddMarksList,
    //     successCall,
    //   ),
    // );
  };

  // const successCall = () => {
  //   navigation.navigate('Teacher-Exams');
  // };

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
                marginLeft: wp('4%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Submit Assignment
            </Text20>
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: wp('5%'), marginTop: hp('3%')}}>
        {isLoading ? (
          <AppLoader
            styleLoader={{marginTop: hp('30%')}}
            color={COLORS.primary}
            size={'large'}
          />
        ) : (
          <View>
            {/* {assignments?.length < 0 ? ( */}
            <View>
              <Text16>Assignment Details</Text16>
              <StudentAssignmentSubmitCard />

              <ButtonComp
                btnName={
                  isLoading ? (
                    <AppLoader size={'small'} color={COLORS.white} />
                  ) : (
                    'Add'
                  )
                }
                onPress={() => onSubmit()}
              />
            </View>
            {/* ) : (
              <View style={styles.noDataView}>
                <Text18Bold>NO RESULT FOUND</Text18Bold>
              </View>
            )} */}
          </View>
        )}
      </View>
    </View>
  );
};

export default StdAssignmentSubmission;
