import { Day } from "./day";
import { getMonthDays, getChinaStandard } from "./utils";
import { MonthlyProps } from "./types";

export function monthly<T, E>(props: MonthlyProps<T, E>) {
  const { date, mount, unifiedMount, weekStart = 0, continuous } = props;
  date.setDate(1);
  const monthTable = [];
  const days = getMonthDays(date);
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
          const previousDateText = getChinaStandard(agoneDate);
          week.push(new Day(agoneDate, Object.assign({}, unifiedMount, getExtension(mount, previousDateText))));
        } else {
          week.push(null);
        }
      }
      num -= skip;
    }
    for (let j = 0; j < num; j++) {
      const dateText = getChinaStandard(date);
      week.push(new Day(date, Object.assign({}, unifiedMount, getExtension(mount, dateText))));
      if (date.getDate() >= days) break;
      date.setDate(date.getDate() + 1);
    }
    const futureDate = new Date(date.valueOf());
    while (week.length < num) {
      let day = null;
      if (continuous) {
        futureDate.setDate(futureDate.getDate() + 1);
        const dateText = getChinaStandard(futureDate);
        const dayMount = getExtension(mount, dateText);
        const extension = Object.assign({}, unifiedMount, dayMount)
        day = new Day(futureDate, extension)
      }
      week.push(day);
    }
    monthTable.push(week);
  }
  return monthTable;
}

function getExtension(mount: any, key: string) {
  if (mount && (mount).hasOwnProperty(key)) {
    return mount[key];
  }
  return null;
}
