import React from 'react';
import {View, Image, TouchableOpacity, ListRenderItemInfo} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {Text14Bold, Text18, Text18Bold} from '../../../components/Text';
import {COLORS} from '../../../shared/themes';
import styles from './Styles';
import AppLoader from '../../../components/AppLoader/AppLoader';
import {backArrow} from '../../../shared/icons';
import ItemsList from '../../../components/ItemsList/ItemsList';
import CurriculumCard from '../../../components/CurriculumCard/CurriculumCard';

const Curriculum = ({navigation}: {navigation: any}) => {
  const curriculum =
    useSelector((state: any) => state?.curriculumReducer?.curriculums) || [];

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
              Curriculum
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
          {curriculum?.length > 0 ? (
            <View
              style={{
                height: hp('76%'),
                marginBottom: hp('2.5%'),
              }}>
              <View style={styles.actionViewContainer}>
                <Text14Bold>Grades</Text14Bold>
                <Text14Bold>Actions</Text14Bold>
              </View>
              <ItemsList
                showsVerticalScrollIndicator={false}
                data={curriculum}
                renderItem={({item}: ListRenderItemInfo<[]>) => (
                  <CurriculumCard item={item} />
                )}
                keyExtractor={(index: any) => index.id}
              />
            </View>
          ) : (
            <View style={styles.noClassView}>
              <Text18Bold>NO RESULT FOUND</Text18Bold>
            </View>
          )}
          <TouchableOpacity
            style={styles.applyLeaveBtn}
            onPress={() => navigation.navigate('Add-Curriculum')}>
            <FontAwesome name="plus" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Curriculum;
