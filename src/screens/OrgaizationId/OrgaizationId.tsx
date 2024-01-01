import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';

import AppLoader from '../../components/AppLoader/AppLoader';
import ButtonComp from '../../components/Button/ButtonComp';
import FormInput from '../../components/FormInput/FormInput';
import ItemsList from '../../components/ItemsList/ItemsList';
import OrganizationCard from '../../components/OrganizationCard/OrganizationCard';
import {
  clearOrganizationAction,
  findOrganizationAction,
} from '../../redux/actions/organization';
import {COLORS} from '../../shared/themes';
import styles from './Styles';
import darkStyles from './DarkStyles';
import JamiahLogoSvg from '../../assets/svgs/JamiahLogoSvg';

const validationSchema = yup.object().shape({
  organizationName: yup.string().required('Organization Name is required'),
});

const OrgaizationId = () => {
  const dispatch = useDispatch();

  // Getting Loading State of App
  const isLoading = useSelector(
    (state: any) => state?.loadingReducer?.isLoading,
  );

  // Getting Mobile Appearence
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);

  // Getting Organization From Organization Reducer
  const organization = useSelector(
    (state: any) => state?.organizationReducer?.organization,
  );

  let MESSAGE = organization?.message;

  const submitHandler = (values: any) => {
    dispatch(findOrganizationAction(values?.organizationName));
  };

  useEffect(() => {
    return () => {
      dispatch(clearOrganizationAction());
    };
  }, []);

  return (
    <View style={appMode === 'DARK' ? darkStyles.container : styles.container}>
      <View style={{marginHorizontal: wp('5%'), flex: 1}}>
        <View
          style={{
            marginTop: hp('20%'),
          }}>
          <JamiahLogoSvg
            height={70}
            width={280}
            style={{alignSelf: 'center'}}
          />
          <Formik
            initialValues={{organizationName: ''}}
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
              <View style={{marginTop: hp('10%')}}>
                <FormInput
                  label="Find an organization"
                  onChangeText={(value: string) => {
                    handleChange('organizationName')(value);
                    MESSAGE = '';
                  }}
                  onBlur={handleBlur('organizationName')}
                  value={values.organizationName}
                />
                {errors.organizationName && touched.organizationName && (
                  <Text style={styles.errMsg}>{errors.organizationName}</Text>
                )}
                {!isLoading ? (
                  !organization?.data?.organizations ? (
                    <Text style={styles.errMsg}>{MESSAGE}</Text>
                  ) : (
                    <Text style={styles.errMsg}> </Text>
                  )
                ) : (
                  <Text style={styles.errMsg}> </Text>
                )}

                <ButtonComp
                  testId="findOrgBtn"
                  styleBtn={{marginTop: hp('1%')}}
                  btnName={
                    isLoading ? (
                      <AppLoader size={'small'} color={COLORS.white} />
                    ) : (
                      'Find'
                    )
                  }
                  onPress={handleSubmit}
                />
                <View
                  style={{
                    marginTop: hp('3%'),
                    height: hp('30%'),
                  }}>
                  <ItemsList
                    data={organization?.data?.organizations}
                    // @ts-ignore
                    renderItem={({item}: ListRenderItemInfo<[]>) => (
                      <OrganizationCard organizations={item} />
                    )}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
};

export default OrgaizationId;
