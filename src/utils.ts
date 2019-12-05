import { animals } from './constants';
import { Solar2lunar } from './solar2lunar';

export const supplement = (str: any) => (Array(2).join('0') + String(str)).slice(-2);

export const getChinaStandard = (date: Date, streamline?: boolean) => {
  let month = supplement(date.getMonth() + 1);
  let day = supplement(date.getDate());
  const arr = streamline ? [ date.getFullYear(), month ] : [ date.getFullYear(), month, day ];
  return arr.join('-');
};

export const getMonthDays = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const leapYear = !(year % 4) && ((year % 100) || !(year % 400));
  const days = [ 31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  return days[month];
};

export const getDate = (dateStr: string) => {
  const date = new Date();
  const [ year, month ] = dateStr.split('-');
  date.setFullYear(+year);
  date.setMonth(+month - 1, 1);
  return date;
};

export const eraseTime = (timeStamp: number) => {
  const date = new Date(timeStamp);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

export const calcMonth = (date: Date) => date.getFullYear() * 12 + date.getMonth() + 1;

export const getAnimal = (date: Date) => animals[date.getFullYear() % 12];

export const lunar = (date: Date) => new Solar2lunar(date).convert();

export const isDate = (date: any): date is Date => Object.prototype.toString.call(date) === '[object Date]'
export const isString = (str: any): str is Date => typeof str === 'string'
