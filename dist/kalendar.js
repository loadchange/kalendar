(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Kalendar = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
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
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var animals = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
  var lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a4d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520];

  var Solar2lunar =
  /*#__PURE__*/
  function () {
    function Solar2lunar(date) {
      _classCallCheck(this, Solar2lunar);

      this.y = date.getFullYear();
      this.m = date.getMonth();
      this.d = date.getDate();
    }
    /**
     * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
     * @param y
     * @returns {number}
     */


    _createClass(Solar2lunar, [{
      key: "leapMonth",
      value: function leapMonth(y) {
        return lunarInfo[y - 1900] & 0xf;
      }
    }, {
      key: "leapDays",
      value: function leapDays(y) {
        if (this.leapMonth(y)) {
          return lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
        }

        return 0;
      }
    }, {
      key: "lYearDays",
      value: function lYearDays(y) {
        var i;
        var sum = 348;

        for (i = 0x8000; i > 0x8; i >>= 1) {
          sum += lunarInfo[y - 1900] & i ? 1 : 0;
        }

        return sum + this.leapDays(y);
      }
    }, {
      key: "monthDays",
      value: function monthDays(y, m) {
        return lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
      }
    }, {
      key: "convert",
      value: function convert() {
        var y = this.y,
            m = this.m,
            d = this.d;
        if (y < 1900 || y > 2100 || y === 1900 && !m && d < 31) return {};
        var i;
        var temp = 0;
        var offset = (Date.UTC(y, m, d) - Date.UTC(1900, 0, 31)) / 86400000;

        for (i = 1900; i < 2101 && offset > 0; i++) {
          temp = this.lYearDays(i);
          offset -= temp;
        }

        if (offset < 0) {
          offset += temp;
          i -= 1;
        }

        var year = i; // 农历年

        var leap = this.leapMonth(i); // 闰哪个月

        var isLeap = false;

        for (i = 1; i < 13 && offset > 0; i++) {
          if (leap > 0 && i === leap + 1 && !isLeap) {
            // 闰月
            i -= 1;
            isLeap = true;
            temp = this.leapDays(year); // 计算农历闰月天数
          } else {
            temp = this.monthDays(year, i); // 计算农历普通月天数
          }

          isLeap = !(isLeap && i === leap + 1); // 解除闰月

          offset -= temp;
        }

        if (!offset && leap > 0 && i === leap + 1) {
          isLeap = !isLeap;
          if (isLeap) i -= 1;
        }

        if (offset < 0) {
          offset += temp;
          i -= 1;
        }

        var month = i; // 农历月

        var day = offset + 1; // 农历日

        return {
          year: year,
          leap: leap,
          month: month,
          day: day
        };
      }
    }]);

    return Solar2lunar;
  }();

  var getChinaStandard = function getChinaStandard(date, streamline) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = "".concat(month < 10 ? '0' : '').concat(month);
    day = "".concat(day < 10 ? '0' : '').concat(day);
    var arr = streamline ? [date.getFullYear(), month] : [date.getFullYear(), month, day];
    return arr.join('-');
  };
  var getMonthDays = function getMonthDays(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var leapYear = !(year % 4) && (year % 100 || !(year % 400));
    var days = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month];
  };
  var getDate = function getDate(dateStr) {
    var date = new Date();

    var _dateStr$split = dateStr.split('-'),
        _dateStr$split2 = _slicedToArray(_dateStr$split, 2),
        year = _dateStr$split2[0],
        month = _dateStr$split2[1];

    date.setFullYear(+year);
    date.setMonth(month - 1, 1);
    return date;
  };
  var eraseTime = function eraseTime(timeStamp) {
    var date = new Date(timeStamp);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  };
  var calcMonth = function calcMonth(date) {
    return date.getFullYear() * 12 + date.getMonth() + 1;
  };
  var getAnimal = function getAnimal(date) {
    return animals[date.getFullYear() % 12];
  };
  var lunar = function lunar(date) {
    return new Solar2lunar(date).convert();
  };

  var Day =
  /*#__PURE__*/
  function () {
    function Day(date) {
      var _this = this;

      var extension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Day);

      var toDay = eraseTime(new Date().getTime());
      var timestamp = eraseTime(date.getTime());
      var dateText = getChinaStandard(date);

      var assignment = _objectSpread({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay(),
        past: toDay > timestamp,
        today: toDay === eraseTime(timestamp),
        animal: getAnimal(date),
        lunar: lunar(date),
        dateText: dateText,
        timestamp: timestamp
      }, extension);

      Object.keys(assignment).forEach(function (key) {
        return _this.set(key, assignment[key]);
      });
    }

    _createClass(Day, [{
      key: "set",
      value: function set(key, val) {
        this[key] = val;
      }
    }]);

    return Day;
  }();

  var Kalendar =
  /*#__PURE__*/
  function () {
    function Kalendar() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          start = _ref.start,
          end = _ref.end,
          _ref$unifiedMount = _ref.unifiedMount,
          unifiedMount = _ref$unifiedMount === void 0 ? {} : _ref$unifiedMount,
          _ref$mount = _ref.mount,
          mount = _ref$mount === void 0 ? {} : _ref$mount,
          _ref$weekStart = _ref.weekStart,
          weekStart = _ref$weekStart === void 0 ? 0 : _ref$weekStart;

      _classCallCheck(this, Kalendar);

      this.startTime = start;
      this.endTime = end;
      this.unifiedMount = unifiedMount;
      this.mount = mount;
      this.weekStart = weekStart;
      return this._create();
    }

    _createClass(Kalendar, [{
      key: "_create",
      value: function _create() {
        var startDate = this.startDate,
            endDate = this.endDate;
        var table = {};
        var count = calcMonth(endDate) - calcMonth(startDate);
        var startTime = eraseTime(startDate.getTime());
        if (count < 0) return null;
        var idx = 0;

        do {
          var date = new Date(startTime);
          date.setMonth(date.getMonth() + idx);
          table[getChinaStandard(date, true)] = Kalendar.monthly(_objectSpread({
            date: date
          }, this));
          idx += 1;
        } while (count > idx);

        return table;
      }
    }, {
      key: "startDate",
      get: function get() {
        var date = this.startTime ? getDate(this.startTime) : new Date();
        date.setDate(1);
        return date;
      }
    }, {
      key: "endDate",
      get: function get() {
        if (this.endTime) return getDate(this.endTime);
        var date = this.startDate;
        date.setMonth(date.getMonth() + 3);
        return date;
      }
    }], [{
      key: "monthly",
      value: function monthly(_ref2) {
        var date = _ref2.date,
            _ref2$mount = _ref2.mount,
            mount = _ref2$mount === void 0 ? {} : _ref2$mount,
            _ref2$unifiedMount = _ref2.unifiedMount,
            unifiedMount = _ref2$unifiedMount === void 0 ? {} : _ref2$unifiedMount,
            _ref2$weekStart = _ref2.weekStart,
            weekStart = _ref2$weekStart === void 0 ? 0 : _ref2$weekStart,
            continuous = _ref2.continuous;
        date.setDate(1);
        var monthTable = [];
        var days = getMonthDays(date);
        var day = date.getDay();
        var skip = 0;
        if (day !== weekStart) skip = (day || 7) - weekStart;

        for (var i = 0; i < days + skip; i += 7) {
          var week = [];
          var num = 7;

          if (!i && skip) {
            for (var k = 0; k < skip; k++) {
              if (continuous) {
                var agoneDate = new Date(date.valueOf());
                agoneDate.setDate(agoneDate.getDate() - skip + k);
                var previousDateText = getChinaStandard(agoneDate);
                week.push(new Day(agoneDate, Object.assign({}, unifiedMount, mount[previousDateText])));
              } else {
                week.push(null);
              }
            }

            num -= skip;
          }

          for (var j = 0; j < num; j++) {
            var dateText = getChinaStandard(date);
            week.push(new Day(date, Object.assign({}, unifiedMount, mount[dateText])));
            if (date.getDate() >= days) break;
            date.setDate(date.getDate() + 1);
          }

          var futureDate = new Date(date.valueOf());

          while (week.length < num) {
            if (continuous) {
              futureDate.setDate(futureDate.getDate() + 1);

              var _dateText = getChinaStandard(futureDate);

              week.push(new Day(futureDate, Object.assign({}, unifiedMount, mount[_dateText])));
            } else {
              week.push(null);
            }
          }

          monthTable.push(week);
        }

        return monthTable;
      }
    }]);

    return Kalendar;
  }();

  return Kalendar;

}));
//# sourceMappingURL=kalendar.js.map
