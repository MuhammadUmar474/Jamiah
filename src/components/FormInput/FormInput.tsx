import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {COLORS} from '../../shared/themes';
import darkStyles from './darkStyles';
import styles from './styles';

const FormInput = (props: {
  secureTextEntry?: boolean | undefined;
  placeholder?: string | undefined;
  eyeIcon?: boolean;
  editable?: boolean;
  label?: string;
  onBlur?: ((text: string) => void) & Function;
  value: string;
  onChangeText?: ((text: string) => void) & Function;
  keyboardType?: 'numeric' | undefined;
}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const appMode = useSelector((state: any) => state?.appModeReducer?.theme);
  return (
    // @ts-ignore
    <TextInput
      secureTextEntry={passwordVisible && props?.secureTextEntry ? true : false}
      mode={'outlined'}
      right={
        props?.eyeIcon ? (
          // @ts-ignore
          <TextInput.Icon
            icon={passwordVisible ? 'eye' : 'eye-off'}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        ) : null
      }
      editable={props?.editable}
      placeholder={props?.placeholder}
      label={props?.label}
      // @ts-ignore
      textColor={appMode === 'DARK' && COLORS.white}
      style={
        appMode === 'DARK' ? darkStyles.textInputStyle : styles.textInputStyle
      }
      value={props?.value}
      onChangeText={props?.onChangeText}
      keyboardType={props?.keyboardType}
      theme={{
        colors: {
          primary: appMode === 'DARK' ? COLORS.white : COLORS.primary,
        },
      }}
    />
  );
};

export default FormInput;
