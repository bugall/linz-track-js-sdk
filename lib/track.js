'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _helper = require('cy-lib/helper');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _config = require('cy-lib/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = require('cy-lib/debug')('track');
window._hmt = window._hmt || [];

var storage = store.namespace(_config2.default.name + '_' + _config2.default.version);

var TRACK_CONFIG = {
  huoDongYeShow: {
    tid: 'huoDongYeShow',
    ptid: '',
    cat: 12
  },
  shelfShow: {
    tid: '',
    ptid: '',
    cat: 12
  },
  giftClick: {
    tid: 'giftClick',
    ptid: '',
    cat: 9
  },
  musicClick: {
    tid: 'musicClick',
    ptid: '',
    cat: 9
  },
  startTheLotteryClick: {
    tid: 'startTheLotteryClick',
    ptid: '',
    cat: 9
  },
  openGiftClick: {
    tid: 'openGiftClick',
    ptid: '',
    cat: 9
  },
  huoDongGuiZeClick: {
    tid: 'huoDongGuiZeClick',
    ptid: '',
    cat: 9
  },
  jingPinLiBaoClick: {
    tid: 'jingPinLiBaoClick',
    ptid: '',
    cat: 9
  },
  shenTanDanPinClick: {
    tid: 'shenTanDanPinClick',
    ptid: '',
    cat: 9
  },
  xianShiGouClick: {
    tid: 'xianShiGouClick',
    ptid: '',
    cat: 9
  },
  lingQuClick: {
    tid: 'lingQuClick',
    ptid: '',
    cat: 9
  },
  rewardCenterShow: {
    tid: '_rewardCenterShow',
    ptid: '',
    cat: 12
  },
  rewardCenterTabClick: {
    tid: 'rewardCenterTabClick',
    ptid: '',
    cat: 9
  },
  shelfProductClick: {
    tid: 'product',
    ptid: 'productTab',
    cat: 9
  }
};

var Track = function Track(opts) {
  _classCallCheck(this, Track);

  _initialiseProps.call(this);

  this.check(opts);
  this.host = opts.host;
  this.trackConstParams = {
    vid: opts.video || '',
    proj: opts.project || '',
    bu: opts.bu || '',
    rs: opts.rs || '',
    n: opts.n || '',
    sdk: opts.sdk || '',
    appkey: opts.appkey || '',
    client: opts.client || '',
    lang: opts.lang || '',
    ssid: opts.ssid || '',
    ext: {
      resource: opts.ext && opts.ext.resource || '',
      user: opts.user && opts.ext.user || '',
      phone: opts.phone && opts.ext.phone || ''
    }
  };
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.controller = function (params) {
    var event = params.event,
        phone = params.phone,
        ssid = params.ssid;

    if (!_lodash2.default.isEmpty(phone)) {
      _this.trackConstParams.ext.phone = phone;
    }
    if (!_lodash2.default.isEmpty(ssid)) {
      _this.trackConstParams.ssid = ssid;
    }

    if (_lodash2.default.isEmpty(TRACK_CONFIG[event])) {
      debug('Track: ' + event + ' \u4E8B\u4EF6\u4E0D\u5B58\u5728');
    }
    var trackUrl = _this.makeRequestUrl(params);
    console.log(trackUrl);
    _this.send(trackUrl);
  };

  this.check = function (opts) {
    // video为必要字段
    if (_lodash2.default.isEmpty(opts.video)) {
      debug('Track: video字段不能为空');
    }
    // project项目字段不能为空
    if (_lodash2.default.isEmpty(opts.project)) {
      debug('Track: project不能为空');
    }
    if (_lodash2.default.isEmpty(opts.bu)) {
      debug('Track: bu不能为空, 你可以按照业务选择对应的bu(videojj, videoos, liveos)');
    }
    if (_lodash2.default.isEmpty(opts.sdk)) {
      debug('Track: sdk字段不能为空, 请传入正确的值');
    }
    if (_lodash2.default.isEmpty(opts.client)) {
      debug('Track: client字段不能为空, client字段代表客户端的唯一表示');
    }
    if (_lodash2.default.isEmpty(opts.ext)) {
      debug('Track: ext表示为拓展字段, 不能为空');
    }
  };

  this.makeRequestUrl = function (opts) {
    var event = opts.event,
        phone = opts.phone;

    var tmpUrlParams = _extends({}, _lodash2.default.cloneDeep(_this.trackConstParams), TRACK_CONFIG[event]);
    tmpUrlParams.ext = JSON.stringify(tmpUrlParams.ext);

    debug('Track: \u6700\u7EC8\u53D1\u9001\u7684\u53C2\u6570, ' + JSON.stringify(tmpUrlParams));
    var url = _this.host + '/track/v5/va.gif?' + _queryString2.default.stringify(tmpUrlParams);
    return url;
  };

  this.send = function (url) {
    var caller = new Image(1, 1);
    caller.onload = caller.onerror = function (error) {
      debug('Track: send error, ' + JSON.stringify(error) + '(' + url + ')');
    };
    caller.src = url;
  };
};

exports.default = Track;
//# sourceMappingURL=track.js.map