import React from 'react';
import {View, Image, TouchableOpacity, ListRenderItemInfo} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {Text18, Text18Bold} from '../../../components/Text';
import {COLORS} from '../../../shared/themes';
import styles from './Styles';
import AppLoader from '../../../components/AppLoader/AppLoader';
import {backArrow} from '../../../shared/icons';
import ItemsList from '../../../components/ItemsList/ItemsList';
import CurriculumDetailsCard from '../../../components/CurriculumDetailsCard/CurriculumDetailsCard';

const CurriculumDetails = ({navigation}: {navigation: any}) => {
  const showCurriculum =
    useSelector((state: any) => state?.curriculumReducer?.showCurriculum) || [];

  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
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
            <Text18
              textStyle={{
                fontFamily: 'Poppins-Medium',
                marginLeft: wp('4%'),
                marginTop: hp('0.3%'),
              }}>
              Curriculum Details
            </Text18>
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
        <View>
          {showCurriculum?.length > 0 ? (
            <View
              style={{
                marginTop: hp('2.5%'),
              }}>
              <ItemsList
                showsVerticalScrollIndicator={false}
                data={showCurriculum}
                renderItem={({item}: ListRenderItemInfo<[]>) => (
                  <CurriculumDetailsCard item={item} />
                )}
                keyExtractor={(index: any) => index.id}
              />
            </View>
          ) : (
            <View style={styles.noClassView}>
              <Text18Bold>NO RESULT FOUND</Text18Bold>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
export default CurriculumDetails;
