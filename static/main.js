function getChinaStandard(date, streamline) {
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = `${month < 10 ? '0' : ''}${month}`
  day = `${day < 10 ? '0' : ''}${day}`
  const arr = streamline ? [date.getFullYear(), month] : [date.getFullYear(), month, day]
  return arr.join('-')
}

var unifiedMount = {
  total: 1000,
  price: 550,
  bg: 'info'
}

var continuous = false;
var date = new Date()
var mount = {}
var monthTable = {}
var monthText = document.getElementById('month-text')

function render() {

  var testKey = getChinaStandard(date, true)
  var testConf = { flow: 'high', price: 750 }
  var rand = 0
  var i = 0
  for (; i < 5; i++) {
    rand = Math.floor(Math.random() * 27 + 1);
    mount[`${testKey}-${rand < 10 ? '0' : ''}${rand}`] = testConf
  }

  testConf = { total: 0 }
  for (i = 0; i < 3; i++) {
    rand = Math.floor(Math.random() * 27 + 1);
    mount[`${testKey}-${rand < 10 ? '0' : ''}${rand}`] = testConf
  }
  monthTable = kalendar.monthly({ date: date, mount: mount, unifiedMount: unifiedMount, continuous: continuous })
  monthText.innerHTML = getChinaStandard(date, true)
  var html = []
  monthTable.forEach(week => {
    html.push('<tr align="center">')
    week.forEach(day => {
      let css = []
      const prefix = 'table-'
      if (day && day.month === date.getMonth()) {
        if (day.bg) css.push(`${prefix}${day.bg}`)
        if ([0, 6].indexOf(day.day) >= 0) css.push('bg-warning')
        if (day.flow === 'high') css.push('bg-danger')
        if (day.total === 0) css.push(`sold-out`)
      }
      html.push(`<td class="${css.join(' ')}"${day ? ` onclick="clickDate('${day.dateText}')"` : ''}>${day ? (`${day.date}<br />￥${day.price}`) : ''}</td>`)
    })
    html.push('</tr>')
  })
  document.getElementById('main-body').innerHTML = html.join('')
}

render()

$('.continuous-btn').click(function () {
  continuous = !continuous;
  render();
}).html(continuous ? 'Continuous' : 'ndependent');

document.getElementById('previous').onclick = function () {
  var month = date.getMonth() - 1
  date.setMonth(month, 1)
  render()
}

document.getElementById('next').onclick = function () {
  var month = date.getMonth() + 1
  date.setMonth(month, 1)
  render()
}

function clickDate(dateText) {
  $('.modal-content').html(dateText)
  $('#myModal').modal('show')
}

var kalendar2 = new kalendar()
var html2 = []
for (var dateText in kalendar2) {
  html2.push('<tr align="center" class="table-success">')
  html2.push(`<td colspan="7">${dateText}</td>`)
  html2.push('</tr>')
  kalendar2[dateText].forEach(week => {
    html2.push('<tr align="center">')
    week.forEach(day => {
      html2.push(`<td>${day ? day.date : ''}</td>`)
    })
    if (week.length < 7) {
      for (var i = 0; i < 7 - week.length; i++) {
        html2.push('<td></td>')
      }
    }
    html2.push('</tr>')
  })
}
$('#main-body2').html(html2.join(''))
