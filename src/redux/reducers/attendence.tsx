import {
  CLASS_TEACHER_CLASSES,
  STD_ATTENDENCE,
  SHOW_ATTENDENCE,
  STORE_ATTENDENCE_SUCCESS,
  CLEAR_ATTENDENCE_ERRORS,
  SHOW_ATTENDENCE_ERROR,
} from '../types/types';

const initial_state = {
  attendence: {},
  classTeacherClasses: [],
  classTeacherError: '',
  stdAttendence: [],
  storeAttendenceSuccess: {},
};

export const attendenceReducer = (state = initial_state, action: any) => {
  const {payload} = action;
  switch (action.type) {
    case SHOW_ATTENDENCE:
      return {
        ...state,
        attendence: payload,
        // attendances: payload.attendances.map((item: any) => ({
        //   ...item,
        //   mark1:
        //     item.attendance_status == 1 || item.attendance_status == 3
        //       ? 1
        //       : 0,
        //   mark2:
        //     item.attendance_status == 2 || item.attendance_status == 3
        //       ? 2
        //       : 0,
        // })),
        stdAttendence: payload.attendances.map((item: any) => ({
          id: item.id,
          mark1:
            item.attendance_status == 1 || item.attendance_status == 3 ? 1 : 0,
          mark2:
            item.attendance_status == 2 || item.attendance_status == 3 ? 2 : 0,
        })),
      };
    case SHOW_ATTENDENCE_ERROR:
      return {
        ...state,
        classTeacherError: payload,
      };
    case CLASS_TEACHER_CLASSES:
      return {
        ...state,
        classTeacherClasses: payload,
      };

    case STD_ATTENDENCE:
      return {
        ...state,
        stdAttendence: [...payload?.stdAttendence],
      };
    case STORE_ATTENDENCE_SUCCESS:
      return {
        ...state,
        storeAttendenceSuccess: payload,
      };
    case CLEAR_ATTENDENCE_ERRORS:
      return {
        ...state,
        storeAttendenceSuccess: {},
        classTeacherError: '',
      };
    default:
      return {...state};
  }
};
