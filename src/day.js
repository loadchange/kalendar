export default class Day {
    constructor(dateObj, dateText, extension) {
        this.__DateObject__ = dateObj
        this.year = dateObj.getFullYear()
        this.month = dateObj.getMonth()
        this.date = dateObj.getDate()
        this.day = dateObj.getDay()
        this.dateText = dateText
        this.extension = extension
    }
}