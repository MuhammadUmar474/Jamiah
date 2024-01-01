import {
  CURRICULUM_LIST,
  MAIN_HEADING,
  SHOW_CURRICULUM,
  SUBJECTS_GRADES,
  SUB_HEADING,
} from '../types/types';

const initial_state = {
  curriculums: [],
  subjectsGrades: {},
  mainHeadings: [],
  subHeadings: [],
  showCurriculum: [],
};

export const curriculumReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case CURRICULUM_LIST:
      return {
        ...state,
        curriculums: payload,
      };

    case SUBJECTS_GRADES:
      return {
        ...state,
        subjectsGrades: payload,
      };

    case MAIN_HEADING:
      return {
        ...state,
        mainHeadings: payload,
      };

    case SUB_HEADING:
      return {
        ...state,
        subHeadings: payload,
      };

    case SHOW_CURRICULUM:
      return {
        ...state,
        showCurriculum: payload,
      };
    default:
      return {...state};
  }
};
