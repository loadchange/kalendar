(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Kalendar = factory());
}(this, (function () { 'use strict';

    function getChinaStandard(date, streamline) {
        var month = date.getMonth();
        var day = date.getDate();
        if (month < 10) {
            month = '0' + (month + 1);
        }
        if (day < 10) {
            day = '0' + day;
        }
        var arr = streamline ? [date.getFullYear(), month] : [date.getFullYear(), month, day];
        return arr.join('-');
    }

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

    var Day = function () {
        function Day(dateObj, extension) {
            classCallCheck(this, Day);

            this.__DateObject__ = dateObj;
            this.year = dateObj.getFullYear();
            this.month = dateObj.getMonth();
            this.date = dateObj.getDate();
            this.day = dateObj.getDay();
            this.dateText = getChinaStandard(dateObj);
            this.extension = extension;
            this.past = this.toDay.getTime() > dateObj.getTime();
            this.today = getChinaStandard(new Date()) === this.dateText;
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
        function Kalendar() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            classCallCheck(this, Kalendar);

            this.startTime = options.startTime;
            this.endTime = options.endTime;
            this.unifiedMount = options.unifiedMount || {};
            this.mount = options.mount || {};
            this.weekStart = options.weekStart || 0;
            return this._create();
        }

        createClass(Kalendar, [{
            key: '_getMonthDays',
            value: function _getMonthDays(date) {
                var year = date.getFullYear();
                var month = date.getMonth();
                var leapYear = !(year % 4) && (year % 100 || !(year % 400));
                var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (leapYear) {
                    days[1] = 29;
                }
                return days[month];
            }
        }, {
            key: '_getDate',
            value: function _getDate(dateStr) {
                var date = new Date();
                var year = void 0,
                    month = void 0;

                var _dateStr$split = dateStr.split('-');

                var _dateStr$split2 = slicedToArray(_dateStr$split, 2);

                year = _dateStr$split2[0];
                month = _dateStr$split2[1];

                date.setFullYear(+year);
                date.setMonth(--month);
                return date;
            }
        }, {
            key: '_create',
            value: function _create() {
                var table = {};
                var count = this.endDate.getFullYear() * 12 + this.endDate.getMonth() + 1 - (this.startDate.getFullYear() * 12 + this.startDate.getMonth() + 1);
                if (count < 0) {
                    return null;
                }
                var idx = 0;
                do {
                    var date = this.startDate;
                    date.setMonth(date.getMonth() + idx);
                    var monthTable = [];
                    var days = this._getMonthDays(date);
                    date.setDate(1);
                    var day = date.getDay();
                    var skip = 0;
                    // 月的第一天不是起点
                    if (day !== this.weekStart) {
                        skip = day - this.weekStart;
                    }
                    for (var i = 0; i < days + skip; i += 7) {
                        var week = [];
                        var num = 7;
                        if (!i && skip) {
                            for (var k = 0; k < skip; k++) {
                                week.push(null);
                            }
                            num -= skip;
                        }
                        for (var j = 0; j < num; j++) {
                            var dateText = getChinaStandard(date);
                            var mount = Object.assign({}, this.unifiedMount, this.mount[dateText]);
                            week.push(new Day(date, mount));
                            if (date.getDate() < days) {
                                date.setDate(date.getDate() + 1);
                            } else {
                                break;
                            }
                        }
                        monthTable.push(week);
                    }

                    table[getChinaStandard(date, true)] = monthTable;
                    count--;
                    idx++;
                } while (count > 0);
                return table;
            }
        }, {
            key: 'startDate',
            get: function get$$1() {
                if (this.startTime) {
                    return this._getDate(this.startTime);
                }
                return new Date();
            }
        }, {
            key: 'endDate',
            get: function get$$1() {
                if (this.endTime) {
                    return this._getDate(this.endTime);
                }
                var date = this.startDate;
                date.setMonth(date.getMonth() + 3);
                return date;
            }
        }]);
        return Kalendar;
    }();

    return Kalendar;

})));
