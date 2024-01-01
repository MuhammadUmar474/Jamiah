import React, {useState, memo} from 'react';
import {View, Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Text14, Text16} from '../Text';
import styles from './Styles';

const CurriculumDetailsCard = ({item}: any) => {
  const [showResult, setShowResult] = useState(false);
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setShowResult(!showResult);
      }}>
      <View>
        <Text16
          textStyle={{
            marginLeft: wp('2%'),
          }}>
          {item?.name}
        </Text16>
        {item?.childrens?.map((data: any) => {
          return (
            <Text14 textStyle={{marginLeft: wp('5%'), marginTop: hp('2%')}}>
              {data?.name}
            </Text14>
          );
        })}
      </View>
    </Pressable>
  );
};

export default memo(CurriculumDetailsCard);
