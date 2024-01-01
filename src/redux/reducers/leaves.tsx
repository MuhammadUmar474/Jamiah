import {
  CLEAR_LEAVES,
  FILTERED_LEAVES,
  LEAVES,
  LEAVE_TYPES,
} from '../types/types';

const initial_state = {
  allLeaves: [],
  filteredLeaves: [],
  leaveTypes: [],
};

export const leavesReducer = (state = initial_state, action: any) => {
  const {payload, pagination} = action;
  switch (action.type) {
    case LEAVES:
      return {
        ...state,
        allLeaves: pagination ? [...state.allLeaves, ...payload] : payload,
      };
    case FILTERED_LEAVES:
      return {
        ...state,
        filteredLeaves: payload,
      };
    case LEAVE_TYPES:
      return {
        ...state,
        leaveTypes: payload,
      };

    case CLEAR_LEAVES:
      return {
        ...state,
        allLeaves: [],
      };

    default:
      return {...state};
  }
};
