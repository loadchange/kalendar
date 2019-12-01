import { monthly } from './monthly';
import { KalendarProps } from "./types";
import { isDate, isString, getDate, calcMonth, eraseTime, getChinaStandard } from "./utils";

export class Kalendar<T, E> {
  static monthly = monthly;
  startDate!: Date;
  endDate!: Date;
  unifiedMount?: T;
  mount?: E;
  weekStart: number;

  constructor(props?: KalendarProps<T, E>) {
    const { startDate, endDate, unifiedMount, mount, weekStart } = props || {};
    this.setStartDate(startDate);
    this.setEndDate(endDate);
    this.unifiedMount = unifiedMount;
    this.mount = mount;
    this.weekStart = weekStart ? weekStart : 0;
    // @ts-ignore
    return this.create();
  }

  private setStartDate(date?: Date | string) {
    if (isDate(date)) {
      this.startDate = date;
    } else if (isString(date)) {
      this.startDate = getDate(date);
    } else {
      this.startDate = new Date();
    }
    this.startDate.setDate(1);
  }

  private setEndDate(date?: Date | string) {
    if (isDate(date)) {
      this.endDate = date
    } else if (isString(date)) {
      this.endDate = getDate(date)
    } else {
      this.endDate = new Date(this.startDate.getTime());
      this.endDate.setMonth(this.endDate.getMonth() + 3);
    }
  }

  create() {
    const { startDate, endDate } = this;
    const table = {} as any;
    const count = calcMonth(endDate) - calcMonth(startDate);
    const startTime = eraseTime(startDate.getTime());
    if (count < 0) return null;
    let idx = 0;
    do {
      const date = new Date(startTime);
      date.setMonth(date.getMonth() + idx);
      table[getChinaStandard(date, true)] = monthly({ date, ...this });
      idx += 1;
    } while (count > idx);
    return table;
  }
}
