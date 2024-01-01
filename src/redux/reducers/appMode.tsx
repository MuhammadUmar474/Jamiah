import {Appearance} from 'react-native';
import {APP_MODE} from '../types/types';

const colorScheme = Appearance.getColorScheme();
const initial_state = {
  theme: colorScheme === 'dark' ? 'DARK' : 'LIGHT',
};

export const appModeReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case APP_MODE:
      return {
        ...state,
        theme: payload,
      };
    default:
      return {...state};
  }
};
