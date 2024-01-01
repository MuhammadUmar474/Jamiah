import React, {useState, memo} from 'react';
import {View, Modal, Pressable, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {COLORS} from '../../shared/themes';

import {Text14, Text16} from '../Text';
import styles from './Styles';

const StudentLeavesCard = ({item}: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const leaveColor = () => {
    if (item?.status === 2) {
      return COLORS.green;
    } else if (item?.status === 1) {
      return COLORS.blue;
    } else {
      return COLORS.red;
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => setModalVisible(true)}
      key={item?.id}>
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
              style={{
                alignSelf: 'flex-end',
                marginRight: wp('2%'),
                marginTop: hp('0.5%'),
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image
                source={require('../../assets/images/cancelIcon.png')}
                style={{height: 20, width: 20}}
              />
            </Pressable>
            <Text16
              textStyle={{
                fontFamily: 'Poppins-SemiBold',
                bottom: hp('1.2%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              Reason
            </Text16>
            <Text14 textStyle={{color: appMode === 'DARK' && COLORS.black}}>
              {item?.description}
            </Text14>
          </View>
        </View>
      </Modal>
      <Text14
        textStyle={{
          width: wp('30%'),
          textAlign: 'left',
          color: leaveColor(),
        }}>
        {item?.leave_type?.name}
      </Text14>
      <Text14
        textStyle={{
          width: wp('30%'),
          textAlign: 'left',
          color: leaveColor(),
        }}>
        {item?.from_date}
      </Text14>
      <Text14
        textStyle={{
          width: wp('30%'),
          textAlign: 'left',
          color: leaveColor(),
        }}>
        {item?.to_date}
      </Text14>
    </Pressable>
  );
};

export default memo(StudentLeavesCard);
