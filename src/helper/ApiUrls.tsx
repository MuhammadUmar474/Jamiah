const ROUTES_OBJ = {
  login: `/login`,
  resetlink: `/reset-link`,
  resetPassword: `/reset-password`,
  forgotPassword: `/password/forgot-password`,
  profile: `/profile`,
  logout: `/logout`,
  studentExams: `/exams`,
  myChildren: `/my-children`,
  childClasses: `/classes`,
  curriculumList: `/curriculums`,
  addCurriculum: `/curriculums`,
  dashBoard: `/dashboard`,
  studentApplyLeave: `/leaves`,
  teacherClasses: `/classes`,
  classTeacherClasses: `/teacher-classes`,
  addExams: `/exams`,
  examType: `/exam-types`,
  teacherDashBoard: `/teacher-dashboard`,
  storeStdAttendence: `/store-attendance`,
  storeExamMark: `/storeMark`,
  editExamMark: `/updateMark`,
  showExamResult: `/exams`,
  classStudents: `/class-students`,
  studentsReport: `/exam-report`,
  subjectGrades: `/grades-subjects`,
  mainHeading: `/curriculums/main-headings`,
  subHeading: `/curriculums/sub-headings`,
  findOrganization: `/find-organization`,
  assignment: `/assignments`,
};

export type ROUTES = keyof typeof ROUTES_OBJ;
const getRoute = (routeName: ROUTES, params = {}): string => {
  let url: string = ROUTES_OBJ[routeName];
  return url;
};

export default getRoute;
