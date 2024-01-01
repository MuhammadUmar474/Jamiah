export const getLeftActivationDays = (finishDate: string) => {
  // Set the target date that you are interested in
  const targetDate = new Date(finishDate);

  // Get the current date
  const currentDate = new Date();

  var Difference_In_Time = targetDate.getTime() - currentDate.getTime();

  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return Math.floor(Difference_In_Days);
};
