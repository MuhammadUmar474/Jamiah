import NetInfo from '@react-native-community/netinfo';
import {Alert, BackHandler} from 'react-native';

const checkInternetConnection = () => {
  NetInfo.addEventListener((state: any) => {
    if (!state.isConnected) {
      Alert.alert(
        'No Internet Connection!',
        'Please Provide Internet Connection',
        [{text: 'OK', onPress: () => BackHandler.exitApp()}],
        {cancelable: false},
      );
    }
  });
};

export default checkInternetConnection;
