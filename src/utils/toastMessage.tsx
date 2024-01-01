import Toast from 'react-native-simple-toast';

export const ToastMessage = (message: string, duration: number | undefined) => {
  Toast.show(message, duration ? Toast.LONG : Toast.SHORT);
};
