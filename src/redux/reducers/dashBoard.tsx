import {DASHBOARD} from '../types/types';

const initial_state = {
  dashBoard: {},
};

export const dashBoardReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case DASHBOARD:
      return {
        ...state,
        dashBoard: payload,
      };
    default:
      return {...state};
  }
};
