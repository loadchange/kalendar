import Day from './day';
import * as utils from './utils';

class Kalendar {
  constructor({ start, end, unifiedMount = {}, mount = {}, weekStart = 0 } = {}) {
    this.startTime = start;
    this.endTime = end;
    this.unifiedMount = unifiedMount;
    this.mount = mount;
    this.weekStart = weekStart;
    return this._create();
  }

  get startDate() {
    const date = this.startTime ? utils.getDate(this.startTime) : new Date();
    date.setDate(1);
    return date;
  }

  get endDate() {
    if (this.endTime) return utils.getDate(this.endTime);
    const date = this.startDate;
    date.setMonth(date.getMonth() + 3);
    return date;
  }

  _create() {
    const { startDate, endDate } = this;
    const table = {};
    const count = utils.calcMonth(endDate) - utils.calcMonth(startDate);
    const startTime = utils.eraseTime(startDate.getTime());
    if (count < 0) return null;
    let idx = 0;
    do {
      const date = new Date(startTime);
      date.setMonth(date.getMonth() + idx);
      table[utils.getChinaStandard(date, true)] = Kalendar.monthly({ date, ...this });
      idx += 1;
    } while (count > idx);
    return table;
  }

  static monthly({ date, mount = {}, unifiedMount = {}, weekStart = 0, continuous }) {
    date.setDate(1);
    const monthTable = [];
    const days = utils.getMonthDays(date);
    const day = date.getDay();
    let skip = 0;
    if (day !== weekStart) skip = (day || 7) - weekStart;
    for (let i = 0; i < days + skip; i += 7) {
      const week = [];
      let num = 7;
      if (!i && skip) {
        for (let k = 0; k < skip; k++) {
          if (continuous) {
            const agoneDate = new Date(date.valueOf());
            agoneDate.setDate(agoneDate.getDate() - skip + k);
            const previousDateText = utils.getChinaStandard(agoneDate);
            week.push(new Day(agoneDate, Object.assign({}, unifiedMount, mount[previousDateText])));
          } else {
            week.push(null);
          }
        }
        num -= skip;
      }
      for (let j = 0; j < num; j++) {
        const dateText = utils.getChinaStandard(date);
        week.push(new Day(date, Object.assign({}, unifiedMount, mount[dateText])));
        if (date.getDate() >= days) break;
        date.setDate(date.getDate() + 1);
      }
      const futureDate = new Date(date.valueOf());
      while (week.length < num) {
        if (continuous) {
          futureDate.setDate(futureDate.getDate() + 1);
          const dateText = utils.getChinaStandard(futureDate);
          week.push(new Day(futureDate, Object.assign({}, unifiedMount, mount[dateText])));
        } else {
          week.push(null);
        }
      }
      monthTable.push(week);
    }
    return monthTable;
  }
}

export default Kalendar;
