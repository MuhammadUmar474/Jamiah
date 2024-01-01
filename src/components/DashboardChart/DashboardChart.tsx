import React, {memo} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {LineChart} from 'react-native-chart-kit';

import {COLORS} from '../../shared/themes';
import {useSelector} from 'react-redux';

const DashboardChart = () => {
  let dashBoard =
    useSelector((state: any) => state?.dashBoardReducer?.dashBoard) || [];

  const DAYS = dashBoard?.studentAttendance?.map((data: any) => {
    return data?.DayOfMonth?.substr(0, 3);
  });
  const COUNT = dashBoard?.studentAttendance?.map((data: any) => {
    return data?.count;
  });
  return (
    <LineChart
      data={{
        labels: DAYS,
        datasets: [
          {
            data: COUNT ? COUNT : [0],
          },
        ],
      }}
      width={wp('100%')}
      height={212}
      withInnerLines={false}
      chartConfig={{
        backgroundGradientFrom: COLORS.white,
        backgroundGradientTo: COLORS.white,
        decimalPlaces: 0,
        color: () => COLORS.MediumPink,
        labelColor: () => COLORS.black,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: COLORS.lightPink,
        },
      }}
      bezier
      style={{
        marginTop: hp('3%'),
        marginLeft: wp('-10%'),
        borderRadius: 16,
      }}
    />
  );
};

export default memo(DashboardChart);
