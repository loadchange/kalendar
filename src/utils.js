export function getChinaStandard(date, streamline) {
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = `${month < 10 ? '0' : ''}${month}`
    day = `${day < 10 ? '0' : ''}${day}`
    const arr = streamline ? [date.getFullYear(), month] : [date.getFullYear(), month, day]
    return arr.join('-')
}

export function getMonthDays(date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const leapYear = !(year % 4) && ((year % 100) || !(year % 400))
    const days = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return days[month]
}

export function getDate(dateStr) {
    const date = new Date()
    const [year, month] = dateStr.split('-')
    date.setFullYear(+year)
    date.setMonth(month - 1)
    return date
}
