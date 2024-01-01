import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItemFromAsyncStorage = async (itemKey: any) => {
  const item = await AsyncStorage.getItem(itemKey);
  return item;
};

export const saveItemInAsyncStorage = async (itemKey: any, itemValue: any) => {
  try {
    await AsyncStorage.setItem(itemKey, itemValue);
  } catch (e) {
    console.log(`Error while setting key ${itemKey} in storage`, e);
  }
};

export const removeItemFromAsyncStorage = async (itemKey: any) => {
  if (!itemKey) {
    return;
  }

  try {
    await AsyncStorage.removeItem(itemKey);
  } catch (e) {
    console.log(`Error while removing key ${itemKey} from storage`, e);
  }
};
