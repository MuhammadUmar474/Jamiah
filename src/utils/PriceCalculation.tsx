export const calculateObtainedMarks = (examList: []) => {
  let totalMarks = 0;
  examList?.map((exam: any) => {
    totalMarks += parseFloat(exam.mark);
  });
  return totalMarks;
};

export const calculateTotalMarks = (examList: []) => {
  let totalMarks = 0;
  examList?.map((exam: any) => {
    totalMarks += parseFloat(exam?.exam?.total_mark);
  });
  return totalMarks;
};
