export interface LeapDate {
  year: number;
  leap: number;
  month: number;
  day: number;
}

export interface KalendarProps<T, E> {
  startDate?: string | Date;
  endDate?: string | Date;
  weekStart?: number;
  unifiedMount?: T;
  mount?: E;
}


export interface MonthlyProps<T, E> {
  date: Date;
  unifiedMount?: T;
  mount?: E;
  weekStart: number;
  continuous?: boolean
}
