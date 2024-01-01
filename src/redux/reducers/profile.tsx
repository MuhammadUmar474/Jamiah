import {USER_PROFILE} from '../types/types';

const initial_state = {
  profile: {},
};

export const userProfileReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case USER_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    default:
      return {...state};
  }
};
