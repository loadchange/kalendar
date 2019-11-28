import { eraseTime, getChinaStandard, getAnimal, lunar } from './utils';

export class Day {
  constructor(date: Date, extension: any = {}) {
    const toDay = eraseTime(new Date().getTime());
    const timestamp = eraseTime(date.getTime());
    const dateText = getChinaStandard(date);
    const assignment = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      day: date.getDay(),
      past: toDay > timestamp,
      today: toDay === eraseTime(timestamp),
      animal: getAnimal(date),
      lunar: lunar(date),
      dateText,
      timestamp,
      ...extension,
    };
    Object.keys(assignment).forEach(key => this.set(key, assignment[key]));
  }

  set(key: string, val: any) {
    (this as any)[key] = val;
  }
}
