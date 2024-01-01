import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Modal} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {profileAvatar} from '../../shared/icons';
import {Text14} from '../Text';
import {COLORS} from '../../shared/themes';
import {useNavigation} from '@react-navigation/native';

const SwitchAccount = (props: any) => {
  // console.log('props', props?.usersList);
  // console.log('props', props?.activeUser);
  const navigation = useNavigation();
  const [addAcount, setAddAcount] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  // const onAccountPress = () => {
  //   setAddAcount(!addAcount);

  //   props?.usersList?.map((user: {}) => {
  //     return (
  //       <TouchableOpacity style={styles.switchView} onPress={() => {}}>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //           }}>
  //           <Image
  //             source={
  //               props?.usersList[props?.activeUser]?.profileImage
  //                 ? {uri: props?.usersList[props?.activeUser]?.profileImage}
  //                 : profileAvatar
  //             }
  //             style={{height: 45, width: 45, borderRadius: 22.5}}
  //           />

  //           <Text14 textStyle={{marginLeft: wp('3%')}}>
  //             {props?.usersList[props?.activeUser]?.serial_no}
  //           </Text14>
  //         </View>
  //         <RadioButton
  //           value={props?.activeUser && true}
  //           status={true ? 'checked' : 'unchecked'}
  //         />
  //       </TouchableOpacity>
  //     );
  //   });
  // };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.switchView}
            onPress={() => {
              setAddAcount(!addAcount);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={
                  props?.usersList[props?.activeUser]?.profileImage
                    ? {uri: props?.usersList[props?.activeUser]?.profileImage}
                    : profileAvatar
                }
                style={{height: 45, width: 45, borderRadius: 22.5}}
              />

              <Text14 textStyle={{marginLeft: wp('3%')}}>
                {props?.usersList[props?.activeUser]?.serial_no}
              </Text14>
            </View>
            <RadioButton
              value={props?.activeUser && true}
              status={true ? 'checked' : 'unchecked'}
            />
          </TouchableOpacity>
          {addAcount ? (
            <TouchableOpacity
              style={styles.switchView}
              onPress={() => {
                // @ts-ignore
                navigation.navigate('Auth');
                setModalVisible(false);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={profileAvatar}
                  style={{height: 45, width: 45, borderRadius: 22.5}}
                />
                <Text14 textStyle={{marginLeft: wp('3%')}}>
                  Add another account
                </Text14>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default SwitchAccount;

export const styles = StyleSheet.create({
  switchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.1,
    borderColor: COLORS.gray,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    bottom: hp('10%'),
  },
});
