import React from 'react';
import {FlatList} from 'react-native';

const ItemsList = (props: any) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={props?.data}
      renderItem={props?.renderItem}
      {...props}
    />
  );
};

export default ItemsList;
