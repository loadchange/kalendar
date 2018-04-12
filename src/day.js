import * as utils from './utils'

export default class Day {
    constructor(dateObj, extension = {}) {
        this.year = dateObj.getFullYear()
        this.month = dateObj.getMonth()
        this.date = dateObj.getDate()
        this.day = dateObj.getDay()
        this.dateText = utils.getChinaStandard(dateObj)
        this.past = this.toDay.getTime() > dateObj.getTime()
        this.today = utils.getChinaStandard(new Date()) === this.dateText
        this.timestamp = dateObj.getTime()
        let _self = this
        Object.keys(extension).forEach(key => {
            _self[key] = extension[key]
        })
    }

    get toDay() {
        let date = new Date()
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        return date
    }
}