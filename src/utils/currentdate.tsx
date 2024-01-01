import {format} from 'date-fns';

export const CurrentDate = () => {
  const newDate = new Date();
  const CURRENT_DATE = format(newDate, 'yyyy-MM-dd');
  return CURRENT_DATE;
};
