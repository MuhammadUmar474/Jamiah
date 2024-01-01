import React, {useEffect} from 'react';
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
import {Text14, Text16, Text16Bold} from '../../components/Text';
import {COLORS} from '../../shared/themes';
import AppLoader from '../../components/AppLoader/AppLoader';
import {resetPasswordAction} from '../../redux/actions/auth';
import {clearLoadingAction} from '../../redux/actions/loading';
import darkStyles from './DarkStyles';
import JamiahLogoSvg from '../../assets/svgs/JamiahLogoSvg';

const loginValidationSchema = yup.object().shape({
  code: yup
    .string()
    .required('Serial no is required')
    .max(4, 'Max 4 digit code'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().when('password', {
    is: (val: any) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref('password')], 'Both password need to be the same'),
  }),
});

const ResetPassword = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

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

  // Getting current selected organization from organization Reducer
  let currentSelectedOrg =
    useSelector(
      (state: any) => state?.organizationReducer?.current_organization,
    ) || {};

  let errorState = useSelector((state: any) => state?.authReducer?.error) || {};

  const submitHandler = (values: any) => {
    const {code, password, confirmPassword} = values;

    dispatch(resetPasswordAction(code, password, confirmPassword));
  };

  useEffect(() => {
    return () => {
      dispatch(clearLoadingAction());
    };
  }, [isLoggedIn]);

  return (
    <KeyboardAvoidingView
      style={appMode === 'DARK' ? darkStyles.container : styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginHorizontal: wp('5%')}}>
          <View
            style={{
              flex: 1,
              marginTop: currentSelectedOrg?.image ? hp('15%') : hp('20%'),
            }}>
            {currentSelectedOrg?.image ? (
              <Image
                source={{uri: currentSelectedOrg?.image}}
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
              initialValues={{code: '', password: '', confirmPassword: ''}}
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
                      label="Code"
                      onChangeText={handleChange('code')}
                      onBlur={handleBlur('code')}
                      value={values.code}
                    />
                    {errors.code && touched.code && (
                      <Text style={styles.errMsg}>{errors.code}</Text>
                    )}
                    {errorState && errorState?.errors ? (
                      <Text14 style={styles.errMsg}>
                        {errorState?.errors}
                      </Text14>
                    ) : null}
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

                    <FormInput
                      label="Confirm Password"
                      secureTextEntry={true}
                      eyeIcon={true}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text style={styles.errMsg}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>

                  <View>
                    <ButtonComp
                      btnName={
                        isLoading ? (
                          <AppLoader size={'small'} color={COLORS.white} />
                        ) : (
                          'Submit'
                        )
                      }
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>

          <View style={styles.bottomView}>
            <Text16
              textStyle={{
                ...styles.alreadyAccountTxt,
                color: appMode === 'DARK' && COLORS.white,
              }}>
              Remember Password?{' '}
            </Text16>
            <TouchableOpacity onPress={() => navigation.navigate('Log-in')}>
              <Text16Bold textStyle={styles.signIntxt}>
                {' '}
                Go Back To Login{' '}
              </Text16Bold>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
