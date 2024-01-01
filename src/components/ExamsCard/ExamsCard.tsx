import React, {useState, memo} from 'react';
import {View, Modal, Pressable, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {format} from 'date-fns';

import {COLORS} from '../../shared/themes';
import {Text14, Text16} from '../Text';
import styles from './Styles';
import {useSelector} from 'react-redux';

const ExamsCard = (data: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const checkStatus = () => {
    const newDate = new Date();
    const CURRENT_DATE = format(newDate, 'yyyy-dd-MM');
    if (data?.item?.mark) {
      return COLORS.green;
    } else if (data?.item?.exam_date > CURRENT_DATE) {
      return COLORS.blue;
    } else {
      return COLORS.red;
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => setModalVisible(true)}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={{alignSelf: 'flex-end', marginRight: wp('2%')}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image
                source={require('../../assets/images/cancelIcon.png')}
                style={{height: 20, width: 20}}
              />
            </Pressable>
            <Text16
              textStyle={{
                fontFamily: 'Poppins-Bold',
                marginLeft: wp('2%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Remarks
            </Text16>
            <Text14
              textStyle={{
                marginLeft: wp('2%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              {data?.item?.remarks}
            </Text14>
          </View>
        </View>
      </Modal>
      <Text14
        textStyle={{
          width: wp('27%'),
          textAlign: 'left',
          color: checkStatus(),
        }}>
        {data?.item?.name}
      </Text14>
      <Text14
        textStyle={{
          width: wp('18%'),
          textAlign: 'left',
          color: checkStatus(),
        }}>
        {data?.item?.time_from?.substring(0, 5)}
      </Text14>
      <Text14
        textStyle={{
          width: wp('26%'),
          textAlign: 'left',
          color: checkStatus(),
        }}>
        {data?.item?.exam_date}
      </Text14>
      <Text14
        textStyle={{
          width: wp('17%'),
          textAlign: 'center',
          color: checkStatus(),
        }}>
        {data?.item?.mark ? data?.item?.mark : 'N/A'}
      </Text14>
    </Pressable>
  );
};

export default memo(ExamsCard);
