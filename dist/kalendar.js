(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Kalendar = factory());
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function getChinaStandard(date, streamline) {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      month = '' + (month < 10 ? '0' : '') + month;
      day = '' + (day < 10 ? '0' : '') + day;
      var arr = streamline ? [date.getFullYear(), month] : [date.getFullYear(), month, day];
      return arr.join('-');
  }

  function getMonthDays(date) {
      var year = date.getFullYear();
      var month = date.getMonth();
      var leapYear = !(year % 4) && (year % 100 || !(year % 400));
      var days = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return days[month];
  }

  function getDate(dateStr) {
      var date = new Date();

      var _dateStr$split = dateStr.split('-'),
          _dateStr$split2 = slicedToArray(_dateStr$split, 2),
          year = _dateStr$split2[0],
          month = _dateStr$split2[1];

      date.setFullYear(+year);
      date.setMonth(month - 1);
      return date;
  }

  var Day = function () {
      function Day(dateObj) {
          var extension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          classCallCheck(this, Day);

          this.year = dateObj.getFullYear();
          this.month = dateObj.getMonth();
          this.date = dateObj.getDate();
          this.day = dateObj.getDay();
          this.dateText = getChinaStandard(dateObj);
          this.past = this.toDay.getTime() > dateObj.getTime();
          this.today = getChinaStandard(new Date()) === this.dateText;
          this.timestamp = dateObj.getTime();
          var _self = this;
          Object.keys(extension).forEach(function (key) {
              _self[key] = extension[key];
          });
      }

      createClass(Day, [{
          key: 'toDay',
          get: function get$$1() {
              var date = new Date();
              date.setHours(0);
              date.setMinutes(0);
              date.setSeconds(0);
              date.setMilliseconds(0);
              return date;
          }
      }]);
      return Day;
  }();

  var Kalendar = function () {
      function Kalendar(_ref) {
          var start = _ref.start,
              end = _ref.end,
              _ref$unifiedMount = _ref.unifiedMount,
              unifiedMount = _ref$unifiedMount === undefined ? {} : _ref$unifiedMount,
              _ref$mount = _ref.mount,
              mount = _ref$mount === undefined ? {} : _ref$mount,
              _ref$weekStart = _ref.weekStart,
              weekStart = _ref$weekStart === undefined ? 0 : _ref$weekStart;
          classCallCheck(this, Kalendar);

          this.startTime = start;
          this.endTime = end;
          this.unifiedMount = unifiedMount;
          this.mount = mount;
          this.weekStart = weekStart;
          return this._create();
      }

      createClass(Kalendar, [{
          key: '_create',
          value: function _create() {
              var mount = this.mount,
                  weekStart = this.weekStart,
                  unifiedMount = this.unifiedMount;

              var table = {};
              var count = this.endDate.getFullYear() * 12 + this.endDate.getMonth() + 1 - (this.startDate.getFullYear() * 12 + this.startDate.getMonth() + 1);
              if (count < 0) return null;
              var idx = 0;
              do {
                  var date = this.startDate;
                  date.setMonth(date.getMonth() + idx);
                  var monthTable = Kalendar.monthly({ date: date, mount: mount, weekStart: weekStart, unifiedMount: unifiedMount });
                  table[getChinaStandard(date, true)] = monthTable;
                  count--;
                  idx++;
              } while (count > 0);
              return table;
          }
      }, {
          key: 'startDate',
          get: function get$$1() {
              return this.startTime ? getDate(this.startTime) : new Date();
          }
      }, {
          key: 'endDate',
          get: function get$$1() {
              if (this.endTime) return getDate(this.endTime);
              var date = this.startDate;
              date.setMonth(date.getMonth() + 3);
              return date;
          }
      }], [{
          key: 'monthly',
          value: function monthly(_ref2) {
              var date = _ref2.date,
                  mount = _ref2.mount,
                  _ref2$weekStart = _ref2.weekStart,
                  weekStart = _ref2$weekStart === undefined ? 0 : _ref2$weekStart,
                  unifiedMount = _ref2.unifiedMount;

              var monthTable = [];
              var days = getMonthDays(date);
              date.setDate(1);
              var day = date.getDay();
              var skip = 0;
              if (day !== weekStart) skip = day - weekStart;
              for (var i = 0; i < days + skip; i += 7) {
                  var week = [];
                  var num = 7;
                  if (!i && skip) {
                      for (var k = 0; k < skip; k++) {
                          week.push(null);
                      }num -= skip;
                  }
                  for (var j = 0; j < num; j++) {
                      var dateText = getChinaStandard(date);
                      week.push(new Day(date, Object.assign(unifiedMount, mount[dateText])));
                      if (date.getDate() >= days) break;
                      date.setDate(date.getDate() + 1);
                  }
                  monthTable.push(week);
              }
              return monthTable;
          }
      }]);
      return Kalendar;
  }();

  return Kalendar;

})));
