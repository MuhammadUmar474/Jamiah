import React, {memo} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {Text14} from '../Text';
import styles from './Styles';
import {profileAvatar} from '../../shared/icons';
import {currentOrganizationAction} from '../../redux/actions/organization';
import {saveItemInAsyncStorage} from '../../utils/storage/asyncStorage';
import darkStyles from './DarkStyles';

const OrganizationCard = (organizations: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const onPressOrganization = async () => {
    await saveItemInAsyncStorage(
      'orgId',
      JSON.stringify(organizations?.organizations?.id),
    );
    dispatch(currentOrganizationAction(organizations?.organizations));
    // @ts-ignore
    navigation.navigate('Log-in');
  };
  return (
    <TouchableOpacity
      key={organizations?.organizations?.id}
      style={appMode === 'DARK' ? darkStyles.container : styles.container}
      onPress={onPressOrganization}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            organizations?.organizations?.setting?.image
              ? {uri: organizations?.organizations?.setting?.image}
              : profileAvatar
          }
          style={styles.organizationLogo}
        />
        <Text14>{organizations?.organizations?.full_name}</Text14>
      </View>
      <Image
        source={require('../../assets/images/arrowForward.png')}
        style={styles.forwardArrow}
      />
    </TouchableOpacity>
  );
};

export default memo(OrganizationCard);
