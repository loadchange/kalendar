export function getChinaStandard(date, streamline) {
    let month = date.getMonth()
    let day = date.getDate()
    if (month < 10) {
        month = `0${month + 1}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    let arr = streamline ? [date.getFullYear(), month] : [date.getFullYear(), month, day]
    return arr.join('-')
}