import React, {useState, memo} from 'react';
import {View, Pressable, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../shared/themes';
import {Text16} from '../Text';
import styles from './Styles';
import {useDispatch} from 'react-redux';
import {showCurriculumAction} from '../../redux/actions/Curriculum';
import {useNavigation} from '@react-navigation/native';

const MarksTableHead = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('2%'),
      }}>
      <Text16
        textStyle={{
          color: COLORS.gray,
          width: wp('30%'),
        }}>
        SUBJECTS
      </Text16>
      <Text16
        textStyle={{
          color: COLORS.gray,
          width: wp('35%'),
        }}>
        VIEW DETAILS
      </Text16>
    </View>
  );
};
const MarksTableBody = ({data}: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('2%'),
      }}>
      <Text16
        textStyle={{
          color: COLORS.gray,
        }}>
        {data?.subjects?.name}
      </Text16>
      <TouchableOpacity
        style={{marginRight: wp('18%')}}
        onPress={() => {
          dispatch(showCurriculumAction(data?.grade_id, data?.subjects?.id));
          // @ts-ignore
          navigation.navigate('Curriculum-Details');
        }}>
        <FontAwesome name="eye" size={20} color={COLORS.gray} />
      </TouchableOpacity>
    </View>
  );
};

const CurriculumCard = ({item}: any) => {
  const [showResult, setShowResult] = useState(false);
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setShowResult(!showResult);
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text16
          textStyle={{
            marginLeft: wp('2%'),
            width: wp('40%'),
          }}>
          {item?.name}
        </Text16>
        <FontAwesome name={showResult ? 'angle-up' : 'angle-down'} size={20} />
      </View>
      {showResult ? (
        item?.curriculums?.length > 0 ? (
          <View style={{marginTop: hp('2%')}}>
            <View style={styles.horizontalLine} />
            <MarksTableHead />
            {item?.curriculums?.map((data: any) => {
              return <MarksTableBody data={data} />;
            })}
          </View>
        ) : (
          <Text16 textStyle={{alignSelf: 'center', marginTop: hp('2%')}}>
            NO RESULT FOUND
          </Text16>
        )
      ) : null}
    </Pressable>
  );
};

export default memo(CurriculumCard);
