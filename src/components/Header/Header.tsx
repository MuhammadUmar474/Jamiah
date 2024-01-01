import React, {memo} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {filterIcon} from '../../shared/icons';
import {COLORS} from '../../shared/themes';
import BackBtn from '../BackBtn/BackBtn';
import {Text18} from '../Text';
import styles from './styles';

const Header = (props: any) => {
  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  return (
    <View style={styles.topView}>
      {props?.backBtn ? <BackBtn /> : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: props?.backBtn
            ? widthPercentageToDP('85%')
            : widthPercentageToDP('90%'),
        }}>
        <View style={styles.underTop}>
          <Text18
            textStyle={{
              color: appMode === 'DARK' && COLORS.black,
            }}>
            {props?.name}
          </Text18>
        </View>
        <TouchableOpacity
          style={styles.underTop}
          onPress={props?.onFilterPress}>
          <Image source={filterIcon} style={styles.filterIcon} />
          <Text18
            textStyle={{
              ...styles.headerTxt,
              color: appMode === 'DARK' && COLORS.black,
            }}>
            Filters
          </Text18>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Header);
