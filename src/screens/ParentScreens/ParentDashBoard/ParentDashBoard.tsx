import React, {useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './Styles';
import darkStyles from './DarkStyles';
import {dashBoardAction} from '../../../redux/actions/dashBoard';
import {Text14, Text18, Text18Bold} from '../../../components/Text';
import {COLORS} from '../../../shared/themes';
import {logOutAction} from '../../../redux/actions/auth';
import {logoutIcon} from '../../../shared/icons';
import ItemsList from '../../../components/ItemsList/ItemsList';
import ChildrensCard from '../../../components/ChildrensCard/ChildrensCard';
import AppLoader from '../../../components/AppLoader/AppLoader';

const ParentDashBoard = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  // Getting Parent dashBoard info From dashBoard Reducer
  let dashBoard =
    useSelector((state: any) => state?.dashBoardReducer?.dashBoard) || [];
  const isChildLoggedIn = useSelector(
    (state: any) => state?.authReducer?.childLoggedIn,
  );

  useEffect(() => {
    dispatch(dashBoardAction());
    if (isChildLoggedIn) {
      navigation.navigate('Child-Home');
    }
  }, [isChildLoggedIn]);

  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topView}>
          <Text18
            textStyle={{
              fontFamily: 'Poppins-Medium',
              marginLeft: wp('4%'),
              marginTop: hp('0.3%'),
              color: appMode === 'DARK' && COLORS.black,
            }}>
            DashBoard
          </Text18>
          <TouchableOpacity
            style={styles.underTop}
            onPress={() => {
              dispatch(logOutAction());
            }}>
            <Image
              source={logoutIcon}
              style={{height: 15, width: 15, marginTop: hp('0.5%')}}
            />
            <Text14
              textStyle={{
                marginHorizontal: wp('2%'),
                marginTop: hp('0.5%'),
                fontFamily: 'Poppins-Medium',
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Logout
            </Text14>
          </TouchableOpacity>
        </View>
      </View>

      <Text18Bold textStyle={{marginLeft: wp('5%'), marginTop: hp('5%')}}>
        CHILDREN (
        {dashBoard?.chidelrns?.length ? dashBoard?.chidelrns?.length : 0})
      </Text18Bold>

      {isLoading ? (
        <AppLoader color={COLORS.primary} size={'large'} />
      ) : (
        <View
          style={{
            alignSelf: 'center',
          }}>
          {dashBoard?.chidelrns?.length > 0 ? (
            <ItemsList
              data={dashBoard?.chidelrns}
              // @ts-ignore
              renderItem={({item}: ListRenderItemInfo<[]>) => (
                <ChildrensCard children={item} />
              )}
            />
          ) : (
            <Text18Bold textStyle={{alignSelf: 'center', marginTop: hp('10%')}}>
              NO RESULT FOUND
            </Text18Bold>
          )}
        </View>
      )}
    </View>
  );
};

export default ParentDashBoard;
