import {
  CLASS_STUDENTS,
  SELECT_ALL_STDS,
  SELECT_SPECIFIC_STDS,
  UNSELECT_ALL_STDS,
  UNSELECT_SPECIFIC_STDS,
} from '../types/types';

const initial_state = {
  classStudents: [],
};

export const examReportReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case CLASS_STUDENTS:
      return {
        ...state,
        classStudents: payload.map((data: any) => ({
          name: data?.student?.full_name,
          id: data?.student?.id,
          image: data?.student?.profile_photo_path,
          checked: false,
        })),
      };

    case SELECT_ALL_STDS:
      return {
        ...state,
        classStudents: payload,
      };

    case UNSELECT_ALL_STDS:
      return {
        ...state,
        classStudents: payload,
      };

    case SELECT_SPECIFIC_STDS:
      return {
        ...state,
        classStudents: payload,
      };

    case UNSELECT_SPECIFIC_STDS:
      return {
        ...state,
        classStudents: payload,
      };

    default:
      return {...state};
  }
};
