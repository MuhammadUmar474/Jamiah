import {
  ADD_EXAM_TYPE_FAILURE,
  ADD_EXAM_TYPE_SUCCESS,
  CLEAR_EXAM_TYPES_ERRORS,
  GET_ALL_EXAM_TYPES,
} from '../types/types';

const initial_state = {
  examType: {},
  allExamTypes: [],
  error: {},
};

export const examTypeReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case ADD_EXAM_TYPE_SUCCESS:
      return {
        ...state,
        examType: payload,
      };
    case ADD_EXAM_TYPE_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case GET_ALL_EXAM_TYPES:
      return {
        ...state,
        allExamTypes: payload,
      };
    case CLEAR_EXAM_TYPES_ERRORS:
      return {
        ...state,
        error: {},
      };
    default:
      return {...state};
  }
};
