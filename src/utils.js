import { animals } from './constants';
import Solar2lunar from './solar2lunar';

export const getChinaStandard = (date, streamline) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = `${month < 10 ? '0' : ''}${month}`;
  day = `${day < 10 ? '0' : ''}${day}`;
  const arr = streamline ? [date.getFullYear(), month] : [date.getFullYear(), month, day];
  return arr.join('-');
};

export const getMonthDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const leapYear = !(year % 4) && ((year % 100) || !(year % 400));
  const days = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month];
};

export const getDate = (dateStr) => {
  const date = new Date();
  const [year, month] = dateStr.split('-');
  date.setFullYear(+year);
  date.setMonth(month - 1, 1);
  return date;
};

export const eraseTime = (timeStamp) => {
  const date = new Date(timeStamp);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

export const calcMonth = date => date.getFullYear() * 12 + date.getMonth() + 1;

export const getAnimal = date => animals[date.getFullYear() % 12];

export const lunar = date => new Solar2lunar(date).convert();
