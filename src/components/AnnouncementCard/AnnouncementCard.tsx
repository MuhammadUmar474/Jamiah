import React, {useState, memo} from 'react';
import {View, Modal, Pressable, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useSelector} from 'react-redux';
import {COLORS} from '../../shared/themes';

import {Text10, Text12, Text14, Text16} from '../Text';
import styles from './Styles';

const AnnouncementCard = ({item}: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

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
                style={{height: 25, width: 25}}
              />
            </Pressable>
            <Text16
              textStyle={{
                fontFamily: 'Poppins-SemiBold',
                bottom: hp('1.2%'),
                color: appMode === 'DARK' && COLORS.black,
              }}>
              {item?.name}
            </Text16>
            <Text14 textStyle={{color: appMode === 'DARK' && COLORS.black}}>
              {item?.description}
            </Text14>
          </View>
        </View>
      </Modal>
      <Text12>{item?.name}</Text12>
      <Text10
        textStyle={{
          height: hp('4%'),
          marginTop: hp('1%'),
          fontFamily: 'Poppins-Regular',
          color: COLORS.gray,
        }}>
        {item?.description}
      </Text10>
      <TouchableOpacity
        style={{marginTop: hp('1%')}}
        onPress={() => setModalVisible(true)}>
        <Text10
          textStyle={{
            color: COLORS.primary,
          }}>
          Read More
        </Text10>
      </TouchableOpacity>
    </Pressable>
  );
};

export default memo(AnnouncementCard);
