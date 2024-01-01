import React, {useState} from 'react';
import {View, TouchableOpacity, Image, ListRenderItemInfo} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';

import {Text14Bold, Text16, Text20} from '../../../components/Text';
import styles from './Styles';
import {backArrow} from '../../../shared/icons';
import ItemsList from '../../../components/ItemsList/ItemsList';
import Data from '../../../assets/data/Data';
import ButtonComp from '../../../components/Button/ButtonComp';
import {COLORS} from '../../../shared/themes';
import AppLoader from '../../../components/AppLoader/AppLoader';
import DownloadReportList from '../../../components/DownloadReportList/DownloadReportList';

const DownloadReport = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

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
              textStyle={{fontFamily: 'Poppins-Medium', marginLeft: wp('3%')}}>
              Exams Report
            </Text20>
          </View>
        </View>
      </View>

      <View style={{marginHorizontal: wp('5%'), marginTop: hp('3%')}}>
        <Text16>10th-B, Summary</Text16>

        <View
          style={{
            marginTop: hp('3%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text14Bold>Students</Text14Bold>
          <Text14Bold>Summary</Text14Bold>
        </View>
        <View style={{height: hp('40%')}}>
          <ItemsList
            showsVerticalScrollIndicator={false}
            data={Data}
            renderItem={({item}: ListRenderItemInfo<[]>) => (
              <DownloadReportList item={item} />
            )}
          />
        </View>

        <View>
          <ButtonComp
            btnName={
              isLoading ? (
                <AppLoader size={'small'} color={COLORS.white} />
              ) : (
                'Download'
              )
            }
            // onPress={() => {
            //   navigation.navigate('Std-Mark-Attendence');
            // }}
          />
        </View>
      </View>
    </View>
  );
};

export default DownloadReport;
