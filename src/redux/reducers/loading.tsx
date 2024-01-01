import {CLEAR_LOADING_STATE, IS_LOADING} from '../types/types';

const initial_state = {
  isLoading: false,
};

export const loadingReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading,
      };

    case CLEAR_LOADING_STATE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return {...state};
  }
};
