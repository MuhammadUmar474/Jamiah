import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import * as yup from 'yup';

import ButtonComp from '../../components/Button/ButtonComp';
import FormInput from '../../components/FormInput/FormInput';
import styles from './Styles';
import {Text14} from '../../components/Text';
import {COLORS} from '../../shared/themes';
import AppLoader from '../../components/AppLoader/AppLoader';
import {logInAction} from '../../redux/actions/auth';
import {ToastMessage} from '../../utils/toastMessage';
import {clearLoadingAction} from '../../redux/actions/loading';
import {
  getItemFromAsyncStorage,
  removeItemFromAsyncStorage,
} from '../../utils/storage/asyncStorage';
import darkStyles from './DarkStyles';
import JamiahLogoSvg from '../../assets/svgs/JamiahLogoSvg';

const loginValidationSchema = yup.object().shape({
  serial_no: yup.string().required('Serial no is required'),
  password: yup.string().required('Password is required'),
});

const LogIn = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  const [orgId, setOrgId] = useState('');

  async function getOrgId() {
    const userToken = await getItemFromAsyncStorage('orgId');
    if (userToken !== null) {
      setOrgId(userToken);
    }
  }
  getOrgId();

  // Getting current selected organization from organization Reducer
  let currentSelectedOrg =
    useSelector(
      (state: any) => state?.organizationReducer?.current_organization,
    ) || {};

  // Checking User Login State
  const isLoggedIn = useSelector(
    (state: any) => state?.authReducer?.isLoggedIn,
  );

  // Checking loading State
  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const submitHandler = (values: any) => {
    const {serial_no, password} = values;
    dispatch(logInAction(serial_no, password, orgId));
    checkUserLogin();
  };

  const checkUserLogin = () => {
    if (isLoggedIn) {
      ToastMessage('Successfully LoggedIn', 3000);
    } else {
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearLoadingAction());
    };
  }, [isLoggedIn]);

  return (
    <KeyboardAvoidingView
      testID="Login"
      style={appMode === 'DARK' ? darkStyles.container : styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginHorizontal: wp('5%')}}>
          <View
            style={{
              flex: 1,
              marginTop: currentSelectedOrg?.image ? hp('15%') : hp('20%'),
            }}>
            {currentSelectedOrg?.setting?.image ? (
              <Image
                source={{uri: currentSelectedOrg?.setting?.image}}
                style={styles.orgLogoStyle}
              />
            ) : (
              <JamiahLogoSvg
                height={70}
                width={280}
                style={{alignSelf: 'center'}}
              />
            )}
            <Formik
              initialValues={{serial_no: '', password: ''}}
              validateOnMount={true}
              validationSchema={loginValidationSchema}
              onSubmit={values => submitHandler(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
              }) => (
                <View style={{marginTop: hp('5%')}}>
                  <View style={{marginTop: hp('1%')}}>
                    <FormInput
                      label="Serial no"
                      onChangeText={handleChange('serial_no')}
                      onBlur={handleBlur('serial_no')}
                      value={values.serial_no}
                    />
                    {errors.serial_no && touched.serial_no && (
                      <Text style={styles.errMsg}>{errors.serial_no}</Text>
                    )}
                    <FormInput
                      label="Password"
                      secureTextEntry={true}
                      eyeIcon={true}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errMsg}>{errors.password}</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => navigation.navigate('Forgot-Password')}>
                    <Text14 textStyle={styles.forgotPasswordTxt}>
                      Forgot Password ?
                    </Text14>
                  </TouchableOpacity>
                  <ButtonComp
                    testID="LoginBtn"
                    btnName={
                      isLoading ? (
                        <AppLoader size={'small'} color={COLORS.white} />
                      ) : (
                        'Log in'
                      )
                    }
                    onPress={handleSubmit}
                  />

                  <TouchableOpacity
                    style={{alignSelf: 'center', marginTop: hp('5%')}}
                    onPress={() => {
                      navigation.navigate('Find-Org');
                      removeItemFromAsyncStorage('orgId');
                    }}>
                    <Text14 textStyle={styles.forgotPasswordTxt}>
                      Find Organization
                    </Text14>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LogIn;
