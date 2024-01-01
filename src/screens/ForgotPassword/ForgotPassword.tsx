import React, {useEffect} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ButtonComp from '../../components/Button/ButtonComp';
import FormInput from '../../components/FormInput/FormInput';
import styles from './Styles';
import {Text16, Text16Bold} from '../../components/Text';
import AppLoader from '../../components/AppLoader/AppLoader';
import {clearAuthAction, forgotPasswordAction} from '../../redux/actions/auth';
import {ToastMessage} from '../../utils/toastMessage';
import {clearLoadingAction, loadingAction} from '../../redux/actions/loading';
import {COLORS} from '../../shared/themes';
import darkStyles from './DarkStyles';
import JamiahLogoSvg from '../../assets/svgs/JamiahLogoSvg';

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid Email'),
});

const ForgotPassword = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  // Getting current selected organization from organization Reducer
  let currentSelectedOrg =
    useSelector(
      (state: any) => state?.organizationReducer?.current_organization,
    ) || {};

  const submitHandler = (values: any) => {
    dispatch(forgotPasswordAction(values?.email));
  };

  // Checking User Login State
  const isEmailVerified = useSelector(
    (state: any) => state?.authReducer?.isEmailVerified,
  );
  // Getting Loading State
  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  const checkEmailVerified = () => {
    if (isEmailVerified) {
      ToastMessage('Mail Sended to your Email Address', 3000);
      navigation.navigate('Reset-Password');
    } else {
      // setIsLoading(false);
    }
  };

  const clearAuthState = () => {
    dispatch(clearAuthAction());
    dispatch(loadingAction());
    dispatch(clearLoadingAction());
  };

  useEffect(() => {
    checkEmailVerified();
    return clearAuthState;
  }, [isEmailVerified]);

  return (
    <ScrollView
      style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={{flex: 1, marginTop: hp('20%'), marginHorizontal: wp('5%')}}>
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
          initialValues={{email: ''}}
          validateOnMount={true}
          validationSchema={validationSchema}
          onSubmit={values => submitHandler(values)}>
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <View style={{marginTop: hp('5%')}}>
              <View style={{marginTop: hp('1%')}}>
                <FormInput
                  label="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errMsg}>{errors.email}</Text>
                )}
              </View>
              <View>
                <ButtonComp
                  btnName={
                    isLoading ? (
                      <AppLoader size="small" color={COLORS.white} />
                    ) : (
                      'Reset Password'
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
          textStyle={
            appMode === 'DARK'
              ? darkStyles.alreadyAccountTxt
              : styles.alreadyAccountTxt
          }>
          Already Have an Account?{' '}
        </Text16>
        <TouchableOpacity onPress={() => navigation.navigate('Log-in')}>
          <Text16Bold textStyle={styles.signIntxt}> LogIn </Text16Bold>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
