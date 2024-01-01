import {
  ADD_EXAMS_FAILURE,
  CLASS_SUBJECTS,
  EXAMS,
  FILTERED_EXAMS,
  GET_STD_TO_ADD_EDIT_EXAM_MARKS,
  GET_TEACHER_CLASSES,
  STUDENTS_EXAMS_RESULT,
  STUDENTS_TO_ADD_EDIT_MARKS,
} from '../types/types';

const initial_state = {
  exams: [],
  exam_details: {},
  students: [],
  students_to_add_mark: [],
  students_to_edit_mark: [],
  students_exam_result: {},
  filtered_exams: [],
  teacher_classes: [],
  subjects: [],
  errors: {},
};

export const examReducer = (state = initial_state, action: any) => {
  const {payload, pagination} = action;
  switch (action.type) {
    case EXAMS:
      return {
        ...state,
        exams: pagination ? [...state.exams, ...payload] : payload,
      };

    case FILTERED_EXAMS:
      return {
        ...state,
        filtered_exams: payload,
      };

    case ADD_EXAMS_FAILURE:
      return {
        ...state,
        errors: payload,
      };

    case GET_TEACHER_CLASSES:
      return {
        ...state,
        teacher_classes: payload,
      };

    case CLASS_SUBJECTS:
      return {
        ...state,
        subjects: payload,
      };

    case GET_STD_TO_ADD_EDIT_EXAM_MARKS:
      return {
        ...state,
        exam_details: payload?.exam_details,
        students: payload?.students?.map((item: any) => ({
          id: item?.id,
          mark: item?.mark,
          ...item,
        })),
      };

    case STUDENTS_TO_ADD_EDIT_MARKS:
      return {
        ...state,
        students_to_add_mark: payload.stdToAddMarks.map((item: any) => ({
          id: item?.id,
          mark: item?.mark,
          ...item,
        })),
      };

    case STUDENTS_EXAMS_RESULT:
      return {
        ...state,
        students_exam_result: payload,
      };

    default:
      return {...state};
  }
};
