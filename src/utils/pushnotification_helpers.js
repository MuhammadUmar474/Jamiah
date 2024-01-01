import messaging from '@react-native-firebase/messaging';
import { getItemFromAsyncStorage } from './storage/asyncStorage';
import { saveItemInAsyncStorage } from './storage/asyncStorage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notitifcations Authorization status:', authStatus);
    getFCMToken();
  }
}

async function getFCMToken(){
    let fcmtoken = await getItemFromAsyncStorage('fcmtoken');

    if(!fcmtoken){
        try{
            const fcmtoken = await messaging().getToken();
            if(fcmtoken){
                await saveItemInAsyncStorage('fcmtoken', fcmtoken)
            }
        }catch(error) {
            console.log('Error in getting token', error)
        }
    }
}

export const NotificationListner = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });

    messaging().onMessage(async remoteMessage => {
        console.log('notification on foreground state.....', remoteMessage);
    })
}