/**
 * helper-js v0.0.2
 * https://github.com/defypro/helper-js
 * @license MIT
 */
/**
 * 返回URL参数对象
 */
var getParams = function getParams(key) {
  var arr = (location.search || "").replace(/^\?/, '').split("&");
  var params = {};
  var data = [];

  for (var i = 0; i < arr.length; i++) {
    data = arr[i].split("=");

    if (data.length === 2) {
      params[data[0]] = data[1];
    }
  }

  return key ? params[key] : params;
};
/**
 * 获取hash(取消#)
 */

var getHash = function getHash() {
  return (location.search || "").replace("#", '');
};
/**
 * 获取URL
 * @param {*} params 
 */

var getUrl = function getUrl(params) {
  if (params === void 0) params = {};
  var query = '';
  Object.keys(params).forEach(function (key) {
    query += key + '=' + params[key] + '&';
  });

  if (query.length > 0) {
    query = '?' + query.substr(0, query.length - 1);
  }

  return location.href.replace(location.search, '').replace(location.hash, '') + query;
};
var url = {
  getParams: getParams,
  getHash: getHash,
  getUrl: getUrl
};

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var u = navigator.userAgent;
var isAndroid = function isAndroid() {
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
};
var isIOS = function isIOS() {
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};
var isWeiXin = function isWeiXin() {
  return u.indexOf('MicroMessenger') > -1;
};
/**
 * 移动端初始化
 */

var mobileInit = function mobileInit() {
  function handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke('setFontSizeCallback', {
      'fontSize': 0
    }); // 重写设置网页字体大小的事件

    WeixinJSBridge.on('menu:setfont', function () {
      WeixinJSBridge.invoke('setFontSizeCallback', {
        'fontSize': 0
      });
    });
  }

  if (isAndroid()) {
    if ((typeof WeixinJSBridge === "undefined" ? "undefined" : _typeof(WeixinJSBridge)) == "object" && typeof WeixinJSBridge.invoke == "function") {
      handleFontSize();
    } else {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", handleFontSize);
        document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
      }
    }
  }

  if (isIOS()) {
    window.addEventListener('focusout', function () {
      setTimeout(function () {
        window.scrollTo(0, document.documentElement.scrollTop || document.body.scrollTop);
      }, 100);
    });
  }

  var bodyHeight = window.document.body.offsetHeight;
  var timer = setInterval(function () {
    bodyHeight = window.document.body.offsetHeight;

    if (bodyHeight > 0) {
      clearInterval(timer);
    }
  }, 100);

  window.onresize = function () {
    if (window.history && window.history.length > 1 && isIOS() && isWeiXin()) {
      bodyHeight -= 49;
    }

    if (bodyHeight - window.document.body.offsetHeight > 49) {
      window.document.body.style.height = bodyHeight + 'px';
    }
  };
};
var platform = {
  isAndroid: isAndroid,
  isIOS: isIOS,
  isWeiXin: isWeiXin,
  mobileInit: mobileInit
};

var _storage = window.localStorage;

var cache = function cache() {};

cache.prototype.setItem = function (k, v, t) {
  var seconds = parseInt(t);
  var expire = 0;

  if (seconds > 0) {
    expire = new Date().getTime() + seconds * 1000;
  }

  _storage.setItem(k, JSON.stringify({
    value: v,
    expire: expire
  }));
};

cache.prototype.getItem = function (k, _default) {
  if (_default === void 0) _default = null;
  var time = new Date().getTime();

  var valueItem = _storage.getItem(k);

  if (!valueItem) {
    return _default;
  }

  var ref = JSON.parse(valueItem);
  var value = ref.value;
  var expire = ref.expire;

  if (expire === 0 || expire > time) {
    return value || _default;
  }

  _storage.removeItem(k);

  return _default;
};

cache.prototype.removeItem = function (k) {
  _storage.removeItem(k);
};

var cache$1 = new cache();

var validate = {
  required: function required(value) {
    var this$1 = this;

    if (value === undefined || value === null) {
      return false;
    }

    if (Array.isArray(value)) {
      return value.length > 0 && value.every(function (val) {
        return this$1.required(val);
      });
    }

    return !!String(value).trim().length;
  },
  max: function max(value, length) {
    if (value === undefined || value === null) {
      return length >= 0;
    }

    if (Array.isArray(value)) {
      return value.length <= length;
    }

    return String(value).length <= length;
  },
  min: function min(value, length) {
    if (value === undefined || value === null) {
      return length >= 0;
    }

    if (Array.isArray(value)) {
      return value.length >= length;
    }

    return String(value).length >= length;
  },
  minValue: function minValue(value, min) {
    var this$1 = this;

    if (value === null || value === undefined || value === '') {
      return false;
    }

    if (Array.isArray(value)) {
      return value.length > 0 && value.every(function (val) {
        return this$1.minValue(val, min);
      });
    }

    return Number(value) >= min;
  },
  maxValue: function maxValue(value, max) {
    var this$1 = this;

    if (value === null || value === undefined || value === '') {
      return false;
    }

    if (Array.isArray(value)) {
      return value.length > 0 && value.every(function (val) {
        return this$1.maxValue(val, max);
      });
    }

    return Number(value) <= max;
  },
  numeric: function numeric(value) {
    return /^[0-9]+$/.test(String(value));
  },
  exactLength: function exactLength(value, length) {
    return String(value).length === length;
  },
  mobilePhone: function mobilePhone(value) {
    return this.required(value) && this.numeric(value) && this.exactLength(value, 11);
  }
};

var format = function format(date, formatStr) {
  if (formatStr === void 0) formatStr = 'YYYY-MM-DD HH:mm:ss';

  var _date = new Date(date);

  var _y = _date.getFullYear();

  var _M = _date.getMonth();

  var _D = _date.getDate();

  var _W = _date.getDay();

  var _H = _date.getHours();

  var _m = _date.getMinutes();

  var _s = _date.getSeconds();

  var _ms = _date.getMilliseconds();

  function s0(str) {
    if (!str.toString().length) {
      return '';
    }

    if (str.toString().length === 1) {
      return '0' + str;
    }

    return str.toString();
  }

  function h12(h) {
    if (h > 12) {
      return h - 12;
    }

    return h;
  }

  var matches = {
    YY: String(_y).slice(-2),
    YYYY: String(_y),
    M: String(_M + 1),
    MM: s0(_M + 1),
    D: _D,
    DD: s0(_D),
    H: String(_H),
    HH: s0(_H),
    h: h12(_H),
    hh: s0(h12(_H)),
    m: String(_m),
    mm: s0(_m),
    s: String(_s),
    ss: s0(_s)
  };
  return formatStr.replace(/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, function (match, $1) {
    return $1 || matches[match] || '';
  });
};
var date = {
  format: format
};

var index = {
  url: url,
  platform: platform,
  cache: cache$1,
  validate: validate,
  date: date
};

export default index;
