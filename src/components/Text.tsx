import React from 'react';
import {StyleSheet, Text, Appearance} from 'react-native';
import {COLORS} from '../shared/themes';
const colorScheme = Appearance.getColorScheme();

export const Text8 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text10, textStyle]} {...rest} />;
};

export const Text10 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text10, textStyle]} {...rest} />;
};

export const Text12 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text12, textStyle]} {...rest} />;
};

export const Text12Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text12Bold, textStyle]} {...rest} />;
};

export const Text13 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text13, textStyle]} {...rest} />;
};

export const Text13Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text13Bold, textStyle]} {...rest} />;
};

export const Text14 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text14, textStyle]} {...rest} />;
};

export const Text14Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text14Bold, textStyle]} {...rest} />;
};

export const Text15 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text15, textStyle]} {...rest} />;
};

export const Text15Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text15Bold, textStyle]} {...rest} />;
};

export const Text16 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text16, textStyle]} {...rest} />;
};

export const Text16Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text16Bold, textStyle]} {...rest} />;
};

export const Text17 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text17, textStyle]} {...rest} />;
};

export const Text17Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text17Bold, textStyle]} {...rest} />;
};

export const Text18 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text18, textStyle]} {...rest} />;
};

export const Text18Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text18Bold, textStyle]} {...rest} />;
};

export const Text19 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text19, textStyle]} {...rest} />;
};

export const Text19Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text19Bold, textStyle]} {...rest} />;
};

export const Text20 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text20, textStyle]} {...rest} />;
};

export const Text20Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text20Bold, textStyle]} {...rest} />;
};

export const Text21 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text21, textStyle]} {...rest} />;
};

export const Text21Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text21Bold, textStyle]} {...rest} />;
};

export const Text22 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text22, textStyle]} {...rest} />;
};

export const Text22Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text22Bold, textStyle]} {...rest} />;
};

export const Text23 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text23, textStyle]} {...rest} />;
};

export const Text23Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text23Bold, textStyle]} {...rest} />;
};

export const Text24 = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text24, textStyle]} {...rest} />;
};

export const Text24Bold = ({textStyle = {}, ...rest}) => {
  return <Text style={[style.Text24Bold, textStyle]} {...rest} />;
};

const style = StyleSheet.create({
  Text8: {
    fontSize: 8,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text10: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text12: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text12Bold: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text13: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text13Bold: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text14: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text14Bold: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text15: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text15Bold: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text16: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text16Bold: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text17: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text17Bold: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text18: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text18Bold: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text19: {
    fontSize: 19,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text19Bold: {
    fontSize: 19,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text20: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text20Bold: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text21: {
    fontSize: 21,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text21Bold: {
    fontSize: 21,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text22: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text22Bold: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text23: {
    fontSize: 23,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text23Bold: {
    fontSize: 23,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text24: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
  Text24Bold: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: colorScheme === 'dark' ? COLORS.white : COLORS.black,
  },
});
