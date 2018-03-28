import * as utils from './utils'

export default class Day {
    constructor(dateObj, extension) {
        this.__DateObject__ = dateObj
        this.year = dateObj.getFullYear()
        this.month = dateObj.getMonth()
        this.date = dateObj.getDate()
        this.day = dateObj.getDay()
        this.dateText = utils.getChinaStandard(dateObj)
        this.extension = extension
        this.past = this.toDay.getTime() > dateObj.getTime()
        console.log(utils.getChinaStandard(new Date()), this.dateText)
        this.today = utils.getChinaStandard(new Date()) === this.dateText
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