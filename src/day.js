import * as utils from './utils';

class Day {
  constructor(date, extension = {}) {
    const toDay = utils.eraseTime(new Date().getTime());
    const timestamp = utils.eraseTime(date.getTime());
    const dateText = utils.getChinaStandard(date);
    const assignment = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      day: date.getDay(),
      past: toDay > timestamp,
      today: toDay === utils.eraseTime(timestamp),
      animal: utils.getAnimal(date),
      lunar: utils.lunar(date),
      dateText,
      timestamp,
      ...extension,
    };
    Object.keys(assignment).forEach(key => this.set(key, assignment[key]));
  }

  set(key, val) {
    this[key] = val;
  }
}

export default Day;
