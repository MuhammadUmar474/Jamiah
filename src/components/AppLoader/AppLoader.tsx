import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const AppLoader = (props: any) => {
  return (
    <View style={[styles.loaderView, props.styleLoader]}>
      <ActivityIndicator size={props.size} color={props.color} />
    </View>
  );
};

export default memo(AppLoader);

export const styles = StyleSheet.create({
  loaderView: {
    alignSelf: 'center',
  },
});
