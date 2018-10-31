import Day from './day'
import * as utils from './utils'

export default class Kalendar {
    constructor({start, end, unifiedMount = {}, mount = {}, weekStart = 0} = {}) {
        this.startTime = start
        this.endTime = end
        this.unifiedMount = unifiedMount
        this.mount = mount
        this.weekStart = weekStart
        return this._create()
    }

    get startDate() {
        const date = this.startTime ? utils.getDate(this.startTime) : new Date()
        date.setDate(1)
        return date
    }

    get endDate() {
        if (this.endTime) return utils.getDate(this.endTime)
        const date = this.startDate
        date.setMonth(date.getMonth() + 3)
        return date
    }

    _create() {
        const {mount, weekStart, unifiedMount, startDate, endDate} = this
        const table = {}
        let count = (endDate.getFullYear() * 12 + endDate.getMonth() + 1)
            - (startDate.getFullYear() * 12 + startDate.getMonth() + 1)
        if (count < 0) return null
        let idx = 0
        do {
            const date = new Date(startDate.getTime())
            date.setMonth(date.getMonth() + idx)
            table[utils.getChinaStandard(date, true)] = Kalendar.monthly({date, mount, weekStart, unifiedMount})
            count--
            idx++
        } while (count > 0)
        return table
    }

    static monthly({date, mount = {}, weekStart = 0, unifiedMount = {}}) {
        date.setDate(1)
        const monthTable = []
        const days = utils.getMonthDays(date)
        const day = date.getDay()
        let skip = 0
        if (day !== weekStart) skip = day - weekStart
        for (let i = 0; i < days + skip; i += 7) {
            const week = []
            let num = 7
            if (!i && skip) {
                for (let k = 0; k < skip; k++) week.push(null)
                num -= skip
            }
            for (let j = 0; j < num; j++) {
                const dateText = utils.getChinaStandard(date)
                week.push(new Day(date, Object.assign({}, unifiedMount, mount[dateText])))
                if (date.getDate() >= days) break
                date.setDate(date.getDate() + 1)
            }
            while (week.length < num) week.push(null)
            monthTable.push(week)
        }
        return monthTable
    }
}
