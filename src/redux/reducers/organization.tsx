import {
  CLEAR_ORGANIZATION,
  CURRENT_ORGANIZATION,
  FIND_ORGANIZATION,
} from '../types/types';

const initial_state = {
  organization: {},
  current_organization: {},
};

export const organizationReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case FIND_ORGANIZATION:
      return {
        ...state,
        organization: payload,
      };

    case CURRENT_ORGANIZATION:
      return {
        ...state,
        current_organization: payload,
      };

    case CLEAR_ORGANIZATION:
      return {
        organization: {},
      };
    default:
      return {...state};
  }
};
