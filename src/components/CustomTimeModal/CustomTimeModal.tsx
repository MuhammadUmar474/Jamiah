import React, {useEffect, useState, memo} from 'react';
import {Modal, View} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import {COLORS} from '../../shared/themes';

import styles from './styles';

const CustomTimeModal = ({
  onTimeSelect,
  modalVisible,
  setModalVisible,
}: {
  onTimeSelect: any;
  modalVisible: any;
  setModalVisible: any;
}) => {
  const [selectedTime, setSelectedTime] = useState('');
  useEffect(() => {
    // @ts-ignore
    onTimeSelect(selectedTime);
  }, [selectedTime]);
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
          <DatePicker
            options={{
              textDefaultColor: COLORS.black,
              selectedTextColor: COLORS.white,
              mainColor: COLORS.primary,
              textSecondaryColor: COLORS.primary,
            }}
            mode="time"
            selected={selectedTime}
            minuteInterval={5}
            onTimeChange={selectedTime => {
              setSelectedTime(selectedTime);
              setModalVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(CustomTimeModal);
