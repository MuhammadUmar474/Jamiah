import React, {useState, memo} from 'react';
import {View, Image, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {profileAvatar} from '../../shared/icons';
import {COLORS} from '../../shared/themes';
import {Text14, Text16} from '../Text';
import styles from './Styles';
import {
  calculateObtainedMarks,
  calculateTotalMarks,
} from '../../utils/PriceCalculation';
import {useSelector} from 'react-redux';

const MarksTableHead = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('2%'),
      }}>
      <Text14
        textStyle={{
          color: COLORS.gray,
          width: wp('30%'),
        }}>
        SUBJECTS
      </Text14>
      <Text14
        textStyle={{
          color: COLORS.gray,
          width: wp('25%'),
        }}>
        OBT MARKS
      </Text14>
      <Text14
        textStyle={{
          color: COLORS.gray,
          width: wp('30%'),
        }}>
        TOTAL MARKS
      </Text14>
    </View>
  );
};
const MarksTableFooter = ({
  obtainedMarks,
  totalMarks,
}: {
  obtainedMarks: number;
  totalMarks: number;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('2%'),
      }}>
      <Text14
        textStyle={{
          color: COLORS.black,
          width: wp('30%'),
        }}>
        TOTAL
      </Text14>
      <Text14
        textStyle={{
          color: COLORS.black,
          textAlign: 'center',
          width: wp('25%'),
        }}>
        {obtainedMarks}
      </Text14>
      <Text14
        textStyle={{
          color: COLORS.black,
          textAlign: 'center',
          width: wp('25%'),
        }}>
        {totalMarks}
      </Text14>
    </View>
  );
};
const MarksTableBody = ({data}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('2%'),
      }}>
      <Text14
        textStyle={{
          color: COLORS.gray,
          width: wp('30%'),
        }}>
        {data?.exam?.subjects?.name}
      </Text14>
      <Text14
        textStyle={{
          color: COLORS.gray,
          textAlign: 'center',
          width: wp('25%'),
        }}>
        {data?.mark}
      </Text14>
      <Text14
        textStyle={{
          color: COLORS.gray,
          textAlign: 'center',
          width: wp('25%'),
        }}>
        {data?.exam?.total_mark}
      </Text14>
    </View>
  );
};

const ExamResultCard = ({item}: any) => {
  const [showResult, setShowResult] = useState(false);
  const obtainedMarks = calculateObtainedMarks(item?.exam_marks);
  const totalMarks = calculateTotalMarks(item?.exam_marks);
  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item?.profile_photo_path
                ? {uri: item?.profile_photo_path}
                : profileAvatar
            }
            style={styles.imageView}
          />
          <Text16
            textStyle={{
              marginLeft: wp('2%'),
              width: wp('40%'),
              color: appMode === 'DARK' && COLORS.black,
            }}>
            {item?.full_name}
          </Text16>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text16
            textStyle={{
              marginRight: wp('5%'),
            }}>
            {obtainedMarks + '/' + totalMarks}
          </Text16>
          <FontAwesome
            name={showResult ? 'angle-up' : 'angle-down'}
            size={20}
          />
        </View>
      </View>
      {showResult ? (
        <View style={{marginTop: hp('2%')}}>
          <View style={styles.horizontalLine} />
          <MarksTableHead />
          {item?.exam_marks?.map((data: any) => {
            return <MarksTableBody data={data} />;
          })}
          <View style={styles.horizontalLine} />
          <MarksTableFooter
            obtainedMarks={obtainedMarks}
            totalMarks={totalMarks}
          />
        </View>
      ) : null}
    </Pressable>
  );
};

export default memo(ExamResultCard);
