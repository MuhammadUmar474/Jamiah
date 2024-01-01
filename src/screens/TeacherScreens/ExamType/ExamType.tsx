import React from 'react';
import {View, TouchableOpacity, Image, ListRenderItemInfo} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {Text20, Text14Bold, Text18Bold} from '../../../components/Text';
import styles from './Styles';
import {backArrow} from '../../../shared/icons';
import AppLoader from '../../../components/AppLoader/AppLoader';
import {COLORS} from '../../../shared/themes';
import AddBtn from '../../../components/AddBtn/AddBtn';
import ItemsList from '../../../components/ItemsList/ItemsList';
import ExamTypesCard from '../../../components/ExamTypesCard/ExamTypesCard';

const ExamType = ({navigation}: {navigation: any}) => {
  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  const examTypes = useSelector(
    (state: any) => state?.examTypeReducer?.allExamTypes,
  );

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
              textStyle={{fontFamily: 'Poppins-Medium', marginLeft: wp('4%')}}>
              Exam Types
            </Text20>
          </View>
        </View>
      </View>
      {isLoading ? (
        <AppLoader
          styleLoader={{marginTop: hp('30%')}}
          color={COLORS.primary}
          size={'large'}
        />
      ) : (
        <View style={{marginHorizontal: wp('5%')}}>
          {examTypes?.length > 0 ? (
            <View
              style={{
                height: hp('76%'),
                marginBottom: hp('2.5%'),
              }}>
              <View
                style={{
                  marginTop: hp('3%'),
                  marginHorizontal: wp('2%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text14Bold>Name</Text14Bold>
                <Text14Bold>Actions</Text14Bold>
              </View>

              {examTypes?.length > 0 ? (
                <ItemsList
                  showsVerticalScrollIndicator={false}
                  data={examTypes}
                  renderItem={({item}: ListRenderItemInfo<[]>) => (
                    <ExamTypesCard item={item} />
                  )}
                  keyExtractor={(index: any) => index.id}
                />
              ) : (
                <View style={styles.noClassView}>
                  <Text18Bold>NO RESULT FOUND</Text18Bold>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.noClassView}>
              <Text18Bold>NO RESULT FOUND</Text18Bold>
            </View>
          )}
        </View>
      )}
      <AddBtn
        onPress={() => {
          navigation.navigate('Add-Exam-type');
        }}
      />
    </View>
  );
};

export default ExamType;
