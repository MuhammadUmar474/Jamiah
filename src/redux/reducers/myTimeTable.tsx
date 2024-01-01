import {TIMETABLE} from '../types/types';

const initial_state = {
  timeTable: {},
};

export const myTimeTableReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case TIMETABLE:
      return {
        ...state,
        timeTable: payload,
      };
    default:
      return {...state};
  }
};
