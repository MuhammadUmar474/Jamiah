import {TEACHER_CLASSES} from '../types/types';

const initial_state = {
  teacherClasses: [],
};

export const teacherClassesReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case TEACHER_CLASSES:
      return {
        ...state,
        teacherClasses: payload,
      };
    default:
      return {...state};
  }
};
