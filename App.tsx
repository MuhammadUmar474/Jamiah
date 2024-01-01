import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import axios from 'axios';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import Route from './src/navigation/route';
import {store} from './src/redux/store';
import checkInternetConnection from './src/utils/internetConnection';
import {getItemFromAsyncStorage} from './src/utils/storage/asyncStorage';
import NON_AUTHENTICATED_URLS from './src/authUtils/constants';
import {
  NotificationListner,
  requestUserPermission,
} from './src/utils/pushnotification_helpers';

axios.defaults.baseURL = process.env.APP_BASE_URL;
axios.interceptors.request.use(
  async (request: any) => {
    const token = await getItemFromAsyncStorage('token');
    if (NON_AUTHENTICATED_URLS.indexOf(request.url) < 0) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListner();
    checkInternetConnection();
    SplashScreen.hide();
    return () => {};
  }, []);
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};
export default App;
