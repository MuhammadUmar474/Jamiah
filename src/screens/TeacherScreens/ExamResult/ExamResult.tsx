import React from 'react';
import {View, TouchableOpacity, Image, ListRenderItemInfo} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {Text16, Text18Bold, Text20} from '../../../components/Text';
import styles from './Styles';

import {backArrow} from '../../../shared/icons';
import ItemsList from '../../../components/ItemsList/ItemsList';
import ExamResultCard from '../../../components/ExamResultCard/ExamResultCard';
import {COLORS} from '../../../shared/themes';
import AppLoader from '../../../components/AppLoader/AppLoader';
import darkStyles from './DarkStyles';

const ExamResult = ({navigation}: {navigation: any}) => {
  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const stdExamsResult =
    useSelector((state: any) => state?.examReducer?.students_exam_result) || {};

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
              Exam Result
            </Text20>
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: wp('5%'), marginTop: hp('3%')}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text16>
            {stdExamsResult?.className + ' , ' + stdExamsResult?.exam_type}
          </Text16>

          {/* <TouchableOpacity onPress={() => {}}>
            <Image source={pdfIcon} style={styles.downloadPdfIcon} />
          </TouchableOpacity> */}
        </View>
        {isLoading ? (
          <AppLoader
            styleLoader={{marginTop: hp('30%')}}
            color={COLORS.primary}
            size={'large'}
          />
        ) : (
          <View>
            {stdExamsResult?.exampReorts?.length > 0 ? (
              <ItemsList
                showsVerticalScrollIndicator={false}
                data={stdExamsResult?.exampReorts}
                renderItem={({item}: ListRenderItemInfo<[]>) => (
                  <ExamResultCard item={item} />
                )}
                keyExtractor={(index: any) => index.id}
              />
            ) : (
              <View style={styles.noDataView}>
                <Text18Bold>NO RECORD FOUND</Text18Bold>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default ExamResult;
