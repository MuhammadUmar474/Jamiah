import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from './reducers/auth';
import {curriculumReducer} from './reducers/curriculum';
import {dashBoardReducer} from './reducers/dashBoard';
import {organizationReducer} from './reducers/organization';
import {userProfileReducer} from './reducers/profile';
import {examReducer} from './reducers/exam';
import {myTimeTableReducer} from './reducers/myTimeTable';
import {teacherClassesReducer} from './reducers/teacherClasses';
import {leavesReducer} from './reducers/leaves';
import {loadingReducer} from './reducers/loading';
import {attendenceReducer} from './reducers/attendence';
import {examTypeReducer} from './reducers/examType';
import {examReportReducer} from './reducers/examReport';
import {appModeReducer} from './reducers/appMode';
import {assignmentReducer} from './reducers/assignment';

const AllReducers = combineReducers({
  authReducer: authReducer,
  examReducer: examReducer,
  examTypeReducer: examTypeReducer,
  userProfileReducer: userProfileReducer,
  myTimeTableReducer: myTimeTableReducer,
  curriculumReducer: curriculumReducer,
  dashBoardReducer: dashBoardReducer,
  leavesReducer: leavesReducer,
  organizationReducer: organizationReducer,
  teacherClassesReducer: teacherClassesReducer,
  loadingReducer: loadingReducer,
  attendenceReducer: attendenceReducer,
  examReportReducer: examReportReducer,
  appModeReducer: appModeReducer,
  assignmentReducer: assignmentReducer,
});

export const store = createStore(AllReducers, compose(applyMiddleware(thunk)));
