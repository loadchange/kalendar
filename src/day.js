export default class Day {
    constructor(dateObj, extension) {
        this.__DateObject__ = dateObj
        this.year = dateObj.getFullYear()
        this.month = dateObj.getMonth()
        this.date = dateObj.getDate()
        this.day = dateObj.getDay()
        this.extension = extension
    }
}