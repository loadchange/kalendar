import Day from './day'

export default class Kalendar {
    constructor(options = {}) {
        this.startTime = options.startTime
        this.endTime = options.endTime
        this.mount = options.mount || {}
        this.weekStart = options.weekStart || 0
        return this._create()
    }

    _getMonthDays(date) {
        let year = date.getFullYear()
        let month = date.getMonth()
        let leapYear = !(year % 4) && ((year % 100) || !(year % 400))
        let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if (leapYear) {
            days[1] = 29
        }
        return days[month]
    }

    _getDate(dateStr) {
        let date = new Date()
        let year, month
        [year, month] = dateStr.split('-')
        date.setFullYear(+year)
        date.setMonth(--month)
        return date
    }

    get startDate() {
        if (this.startTime) {
            return this._getDate(this.startTime)
        }
        return new Date()
    }

    get endDate() {
        if (this.endTime) {
            return this._getDate(this.endTime)
        }
        let date = this.startDate
        date.setMonth(date.getMonth() + 3)
        return date
    }

    _getChinaStandard(date, streamline) {
        let month = date.getMonth()
        let day = date.getDate()
        if (month < 10) {
            month = `0${month+1}`
        }
        if (day < 10) {
            day = `0${day}`
        }
        let arr = streamline ? [date.getFullYear(), month] : [date.getFullYear(), month, day]
        return arr.join('-')
    }

    _create() {
        let table = {}
        let count = (this.endDate.getFullYear() * 12 + this.endDate.getMonth() + 1)
            - (this.startDate.getFullYear() * 12 + this.startDate.getMonth() + 1)
        if (count < 0) {
            return null
        }
        let idx = 0
        do {
            let date = this.startDate
            date.setMonth(date.getMonth() + idx)
            let monthTable = []
            let days = this._getMonthDays(date)
            date.setDate(1)
            let day = date.getDay()
            let skip = 0
            // 月的第一天不是起点
            if (day !== this.weekStart) {
                skip = day - this.weekStart
            }
            for (let i = 0; i < days + skip; i += 7) {
                let week = []
                let num = 7
                if (!i && skip) {
                    for (let k = 0; k < skip; k++) {
                        week.push(null)
                    }
                    num -= skip
                }
                for (let j = 0; j < num; j++) {
                    week.push(new Day(date, this.mount[this._getChinaStandard(date)]))
                    if (date.getDate() < days) {
                        date.setDate(date.getDate() + 1)
                    } else {
                        break
                    }
                }
                monthTable.push(week)
            }

            table[this._getChinaStandard(date, true)] = monthTable
            count--
            idx++
        } while (count > 0)
        return table
    }

}