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
  var animals = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
  var getAnimal = function getAnimal(date) {
    return animals[date.getFullYear() % 12];
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
