(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uF2","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uF2","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"uF2","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"uF2","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uF2","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 25:
/*!***********************************************!*\
  !*** D:/uniapp/uniapp-f2/f2-canvas/lib/f2.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) { true ? module.exports = e() : undefined;}(this, function () {return function (t) {function e(i) {if (n[i]) return n[i].exports;var r = n[i] = { i: i, l: !1, exports: {} };return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports;}var n = {};return e.m = t, e.c = n, e.d = function (t, n, i) {e.o(t, n) || Object.defineProperty(t, n, { configurable: !1, enumerable: !0, get: i });}, e.n = function (t) {var n = t && t.__esModule ? function () {return t.default;} : function () {return t;};return e.d(n, "a", n), n;}, e.o = function (t, e) {return Object.prototype.hasOwnProperty.call(t, e);}, e.p = "", e(e.s = 149);}([function (t, e, n) {var i = n(48),r = { upperFirst: n(49), lowerFirst: n(50), isString: n(51), isNumber: n(52), isBoolean: n(53), isFunction: n(54), isDate: n(55), isArray: n(17), isNil: n(29), isObject: n(30), isPlainObject: n(31), deepMix: n(57), mix: n(58), each: n(59), isObjectValueEqual: function isObjectValueEqual(t, e) {t = Object.assign({}, t), e = Object.assign({}, e);var n = Object.getOwnPropertyNames(t),i = Object.getOwnPropertyNames(e);if (n.length !== i.length) return !1;for (var r = 0, a = n.length; r < a; r++) {var o = n[r];if (t[o] !== e[o]) return !1;}return !0;}, wrapBehavior: function wrapBehavior(t, e) {if (t["_wrap_" + e]) return t["_wrap_" + e];var n = function n(_n) {t[e](_n);};return t["_wrap_" + e] = n, n;}, getWrapBehavior: function getWrapBehavior(t, e) {return t["_wrap_" + e];}, parsePadding: function parsePadding(t) {var e, n, i, a;return r.isNumber(t) || r.isString(t) ? e = i = a = n = t : r.isArray(t) && (e = t[0], n = r.isNil(t[1]) ? t[0] : t[1], i = r.isNil(t[2]) ? t[0] : t[2], a = r.isNil(t[3]) ? n : t[3]), [e, n, i, a];} };r.Array = { merge: function merge(t) {for (var e = [], n = 0, i = t.length; n < i; n++) {e = e.concat(t[n]);}return e;}, values: function values(t, e) {for (var n = [], i = {}, a = 0, o = t.length; a < o; a++) {var s = t[a][e];r.isNil(s) || (r.isArray(s) ? r.each(s, function (t) {i[t] || (n.push(t), i[t] = !0);}) : i[s] || (n.push(s), i[s] = !0));}return n;}, firstValue: function firstValue(t, e) {for (var n = null, i = 0, a = t.length; i < a; i++) {var o = t[i][e];if (!r.isNil(o)) {n = r.isArray(o) ? o[0] : o;break;}}return n;}, group: function group(t, e, n) {if (void 0 === n && (n = {}), !e) return [t];var i = r.Array.groupToMap(t, e),a = [];if (1 === e.length && n[e[0]]) {var o = n[e[0]];r.each(o, function (t) {t = "_" + t, a.push(i[t]);});} else for (var s in i) {a.push(i[s]);}return a;}, groupToMap: function groupToMap(t, e) {if (!e) return { 0: t };for (var n = {}, i = 0, r = t.length; i < r; i++) {var a = t[i],o = function (t) {for (var n = "_", i = 0, r = e.length; i < r; i++) {n += t[e[i]] && t[e[i]].toString();}return n;}(a);n[o] ? n[o].push(a) : n[o] = [a];}return n;}, remove: function remove(t, e) {if (t) {var n = t.indexOf(e);-1 !== n && t.splice(n, 1);}}, getRange: function getRange(t) {if (!t.length) return { min: 0, max: 0 };var e = Math.max.apply(null, t);return { min: Math.min.apply(null, t), max: e };} }, r.mix(r, i), t.exports = r;}, function (t, e, n) {var i = n(47),r = n(0),a = { version: "3.2.3-beta.5", trackable: !0, scales: {}, widthRatio: { column: .5, rose: .999999, multiplePie: .75 }, lineDash: [4, 4] };a.setTheme = function (t) {r.deepMix(this, t);}, a.setTheme(i), t.exports = a;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {this._attrs = { zIndex: 0, visible: !0, destroyed: !1, isShape: !0, attrs: {} };}, n.getType = function () {return this._attrs.type;}, n.drawInner = function (t) {var e = this,n = e.get("attrs");e.createPath(t);var i = t.globalAlpha;if (e.hasFill()) {var a = n.fillOpacity;r.isNil(a) || 1 === a ? t.fill() : (t.globalAlpha = a, t.fill(), t.globalAlpha = i);}if (e.hasStroke() && n.lineWidth > 0) {var o = n.strokeOpacity;r.isNil(o) || 1 === o || (t.globalAlpha = o), t.stroke();}}, n.getBBox = function () {var t = this._attrs.bbox;return t || ((t = this.calculateBox()) && (t.x = t.minX, t.y = t.minY, t.width = t.maxX - t.minX, t.height = t.maxY - t.minY), this._attrs.bbox = t), t;}, n.calculateBox = function () {return null;}, n.createPath = function () {}, e;}(n(25));t.exports = a;}, function (t, e) {t.exports = { create: function create() {return [0, 0];}, length: function length(t) {var e = t[0],n = t[1];return Math.sqrt(e * e + n * n);}, normalize: function normalize(t, e) {var n = this.length(e);return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / n, t[1] = e[1] / n), t;}, add: function add(t, e, n) {return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t;}, sub: function sub(t, e, n) {return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t;}, scale: function scale(t, e, n) {return t[0] = e[0] * n, t[1] = e[1] * n, t;}, dot: function dot(t, e) {return t[0] * e[0] + t[1] * e[1];}, direction: function direction(t, e) {return t[0] * e[1] - e[0] * t[1];}, angle: function angle(t, e) {var n = this.dot(t, e) / (this.length(t) * this.length(e));return Math.acos(n);}, angleTo: function angleTo(t, e, n) {var i = this.angle(t, e),r = this.direction(t, e) >= 0;return n ? r ? 2 * Math.PI - i : i : r ? i : 2 * Math.PI - i;}, zero: function zero(t) {return 0 === t[0] && 0 === t[1];}, distance: function distance(t, e) {var n = e[0] - t[0],i = e[1] - t[1];return Math.sqrt(n * n + i * i);}, clone: function clone(t) {return [t[0], t[1]];}, min: function min(t, e, n) {return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t;}, max: function max(t, e, n) {return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t;}, transformMat2d: function transformMat2d(t, e, n) {var i = e[0],r = e[1];return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t;} };}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}function r(t) {return a.isArray(t) ? t : a.isString(t) ? t.split("*") : [t];}var a = n(0),o = n(32),s = ["color", "size", "shape"],c = n(1),u = n(63),l = n(6),h = n(20),f = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n.getDefaultCfg = function () {return { type: null, data: null, attrs: {}, scales: {}, container: null, styleOptions: null, chart: null, shapeType: "", generatePoints: !1, attrOptions: {}, sortable: !1, startOnZero: !0, visible: !0, connectNulls: !1 };}, n.init = function () {var t = this;t._initAttrs();var e = t._processData();t.get("adjust") && t._adjustData(e), t.set("dataArray", e);}, n._getGroupScales = function () {var t = this,e = [];return a.each(s, function (n) {var i = t.getAttr(n);if (i) {var r = i.scales;a.each(r, function (t) {t && t.isCategory && -1 === e.indexOf(t) && e.push(t);});}}), e;}, n._groupData = function (t) {var e = this,n = e.get("colDefs"),i = e._getGroupScales();if (i.length) {var r = {},o = [];return a.each(i, function (t) {var e = t.field;o.push(e), n && n[e] && n[e].values && (r[t.field] = n[e].values);}), a.Array.group(t, o, r);}return [t];}, n._setAttrOptions = function (t, e) {this.get("attrOptions")[t] = e;}, n._createAttrOption = function (t, e, n, i) {var r = {};r.field = e, n ? a.isFunction(n) ? r.callback = n : r.values = n : r.values = i, this._setAttrOptions(t, r);}, n._initAttrs = function () {var t = this,e = t.get("attrs"),n = t.get("attrOptions"),i = t.get("coord");for (var o in n) {if (n.hasOwnProperty(o)) {var s = n[o],c = a.upperFirst(o),l = r(s.field);"position" === o && (s.coord = i);for (var h = [], f = 0, p = l.length; f < p; f++) {var g = l[f],d = t._createScale(g);h.push(d);}if ("position" === o) {var v = h[1];"polar" === i.type && i.transposed && t.hasAdjust("stack") && v.values.length && v.change({ nice: !1, min: 0, max: Math.max.apply(null, v.values) });}s.scales = h;var y = new u[c](s);e[o] = y;}}}, n._createScale = function (t) {var e = this.get("scales"),n = e[t];return n || (n = this.get("chart").createScale(t), e[t] = n), n;}, n._processData = function () {for (var t = this, e = this.get("data"), n = [], i = this._groupData(e), r = 0, a = i.length; r < a; r++) {var o = i[r],s = t._saveOrigin(o);this.hasAdjust("dodge") && t._numberic(s), n.push(s);}return n;}, n._saveOrigin = function (t) {for (var e = [], n = 0, i = t.length; n < i; n++) {var r = t[n],a = {};for (var o in r) {a[o] = r[o];}a._origin = r, e.push(a);}return e;}, n._numberic = function (t) {for (var e = this.getAttr("position").scales, n = 0, i = t.length; n < i; n++) {for (var r = t[n], a = Math.min(2, e.length), o = 0; o < a; o++) {var s = e[o];if (s.isCategory) {var c = s.field;r[c] = s.translate(r[c]);}}}}, n._adjustData = function (t) {var e = this,n = e.get("adjust");if (n) {var i = a.upperFirst(n.type);if (!h[i]) throw new Error("not support such adjust : " + n);var r = e.getXScale(),o = e.getYScale(),s = a.mix({ xField: r.field, yField: o.field }, n);new h[i](s).processAdjust(t), "Stack" === i && e._updateStackRange(o.field, o, t);}}, n._updateStackRange = function (t, e, n) {for (var i = a.Array.merge(n), r = e.min, o = e.max, s = 0, c = i.length; s < c; s++) {var u = i[s],l = Math.min.apply(null, u[t]),h = Math.max.apply(null, u[t]);l < r && (r = l), h > o && (o = h);}(r < e.min || o > e.max) && e.change({ min: r, max: o });}, n._sort = function (t) {var e = this,n = e.getXScale(),i = n.field,r = n.type;"identity" !== r && n.values.length > 1 && a.each(t, function (t) {t.sort(function (t, e) {return "timeCat" === r ? n._toTimeStamp(t._origin[i]) - n._toTimeStamp(e._origin[i]) : n.translate(t._origin[i]) - n.translate(e._origin[i]);});}), e.set("hasSorted", !0), e.set("dataArray", t);}, n.paint = function () {var t = this,e = t.get("dataArray"),n = [],i = t.getShapeFactory();i.setCoord(t.get("coord")), t._beforeMapping(e);for (var r = 0, a = e.length; r < a; r++) {var o = e[r];o.length && (o = t._mapping(o), n.push(o), t.draw(o, i));}t.set("dataArray", n);}, n.getShapeFactory = function () {var t = this.get("shapeFactory");if (!t) {var e = this.get("shapeType");t = l.getShapeFactory(e), this.set("shapeFactory", t);}return t;}, n._mapping = function (t) {for (var e = this, n = e.get("attrs"), i = e.getYScale().field, r = [], o = 0, s = t.length; o < s; o++) {var c = t[o],u = {};u._origin = c._origin, u.points = c.points, u._originY = c[i];for (var l in n) {if (n.hasOwnProperty(l)) {var h = n[l],f = h.names,p = e._getAttrValues(h, c);if (f.length > 1) for (var g = 0, d = p.length; g < d; g++) {var v = p[g];u[f[g]] = a.isArray(v) && 1 === v.length ? v[0] : v;} else u[f[0]] = 1 === p.length ? p[0] : p;}}r.push(u);}return r;}, n._getAttrValues = function (t, e) {for (var n = t.scales, i = [], r = 0, a = n.length; r < a; r++) {var o = n[r],s = o.field;"identity" === o.type ? i.push(o.value) : i.push(e[s]);}return t.mapping.apply(t, i);}, n.getAttrValue = function (t, e) {var n = this.getAttr(t),i = null;return n && (i = this._getAttrValues(n, e)[0]), i;}, n._beforeMapping = function (t) {var e = this;e.get("sortable") && e._sort(t), e.get("generatePoints") && a.each(t, function (t) {e._generatePoints(t);});}, n.isInCircle = function () {var t = this.get("coord");return t && t.isPolar;}, n.getCallbackCfg = function (t, e, n) {if (!t) return e;var i = {},r = t.map(function (t) {return n[t];});return a.each(e, function (t, e) {a.isFunction(t) ? i[e] = t.apply(null, r) : i[e] = t;}), i;}, n.getDrawCfg = function (t) {var e = this,n = e.isInCircle(),i = { origin: t, x: t.x, y: t.y, color: t.color, size: t.size, shape: t.shape, isInCircle: n, opacity: t.opacity },r = e.get("styleOptions");return r && r.style && (i.style = e.getCallbackCfg(r.fields, r.style, t._origin)), e.get("generatePoints") && (i.points = t.points), n && (i.center = e.get("coord").center), i;}, n.draw = function (t, e) {var n = this,i = n.get("container"),r = n.getYScale();a.each(t, function (t, o) {if (!r || !a.isNil(t._origin[r.field])) {t.index = o;var s = n.getDrawCfg(t),c = t.shape;n.drawShape(c, t, s, i, e);}});}, n.drawShape = function (t, e, n, i, r) {var o = r.drawShape(t, n, i);o && a.each([].concat(o), function (t) {t.set("origin", e);});}, n._generatePoints = function (t) {for (var e = this, n = e.getShapeFactory(), i = e.getAttr("shape"), r = 0, a = t.length; r < a; r++) {var o = t[r],s = e.createShapePointsCfg(o),c = i ? e._getAttrValues(i, o) : null,u = n.getShapePoints(c, s);o.points = u;}}, n.createShapePointsCfg = function (t) {var e,n = this.getXScale(),i = this.getYScale(),r = this._normalizeValues(t[n.field], n);return e = i ? this._normalizeValues(t[i.field], i) : t.y ? t.y : .1, { x: r, y: e, y0: i ? i.scale(this.getYMinValue()) : void 0 };}, n.getYMinValue = function () {var t = this.getYScale(),e = t.min,n = t.max;return this.get("startOnZero") ? n <= 0 && e <= 0 ? n : e >= 0 ? e : 0 : e;}, n._normalizeValues = function (t, e) {var n = [];if (a.isArray(t)) for (var i = 0, r = t.length; i < r; i++) {var o = t[i];n.push(e.scale(o));} else n = e.scale(t);return n;}, n.getAttr = function (t) {return this.get("attrs")[t];}, n.getXScale = function () {return this.getAttr("position").scales[0];}, n.getYScale = function () {return this.getAttr("position").scales[1];}, n.hasAdjust = function (t) {return this.get("adjust") && this.get("adjust").type === t;}, n._getSnap = function (t, e, n) {var i,r = 0,a = this.getYScale().field;if (this.hasAdjust("stack") && t.field === a) {i = [], n.forEach(function (t) {i.push(t._originY);});for (var o = i.length; r < o && !(i[0][0] > e); r++) {if (i[i.length - 1][1] <= e) {r = i.length - 1;break;}if (i[r][0] <= e && i[r][1] > e) break;}} else {(i = t.values).sort(function (t, e) {return t - e;});for (var s = i.length; r < s && !((i[0] + i[1]) / 2 > e) && !((i[r - 1] + i[r]) / 2 <= e && (i[r + 1] + i[r]) / 2 > e); r++) {if ((i[i.length - 2] + i[i.length - 1]) / 2 <= e) {r = i.length - 1;break;}}}return i[r];}, n.getSnapRecords = function (t) {var e = this,n = e.get("coord"),i = e.getXScale(),r = e.getYScale(),o = i.field,s = e.get("dataArray");this.get("hasSorted") || this._sort(s);var c = [],u = n.invertPoint(t),l = u.x;e.isInCircle() && !n.transposed && l > (1 + i.rangeMax()) / 2 && (l = i.rangeMin());var h = i.invert(l);i.isCategory || (h = e._getSnap(i, h));var f = [];if (s.forEach(function (t) {t.forEach(function (t) {var n = a.isNil(t._origin) ? t[o] : t._origin[o];e._isEqual(n, h, i) && f.push(t);});}), this.hasAdjust("stack") && n.isPolar && n.transposed && 1 === i.values.length) {if (l >= 0 && l <= 1) {var p = r.invert(u.y);p = e._getSnap(r, p, f), f.forEach(function (t) {(a.isArray(p) ? t._originY.toString() === p.toString() : t._originY === p) && c.push(t);});}} else c = f;return c;}, n._isEqual = function (t, e, n) {return "timeCat" === n.type ? n._toTimeStamp(t) === e : e === t;}, n.position = function (t) {return this._setAttrOptions("position", { field: t }), this;}, n.color = function (t, e) {return this._createAttrOption("color", t, e, c.colors), this;}, n.size = function (t, e) {return this._createAttrOption("size", t, e, c.sizes), this;}, n.shape = function (t, e) {var n = this.get("type"),i = c.shapes[n] || [];return this._createAttrOption("shape", t, e, i), this;}, n.style = function (t, e) {var n = this.get("styleOptions");n || (n = {}, this.set("styleOptions", n)), a.isObject(t) && (e = t, t = null);var i;return t && (i = r(t)), n.fields = i, n.style = e, this;}, n.adjust = function (t) {return a.isString(t) && (t = { type: t }), this.set("adjust", t), this;}, n.animate = function (t) {return this.set("animateCfg", t), this;}, n.reset = function () {this.set("attrOptions", {}), this.set("adjust", null), this.clearInner();}, n.clearInner = function () {var t = this.get("container");t && (t.clear(), t.setMatrix([1, 0, 0, 1, 0, 0])), t && t.clear(), this.set("attrs", {}), this.set("groupScales", null), this.set("xDistance", null), this.set("_width", null);}, n.clear = function () {this.clearInner(), this.set("scales", {});}, n.destroy = function () {this.clear(), t.prototype.destroy.call(this);}, n._display = function (t) {this.set("visible", t);var e = this.get("container"),n = e.get("canvas");e.set("visible", t), n.draw();}, n.show = function () {this._display(!0);}, n.hide = function () {this._display(!1);}, e;}(o);t.exports = f;}, function (t, e) {var n = {}.toString;t.exports = function (t, e) {return n.call(t) === "[object " + e + "]";};}, function (t, e, n) {var i = n(0),r = n(1),a = {},o = { _coord: null, draw: function draw(t, e) {this.drawShape && this.drawShape(t, e);}, setCoord: function setCoord(t) {this._coord = t;}, parsePoint: function parsePoint(t) {var e = this._coord;return e.isPolar && (1 === t.x && (t.x = .9999999), 1 === t.y && (t.y = .9999999)), e.convertPoint(t);}, parsePoints: function parsePoints(t) {if (!t) return !1;var e = this,n = [];return t.forEach(function (t) {n.push(e.parsePoint(t));}), n;} },s = { defaultShapeType: null, setCoord: function setCoord(t) {this._coord = t;}, getShape: function getShape(t) {var e = this;i.isArray(t) && (t = t[0]);var n = e[t] || e[e.defaultShapeType];return n._coord = e._coord, n;}, getShapePoints: function getShapePoints(t, e) {var n = this.getShape(t);return (n.getPoints || n.getShapePoints || this.getDefaultPoints)(e);}, getDefaultPoints: function getDefaultPoints() {return [];}, drawShape: function drawShape(t, e, n) {var i = this.getShape(t);return e.color || (e.color = r.colors[0]), i.draw(e, n);} };a.registerFactory = function (t, e) {var n = i.upperFirst(t),r = i.mix({}, s, e);return a[n] = r, r.name = t, r;}, a.registerShape = function (t, e, n) {var r = i.upperFirst(t),s = a[r],c = i.mix({}, o, n);return s[e] = c, c;}, a.registShape = a.registerShape, a.getShapeFactory = function (t) {var e = this;return t = t || "point", e[i.upperFirst(t)];}, t.exports = a;}, function (t, e, n) {var i = { Canvas: n(85), Group: n(36), Shape: n(2), Matrix: n(22), Vector2: n(3) };n(87), n(88), n(89), n(90), n(91), n(92), n(93), n(94), n(95), t.exports = i;}, function (t, e, n) {function i(t, e, n, i, a) {return { x: r(a, t.x, e.x, n.x, i.x), y: r(a, t.y, e.y, n.y, i.y) };}function r(t, e, n, i, r) {var a = t * t;return e + (3 * -e + t * (3 * e - e * t)) * t + (3 * n + t * (-6 * n + 3 * n * t)) * t + (3 * i - 3 * i * t) * a + r * (a * t);}function a(t) {for (var e = 1 / 0, n = -1 / 0, r = 1 / 0, a = -1 / 0, o = { x: t[0], y: t[1] }, s = { x: t[2], y: t[3] }, c = { x: t[4], y: t[5] }, u = { x: t[6], y: t[7] }, l = 0; l < 100; l++) {var h = i(o, s, c, u, l / 100);h.x < e && (e = h.x), h.x > n && (n = h.x), h.y < r && (r = h.y), h.y > a && (a = h.y);}return { minX: e, minY: r, maxX: n, maxY: a };}var o = n(3),s = o.create(),c = o.create(),u = o.create();t.exports = { getBBoxFromPoints: function getBBoxFromPoints(t) {if (0 !== t.length) {for (var e = t[0], n = e.x, i = e.x, r = e.y, a = e.y, o = t.length, s = 1; s < o; s++) {e = t[s], n = Math.min(n, e.x), i = Math.max(i, e.x), r = Math.min(r, e.y), a = Math.max(a, e.y);}return { minX: n, minY: r, maxX: i, maxY: a };}}, getBBoxFromLine: function getBBoxFromLine(t, e, n, i) {return { minX: Math.min(t, n), minY: Math.min(e, i), maxX: Math.max(t, n), maxY: Math.max(e, i) };}, getBBoxFromArc: function getBBoxFromArc(t, e, n, i, r, a) {var l = Math.abs(i - r);if (l % Math.PI * 2 < 1e-4 && l > 1e-4) return { minX: t - n, minY: e - n, maxX: t + n, maxY: e + n };s[0] = Math.cos(i) * n + t, s[1] = Math.sin(i) * n + e, c[0] = Math.cos(r) * n + t, c[1] = Math.sin(r) * n + e;var h = [0, 0],f = [0, 0];if (o.min(h, s, c), o.max(f, s, c), (i %= 2 * Math.PI) < 0 && (i += 2 * Math.PI), (r %= 2 * Math.PI) < 0 && (r += 2 * Math.PI), i > r && !a ? r += 2 * Math.PI : i < r && a && (i += 2 * Math.PI), a) {var p = r;r = i, i = p;}for (var g = 0; g < r; g += Math.PI / 2) {g > i && (u[0] = Math.cos(g) * n + t, u[1] = Math.sin(g) * n + e, o.min(h, u, h), o.max(f, u, f));}return { minX: h[0], minY: h[1], maxX: f[0], maxY: f[1] };}, getBBoxFromBezierGroup: function getBBoxFromBezierGroup(t) {for (var e = 1 / 0, n = -1 / 0, i = 1 / 0, r = -1 / 0, o = 0, s = t.length; o < s; o++) {var c = a(t[o]);c.minX < e && (e = c.minX), c.maxX > n && (n = c.maxX), c.minY < i && (i = c.minY), c.maxY > r && (r = c.maxY);}return { minX: e, minY: i, maxX: n, maxY: r };} };}, function (t, e, n) {var i = n(0),r = { min: 0, median: .5, max: 1 },a = function () {function t(t) {this._initDefaultCfg(), i.deepMix(this, t);}var e = t.prototype;return e._initDefaultCfg = function () {}, e._getNormalizedValue = function (t, e) {return i.isNil(r[t]) ? e.scale(t) : r[t];}, e.parsePercentPoint = function (t, e) {var n = parseFloat(e[0]) / 100,i = parseFloat(e[1]) / 100,r = t.start,a = t.end,o = Math.abs(r.x - a.x),s = Math.abs(r.y - a.y);return { x: o * n + Math.min(r.x, a.x), y: s * i + Math.min(r.y, a.y) };}, e.parsePoint = function (t, e) {var n = this,r = n.xScale,a = n.yScales;if (i.isFunction(e) && (e = e(r, a)), i.isString(e[0]) && -1 !== e[0].indexOf("%")) return this.parsePercentPoint(t, e);var o = n._getNormalizedValue(e[0], r),s = n._getNormalizedValue(e[1], a[0]),c = t.convertPoint({ x: o, y: s });return n.limitInPlot ? o >= 0 && o <= 1 && s >= 0 && s <= 1 ? c : null : c;}, e.render = function () {}, e.repaint = function () {this.remove();var t = this.coord,e = this.container,n = this.canvas;e && !e.isDestroyed() && (this.render(t, e), n.draw());}, e.remove = function () {var t = this.element;t && t.remove(!0);}, t;}();t.exports = a;}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}var r = n(76),a = n(11),o = n(23),s = n(21),c = function () {function t(e) {i(this, t), this._initDefaultCfg(), r(this, e), this.init();}return t.prototype._initDefaultCfg = function () {this.type = "base", this.formatter = null, this.range = [0, 1], this.ticks = null, this.values = [];}, t.prototype.init = function () {}, t.prototype.getTicks = function () {var t = this,e = t.ticks,n = [];return a(e, function (e) {var i = void 0;i = o(e) ? e : { text: t.getText(e), tickValue: e, value: t.scale(e) }, n.push(i);}), n;}, t.prototype.getText = function (t, e) {var n = this.formatter;return t = n ? n(t, e) : t, !s(t) && t.toString || (t = ""), t.toString();}, t.prototype.rangeMin = function () {return this.range[0];}, t.prototype.rangeMax = function () {var t = this.range;return t[t.length - 1];}, t.prototype.invert = function (t) {return t;}, t.prototype.translate = function (t) {return t;}, t.prototype.scale = function (t) {return t;}, t.prototype.clone = function () {var t = this,e = t.constructor,n = {};return a(t, function (e, i) {n[i] = t[i];}), new e(n);}, t.prototype.change = function (t) {return this.ticks = null, r(this, t), this.init(), this;}, t;}();t.exports = c;}, function (t, e, n) {var i = n(23),r = n(77);t.exports = function (t, e) {if (t) if (r(t)) for (var n = 0, a = t.length; n < a && !1 !== e(t[n], n); n++) {;} else if (i(t)) for (var o in t) {if (t.hasOwnProperty(o) && !1 === e(t[o], o)) break;}};}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}function r(t, e) {return a(e) ? e : t.invert(t.scale(e));}var a = n(67),o = n(19),s = n(68),c = n(34),u = function () {function t(e) {i(this, t), this.type = "base", this.name = null, this.method = null, this.values = [], this.scales = [], this.linear = null, s(this, e);}return t.prototype._getAttrValue = function (t, e) {var n = this.values;if (t.isCategory && !this.linear) return n[t.translate(e) % n.length];var i = t.scale(e);return this.getLinearValue(i);}, t.prototype.getLinearValue = function (t) {var e = this.values,n = e.length - 1,i = Math.floor(n * t),r = n * t - i,a = e[i];return a + ((i === n ? a : e[i + 1]) - a) * r;}, t.prototype.callback = function (t) {var e = this,n = e.scales[0];return "identity" === n.type ? n.value : e._getAttrValue(n, t);}, t.prototype.getNames = function () {for (var t = this.scales, e = this.names, n = Math.min(t.length, e.length), i = [], r = 0; r < n; r++) {i.push(e[r]);}return i;}, t.prototype.getFields = function () {var t = this.scales,e = [];return c(t, function (t) {e.push(t.field);}), e;}, t.prototype.getScale = function (t) {return this.scales[this.names.indexOf(t)];}, t.prototype.mapping = function () {for (var t = this.scales, e = this.callback, n = arguments.length, i = Array(n), r = 0; r < n; r++) {i[r] = arguments[r];}var a = i;if (e) {for (var o = 0, s = i.length; o < s; o++) {i[o] = this._toOriginParam(i[o], t[o]);}a = e.apply(this, i);}return a = [].concat(a);}, t.prototype._toOriginParam = function (t, e) {var n = t;if (!e.isLinear) if (o(t)) {n = [];for (var i = 0, a = t.length; i < a; i++) {n.push(r(e, t[i]));}} else n = r(e, t);return n;}, t;}();t.exports = u;}, function (t, e) {var n = {}.toString;t.exports = function (t, e) {return n.call(t) === "[object " + e + "]";};}, function (t, e, n) {var i = n(13);t.exports = function (t) {return i(t, "Number");};}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}function r(t) {if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}function a(t) {var e = t.startAngle,n = t.endAngle;return !(!l.isNil(e) && !l.isNil(n) && n - e < 2 * Math.PI);}function o(t, e) {return t - e;}function s(t, e) {var n = !1;return l.each(t, function (t) {var i = [].concat(t.values),r = [].concat(e.values);t.type !== e.type || t.field !== e.field || i.sort(o).toString() !== r.sort(o).toString() || (n = !0);}), n;}var c = n(32),u = n(60),l = n(0),h = n(61),f = n(4),p = n(74),g = n(82),d = n(1),v = n(7).Canvas,y = n(26),m = function (t) {function e(e) {var n,i = r(r(n = t.call(this, e) || this));return l.each(f, function (t, e) {var n = l.lowerFirst(e);i[n] = function (e) {var n = new t(e);return i.addGeom(n), n;};}), i._init(), n;}i(e, t), e.initPlugins = function () {return { _plugins: [], _cacheId: 0, register: function register(t) {var e = this._plugins;[].concat(t).forEach(function (t) {-1 === e.indexOf(t) && e.push(t);}), this._cacheId++;}, unregister: function unregister(t) {var e = this._plugins;[].concat(t).forEach(function (t) {var n = e.indexOf(t);-1 !== n && e.splice(n, 1);}), this._cacheId++;}, clear: function clear() {this._plugins = [], this._cacheId++;}, count: function count() {return this._plugins.length;}, getAll: function getAll() {return this._plugins;}, notify: function notify(t, e, n) {var i,r,a,o,s,c = this.descriptors(t),u = c.length;for (i = 0; i < u; ++i) {if (r = c[i], a = r.plugin, "function" == typeof (s = a[e]) && (o = [t].concat(n || []), !1 === s.apply(a, o))) return !1;}return !0;}, descriptors: function descriptors(t) {var e = t._plugins || (t._plugins = {});if (e.id === this._cacheId) return e.descriptors;var n = [],i = [];return this._plugins.concat(t && t.get("plugins") || []).forEach(function (t) {-1 === n.indexOf(t) && (n.push(t), i.push({ plugin: t }));}), e.descriptors = i, e.id = this._cacheId, i;} };};var n = e.prototype;return n.getDefaultCfg = function () {return { id: null, padding: d.padding, data: null, scales: {}, geoms: null, colDefs: null, pixelRatio: d.pixelRatio, filters: null, appendPadding: d.appendPadding };}, n._syncYScales = function () {var t = this.get("geoms"),e = [],n = [],i = [];l.each(t, function (t) {var r = t.getYScale();r.isLinear && (e.push(r), n.push(r.min), i.push(r.max));}), n = Math.min.apply(null, n), i = Math.max.apply(null, i), l.each(e, function (t) {t.min = n, t.max = i;});}, n._getFieldsForLegend = function () {var t = [],e = this.get("geoms");return l.each(e, function (e) {var n = e.get("attrOptions").color;if (n && n.field && l.isString(n.field)) {var i = n.field.split("*");l.each(i, function (e) {-1 === t.indexOf(e) && t.push(e);});}}), t;}, n._createScale = function (t, e) {return this.get("scaleController").createScale(t, e);}, n._adjustScale = function () {var t = this,e = t.get("coord"),n = t.getXScale(),i = t.getYScales(),r = [];n && r.push(n), r = r.concat(i);var o = e.isPolar && a(e),s = t.get("scaleController").defs;l.each(r, function (t) {if ((t.isCategory || t.isIdentity) && t.values && (!s[t.field] || !s[t.field].range)) {var n,i = t.values.length;if (1 === i) n = [.5, 1];else {var r = 0;n = o ? e.transposed ? [(r = 1 / i * d.widthRatio.multiplePie) / 2, 1 - r / 2] : [0, 1 - 1 / i] : [r = 1 / i * 1 / 2, 1 - r];}t.range = n;}});for (var c = this.get("geoms"), u = 0; u < c.length; u++) {var h = c[u];if ("interval" === h.get("type")) {var f = h.getYScale(),p = f.field,g = f.min,v = f.max,y = f.type;s[p] && s[p].min || "time" === y || (g > 0 ? f.change({ min: 0 }) : v <= 0 && f.change({ max: 0 }));}}}, n._removeGeoms = function () {for (var t = this.get("geoms"); t.length > 0;) {t.shift().destroy();}}, n._clearGeoms = function () {for (var t = this.get("geoms"), e = 0, n = t.length; e < n; e++) {t[e].clear();}}, n._clearInner = function () {this.set("scales", {}), this.set("legendItems", null), this._clearGeoms(), e.plugins.notify(this, "clearInner"), this.get("axisController") && this.get("axisController").clear();}, n._execFilter = function (t) {var e = this.get("filters");return e && (t = t.filter(function (t) {var n = !0;return l.each(e, function (e, i) {if (e && !(n = e(t[i], t))) return !1;}), n;})), t;}, n._initGeoms = function (t) {for (var e = this.get("coord"), n = this.get("filteredData"), i = this.get("colDefs"), r = 0, a = t.length; r < a; r++) {var o = t[r];o.set("data", n), o.set("coord", e), o.set("colDefs", i), o.init();}}, n._initCoord = function () {var t = this.get("plotRange"),e = l.mix({ type: "cartesian" }, this.get("coordCfg"), { plot: t }),n = e.type,i = new (0, h[l.upperFirst(n)])(e);this.set("coord", i);}, n._initLayout = function () {var t = this.get("_padding");t || (t = this.get("margin") || this.get("padding"), t = l.parsePadding(t));var e = "auto" === t[0] ? 0 : t[0],n = "auto" === t[1] ? 0 : t[1],i = "auto" === t[2] ? 0 : t[2],r = "auto" === t[3] ? 0 : t[3],a = this.get("width"),o = this.get("height"),s = new u({ start: { x: r, y: e }, end: { x: a - n, y: o - i } });this.set("plotRange", s), this.set("plot", s);}, n._initCanvas = function () {var t = this;try {var n = new v({ el: t.get("el") || t.get("id"), context: t.get("context"), pixelRatio: t.get("pixelRatio"), width: t.get("width"), height: t.get("height"), fontFamily: d.fontFamily });t.set("canvas", n), t.set("width", n.get("width")), t.set("height", n.get("height"));} catch (t) {throw t;}e.plugins.notify(t, "afterCanvasInit"), t._initLayout();}, n._initLayers = function () {var t = this.get("canvas");this.set("backPlot", t.addGroup()), this.set("middlePlot", t.addGroup({ zIndex: 10 })), this.set("frontPlot", t.addGroup({ zIndex: 20 }));}, n._init = function () {var t = this;t._initCanvas(), t._initLayers(), t.set("geoms", []), t.set("scaleController", new p()), t.set("axisController", new g({ frontPlot: t.get("frontPlot").addGroup({ className: "axisContainer" }), backPlot: t.get("backPlot").addGroup({ className: "axisContainer" }), chart: t })), e.plugins.notify(t, "init");}, n.source = function (t, e) {return this.set("data", t), e && this.scale(e), this;}, n.scale = function (t, e) {var n = this.get("colDefs") || {};return l.isObject(t) ? l.mix(n, t) : n[t] = e, this.set("colDefs", n), this.get("scaleController").defs = n, this;}, n.axis = function (t, e) {var n = this.get("axisController");return t ? (n.axisCfg = n.axisCfg || {}, n.axisCfg[t] = e) : n.axisCfg = null, this;}, n.coord = function (t, e) {var n;return l.isObject(t) ? n = t : (n = e || {}).type = t || "cartesian", this.set("coordCfg", n), this;}, n.filter = function (t, e) {var n = this.get("filters") || {};n[t] = e, this.set("filters", n);}, n.render = function () {var t = this.get("canvas"),n = this.get("geoms"),i = this.get("data") || [],r = this._execFilter(i);this.set("filteredData", r), this._initCoord(), e.plugins.notify(this, "beforeGeomInit"), this._initGeoms(n), this.get("syncY") && this._syncYScales(), this._adjustScale(), e.plugins.notify(this, "beforeGeomDraw"), this._renderAxis();var a = this.get("middlePlot");if (this.get("limitInPlot") && !a.attr("clip")) {var o = this.get("coord"),s = y.getClip(o);s.set("canvas", a.get("canvas")), a.attr("clip", s);}for (var c = 0, u = n.length; c < u; c++) {n[c].paint();}return e.plugins.notify(this, "afterGeomDraw"), t.sort(), this.get("frontPlot").sort(), e.plugins.notify(this, "beforeCanvasDraw"), t.draw(), this;}, n.clear = function () {return e.plugins.notify(this, "clear"), this._removeGeoms(), this._clearInner(), this.set("filters", null), this.set("isUpdate", !1), this.set("_padding", null), this.get("canvas").draw(), this;}, n.repaint = function () {this.set("isUpdate", !0), e.plugins.notify(this, "repaint"), this._clearInner(), this.render();}, n.changeData = function (t) {this.set("data", t), e.plugins.notify(this, "changeData"), this.set("_padding", null), this.repaint();}, n.changeSize = function (t, e) {return t ? this.set("width", t) : t = this.get("width"), e ? this.set("height", e) : e = this.get("height"), this.get("canvas").changeSize(t, e), this._initLayout(), this.repaint(), this;}, n.destroy = function () {this.clear(), this.get("canvas").destroy(), e.plugins.notify(this, "afterCanvasDestroyed"), this._interactions && l.each(this._interactions, function (t) {t.destroy();}), t.prototype.destroy.call(this);}, n.getPosition = function (t) {var e = this,n = e.get("coord"),i = e.getXScale(),r = e.getYScales()[0],a = i.field,o = i.scale(t[a]),s = r.field,c = r.scale(t[s]);return n.convertPoint({ x: o, y: c });}, n.getRecord = function (t) {var e = this,n = e.get("coord"),i = e.getXScale(),r = e.getYScales()[0],a = n.invertPoint(t),o = {};return o[i.field] = i.invert(a.x), o[r.field] = r.invert(a.y), o;}, n.getSnapRecords = function (t) {var e = this.get("geoms")[0],n = [];return e && (n = e.getSnapRecords(t)), n;}, n.createScale = function (t) {var e = this.get("data"),n = this.get("filteredData");n.length && -1 === this._getFieldsForLegend().indexOf(t) && (e = n);var i = this.get("scales");return i[t] || (i[t] = this._createScale(t, e)), i[t];}, n.addGeom = function (t) {var e = this.get("geoms"),n = this.get("middlePlot");e.push(t), t.set("chart", this), t.set("container", n.addGroup());}, n.getXScale = function () {return this.get("geoms")[0].getXScale();}, n.getYScales = function () {var t = this.get("geoms"),e = [];return l.each(t, function (t) {var n = t.getYScale();-1 === e.indexOf(n) && e.push(n);}), e;}, n.getLegendItems = function () {if (this.get("legendItems")) return this.get("legendItems");var t = {},e = [],n = this.get("geoms");return l.each(n, function (n) {var i = n.getAttr("color");if (i) {var r = i.getScale("color");if ("identity" !== r.type && !s(e, r)) {e.push(r);var a = r.field,o = r.getTicks(),c = [];l.each(o, function (t) {var e = t.text,n = t.value,a = r.invert(n),o = { fill: i.mapping(a).join("") || d.defaultColor, radius: 3, symbol: "circle", stroke: "#fff" };c.push({ name: e, dataValue: a, checked: !0, marker: o });}), t[a] = c;}}}), this.set("legendItems", t), t;}, n.registerPlugins = function (t) {var n = this,i = n.get("plugins") || [];l.isArray(i) || (i = [i]), [].concat(t).forEach(function (t) {-1 === i.indexOf(t) && (t.init && t.init(n), i.push(t));}), e.plugins._cacheId++, n.set("plugins", i);}, n._renderAxis = function () {var t = this.get("axisController"),n = this.getXScale(),i = this.getYScales(),r = this.get("coord");e.plugins.notify(this, "beforeRenderAxis"), t.createAxis(r, n, i);}, n._isAutoPadding = function () {if (this.get("_padding")) return !1;var t = this.get("padding");return l.isArray(t) ? -1 !== t.indexOf("auto") : "auto" === t;}, n._updateLayout = function (t) {var e = this.get("width"),n = this.get("height"),i = { x: t[3], y: t[0] },r = { x: e - t[1], y: n - t[2] },a = this.get("plot"),o = this.get("coord");a.reset(i, r), o.reset(a);}, e;}(c);m.plugins = m.initPlugins(), t.exports = m;}, function (t, e, n) {var i = n(0),r = { splitPoints: function splitPoints(t) {var e = [],n = t.x,r = t.y;return (r = i.isArray(r) ? r : [r]).forEach(function (t, r) {var a = { x: i.isArray(n) ? n[r] : n, y: t };e.push(a);}), e;}, splitArray: function splitArray(t, e, n) {if (!t.length) return [];var r,a = [],o = [];return i.each(t, function (t) {r = t._origin ? t._origin[e] : t[e], n ? i.isNil(r) || o.push(t) : i.isArray(r) && i.isNil(r[0]) || i.isNil(r) ? o.length && (a.push(o), o = []) : o.push(t);}), o.length && a.push(o), a;} };t.exports = r;}, function (t, e, n) {var i = n(5),r = Array.isArray ? Array.isArray : function (t) {return i(t, "Array");};t.exports = r;}, function (t, e, n) {var i = n(0),r = function () {function t(t) {this._initDefaultCfg(), i.mix(this, t);var e, n;this.plot ? (e = this.plot.bl, n = this.plot.tr, this.start = e, this.end = n) : (e = this.start, n = this.end), this.init(e, n);}var e = t.prototype;return e._initDefaultCfg = function () {}, e.init = function () {}, e.convertPoint = function (t) {return t;}, e.invertPoint = function (t) {return t;}, e.reset = function (t) {this.plot = t;var e = t.bl,n = t.tr;this.start = e, this.end = n, this.init(e, n);}, t;}();t.exports = r;}, function (t, e, n) {var i = n(33),r = Array.isArray ? Array.isArray : function (t) {return i(t, "Array");};t.exports = r;}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}var r = n(73),a = function () {function t(e) {i(this, t), this._initDefaultCfg(), r(this, e);}return t.prototype._initDefaultCfg = function () {this.adjustNames = ["x", "y"];}, t.prototype.processAdjust = function () {}, t;}();t.exports = a;}, function (t, e) {t.exports = function (t) {return null === t || void 0 === t;};}, function (t, e) {var n = { multiply: function multiply(t, e) {return [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]];}, scale: function scale(t, e, n) {return t[0] = e[0] * n[0], t[1] = e[1] * n[0], t[2] = e[2] * n[1], t[3] = e[3] * n[1], t[4] = e[4], t[5] = e[5], t;}, rotate: function rotate(t, e, n) {var i = Math.cos(n),r = Math.sin(n),a = e[0] * i + e[2] * r,o = e[1] * i + e[3] * r,s = e[0] * -r + e[2] * i,c = e[1] * -r + e[3] * i;return t[0] = a, t[1] = o, t[2] = s, t[3] = c, t[4] = e[4], t[5] = e[5], t;}, translate: function translate(t, e, n) {return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + e[0] * n[0] + e[2] * n[1], t[5] = e[5] + e[1] * n[0] + e[3] * n[1], t;}, transform: function transform(t, e) {for (var i = [].concat(t), r = 0, a = e.length; r < a; r++) {var o = e[r];switch (o[0]) {case "t":n.translate(i, i, [o[1], o[2]]);break;case "s":n.scale(i, i, [o[1], o[2]]);break;case "r":n.rotate(i, i, o[1]);}}return i;} };t.exports = n;}, function (t, e) {var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;};t.exports = function (t) {var e = void 0 === t ? "undefined" : n(t);return null !== t && "object" === e || "function" === e;};}, function (t, e, n) {var i = n(0),r = n(1),a = n(3),o = function () {function t(t) {this._initDefaultCfg(), i.mix(this, t), this.draw();}var e = t.prototype;return e._initDefaultCfg = function () {this.ticks = [], this.tickLine = {}, this.offsetFactor = 1, this.frontContainer = null, this.backContainer = null, this.gridPoints = [];}, e.draw = function () {var t = this.line,e = this.tickLine,n = this.label,i = this.grid;i && this.drawGrid(i), e && this.drawTicks(e), t && this.drawLine(t), n && this.drawLabels();}, e.drawTicks = function (t) {var e = this,n = e.ticks,r = t.length,a = e.getContainer(t.top);i.each(n, function (n) {var o = e.getOffsetPoint(n.value),s = e.getSidePoint(o, r);a.addShape("line", { className: "axis-tick", attrs: i.mix({ x1: o.x, y1: o.y, x2: s.x, y2: s.y }, t) })._id = e._id + "-ticks";});}, e.drawLabels = function () {var t = this,e = t.labelOffset,n = t.labels;i.each(n, function (n) {var r = t.getContainer(n.get("top")),a = t.getOffsetPoint(n.get("value")),o = t.getSidePoint(a, e),s = o.x,c = o.y;n.attr(i.mix({ x: s, y: c }, t.getTextAlignInfo(a, e), n.get("textStyle"))), n._id = t._id + "-" + n.attr("text"), r.add(n);});}, e.drawLine = function () {}, e.drawGrid = function (t) {var e = this,n = e.gridPoints,o = e.ticks,s = t,c = n.length;i.each(n, function (n, u) {if (i.isFunction(t)) {var l = o[u] || {};s = i.mix({}, r._defaultAxis.grid, t(l.text, u, c));}if (s) {var h,f = s.type,p = n.points,g = e.getContainer(s.top);if ("arc" === f) {var d = e.center,v = e.startAngle,y = e.endAngle,m = a.length([p[0].x - d.x, p[0].y - d.y]);h = g.addShape("Arc", { className: "axis-grid", attrs: i.mix({ x: d.x, y: d.y, startAngle: v, endAngle: y, r: m }, s) });} else h = g.addShape("Polyline", { className: "axis-grid", attrs: i.mix({ points: p }, s) });h._id = n._id;}});}, e.getOffsetPoint = function () {}, e.getAxisVector = function () {}, e.getOffsetVector = function (t, e) {var n = this,i = n.getAxisVector(t),r = a.normalize([], i),o = n.offsetFactor,s = [-1 * r[1] * o, r[0] * o];return a.scale([], s, e);}, e.getSidePoint = function (t, e) {var n = this.getOffsetVector(t, e);return { x: t.x + n[0], y: t.y + n[1] };}, e.getTextAlignInfo = function (t, e) {var n,i,r = this.getOffsetVector(t, e);return n = r[0] > 0 ? "left" : r[0] < 0 ? "right" : "center", i = r[1] > 0 ? "top" : r[1] < 0 ? "bottom" : "middle", { textAlign: n, textBaseline: i };}, e.getContainer = function (t) {var e = this.frontContainer,n = this.backContainer;return t ? e : n;}, t;}();t.exports = o;}, function (t, e, n) {function i(t) {return 1 === t[0] && 0 === t[1] && 0 === t[2] && 1 === t[3] && 0 === t[4] && 0 === t[5];}var r = n(0),a = n(22),o = n(3),s = n(86),c = { stroke: "strokeStyle", fill: "fillStyle", opacity: "globalAlpha" },u = ["fillStyle", "font", "globalAlpha", "lineCap", "lineWidth", "lineJoin", "miterLimit", "shadowBlur", "shadowColor", "shadowOffsetX", "shadowOffsetY", "strokeStyle", "textAlign", "textBaseline", "lineDash"],l = ["circle", "sector", "polygon", "rect", "polyline"],h = function () {function t(t) {this._initProperties(), r.mix(this._attrs, t);var e = this._attrs.attrs;e && this.initAttrs(e), this.initTransform();}var e = t.prototype;return e._initProperties = function () {this._attrs = { zIndex: 0, visible: !0, destroyed: !1 };}, e.get = function (t) {return this._attrs[t];}, e.set = function (t, e) {this._attrs[t] = e;}, e.isGroup = function () {return this.get("isGroup");}, e.isShape = function () {return this.get("isShape");}, e.initAttrs = function (t) {this.attr(r.mix(this.getDefaultAttrs(), t));}, e.getDefaultAttrs = function () {return {};}, e._setAttr = function (t, e) {var n = this._attrs.attrs;if ("clip" === t) e = this._setAttrClip(e);else {var i = c[t];i && (n[i] = e);}n[t] = e;}, e._getAttr = function (t) {return this._attrs.attrs[t];}, e._setAttrClip = function (t) {return t && l.indexOf(t._attrs.type) > -1 ? (null === t.get("canvas") && (t = Object.assign({}, t)), t.set("parent", this.get("parent")), t.set("context", this.get("context")), t) : null;}, e.attr = function (t, e) {var n = this;if (n.get("destroyed")) return null;var i = arguments.length;if (0 === i) return n._attrs.attrs;if (r.isObject(t)) {this._attrs.bbox = null;for (var a in t) {n._setAttr(a, t[a]);}return n._afterAttrsSet && n._afterAttrsSet(), n;}return 2 === i ? (this._attrs.bbox = null, n._setAttr(t, e), n._afterAttrsSet && n._afterAttrsSet(), n) : n._getAttr(t);}, e.getParent = function () {return this.get("parent");}, e.draw = function (t) {this.get("destroyed") || this.get("visible") && (this.setContext(t), this.drawInner(t), this.restoreContext(t));}, e.setContext = function (t) {var e = this._attrs.attrs.clip;t.save(), e && (e.resetTransform(t), e.createPath(t), t.clip()), this.resetContext(t), this.resetTransform(t);}, e.restoreContext = function (t) {t.restore();}, e.resetContext = function (t) {var e = this._attrs.attrs;if (!this._attrs.isGroup) for (var n in e) {if (u.indexOf(n) > -1) {var i = e[n];"fillStyle" !== n && "strokeStyle" !== n || (i = s.parseStyle(i, this, t)), "lineDash" === n && t.setLineDash && r.isArray(i) ? t.setLineDash(i) : t[n] = i;}}}, e.hasFill = function () {return this.get("canFill") && this._attrs.attrs.fillStyle;}, e.hasStroke = function () {return this.get("canStroke") && this._attrs.attrs.strokeStyle;}, e.drawInner = function () {}, e.show = function () {return this.set("visible", !0), this;}, e.hide = function () {return this.set("visible", !1), this;}, e.isVisible = function () {return this.get("visible");}, e._removeFromParent = function () {var t = this.get("parent");if (t) {var e = t.get("children");r.Array.remove(e, this);}return this;}, e.remove = function (t) {t ? this.destroy() : this._removeFromParent();}, e.destroy = function () {if (this.get("destroyed")) return null;this._removeFromParent(), this._attrs = {}, this.set("destroyed", !0);}, e.getBBox = function () {return { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0 };}, e.initTransform = function () {var t = this._attrs.attrs || {};t.matrix || (t.matrix = [1, 0, 0, 1, 0, 0]), this._attrs.attrs = t;}, e.getMatrix = function () {return this._attrs.attrs.matrix;}, e.setMatrix = function (t) {this._attrs.attrs.matrix = [t[0], t[1], t[2], t[3], t[4], t[5]];}, e.transform = function (t) {var e = this._attrs.attrs.matrix;return this._attrs.attrs.matrix = a.transform(e, t), this;}, e.setTransform = function (t) {return this._attrs.attrs.matrix = [1, 0, 0, 1, 0, 0], this.transform(t);}, e.translate = function (t, e) {var n = this._attrs.attrs.matrix;a.translate(n, n, [t, e]);}, e.rotate = function (t) {var e = this._attrs.attrs.matrix;a.rotate(e, e, t);}, e.scale = function (t, e) {var n = this._attrs.attrs.matrix;a.scale(n, n, [t, e]);}, e.moveTo = function (t, e) {var n = this._attrs.x || 0,i = this._attrs.y || 0;this.translate(t - n, e - i), this.set("x", t), this.set("y", e);}, e.apply = function (t) {var e = this._attrs.attrs.matrix;return o.transformMat2d(t, t, e), this;}, e.resetTransform = function (t) {var e = this._attrs.attrs.matrix;i(e) || t.transform(e[0], e[1], e[2], e[3], e[4], e[5]);}, e.isDestroyed = function () {return this.get("destroyed");}, t;}();t.exports = h;}, function (t, e, n) {var i = n(7).Shape;t.exports = { getClip: function getClip(t) {var e,n = t.start,r = t.end,a = r.x - n.x,o = Math.abs(r.y - n.y);if (t.isPolar) {var s = t.circleRadius,c = t.center,u = t.startAngle,l = t.endAngle;e = new i.Sector({ attrs: { x: c.x, y: c.y, r: s, r0: 0, startAngle: u, endAngle: l } });} else e = new i.Rect({ attrs: { x: n.x, y: r.y - 10, width: a, height: o + 20 } });return e.isClip = !0, e;}, isPointInPlot: function isPointInPlot(t, e) {var n = t.x,i = t.y,r = e.tl,a = e.tr,o = e.br;return n >= r.x && n <= a.x && i >= r.y && i <= o.y;} };}, function (t, e, n) {var i = n(13);t.exports = function (t) {return i(t, "String");};}, function (t, e, n) {var i = n(29);t.exports = function (t) {return i(t) ? "" : t.toString();};}, function (t, e) {t.exports = function (t) {return null === t || void 0 === t;};}, function (t, e) {var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;};t.exports = function (t) {var e = void 0 === t ? "undefined" : n(t);return null !== t && "object" === e || "function" === e;};}, function (t, e, n) {var i = n(56),r = n(5);t.exports = function (t) {if (!i(t) || !r(t, "Object")) return !1;if (null === Object.getPrototypeOf(t)) return !0;for (var e = t; null !== Object.getPrototypeOf(e);) {e = Object.getPrototypeOf(e);}return Object.getPrototypeOf(t) === e;};}, function (t, e, n) {var i = n(0),r = function () {function t(t) {var e = {},n = this.getDefaultCfg();this._attrs = e, i.mix(e, n, t);}var e = t.prototype;return e.getDefaultCfg = function () {return {};}, e.get = function (t) {return this._attrs[t];}, e.set = function (t, e) {this._attrs[t] = e;}, e.destroy = function () {this._attrs = {}, this.destroyed = !0;}, t;}();t.exports = r;}, function (t, e) {var n = {}.toString;t.exports = function (t, e) {return n.call(t) === "[object " + e + "]";};}, function (t, e, n) {var i = n(66),r = n(19);t.exports = function (t, e) {if (t) if (r(t)) for (var n = 0, a = t.length; n < a && !1 !== e(t[n], n); n++) {;} else if (i(t)) for (var o in t) {if (t.hasOwnProperty(o) && !1 === e(t[o], o)) break;}};}, function (t, e, n) {function i(t) {return function (e, n) {var i = t(e, n);return 0 === i ? e[s] - n[s] : i;};}var r = n(0),a = n(2),o = {},s = "_INDEX";t.exports = { getGroupClass: function getGroupClass() {}, getChildren: function getChildren() {return this.get("children");}, addShape: function addShape(t, e) {void 0 === e && (e = {});var n = this.get("canvas"),i = o[t];i || (i = r.upperFirst(t), o[t] = i), e.canvas = n, "Text" === i && n && n.get("fontFamily") && (e.attrs.fontFamily = e.attrs.fontFamily || n.get("fontFamily"));var s = new a[i](e);return this.add(s), s;}, addGroup: function addGroup(t) {var e = this.get("canvas"),n = this.getGroupClass();(t = r.mix({}, t)).canvas = e, t.parent = this;var i = new n(t);return this.add(i), i;}, contain: function contain(t) {return this.get("children").indexOf(t) > -1;}, sort: function sort() {for (var t = this.get("children"), e = 0, n = t.length; e < n; e++) {t[e][s] = e;}return t.sort(i(function (t, e) {return t.get("zIndex") - e.get("zIndex");})), this;}, clear: function clear() {for (var t = this.get("children"); 0 !== t.length;) {t[t.length - 1].remove(!0);}return this;}, add: function add(t) {var e = this,n = e.get("children");r.isArray(t) || (t = [t]);for (var i = 0, a = t.length; i < a; i++) {var o = t[i],s = o.get("parent");if (s) {var c = s.get("children");r.Array.remove(c, o);}e._setEvn(o), n.push(o);}return e;}, _setEvn: function _setEvn(t) {var e = this;t._attrs.parent = e, t._attrs.context = e._attrs.context, t._attrs.canvas = e._attrs.canvas;var n = t._attrs.attrs.clip;if (n && (n.set("parent", e), n.set("context", e.get("context"))), t._attrs.isGroup) for (var i = t._attrs.children, r = 0, a = i.length; r < a; r++) {t._setEvn(i[r]);}} };}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(25),o = n(35),s = n(3),c = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {this._attrs = { zIndex: 0, visible: !0, destroyed: !1, isGroup: !0, children: [] };}, n.drawInner = function (t) {for (var e = this.get("children"), n = 0, i = e.length; n < i; n++) {e[n].draw(t);}return this;}, n.getBBox = function () {for (var t = 1 / 0, e = -1 / 0, n = 1 / 0, i = -1 / 0, r = this.get("children"), a = 0, o = r.length; a < o; a++) {var c = r[a];if (c.get("visible")) {var u = c.getBBox();if (!u) continue;var l = [u.minX, u.minY],h = [u.minX, u.maxY],f = [u.maxX, u.minY],p = [u.maxX, u.maxY],g = c.attr("matrix");s.transformMat2d(l, l, g), s.transformMat2d(h, h, g), s.transformMat2d(f, f, g), s.transformMat2d(p, p, g), t = Math.min(l[0], h[0], f[0], p[0], t), e = Math.max(l[0], h[0], f[0], p[0], e), n = Math.min(l[1], h[1], f[1], p[1], n), i = Math.max(l[1], h[1], f[1], p[1], i);}}return { minX: t, minY: n, maxX: e, maxY: i, x: t, y: n, width: e - t, height: i - n };}, n.destroy = function () {this.get("destroyed") || (this.clear(), t.prototype.destroy.call(this));}, e;}(a);r.mix(c.prototype, o, { getGroupClass: function getGroupClass() {return c;} }), t.exports = c;}, function (t, e, n) {function i(t) {var e = { strokeStyle: t.color };return t.size >= 0 && (e.lineWidth = t.size), a.mix(e, t.style), a.mix({}, c.shape.line, e);}function r(t, e, n, i) {var r = t.points;if (r.length && a.isArray(r[0].y)) {for (var o = [], c = [], u = 0, l = r.length; u < l; u++) {var h = r[u],f = s.splitPoints(h);c.push(f[0]), o.push(f[1]);}return t.isInCircle && (o.push(o[0]), c.push(c[0])), t.isStack ? e.addShape("Polyline", { className: "line", attrs: a.mix({ points: o, smooth: i }, n) }) : [e.addShape("Polyline", { className: "line", attrs: a.mix({ points: o, smooth: i }, n) }), e.addShape("Polyline", { className: "line", attrs: a.mix({ points: c, smooth: i }, n) })];}return t.isInCircle && r.push(r[0]), e.addShape("Polyline", { className: "line", attrs: a.mix({ points: r, smooth: i }, n) });}var a = n(0),o = n(6),s = n(16),c = n(1),u = o.registerFactory("line", { defaultShapeType: "line" }),l = ["line", "smooth", "dash"];a.each(l, function (t) {o.registerShape("line", t, { draw: function draw(e, n) {var a = "smooth" === t,o = i(e);return "dash" === t && (o.lineDash = c.lineDash), r(e, n, o, a);} });}), t.exports = u;}, function (t, e, n) {var i = n(103),r = Array.isArray ? Array.isArray : function (t) {return i(t, "Array");};t.exports = r;}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}function r(t, e) {if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != typeof e && "function" != typeof e ? t : e;}function a(t, e) {if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);}var o = n(10),s = n(40),c = n(11),u = n(14),l = n(27),h = function (t) {function e() {return i(this, e), r(this, t.apply(this, arguments));}return a(e, t), e.prototype._initDefaultCfg = function () {t.prototype._initDefaultCfg.call(this), this.type = "cat", this.isCategory = !0, this.isRounding = !0;}, e.prototype.init = function () {var t = this,e = t.values,n = t.tickCount;if (c(e, function (t, n) {e[n] = t.toString();}), !t.ticks) {var i = e;n && (i = s({ maxCount: n, data: e, isRounding: t.isRounding }).ticks), this.ticks = i;}}, e.prototype.getText = function (e) {return -1 === this.values.indexOf(e) && u(e) && (e = this.values[Math.round(e)]), t.prototype.getText.call(this, e);}, e.prototype.translate = function (t) {var e = this.values.indexOf(t);return -1 === e && u(t) ? e = t : -1 === e && (e = NaN), e;}, e.prototype.scale = function (t) {var e = this.rangeMin(),n = this.rangeMax(),i = void 0;return (l(t) || -1 !== this.values.indexOf(t)) && (t = this.translate(t)), i = this.values.length > 1 ? t / (this.values.length - 1) : t, e + i * (n - e);}, e.prototype.invert = function (t) {if (l(t)) return t;var e = this.rangeMin(),n = this.rangeMax();t < e && (t = e), t > n && (t = n);var i = (t - e) / (n - e),r = Math.round(i * (this.values.length - 1)) % this.values.length;return r = r || 0, this.values[r];}, e;}(o);o.Cat = h, t.exports = h;}, function (t, e, n) {function i(t) {var e = [];return a(t, function (t) {e = e.concat(t);}), e;}function r(t, e) {var n = void 0;for (n = e; n > 0 && t % n != 0; n--) {;}if (1 === n) for (n = e; n > 0 && (t - 1) % n != 0; n--) {;}return n;}var a = n(11);t.exports = function (t) {var e = {},n = [],a = t.isRounding,o = i(t.data),s = o.length,c = t.maxCount || 8,u = void 0;if (a ? 2 === (u = r(s - 1, c - 1) + 1) ? u = c : u < c - 4 && (u = c - 4) : u = c, !a && s <= u + u / 2) n = [].concat(o);else {for (var l = parseInt(s / (u - 1), 10), h = o.map(function (t, e) {return e % l == 0 ? o.slice(e, e + l) : null;}).filter(function (t) {return t;}), f = 1, p = h.length; f < p && (a ? f * l < s - l : f < u - 1); f++) {n.push(h[f][0]);}if (o.length) {n.unshift(o[0]);var g = o[s - 1];-1 === n.indexOf(g) && n.push(g);}}return e.categories = o, e.ticks = n, e;};}, function (t, e) {t.exports = { requestAnimationFrame: "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame : function (t) {return setTimeout(t, 16);} };}, function (t, e, n) {function i(t) {return [t.x, t.y];}function r(t, e, n, r) {var o,s,c,u,l,h,f,p,g = [],d = !!r;if (d) {for (c = [1 / 0, 1 / 0], u = [-1 / 0, -1 / 0], p = 0, f = t.length; p < f; p++) {l = i(t[p]), a.min(c, c, l), a.max(u, u, l);}a.min(c, c, r[0]), a.max(u, u, r[1]);}for (p = 0, h = t.length; p < h; p++) {if (l = i(t[p]), n) o = i(t[p ? p - 1 : h - 1]), s = i(t[(p + 1) % h]);else {if (0 === p || p === h - 1) {g.push([l[0], l[1]]);continue;}o = i(t[p - 1]), s = i(t[p + 1]);}var v = a.sub([], s, o);a.scale(v, v, e);var y = a.distance(l, o),m = a.distance(l, s),x = y + m;0 !== x && (y /= x, m /= x);var _ = a.scale([], v, -y),S = a.scale([], v, m),b = a.add([], l, _),w = a.add([], l, S);d && (a.max(b, b, c), a.min(b, b, u), a.max(w, w, c), a.min(w, w, u)), g.push([b[0], b[1]]), g.push([w[0], w[1]]);}return n && g.push(g.shift()), g;}var a = n(3);t.exports = { smooth: function smooth(t, e, n) {for (var i, a, o, s = !!e, c = r(t, .4, s, n), u = t.length, l = [], h = 0; h < u - 1; h++) {i = c[2 * h], a = c[2 * h + 1], o = t[h + 1], l.push(["C", i[0], i[1], a[0], a[1], o.x, o.y]);}return s && (i = c[u], a = c[u + 1], o = t[0], l.push(["C", i[0], i[1], a[0], a[1], o.x, o.y])), l;} };}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(4),a = n(16),o = n(0);n(37);var s = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n.getDefaultCfg = function () {var e = t.prototype.getDefaultCfg.call(this);return e.type = "path", e.shapeType = "line", e;}, n.getDrawCfg = function (e) {var n = t.prototype.getDrawCfg.call(this, e);return n.isStack = this.hasAdjust("stack"), n;}, n.draw = function (t, e) {var n = this,i = n.get("container"),r = n.getYScale(),s = n.get("connectNulls"),c = a.splitArray(t, r.field, s),u = this.getDrawCfg(t[0]);u.origin = t, o.each(c, function (r, a) {u.splitedIndex = a, u.points = r, n.drawShape(u.shape, t[0], u, i, e);});}, e;}(r);r.Path = s, t.exports = s;}, function (t, e, n) {var i = n(1),r = n(0),a = { getDefalutSize: function getDefalutSize() {var t = this.get("defaultSize");if (!t) {var e = this.get("coord"),n = this.getXScale(),r = this.get("dataArray"),a = n.values.length,o = n.range,s = 1 / a,c = 1;e && e.isPolar ? c = e.transposed && a > 1 ? i.widthRatio.multiplePie : i.widthRatio.rose : (n.isLinear && (s *= o[1] - o[0]), c = i.widthRatio.column), s *= c, this.hasAdjust("dodge") && (s /= r.length), t = s, this.set("defaultSize", t);}return t;}, getDimWidth: function getDimWidth(t) {var e = this.get("coord"),n = e.convertPoint({ x: 0, y: 0 }),i = e.convertPoint({ x: "x" === t ? 1 : 0, y: "x" === t ? 0 : 1 }),r = 0;return n && i && (r = Math.sqrt(Math.pow(i.x - n.x, 2) + Math.pow(i.y - n.y, 2))), r;}, _getWidth: function _getWidth() {var t = this.get("_width");if (!t) {var e = this.get("coord");t = e && e.isPolar && !e.transposed ? (e.endAngle - e.startAngle) * e.circleRadius : this.getDimWidth("x"), this.set("_width", t);}return t;}, _toNormalizedSize: function _toNormalizedSize(t) {return t / this._getWidth();}, _toCoordSize: function _toCoordSize(t) {return this._getWidth() * t;}, getNormalizedSize: function getNormalizedSize(t) {var e = this.getAttrValue("size", t);return e = r.isNil(e) ? this.getDefalutSize() : this._toNormalizedSize(e);}, getSize: function getSize(t) {var e = this.getAttrValue("size", t);if (r.isNil(e)) {var n = this.getDefalutSize();e = this._toCoordSize(n);}return e;} };t.exports = a;}, function (t, e, n) {var i,r = n(0),a = n(15);r.isWx || r.isMy || (i = n(155));var o = ["touchstart", "touchmove", "touchend"],s = function () {function t(t, e) {var n = this.getDefaultCfg();r.deepMix(this, n, t), this.chart = e, this.canvas = e.get("canvas"), this.el = e.get("canvas").get("el"), this._bindEvents();}var e = t.prototype;return e.getDefaultCfg = function () {return { startEvent: o[0], processEvent: o[1], endEvent: o[2], resetEvent: null };}, e._start = function (t) {this.preStart && this.preStart(t), this.start(t), this.onStart && this.onStart(t);}, e._process = function (t) {this.preProcess && this.preProcess(t), this.process(t), this.onProcess && this.onProcess(t);}, e._end = function (t) {this.preEnd && this.preEnd(t), this.end(t), this.onEnd && this.onEnd(t);}, e._reset = function (t) {this.preReset && this.preReset(t), this.reset(t), this.onReset && this.onReset(t);}, e.start = function () {}, e.process = function () {}, e.end = function () {}, e.reset = function () {}, e._bindEvents = function () {this._clearEvents();var t = this.startEvent,e = this.processEvent,n = this.endEvent,r = this.resetEvent,a = this.el;i && (this.hammer = new i(a)), this._bindEvent(t, "_start"), this._bindEvent(e, "_process"), this._bindEvent(n, "_end"), this._bindEvent(r, "_reset");}, e._clearEvents = function () {var t = this.startEvent,e = this.processEvent,n = this.endEvent,i = this.resetEvent;this.hammer && (this.hammer.destroy(), this.hammer = null), this._clearTouchEvent(t, "_start"), this._clearTouchEvent(e, "_process"), this._clearTouchEvent(n, "_end"), this._clearTouchEvent(i, "_reset");}, e._bindEvent = function (t, e) {var n = this.el;t && (-1 !== o.indexOf(t) ? r.addEventListener(n, t, r.wrapBehavior(this, e)) : this.hammer && this.hammer.on(t, r.wrapBehavior(this, e)));}, e._clearTouchEvent = function (t, e) {var n = this.el;t && -1 !== o.indexOf(t) && r.removeEventListener(n, t, r.getWrapBehavior(this, e));}, e.destroy = function () {this._clearEvents();}, t;}();a._Interactions = {}, a.registerInteraction = function (t, e) {a._Interactions[t] = e;}, a.getInteraction = function (t) {return a._Interactions[t];}, a.prototype.interaction = function (t, e) {var n = this._interactions || {};n[t] && n[t].destroy();var i = new (a.getInteraction(t))(e, this);return n[t] = i, this._interactions = n, this;}, a.prototype.clearInteraction = function (t) {var e = this._interactions;if (e) return t ? (e[t] && e[t].destroy(), delete e[t]) : r.each(e, function (t, n) {t.destroy(), delete e[n];}), this;}, t.exports = s;}, function (t, e, n) {var i = {},r = n(1);i.Global = r, i.version = r.version, i.Chart = n(15), i.Shape = n(6), i.G = n(7), i.Util = n(0), i.track = function (t) {r.trackable = t;}, n(96), t.exports = i;}, function (t, e, n) {var i = n(0),r = { label: { fill: "#808080", fontSize: 10 }, line: { stroke: "#E8E8E8", lineWidth: 1 }, grid: { type: "line", stroke: "#E8E8E8", lineWidth: 1, lineDash: [2] }, tickLine: null, labelOffset: 7.5 },a = { fontFamily: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif', defaultColor: "#1890FF", pixelRatio: 1, padding: "auto", appendPadding: 15, colors: ["#1890FF", "#2FC25B", "#FACC14", "#223273", "#8543E0", "#13C2C2", "#3436C7", "#F04864"], shapes: { line: ["line", "dash"], point: ["circle", "hollowCircle"] }, sizes: [4, 10], axis: { bottom: i.mix({}, r, { grid: null }), left: i.mix({}, r, { line: null }), right: i.mix({}, r, { line: null }), circle: i.mix({}, r, { line: null }), radius: i.mix({}, r, { labelOffset: 4 }) }, shape: { line: { lineWidth: 2, lineJoin: "round", lineCap: "round" }, point: { lineWidth: 0, size: 3 }, area: { fillOpacity: .1 } }, _defaultAxis: r };t.exports = a;}, function (t, e) {function n(t, e, n, i, r) {return { type: t, chart: e, native: r || null, x: void 0 !== n ? n : null, y: void 0 !== i ? i : null };}function i(t, e) {var i = t.type,a = {},o = t.targetTouches;o && o.length > 0 ? (a.x = o[0].clientX, a.y = o[0].clientY) : (a.x = t.clientX, a.y = t.clientY);var s = e.get("canvas"),c = r.getRelativePosition(a, s);return n(i, e, c.x, c.y, t);}var r,a = !!function () {var t = !1;try {var e = Object.defineProperty({}, "passive", { get: function get() {t = !0;} });window.addEventListener("e", null, e);} catch (t) {}return t;}() && { passive: !0 };r = { isWx: "object" == typeof wx && "function" == typeof wx.getSystemInfoSync, isMy: "object" == typeof my && "function" == typeof my.getSystemInfoSync, isNode: void 0 !== t && void 0 !== t.exports, isBrowser: "undefined" != typeof window && void 0 !== window.document, getPixelRatio: function getPixelRatio() {return window && window.devicePixelRatio || 1;}, getStyle: function getStyle(t, e) {return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e);}, getWidth: function getWidth(t) {var e = this.getStyle(t, "width");return "auto" === e && (e = t.offsetWidth), parseFloat(e);}, getHeight: function getHeight(t) {var e = this.getStyle(t, "height");return "auto" === e && (e = t.offsetHeight), parseFloat(e);}, getDomById: function getDomById(t) {return t ? document.getElementById(t) : null;}, getRelativePosition: function getRelativePosition(t, e) {var n = e.get("el"),i = n.getBoundingClientRect(),r = i.top,a = i.right,o = i.bottom,s = i.left,c = parseFloat(this.getStyle(n, "padding-left")),u = parseFloat(this.getStyle(n, "padding-top")),l = a - s - c - parseFloat(this.getStyle(n, "padding-right")),h = o - r - u - parseFloat(this.getStyle(n, "padding-bottom")),f = e.get("pixelRatio");return { x: (t.x - s - c) / l * n.width / f, y: (t.y - r - u) / h * n.height / f };}, addEventListener: function addEventListener(t, e, n) {r.isBrowser && t.addEventListener(e, n, a);}, removeEventListener: function removeEventListener(t, e, n) {r.isBrowser && t.removeEventListener(e, n, a);}, createEvent: function createEvent(t, e) {return i(t, e);}, measureText: function measureText(t, e, n) {return n || (n = document.createElement("canvas").getContext("2d")), n.font = e || "12px sans-serif", n.measureText(t);} }, t.exports = r;}, function (t, e, n) {var i = n(28);t.exports = function (t) {var e = i(t);return e.charAt(0).toUpperCase() + e.substring(1);};}, function (t, e, n) {var i = n(28);t.exports = function (t) {var e = i(t);return e.charAt(0).toLowerCase() + e.substring(1);};}, function (t, e, n) {var i = n(5);t.exports = function (t) {return i(t, "String");};}, function (t, e, n) {var i = n(5);t.exports = function (t) {return i(t, "Number");};}, function (t, e, n) {var i = n(5);t.exports = function (t) {return i(t, "Boolean");};}, function (t, e, n) {var i = n(5);t.exports = function (t) {return i(t, "Function");};}, function (t, e, n) {var i = n(5);t.exports = function (t) {return i(t, "Date");};}, function (t, e) {var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;};t.exports = function (t) {return "object" === (void 0 === t ? "undefined" : n(t)) && null !== t;};}, function (t, e, n) {function i(t, e, n, s) {n = n || 0, s = s || o;for (var c in e) {if (e.hasOwnProperty(c)) {var u = e[c];null !== u && r(u) ? (r(t[c]) || (t[c] = {}), n < s ? i(t[c], u, n + 1, s) : t[c] = e[c]) : a(u) ? (t[c] = [], t[c] = t[c].concat(u)) : void 0 !== u && (t[c] = u);}}}var r = n(31),a = n(17),o = 5;t.exports = function () {for (var t = new Array(arguments.length), e = t.length, n = 0; n < e; n++) {t[n] = arguments[n];}for (var r = t[0], a = 1; a < e; a++) {i(r, t[a]);}return r;};}, function (t, e) {function n(t, e) {for (var n in e) {e.hasOwnProperty(n) && "constructor" !== n && void 0 !== e[n] && (t[n] = e[n]);}}t.exports = function (t, e, i, r) {return e && n(t, e), i && n(t, i), r && n(t, r), t;};}, function (t, e, n) {var i = n(30),r = n(17);t.exports = function (t, e) {if (t) if (r(t)) for (var n = 0, a = t.length; n < a && !1 !== e(t[n], n); n++) {;} else if (i(t)) for (var o in t) {if (t.hasOwnProperty(o) && !1 === e(t[o], o)) break;}};}, function (t, e, n) {var i = n(0),r = function () {function t(t) {i.mix(this, t), this._init();}var e = t.prototype;return e._init = function () {var t = this,e = t.start,n = t.end,i = Math.min(e.x, n.x),r = Math.max(e.x, n.x),a = Math.min(e.y, n.y),o = Math.max(e.y, n.y);this.tl = { x: i, y: a }, this.tr = { x: r, y: a }, this.bl = { x: i, y: o }, this.br = { x: r, y: o }, this.width = r - i, this.height = o - a;}, e.reset = function (t, e) {this.start = t, this.end = e, this._init();}, e.isInRange = function (t, e) {i.isObject(t) && (e = t.y, t = t.x);var n = this.tl,r = this.br;return n.x <= t && t <= r.x && n.y <= e && e <= r.y;}, t;}();t.exports = r;}, function (t, e, n) {var i = n(18);n(62), t.exports = i;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(18),a = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {this.type = "cartesian", this.transposed = !1, this.isRect = !0;}, n.init = function (t, e) {this.x = { start: t.x, end: e.x }, this.y = { start: t.y, end: e.y };}, n.convertPoint = function (t) {var e = this,n = e.transposed,i = n ? "y" : "x",r = n ? "x" : "y",a = e.x,o = e.y;return { x: a.start + (a.end - a.start) * t[i], y: o.start + (o.end - o.start) * t[r] };}, n.invertPoint = function (t) {var e = this,n = e.transposed,i = n ? "y" : "x",r = n ? "x" : "y",a = e.x,o = e.y,s = {};return s[i] = (t.x - a.start) / (a.end - a.start), s[r] = (t.y - o.start) / (o.end - o.start), s;}, e;}(r);r.Cartesian = a, r.Rect = a, t.exports = a;}, function (t, e, n) {t.exports = { Position: n(64), Shape: n(69), Size: n(70), Color: n(71) };}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}function r(t, e) {if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != typeof e && "function" != typeof e ? t : e;}function a(t, e) {if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);}var o = n(65),s = n(19),c = n(34),u = function (t) {function e(n) {i(this, e);var a = r(this, t.call(this, n));return a.names = ["x", "y"], a.type = "position", a;}return a(e, t), e.prototype.mapping = function (t, e) {var n = this.scales,i = this.coord,r = n[0],a = n[1],u = void 0,l = void 0,h = void 0;if (o(t) || o(e)) return [];if (s(e) && s(t)) {u = [], l = [];for (var f = 0, p = 0, g = t.length, d = e.length; f < g && p < d; f++, p++) {h = i.convertPoint({ x: r.scale(t[f]), y: a.scale(e[p]) }), u.push(h.x), l.push(h.y);}} else if (s(e)) t = r.scale(t), l = [], c(e, function (e) {e = a.scale(e), h = i.convertPoint({ x: t, y: e }), u && u !== h.x ? (s(u) || (u = [u]), u.push(h.x)) : u = h.x, l.push(h.y);});else if (s(t)) e = a.scale(e), u = [], c(t, function (t) {t = r.scale(t), h = i.convertPoint({ x: t, y: e }), l && l !== h.y ? (s(l) || (l = [l]), l.push(h.y)) : l = h.y, u.push(h.x);});else {t = r.scale(t), e = a.scale(e);var v = i.convertPoint({ x: t, y: e });u = v.x, l = v.y;}return [u, l];}, e;}(n(12));t.exports = u;}, function (t, e) {t.exports = function (t) {return null === t || void 0 === t;};}, function (t, e) {var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;};t.exports = function (t) {var e = void 0 === t ? "undefined" : n(t);return null !== t && "object" === e || "function" === e;};}, function (t, e, n) {var i = n(33);t.exports = function (t) {return i(t, "String");};}, function (t, e) {function n(t, e) {for (var n in e) {e.hasOwnProperty(n) && "constructor" !== n && void 0 !== e[n] && (t[n] = e[n]);}}t.exports = function (t, e, i, r) {return e && n(t, e), i && n(t, i), r && n(t, r), t;};}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}function r(t, e) {if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != typeof e && "function" != typeof e ? t : e;}function a(t, e) {if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);}var o = function (t) {function e(n) {i(this, e);var a = r(this, t.call(this, n));return a.names = ["shape"], a.type = "shape", a.gradient = null, a;}return a(e, t), e.prototype.getLinearValue = function (t) {var e = this.values;return e[Math.round((e.length - 1) * t)];}, e;}(n(12));t.exports = o;}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}function r(t, e) {if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != typeof e && "function" != typeof e ? t : e;}function a(t, e) {if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);}var o = function (t) {function e(n) {i(this, e);var a = r(this, t.call(this, n));return a.names = ["size"], a.type = "size", a.gradient = null, a;}return a(e, t), e;}(n(12));t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(72),o = function (t) {function e(e) {var n;return n = t.call(this, e) || this, n.names = ["color"], n.type = "color", n.gradient = null, r.isString(n.values) && (n.linear = !0), n;}return i(e, t), e.prototype.getLinearValue = function (t) {var e = this.gradient;if (!e) {var n = this.values;e = a.gradient(n), this.gradient = e;}return e(t);}, e;}(n(12));t.exports = o;}, function (t, e, n) {function i(t, e, n, i) {return t[i] + (e[i] - t[i]) * n;}function r(t) {return "#" + a(t[0]) + a(t[1]) + a(t[2]);}function a(t) {return t = Math.round(t), 1 === (t = t.toString(16)).length && (t = "0" + t), t;}function o(t, e) {var n = t.length - 1,a = Math.floor(n * e),o = n * e - a,s = t[a],c = a === n ? s : t[a + 1];return r([i(s, c, o, 0), i(s, c, o, 1), i(s, c, o, 2)]);}function s(t) {var e = [];return e.push(parseInt(t.substr(1, 2), 16)), e.push(parseInt(t.substr(3, 2), 16)), e.push(parseInt(t.substr(5, 2), 16)), e;}var c = n(0),u = { black: "#000000", blue: "#0000ff", grey: "#808080", green: "#008000", orange: "#ffa500", pink: "#ffc0cb", purple: "#800080", red: "#ff0000", white: "#ffffff", yellow: "#ffff00" },l = { toHex: function toHex(t) {if (u[t]) return u[t];if ("#" === t[0]) {if (7 === t.length) return t;var e = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (t, e, n, i) {return "#" + e + e + n + n + i + i;});return u[t] = e, e;}var n = t.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);return n.shift(), n = r(n), u[t] = n, n;}, hex2arr: s, gradient: function gradient(t) {var e = [];return c.isString(t) && (t = t.split("-")), c.each(t, function (t) {-1 === t.indexOf("#") && (t = l.toHex(t)), e.push(s(t));}), function (t) {return o(e, t);};} };t.exports = l;}, function (t, e) {function n(t, e) {for (var n in e) {e.hasOwnProperty(n) && "constructor" !== n && void 0 !== e[n] && (t[n] = e[n]);}}t.exports = function (t, e, i, r) {return e && n(t, e), i && n(t, i), r && n(t, r), t;};}, function (t, e, n) {var i = n(0),r = n(1),a = n(75),o = { linear: "Linear", cat: "Cat", timeCat: "TimeCat", identity: "Identity" },s = function () {function t(t) {this.defs = {}, i.mix(this, t);}var e = t.prototype;return e._getDef = function (t) {var e = this.defs,n = null;return (r.scales[t] || e[t]) && (n = i.mix({}, r.scales[t]), i.each(e[t], function (t, e) {i.isNil(t) ? delete n[e] : n[e] = t;})), n;}, e._getDefaultType = function (t, e, n) {if (n && n.type) return n.type;var r = "linear",a = i.Array.firstValue(e, t);return i.isArray(a) && (a = a[0]), i.isString(a) && (r = "cat"), r;}, e._getScaleCfg = function (t, e, n, r) {var a,o = { field: e, values: a = r && r.values ? r.values : i.Array.values(n, e) };if (!("cat" === t || "timeCat" === t || r && r.min && r.max)) {var s = i.Array.getRange(a),c = s.min,u = s.max;o.min = c, o.max = u, o.nice = !0;}return "cat" !== t && "timeCat" !== t || (o.isRounding = !1), o;}, e.createScale = function (t, e) {var n,r = this,s = r._getDef(t);if (!e || !e.length) return n = s && s.type ? new a[o[s.type]](s) : new a.Identity({ value: t, field: t.toString(), values: [t] });var c = e[0][t];if (null === c && (c = i.Array.firstValue(e, t)), i.isNumber(t) || i.isNil(c) && !s) n = new a.Identity({ value: t, field: t.toString(), values: [t] });else {var u = r._getDefaultType(t, e, s),l = r._getScaleCfg(u, t, e, s);s && i.mix(l, s), n = new a[o[u]](l);}return n;}, t;}();t.exports = s;}, function (t, e, n) {var i = n(10);n(78), n(81), n(39), t.exports = i;}, function (t, e) {function n(t, e) {for (var n in e) {e.hasOwnProperty(n) && "constructor" !== n && void 0 !== e[n] && (t[n] = e[n]);}}t.exports = function (t, e, i, r) {return e && n(t, e), i && n(t, i), r && n(t, r), t;};}, function (t, e, n) {var i = n(13),r = Array.isArray ? Array.isArray : function (t) {return i(t, "Array");};t.exports = r;}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}function r(t, e) {if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != typeof e && "function" != typeof e ? t : e;}function a(t, e) {if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);}var o = n(21),s = n(11),c = n(10),u = n(79),l = function (t) {function e() {return i(this, e), r(this, t.apply(this, arguments));}return a(e, t), e.prototype._initDefaultCfg = function () {t.prototype._initDefaultCfg.call(this);var e = this;e.type = "linear", e.isLinear = !0, e.nice = !1, e.min = null, e.minLimit = null, e.max = null, e.maxLimit = null, e.tickCount = null, e.tickInterval = null, e.minTickInterval = null, e.snapArray = null;}, e.prototype.init = function () {var t = this;if (t.ticks) {var e = t.ticks,n = t.translate(e[0]),i = t.translate(e[e.length - 1]);(o(t.min) || t.min > n) && (t.min = n), (o(t.max) || t.max < i) && (t.max = i);} else t.min = t.translate(t.min), t.max = t.translate(t.max), t.initTicks();}, e.prototype.calculateTicks = function () {var t = this.min,e = this.max,n = this.minLimit,i = this.maxLimit,r = this.tickCount,a = this.tickInterval,o = this.minTickInterval,s = this.snapArray;if (1 === r) throw new Error("linear scale'tickCount should not be 1");if (e < t) throw new Error("max: " + e + " should not be less than min: " + t);return u({ min: t, max: e, minLimit: n, maxLimit: i, minCount: r, maxCount: r, interval: a, minTickInterval: o, snapArray: s }).ticks;}, e.prototype.initTicks = function () {var t = this,e = t.calculateTicks();if (t.nice) t.ticks = e, t.min = e[0], t.max = e[e.length - 1];else {var n = [];s(e, function (e) {e >= t.min && e <= t.max && n.push(e);}), n.length || (n.push(t.min), n.push(t.max)), t.ticks = n;}}, e.prototype.scale = function (t) {if (o(t)) return NaN;var e = this.max,n = this.min;if (e === n) return 0;var i = (t - n) / (e - n),r = this.rangeMin();return r + i * (this.rangeMax() - r);}, e.prototype.invert = function (t) {var e = (t - this.rangeMin()) / (this.rangeMax() - this.rangeMin());return this.min + e * (this.max - this.min);}, e;}(c);c.Linear = l, t.exports = l;}, function (t, e, n) {var i = n(21),r = n(14),a = n(80),o = [0, 1, 1.2, 1.5, 1.6, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10],s = [0, 1, 2, 4, 5, 10];t.exports = function (t) {var e = t.min,n = t.max,c = t.interval,u = t.minTickInterval,l = [],h = t.minCount || 5,f = t.maxCount || 7,p = h === f,g = i(t.minLimit) ? -1 / 0 : t.minLimit,d = i(t.maxLimit) ? 1 / 0 : t.maxLimit,v = (h + f) / 2,y = v,m = t.snapArray ? t.snapArray : p ? o : s;if (e === g && n === d && p && (c = (n - e) / (y - 1)), i(e) && (e = 0), i(n) && (n = 0), n === e && (0 === e ? n = 1 : e > 0 ? e = 0 : n = 0, n - e < 5 && !c && n - e >= 1 && (c = 1)), i(c)) {var x = (n - e) / (v - 1);c = a.snapFactorTo(x, m, "ceil"), f !== h && ((y = parseInt((n - e) / c, 10)) > f && (y = f), y < h && (y = h), c = a.snapFactorTo((n - e) / (y - 1), m, "floor"));}if (r(u) && c < u && (c = u), t.interval || f !== h) n = Math.min(a.snapMultiple(n, c, "ceil"), d), e = Math.max(a.snapMultiple(e, c, "floor"), g), y = Math.round((n - e) / c), e = a.fixedBase(e, c), n = a.fixedBase(n, c);else {v = parseInt(v, 10);var _ = (n + e) / 2,S = a.snapMultiple(_, c, "ceil"),b = Math.floor((v - 2) / 2),w = S + b * c,P = void 0;P = v % 2 == 0 ? S - b * c : S - (b + 1) * c, w < n && (w += c), P > e && (P -= c), n = a.fixedBase(w, c), e = a.fixedBase(P, c);}n = Math.min(n, d), e = Math.max(e, g), l.push(e);for (var C = 1; C < y; C++) {var M = a.fixedBase(c * C + e, c);M < n && l.push(M);}return l[l.length - 1] < n && l.push(n), { min: e, max: n, interval: c, count: y, ticks: l };};}, function (t, e) {function n(t) {var e = 1;if (t === 1 / 0 || t === -1 / 0) throw new Error("Not support Infinity!");if (t < 1) {for (var n = 0; t < 1;) {e /= 10, t *= 10, n++;}e.toString().length > a && (e = parseFloat(e.toFixed(n)));} else for (; t > 10;) {e *= 10, t /= 10;}return e;}function i(t, e) {var n = t.length;if (0 === n) return NaN;var i = t[0];if (e < t[0]) return NaN;if (e >= t[n - 1]) return t[n - 1];for (var r = 1; r < t.length && !(e < t[r]); r++) {i = t[r];}return i;}function r(t, e) {var n = t.length;if (0 === n) return NaN;var i = void 0;if (e > t[n - 1]) return NaN;if (e < t[0]) return t[0];for (var r = 1; r < t.length; r++) {if (e <= t[r]) {i = t[r];break;}}return i;}var a = 12,o = { snapFactorTo: function snapFactorTo(t, e, i) {if (isNaN(t)) return NaN;var r = 1;if (0 !== t) {t < 0 && (r = -1);var s = n(t *= r);r *= s, t /= s;}var c = (t = "floor" === i ? o.snapFloor(e, t) : "ceil" === i ? o.snapCeiling(e, t) : o.snapTo(e, t)) * r;return Math.abs(r) < 1 && c.toString().length > a && (c = t / parseInt(1 / r) * (r > 0 ? 1 : -1)), c;}, snapMultiple: function snapMultiple(t, e, n) {return ("ceil" === n ? Math.ceil(t / e) : "floor" === n ? Math.floor(t / e) : Math.round(t / e)) * e;}, snapTo: function snapTo(t, e) {var n = i(t, e),a = r(t, e);if (isNaN(n) || isNaN(a)) {if (t[0] >= e) return t[0];var o = t[t.length - 1];if (o <= e) return o;}return Math.abs(e - n) < Math.abs(a - e) ? n : a;}, snapFloor: function snapFloor(t, e) {return i(t, e);}, snapCeiling: function snapCeiling(t, e) {return r(t, e);}, fixedBase: function fixedBase(t, e) {var n = e.toString(),i = n.indexOf(".");if (-1 === i) return Math.round(t);var r = n.substr(i + 1).length;return r > 20 && (r = 20), parseFloat(t.toFixed(r));} };t.exports = o;}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}function r(t, e) {if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != typeof e && "function" != typeof e ? t : e;}function a(t, e) {if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);}var o = n(10),s = n(14),c = function (t) {function e() {return i(this, e), r(this, t.apply(this, arguments));}return a(e, t), e.prototype._initDefaultCfg = function () {t.prototype._initDefaultCfg.call(this), this.isIdentity = !0, this.type = "identity", this.value = null;}, e.prototype.getText = function () {return this.value.toString();}, e.prototype.scale = function (t) {return this.value !== t && s(t) ? t : this.range[0];}, e.prototype.invert = function () {return this.value;}, e;}(o);o.Identity = c, t.exports = c;}, function (t, e, n) {function i(t) {var e = t.slice(0);if (e.length > 0) {var n = e[0],i = e[e.length - 1];0 !== n.value && e.unshift({ value: 0 }), 1 !== i.value && e.push({ value: 1 });}return e;}var r = n(0),a = n(83),o = n(1),s = n(7).Shape,c = function () {function t(t) {this.axisCfg = {}, this.frontPlot = null, this.backPlot = null, this.axes = {}, r.mix(this, t);}var e = t.prototype;return e._isHide = function (t) {var e = this.axisCfg;return !e || !1 === e[t];}, e._getLinePosition = function (t, e, n, i) {var r = "",a = t.field,o = this.axisCfg;return o[a] && o[a].position ? r = o[a].position : "x" === e ? r = i ? "left" : "bottom" : "y" === e && (r = n ? "right" : "left", i && (r = "bottom")), r;}, e._getLineCfg = function (t, e, n) {var i,r,a = 1;return "x" === e ? (i = { x: 0, y: 0 }, r = { x: 1, y: 0 }) : "right" === n ? (i = { x: 1, y: 0 }, r = { x: 1, y: 1 }) : (i = { x: 0, y: 0 }, r = { x: 0, y: 1 }, a = -1), t.transposed && (a *= -1), { offsetFactor: a, start: t.convertPoint(i), end: t.convertPoint(r) };}, e._getCircleCfg = function (t) {return { startAngle: t.startAngle, endAngle: t.endAngle, center: t.center, radius: t.circleRadius };}, e._getRadiusCfg = function (t) {var e, n;return t.transposed ? (e = { x: 0, y: 0 }, n = { x: 1, y: 0 }) : (e = { x: 0, y: 0 }, n = { x: 0, y: 1 }), { offsetFactor: -1, start: t.convertPoint(e), end: t.convertPoint(n) };}, e._getAxisCfg = function (t, e, n, i, a) {var c = this,u = this.axisCfg,l = e.getTicks(),h = r.deepMix({ ticks: l, frontContainer: this.frontPlot, backContainer: this.backPlot }, a, u[e.field]),f = [],p = h.label,g = l.length,d = 0,v = 0,y = p;return r.each(l, function (t, e) {if (r.isFunction(p)) {var n = p(t.text, e, g);y = n ? r.mix({}, o._defaultAxis.label, n) : null;}if (y) {var i = {};y.textAlign && (i.textAlign = y.textAlign), y.textBaseline && (i.textBaseline = y.textBaseline);var a = new s.Text({ className: "axis-label", attrs: r.mix({ x: 0, y: 0, text: t.text, fontFamily: c.chart.get("canvas").get("fontFamily") }, y), value: t.value, textStyle: i, top: y.top, context: c.chart.get("canvas").get("context") });f.push(a);var u = a.getBBox(),l = u.width,h = u.height;d = Math.max(d, l), v = Math.max(v, h);}}), h.labels = f, h.maxWidth = d, h.maxHeight = v, h;}, e._createAxis = function (t, e, n, i, r) {void 0 === r && (r = "");var a,s,c,u = this,l = t.type,h = t.transposed;if ("cartesian" === l || "rect" === l) {var f = u._getLinePosition(e, i, r, h);(c = o.axis[f]).position = f, a = "Line", s = f;} else "x" === i && !h || "y" === i && h ? (c = o.axis.circle, a = "Circle", s = "circle") : (c = o.axis.radius, a = "Line", s = "radius");var p = u._getAxisCfg(t, e, n, i, c);p.type = a, p.dimType = i, p.verticalScale = n, p.index = r, this.axes[s] = p;}, e.createAxis = function (t, e, n) {var o = this;e && !o._isHide(e.field) && o._createAxis(t, e, n[0], "x"), r.each(n, function (n, i) {o._isHide(n.field) || o._createAxis(t, n, e, "y", i);});var s = this.axes,c = o.chart;if (c._isAutoPadding()) {var u = r.parsePadding(c.get("padding")),l = r.parsePadding(c.get("appendPadding")),h = c.get("legendRange") || { top: 0, right: 0, bottom: 0, left: 0 },f = ["auto" === u[0] ? h.top + 2 * l[0] : u[0], "auto" === u[1] ? h.right + l[1] : u[1], "auto" === u[2] ? h.bottom + l[2] : u[2], "auto" === u[3] ? h.left + l[3] : u[3]];if (t.isPolar) {var p = s.circle;if (p) {var g = p.maxHeight,d = p.maxWidth,v = p.labelOffset;f[0] += g + v, f[1] += d + v, f[2] += g + v, f[3] += d + v;}} else {if (s.right && "auto" === u[1]) {var y = s.right,m = y.maxWidth,x = y.labelOffset;f[1] += m + x;}if (s.left && "auto" === u[3]) {var _ = s.left,S = _.maxWidth,b = _.labelOffset;f[3] += S + b;}if (s.bottom && "auto" === u[2]) {var w = s.bottom,P = w.maxHeight,C = w.labelOffset;f[2] += P + C;}}c.set("_padding", f), c._updateLayout(f);}r.each(s, function (e) {var n,s = e.type,c = e.grid,u = e.verticalScale,l = e.ticks,h = e.dimType,f = e.position,p = e.index;if (t.isPolar ? "Line" === s ? n = o._getRadiusCfg(t) : "Circle" === s && (n = o._getCircleCfg(t)) : n = o._getLineCfg(t, h, f), c && u) {var g = [],d = i(u.getTicks());r.each(l, function (e) {var n = [];r.each(d, function (i) {var r = "x" === h ? e.value : i.value,a = "x" === h ? i.value : e.value,o = t.convertPoint({ x: r, y: a });n.push(o);}), g.push({ points: n, _id: "axis-" + h + p + "-grid-" + e.tickValue });}), e.gridPoints = g, t.isPolar && (e.center = t.center, e.startAngle = t.startAngle, e.endAngle = t.endAngle);}n._id = "axis-" + h, r.isNil(p) || (n._id = "axis-" + h + p), new a[s](r.mix(e, n));});}, e.clear = function () {this.axes = {}, this.frontPlot.clear(), this.backPlot.clear();}, t;}();t.exports = c;}, function (t, e, n) {var i = n(24);n(84), t.exports = i;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(24),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {t.prototype._initDefaultCfg.call(this), this.start = null, this.end = null;}, n.getOffsetPoint = function (t) {var e = this.start,n = this.end;return { x: e.x + (n.x - e.x) * t, y: e.y + (n.y - e.y) * t };}, n.getAxisVector = function () {var t = this.start,e = this.end;return [e.x - t.x, e.y - t.y];}, n.drawLine = function (t) {var e = this.getContainer(t.top),n = this.start,i = this.end;e.addShape("line", { className: "axis-line", attrs: r.mix({ x1: n.x, y1: n.y, x2: i.x, y2: i.y }, t) });}, e;}(a);a.Line = o, t.exports = o;}, function (t, e, n) {var i = n(0),r = n(35),a = n(36),o = n(41).requestAnimationFrame,s = function () {function t(t) {this._attrs = i.mix({ type: "canvas", children: [] }, t), this._initPixelRatio(), this._initCanvas();}var e = t.prototype;return e.get = function (t) {return this._attrs[t];}, e.set = function (t, e) {this._attrs[t] = e;}, e._initPixelRatio = function () {this.get("pixelRatio") || this.set("pixelRatio", i.getPixelRatio());}, e.beforeDraw = function () {var t = this._attrs.context,e = this._attrs.el;!i.isWx && !i.isMy && t && t.clearRect(0, 0, e.width, e.height);}, e._initCanvas = function () {var t,e = this,n = e.get("el"),r = e.get("context");if (!(t = r ? r.canvas : i.isString(n) ? i.getDomById(n) : n)) throw new Error("Please specify the id or el of the chart!");r && t && !t.getContext && (t.getContext = function () {return r;});var a = e.get("width");a || (a = i.getWidth(t));var o = e.get("height");o || (o = i.getHeight(t)), e.set("canvas", this), e.set("el", t), e.set("context", r || t.getContext("2d")), e.changeSize(a, o);}, e.changeSize = function (t, e) {var n = this.get("pixelRatio"),r = this.get("el");i.isBrowser && (r.style.width = t + "px", r.style.height = e + "px"), i.isWx || i.isMy || (r.width = t * n, r.height = e * n, 1 !== n && this.get("context").scale(n, n)), this.set("width", t), this.set("height", e);}, e.getWidth = function () {var t = this.get("pixelRatio");return this.get("width") * t;}, e.getHeight = function () {var t = this.get("pixelRatio");return this.get("height") * t;}, e.getPointByClient = function (t, e) {var n = this.get("el"),i = n.getBoundingClientRect(),r = i.right - i.left,a = i.bottom - i.top;return { x: (t - i.left) * (n.width / r), y: (e - i.top) * (n.height / a) };}, e._beginDraw = function () {this._attrs.toDraw = !0;}, e._endDraw = function () {this._attrs.toDraw = !1;}, e.draw = function () {function t() {e.set("animateHandler", o(function () {e.set("animateHandler", void 0), e.get("toDraw") && t();})), e.beforeDraw();try {for (var n = e._attrs.context, r = e._attrs.children, a = 0, s = r.length; a < s; a++) {r[a].draw(n);}(i.isWx || i.isMy) && n.draw();} catch (t) {console.warn("error in draw canvas, detail as:"), console.warn(t), e._endDraw();}e._endDraw();}var e = this;e.get("destroyed") || (e.get("animateHandler") ? this._beginDraw() : t());}, e.destroy = function () {this.get("destroyed") || (this.clear(), this._attrs = {}, this.set("destroyed", !0));}, e.isDestroyed = function () {return this.get("destroyed");}, t;}();i.mix(s.prototype, r, { getGroupClass: function getGroupClass() {return a;} }), t.exports = s;}, function (t, e, n) {function i(t, e) {o.each(t, function (t) {t = t.split(":"), e.addColorStop(t[0], t[1]);});}function r(t, e, n) {var r = t.split(" "),a = r[0].slice(2, r[0].length - 1);a = a * Math.PI / 180;var o,s,c = r.slice(1),u = e.getBBox(),l = u.minX,h = u.minY,f = u.maxX,p = u.maxY;a >= 0 && a < .5 * Math.PI ? (o = { x: l, y: h }, s = { x: f, y: p }) : .5 * Math.PI <= a && a < Math.PI ? (o = { x: f, y: h }, s = { x: l, y: p }) : Math.PI <= a && a < 1.5 * Math.PI ? (o = { x: f, y: p }, s = { x: l, y: h }) : (o = { x: l, y: p }, s = { x: f, y: h });var g = Math.tan(a),d = g * g,v = (s.x - o.x + g * (s.y - o.y)) / (d + 1) + o.x,y = g * (s.x - o.x + g * (s.y - o.y)) / (d + 1) + o.y,m = n.createLinearGradient(o.x, o.y, v, y);return i(c, m), m;}function a(t, e, n) {var r = t.split(" "),a = r[0].slice(2, r[0].length - 1);a = a.split(",");var o = parseFloat(a[0]),s = parseFloat(a[1]),c = parseFloat(a[2]),u = r.slice(1);if (0 === c) return u[u.length - 1].split(":")[1];var l = e.getBBox(),h = l.width,f = l.height,p = l.minX,g = l.minY,d = Math.sqrt(h * h + f * f) / 2,v = n.createRadialGradient(p + h * o, g + f * s, c * d, p + h / 2, g + f / 2, d);return i(u, v), v;}var o = n(0);t.exports = { parseStyle: function parseStyle(t, e, n) {if ("(" === t[1]) try {var i = t[0];if ("l" === i) return r(t, e, n);if ("r" === i) return a(t, e, n);} catch (t) {console.error("error in parsing gradient string, please check if there are any extra whitespaces."), console.error(t);}return t;} };}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(2),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {t.prototype._initProperties.call(this), this._attrs.canFill = !0, this._attrs.canStroke = !0, this._attrs.type = "rect";}, n.getDefaultAttrs = function () {return { x: 0, y: 0, width: 0, height: 0, radius: 0, lineWidth: 0 };}, n.createPath = function (t) {var e = this.get("attrs"),n = e.x,i = e.y,a = e.width,o = e.height;t.beginPath();var s = e.radius;s && a * o ? (s = r.parsePadding(s), t.moveTo(n + s[0], i), t.lineTo(n + a - s[1], i), t.arc(n + a - s[1], i + s[1], s[1], -Math.PI / 2, 0, !1), t.lineTo(n + a, i + o - s[2]), t.arc(n + a - s[2], i + o - s[2], s[2], 0, Math.PI / 2, !1), t.lineTo(n + s[3], i + o), t.arc(n + s[3], i + o - s[3], s[3], Math.PI / 2, Math.PI, !1), t.lineTo(n, i + s[0]), t.arc(n + s[0], i + s[0], s[0], Math.PI, 3 * Math.PI / 2, !1), t.closePath()) : t.rect(n, i, a, o);}, n.calculateBox = function () {var t = this.get("attrs"),e = t.x,n = t.y;return { minX: e, minY: n, maxX: e + t.width, maxY: n + t.height };}, e;}(a);a.Rect = o, t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(2),a = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {t.prototype._initProperties.call(this), this._attrs.canFill = !0, this._attrs.canStroke = !0, this._attrs.type = "circle";}, n.getDefaultAttrs = function () {return { x: 0, y: 0, r: 0, lineWidth: 0 };}, n.createPath = function (t) {var e = this.get("attrs"),n = e.x,i = e.y,r = e.r;t.beginPath(), t.arc(n, i, r, 0, 2 * Math.PI, !1), t.closePath();}, n.calculateBox = function () {var t = this.get("attrs"),e = t.x,n = t.y,i = t.r;return { minX: e - i, maxX: e + i, minY: n - i, maxY: n + i };}, e;}(r);r.Circle = a, t.exports = a;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(2),a = n(8),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {t.prototype._initProperties.call(this), this._attrs.canStroke = !0, this._attrs.type = "line";}, n.getDefaultAttrs = function () {return { x1: 0, y1: 0, x2: 0, y2: 0, lineWidth: 1 };}, n.createPath = function (t) {var e = this.get("attrs"),n = e.x1,i = e.y1,r = e.x2,a = e.y2;t.beginPath(), t.moveTo(n, i), t.lineTo(r, a);}, n.calculateBox = function () {var t = this.get("attrs"),e = t.x1,n = t.y1,i = t.x2,r = t.y2;return a.getBBoxFromLine(e, n, i, r);}, e;}(r);r.Line = o, t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(2),a = n(8),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {t.prototype._initProperties.call(this), this._attrs.canFill = !0, this._attrs.canStroke = !0, this._attrs.type = "polygon";}, n.getDefaultAttrs = function () {return { points: null, lineWidth: 0 };}, n.createPath = function (t) {var e = this.get("attrs").points;t.beginPath();for (var n = 0, i = e.length; n < i; n++) {var r = e[n];0 === n ? t.moveTo(r.x, r.y) : t.lineTo(r.x, r.y);}t.closePath();}, n.calculateBox = function () {var t = this.get("attrs").points;return a.getBBoxFromPoints(t);}, e;}(r);r.Polygon = o, t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(2),a = n(42),o = n(8),s = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {t.prototype._initProperties.call(this), this._attrs.canFill = !0, this._attrs.canStroke = !0, this._attrs.type = "polyline";}, n.getDefaultAttrs = function () {return { points: null, lineWidth: 1, smooth: !1 };}, n.createPath = function (t) {for (var e = this.get("attrs"), n = e.points, i = e.smooth, r = [], o = 0, s = n.length; o < s; o++) {var c = n[o];isNaN(c.x) || isNaN(c.y) || r.push(c);}if (r.length) if (t.beginPath(), t.moveTo(r[0].x, r[0].y), i) for (var u = [[0, 0], [1, 1]], l = a.smooth(r, !1, u), h = 0, f = l.length; h < f; h++) {var p = l[h];t.bezierCurveTo(p[1], p[2], p[3], p[4], p[5], p[6]);} else {var g, d;for (g = 1, d = r.length - 1; g < d; g++) {t.lineTo(r[g].x, r[g].y);}t.lineTo(r[d].x, r[d].y);}}, n.calculateBox = function () {var t = this.get("attrs"),e = t.points;if (t.smooth) {for (var n = [], i = [[0, 0], [1, 1]], r = a.smooth(e, !1, i), s = 0, c = r.length; s < c; s++) {var u = r[s];if (0 === s) n.push([e[0].x, e[0].y, u[1], u[2], u[3], u[4], u[5], u[6]]);else {var l = r[s - 1];n.push([l[5], l[6], u[1], u[2], u[3], u[4], u[5], u[6]]);}}return o.getBBoxFromBezierGroup(n);}return o.getBBoxFromPoints(e);}, e;}(r);r.Polyline = s, t.exports = s;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(2),a = n(8),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {t.prototype._initProperties.call(this), this._attrs.canStroke = !0, this._attrs.type = "arc";}, n.getDefaultAttrs = function () {return { x: 0, y: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !1, lineWidth: 1 };}, n.createPath = function (t) {var e = this.get("attrs"),n = e.x,i = e.y,r = e.r,a = e.startAngle,o = e.endAngle,s = e.clockwise;t.beginPath(), t.arc(n, i, r, a, o, s);}, n.calculateBox = function () {var t = this.get("attrs"),e = t.x,n = t.y,i = t.r,r = t.startAngle,o = t.endAngle,s = t.clockwise;return a.getBBoxFromArc(e, n, i, r, o, s);}, e;}(r);r.Arc = o, t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(2),a = n(8),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {t.prototype._initProperties.call(this), this._attrs.canFill = !0, this._attrs.canStroke = !0, this._attrs.type = "sector";}, n.getDefaultAttrs = function () {return { x: 0, y: 0, lineWidth: 0, r: 0, r0: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !1 };}, n.createPath = function (t) {var e = this.get("attrs"),n = e.x,i = e.y,r = e.startAngle,a = e.endAngle,o = e.r,s = e.r0,c = e.clockwise;t.beginPath();var u = Math.cos(r),l = Math.sin(r);t.moveTo(u * s + n, l * s + i), t.lineTo(u * o + n, l * o + i), t.arc(n, i, o, r, a, c), t.lineTo(Math.cos(a) * s + n, Math.sin(a) * s + i), 0 !== s && t.arc(n, i, s, a, r, !c), t.closePath();}, n.calculateBox = function () {var t = this.get("attrs"),e = t.x,n = t.y,i = t.r,r = t.r0,o = t.startAngle,s = t.endAngle,c = t.clockwise,u = a.getBBoxFromArc(e, n, i, o, s, c),l = a.getBBoxFromArc(e, n, r, o, s, c);return { minX: Math.min(u.minX, l.minX), minY: Math.min(u.minY, l.minY), maxX: Math.max(u.maxX, l.maxX), maxY: Math.max(u.maxY, l.maxY) };}, e;}(r);r.Sector = o, t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(2),o = 0,s = {},c = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {t.prototype._initProperties.call(this), this._attrs.canFill = !0, this._attrs.canStroke = !0, this._attrs.type = "text";}, n.getDefaultAttrs = function () {return { lineWidth: 0, lineCount: 1, fontSize: 12, fontFamily: "sans-serif", fontStyle: "normal", fontWeight: "normal", fontVariant: "normal", textAlign: "start", textBaseline: "bottom", lineHeight: null, textArr: null };}, n._getFontStyle = function () {var t = this._attrs.attrs,e = t.fontSize,n = t.fontFamily,i = t.fontWeight;return t.fontStyle + " " + t.fontVariant + " " + i + " " + e + "px " + n;}, n._afterAttrsSet = function () {var t = this._attrs.attrs;if (t.font = this._getFontStyle(), t.text) {var e = t.text,n = null,i = 1;r.isString(e) && -1 !== e.indexOf("\n") && (i = (n = e.split("\n")).length), t.lineCount = i, t.textArr = n;}this.set("attrs", t);}, n._getTextHeight = function () {var t = this._attrs.attrs;if (t.height) return t.height;var e = t.lineCount,n = 1 * t.fontSize;return e > 1 ? n * e + this._getSpaceingY() * (e - 1) : n;}, n._getSpaceingY = function () {var t = this._attrs.attrs,e = t.lineHeight,n = 1 * t.fontSize;return e ? e - n : .14 * n;}, n.drawInner = function (t) {var e = this,n = e._attrs.attrs,i = n.text,a = n.x,o = n.y;if (!(r.isNil(i) || isNaN(a) || isNaN(o))) {var s = n.textArr,c = 1 * n.fontSize,u = e._getSpaceingY();n.rotate && (t.translate(a, o), t.rotate(n.rotate), a = 0, o = 0);var l,h = n.textBaseline;s && (l = e._getTextHeight());var f;if (e.hasFill()) {var p = n.fillOpacity;if (r.isNil(p) || 1 === p || (t.globalAlpha = p), s) for (var g = 0, d = s.length; g < d; g++) {var v = s[g];f = o + g * (u + c) - l + c, "middle" === h && (f += l - c - (l - c) / 2), "top" === h && (f += l - c), t.fillText(v, a, f);} else t.fillText(i, a, o);}if (e.hasStroke()) if (s) for (var y = 0, m = s.length; y < m; y++) {var x = s[y];f = o + y * (u + c) - l + c, "middle" === h && (f += l - c - (l - c) / 2), "top" === h && (f += l - c), t.strokeText(x, a, f);} else t.strokeText(i, a, o);}}, n.calculateBox = function () {var t = this,e = t._attrs.attrs,n = e.x,i = e.y,r = e.textAlign,a = e.textBaseline,o = t._getTextWidth();if (!o) return { minX: n, minY: i, maxX: n, maxY: i };var s = t._getTextHeight(),c = { x: n, y: i - s };return r && ("end" === r || "right" === r ? c.x -= o : "center" === r && (c.x -= o / 2)), a && ("top" === a ? c.y += s : "middle" === a && (c.y += s / 2)), { minX: c.x, minY: c.y, maxX: c.x + o, maxY: c.y + s };}, n._getTextWidth = function () {var t = this._attrs.attrs;if (t.width) return t.width;var e = t.text,n = this.get("context");if (!r.isNil(e)) {var i = t.font,a = t.textArr,c = e + "" + i;if (s[c]) return s[c];var u = 0;if (a) for (var l = 0, h = a.length; l < h; l++) {var f = a[l];u = Math.max(u, r.measureText(f, i, n).width);} else u = r.measureText(e, i, n).width;return o > 5e3 && (o = 0, s = {}), o++, s[c] = u, u;}}, e;}(a);a.Text = c, t.exports = c;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(2),a = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {t.prototype._initProperties.call(this), this._attrs.canFill = !0, this._attrs.canStroke = !0, this._attrs.createPath = null, this._attrs.type = "custom";}, n.createPath = function (t) {var e = this.get("createPath");e && e.call(this, t);}, n.calculateBox = function () {var t = this.get("calculateBox");return t && t.call(this);}, e;}(r);r.Custom = a, t.exports = a;}, function (t, e, n) {var i = n(1),r = n(0);setTimeout(function () {if (i.trackable && r.isBrowser) {var t = new Image(),e = { pg: document.URL, r: new Date().getTime(), f2: !0, version: i.version, page_type: "syslog" },n = encodeURIComponent(JSON.stringify([e]));t.src = "https://kcart.alipay.com/web/bi.do?BIProfile=merge&d=" + n;}}, 3e3);}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(43),a = n(4);n(37);var o = function (t) {function e() {return t.apply(this, arguments) || this;}return i(e, t), e.prototype.getDefaultCfg = function () {var e = t.prototype.getDefaultCfg.call(this);return e.type = "line", e.sortable = !0, e;}, e;}(r);a.Line = o, t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}function r(t) {if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}var a = n(4),o = n(0),s = n(44);n(99);var c = function (t) {function e(e) {var n;return n = t.call(this, e) || this, o.mix(r(r(n)), s), n;}i(e, t);var n = e.prototype;return n.getDefaultCfg = function () {var e = t.prototype.getDefaultCfg.call(this);return e.type = "interval", e.shapeType = "interval", e.generatePoints = !0, e;}, n.createShapePointsCfg = function (e) {var n = t.prototype.createShapePointsCfg.call(this, e);return n.size = this.getNormalizedSize(e), n;}, n.clearInner = function () {t.prototype.clearInner.call(this), this.set("defaultSize", null);}, e;}(a);a.Interval = c, t.exports = c;}, function (t, e, n) {function i(t) {var e = t.x,n = t.y,i = t.y0,r = t.size,o = i,s = n;a.isArray(n) && (s = n[1], o = n[0]);var c, u;return a.isArray(e) ? (c = e[0], u = e[1]) : (c = e - r / 2, u = e + r / 2), [{ x: c, y: o }, { x: c, y: s }, { x: u, y: s }, { x: u, y: o }];}function r(t) {for (var e = [], n = [], i = 0, r = t.length; i < r; i++) {var a = t[i];e.push(a.x), n.push(a.y);}var o = Math.min.apply(null, e),s = Math.min.apply(null, n);return { x: o, y: s, width: Math.max.apply(null, e) - o, height: Math.max.apply(null, n) - s };}var a = n(0),o = n(6),s = n(3),c = n(1),u = o.registerFactory("interval", { defaultShapeType: "rect", getDefaultPoints: function getDefaultPoints(t) {return i(t);} });o.registerShape("interval", "rect", { draw: function draw(t, e) {var n = this.parsePoints(t.points),i = a.mix({ fill: t.color }, c.shape.interval, t.style);if (t.isInCircle) {var o = n.slice(0);this._coord.transposed && (o = [n[0], n[3], n[2], n[1]]);var u = t.center,l = u.x,h = u.y,f = [1, 0],p = [o[0].x - l, o[0].y - h],g = [o[1].x - l, o[1].y - h],d = [o[2].x - l, o[2].y - h],v = s.angleTo(f, g),y = s.angleTo(f, d),m = s.length(p),x = s.length(g);return v >= 1.5 * Math.PI && (v -= 2 * Math.PI), y >= 1.5 * Math.PI && (y -= 2 * Math.PI), e.addShape("Sector", { className: "interval", attrs: a.mix({ x: l, y: h, r: x, r0: m, startAngle: v, endAngle: y }, i) });}var _ = r(n);return e.addShape("rect", { className: "interval", attrs: a.mix(_, i) });} }), t.exports = u;}, function (t, e, n) {t.exports = { Stack: n(101), Dodge: n(105) };}, function (t, e, n) {var i = n(102);t.exports = i;}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}function r(t, e) {if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != typeof e && "function" != typeof e ? t : e;}function a(t, e) {if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);}var o = n(38),s = n(104),c = n(20),u = function (t) {function e() {return i(this, e), r(this, t.apply(this, arguments));}return a(e, t), e.prototype._initDefaultCfg = function () {this.xField = null, this.yField = null;}, e.prototype.processAdjust = function (t) {this.processStack(t);}, e.prototype.processStack = function (t) {var e = this,n = e.xField,i = e.yField,r = t.length,a = { positive: {}, negative: {} };e.reverseOrder && (t = t.slice(0).reverse());for (var c = 0; c < r; c++) {for (var u = t[c], l = 0, h = u.length; l < h; l++) {var f = u[l],p = f[n] || 0,g = f[i],d = p.toString();if (g = o(g) ? g[1] : g, !s(g)) {var v = g >= 0 ? "positive" : "negative";a[v][d] || (a[v][d] = 0), f[i] = [a[v][d], g + a[v][d]], a[v][d] += g;}}}}, e;}(c);c.Stack = u, t.exports = u;}, function (t, e) {var n = {}.toString;t.exports = function (t, e) {return n.call(t) === "[object " + e + "]";};}, function (t, e) {t.exports = function (t) {return null === t || void 0 === t;};}, function (t, e, n) {var i = n(106);t.exports = i;}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}function r(t, e) {if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != typeof e && "function" != typeof e ? t : e;}function a(t, e) {if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);}var o = n(20),s = n(107),c = function (t) {function e() {return i(this, e), r(this, t.apply(this, arguments));}return a(e, t), e.prototype._initDefaultCfg = function () {this.marginRatio = .5, this.dodgeRatio = .5, this.adjustNames = ["x", "y"];}, e.prototype.getDodgeOffset = function (t, e, n) {var i = this,r = t.pre,a = t.next,o = a - r,s = o * i.dodgeRatio / n,c = i.marginRatio * s;return (r + a) / 2 + (.5 * (o - n * s - (n - 1) * c) + ((e + 1) * s + e * c) - .5 * s - .5 * o);}, e.prototype.processAdjust = function (t) {var e = this,n = t.length,i = e.xField;s(t, function (t, r) {for (var a = 0, o = t.length; a < o; a++) {var s = t[a],c = s[i],u = { pre: c - .5, next: c + .5 },l = e.getDodgeOffset(u, r, n);s[i] = l;}});}, e;}(o);o.Dodge = c, t.exports = c;}, function (t, e, n) {var i = n(108),r = n(38);t.exports = function (t, e) {if (t) if (r(t)) for (var n = 0, a = t.length; n < a && !1 !== e(t[n], n); n++) {;} else if (i(t)) for (var o in t) {if (t.hasOwnProperty(o) && !1 === e(t[o], o)) break;}};}, function (t, e) {var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;};t.exports = function (t) {var e = void 0 === t ? "undefined" : n(t);return null !== t && "object" === e || "function" === e;};}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(18),a = n(3),o = n(22),s = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {this.type = "polar", this.startAngle = -Math.PI / 2, this.endAngle = 3 * Math.PI / 2, this.inner = 0, this.innerRadius = 0, this.isPolar = !0, this.transposed = !1, this.center = null, this.radius = null;}, n.init = function (t, e) {var n,i,r = this,a = r.inner || r.innerRadius,o = Math.abs(e.x - t.x),s = Math.abs(e.y - t.y);r.startAngle === -Math.PI && 0 === r.endAngle ? (n = Math.min(o / 2, s), i = { x: (t.x + e.x) / 2, y: t.y }) : (n = Math.min(o, s) / 2, i = { x: (t.x + e.x) / 2, y: (t.y + e.y) / 2 });var c = r.radius;c > 0 && c <= 1 && (n *= c), this.x = { start: r.startAngle, end: r.endAngle }, this.y = { start: n * a, end: n }, this.center = i, this.circleRadius = n;}, n.convertPoint = function (t) {var e = this,n = e.center,i = e.transposed,r = i ? "y" : "x",a = i ? "x" : "y",o = e.x,s = e.y,c = o.start + (o.end - o.start) * t[r],u = s.start + (s.end - s.start) * t[a];return { x: n.x + Math.cos(c) * u, y: n.y + Math.sin(c) * u };}, n.invertPoint = function (t) {var e = this,n = e.center,i = e.transposed,r = e.x,s = e.y,c = i ? "y" : "x",u = i ? "x" : "y",l = [1, 0, 0, 1, 0, 0];o.rotate(l, l, r.start);var h = [1, 0];a.transformMat2d(h, h, l), h = [h[0], h[1]];var f = [t.x - n.x, t.y - n.y];if (a.zero(f)) return { x: 0, y: 0 };var p = a.angleTo(h, f, r.end < r.start);Math.abs(p - 2 * Math.PI) < .001 && (p = 0);var g = a.length(f),d = p / (r.end - r.start);d = r.end - r.start > 0 ? d : -d;var v = (g - s.start) / (s.end - s.start),y = {};return y[c] = d, y[u] = v, y;}, e;}(r);r.Polar = s, t.exports = s;}, function (t, e, n) {var i = n(27),r = n(128);t.exports = { toTimeStamp: function toTimeStamp(t) {return i(t) && (t = t.indexOf("T") > 0 ? new Date(t).getTime() : new Date(t.replace(/-/gi, "/")).getTime()), r(t) && (t = t.getTime()), t;} };}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = { circle: function circle(t, e, n, i) {i.arc(t, e, n, 0, 2 * Math.PI, !1);}, square: function square(t, e, n, i) {i.moveTo(t - n, e - n), i.lineTo(t + n, e - n), i.lineTo(t + n, e + n), i.lineTo(t - n, e + n), i.closePath();} },o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initProperties = function () {t.prototype._initProperties.call(this), this._attrs.canFill = !0, this._attrs.canStroke = !0, this._attrs.type = "marker";}, n.getDefaultAttrs = function () {return { x: 0, y: 0, lineWidth: 0 };}, n.createPath = function (t) {var e,n = this.get("attrs"),i = n.x,o = n.y,s = n.radius,c = n.symbol || "circle";e = r.isFunction(c) ? c : a[c], t.beginPath(), e(i, o, s, t, this);}, n.calculateBox = function () {var t = this.get("attrs"),e = t.x,n = t.y,i = t.radius;return { minX: e - i, minY: n - i, maxX: e + i, maxY: n + i };}, e;}(n(7).Shape);t.exports = o;}, function (t, e, n) {var i = n(0),r = n(7).Group,a = n(111),o = function () {function t(t) {i.deepMix(this, this.getDefaultCfg(), t), this._init(), this._renderTitle(), this._renderItems();}var e = t.prototype;return e.getDefaultCfg = function () {return { showTitle: !1, title: null, items: null, titleGap: 12, itemGap: 10, itemMarginBottom: 12, itemFormatter: null, itemWidth: null, wordSpace: 6, x: 0, y: 0, layout: "horizontal", joinString: ": " };}, e._init = function () {var t = new r({ zIndex: this.zIndex || 0 });this.container = t;var e = t.addGroup();this.wrapper = e;var n = e.addGroup({ className: "itemsGroup" });this.itemsGroup = n, this.parent && this.parent.add(t);}, e._renderTitle = function (t) {t = t || this.title;var e = this.titleShape,n = 0;if (this.showTitle && t) {if (e && !e.get("destroyed")) e.attr("text", t);else {var r = this.wrapper,a = this.titleStyle;e = r.addShape("text", { className: "title", attrs: i.mix({ x: 0, y: 0, text: t }, a) }), this.titleShape = e;}n = e.getBBox().height + this.titleGap;}this._titleHeight = n;}, e._renderItems = function (t) {var e = this;(t = t || e.items) && (e.reversed && t.reverse(), i.each(t, function (t, n) {e._addItem(t, n);}), t.length > 1 && this._adjustItems(), this._renderBackground());}, e._renderBackground = function () {var t = this.background;if (t) {var e = this.container,n = this.wrapper.getBBox(),r = n.minX,a = n.minY,o = n.width,s = n.height,c = t.padding || [0, 0, 0, 0];c = i.parsePadding(c);var u = i.mix({ x: r - c[3], y: a - c[0], width: o + c[1] + c[3], height: s + c[0] + c[2] }, t),l = this.backShape;l ? l.attr(u) : l = e.addShape("Rect", { zIndex: -1, attrs: u }), this.backShape = l, e.sort();}}, e._addItem = function (t) {var e = this.itemsGroup.addGroup({ name: t.name, value: t.value, dataValue: t.dataValue, checked: t.checked }),n = this.unCheckStyle,r = this.unCheckColor,o = this.nameStyle,s = this.valueStyle,c = this.wordSpace,u = t.marker,l = t.value,h = 0;if (r && (n.fill = r), u) {var f = u.radius || 3,p = i.mix({ x: f, y: this._titleHeight }, u);!1 === t.checked && i.mix(p, n);var g = new a({ className: "item-marker", attrs: p });e.add(g), h += g.getBBox().width + c;}var d,v = t.name;if (v) {var y = this.joinString || "";v = l ? v + y : v, d = e.addShape("text", { className: "name", attrs: i.mix({ x: h, y: this._titleHeight, text: this._formatItemValue(v) }, o, !1 === t.checked ? n : null) });}if (l) {var m = h;d && (m += d.getBBox().width), e.addShape("text", { className: "value", attrs: i.mix({ x: m, y: this._titleHeight, text: l }, s, !1 === t.checked ? n : null) });}return e;}, e._formatItemValue = function (t) {var e = this.itemFormatter;return e && (t = e.call(this, t)), t;}, e._getMaxItemWidth = function () {var t = this.itemWidth;if (i.isNumber(t) || i.isNil(t)) return t;if ("auto" === t) {for (var e = this.itemsGroup.get("children"), n = e.length, r = 0, a = 0; a < n; a++) {var o = e[a].getBBox().width;r = Math.max(r, o);}var s = this.maxLength,c = this.itemGap,u = (s - c) / 2,l = (s - 2 * c) / 3;return 2 === n ? Math.max(r, u) : r <= l ? l : r <= u ? u : r;}}, e._adjustHorizontal = function () {for (var t, e, n = this.maxLength, i = this.itemsGroup.get("children"), r = this.itemGap, a = this.itemMarginBottom, o = this._titleHeight, s = 0, c = 0, u = this._getMaxItemWidth(), l = [], h = 0, f = i.length; h < f; h++) {var p = i[h],g = p.getBBox(),d = g.height,v = g.width;e = d + a, (t = u || v) - (n - c) > 1e-4 && (s++, c = 0), p.moveTo(c, s * e), l.push({ x: c, y: s * e + o - d / 2, width: 1.375 * v, height: 1.375 * d }), c += t + r;}this.legendHitBoxes = l;}, e._adjustVertical = function () {for (var t, e, n = this.maxLength, r = this.itemsGroup, a = this.itemGap, o = this.itemMarginBottom, s = this.itemWidth, c = this._titleHeight, u = r.get("children"), l = 0, h = 0, f = 0, p = [], g = 0, d = u.length; g < d; g++) {var v = u[g],y = v.getBBox();t = y.width, e = y.height, i.isNumber(s) ? h = s + a : t > h && (h = t + a), n - l < e ? (l = 0, f += h, v.moveTo(f, 0), p.push({ x: f, y: c - e / 2, width: 1.375 * t, height: 1.375 * e })) : (v.moveTo(f, l), p.push({ x: f, y: l - e / 2 + c, width: 1.375 * t, height: 1.375 * e })), l += e + o;}this.legendHitBoxes = p;}, e._adjustItems = function () {"horizontal" === this.layout ? this._adjustHorizontal() : this._adjustVertical();}, e.moveTo = function (t, e) {this.x = t, this.y = e;var n = this.container;return n && n.moveTo(t, e), this;}, e.setItems = function (t) {this.clearItems(), this._renderItems(t);}, e.setTitle = function (t) {this._renderTitle(t);}, e.clearItems = function () {this.itemsGroup.clear();}, e.getWidth = function () {return this.container.getBBox().width;}, e.getHeight = function () {return this.container.getBBox().height;}, e.show = function () {this.container.show();}, e.hide = function () {this.container.hide();}, e.clear = function () {var t = this.container;t.clear(), t.remove(!0);}, t;}();t.exports = o;}, function (t, e, n) {var i = n(0),r = { appear: { duration: 450, easing: "quadraticOut" }, update: { duration: 300, easing: "quadraticOut" }, enter: { duration: 300, easing: "quadraticOut" }, leave: { duration: 350, easing: "quadraticIn" } },a = { defaultCfg: {}, Action: {}, getAnimation: function getAnimation(t, e, n) {var r = this.defaultCfg[t];if (r) {var a = r[n];if (i.isFunction(a)) return a(e);}return !1;}, getAnimateCfg: function getAnimateCfg(t, e) {var n = r[e],a = this.defaultCfg[t];return a && a.cfg && a.cfg[e] ? i.deepMix({}, n, a.cfg[e]) : n;}, registerAnimation: function registerAnimation(t, e) {this.Action || (this.Action = {}), this.Action[t] = e;} };t.exports = a;}, function (t, e, n) {var i = n(7).Matrix,r = n(0),a = { getCoordInfo: function getCoordInfo(t) {var e = t.start,n = t.end;return { start: e, end: n, width: n.x - e.x, height: Math.abs(n.y - e.y) };}, getScaledMatrix: function getScaledMatrix(t, e, n) {var r;t.apply(e);var a = e[0],o = e[1];if ("x" === n) {t.transform([["t", a, o], ["s", .01, 1], ["t", -a, -o]]);var s = t.getMatrix();r = i.transform(s, [["t", a, o], ["s", 100, 1], ["t", -a, -o]]);} else if ("y" === n) {t.transform([["t", a, o], ["s", 1, .01], ["t", -a, -o]]);var c = t.getMatrix();r = i.transform(c, [["t", a, o], ["s", 1, 100], ["t", -a, -o]]);} else if ("xy" === n) {t.transform([["t", a, o], ["s", .01, .01], ["t", -a, -o]]);var u = t.getMatrix();r = i.transform(u, [["t", a, o], ["s", 100, 100], ["t", -a, -o]]);}return r;}, getAnimateParam: function getAnimateParam(t, e, n) {var i = {};return t.delay && (i.delay = r.isFunction(t.delay) ? t.delay(e, n) : t.delay), i.easing = t.easing, i.duration = t.duration, i.delay = t.delay, i;}, doAnimation: function doAnimation(t, e, n, i) {var r = t._id,o = t.get("index"),s = a.getAnimateParam(n, o, r),c = s.easing,u = s.delay,l = s.duration,h = t.animate().to({ attrs: e, duration: l, delay: u, easing: c });i && h.onEnd(function () {i();});} };t.exports = a;}, function (t, e, n) {var i = n(4);n(116), n(43), n(97), n(118), n(98), n(120), n(122), t.exports = i;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(4);n(117);var o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n.getDefaultCfg = function () {var e = t.prototype.getDefaultCfg.call(this);return e.type = "point", e.shapeType = "point", e.generatePoints = !0, e;}, n.draw = function (t, e) {var n = this,i = n.get("container");r.each(t, function (t) {var a = t.shape,o = n.getDrawCfg(t);if (r.isArray(t.y)) {var s = n.hasAdjust("stack");r.each(t.y, function (r, c) {o.y = r, s && 0 === c || n.drawShape(a, t, o, i, e);});} else r.isNil(t.y) || n.drawShape(a, t, o, i, e);});}, e;}(a);a.Point = o, t.exports = o;}, function (t, e, n) {function i(t) {var e = { lineWidth: 0, stroke: t.color, fill: t.color };return t.size && (e.size = t.size), a.mix(e, t.style), a.mix({}, o.shape.point, e);}function r(t, e, n) {if (0 !== t.size) {var r = i(t),o = r.r || r.size,s = t.x,c = a.isArray(t.y) ? t.y : [t.y];"hollowCircle" === n && (r.lineWidth = 1, r.fill = null);for (var u = 0, l = c.length; u < l; u++) {return "rect" === n ? e.addShape("Rect", { className: "point", attrs: a.mix({ x: s - o, y: c[u] - o, width: 2 * o, height: 2 * o }, r) }) : e.addShape("Circle", { className: "point", attrs: a.mix({ x: s, y: c[u], r: o }, r) });}}}var a = n(0),o = n(1),s = n(16),c = n(6),u = ["circle", "hollowCircle", "rect"],l = c.registerFactory("point", { defaultShapeType: "circle", getDefaultPoints: function getDefaultPoints(t) {return s.splitPoints(t);} });a.each(u, function (t) {c.registerShape("point", t, { draw: function draw(e, n) {return r(e, n, t);} });}), t.exports = l;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(4),a = n(16),o = n(0);n(119);var s = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n.getDefaultCfg = function () {var e = t.prototype.getDefaultCfg.call(this);return e.type = "area", e.shapeType = "area", e.generatePoints = !0, e.sortable = !0, e;}, n.draw = function (t, e) {var n = this,i = n.get("container"),r = this.getDrawCfg(t[0]),s = n.getYScale(),c = n.get("connectNulls"),u = a.splitArray(t, s.field, c);r.origin = t, o.each(u, function (a, o) {r.splitedIndex = o;var s = a.map(function (t) {return t.points;});r.points = s, n.drawShape(r.shape, t[0], r, i, e);});}, e;}(r);r.Area = s, t.exports = s;}, function (t, e, n) {function i(t, e) {return Math.abs(t - e) < 1e-5;}function r(t, e) {var n = !0;return s.each(t, function (t) {if (!i(t.x, e.x) || !i(t.y, e.y)) return n = !1, !1;}), n;}function a(t, e, n, i, r) {var a = t.concat(e);return r ? n.addShape("Custom", { className: "area", attrs: s.mix({ points: a }, i), createPath: function createPath(t) {var e = [[0, 0], [1, 1]],n = this._attrs.attrs.points,i = n.length,r = n.slice(0, i / 2),a = n.slice(i / 2, i),o = u.smooth(r, !1, e);t.beginPath(), t.moveTo(r[0].x, r[0].y);for (var s = 0, c = o.length; s < c; s++) {var l = o[s];t.bezierCurveTo(l[1], l[2], l[3], l[4], l[5], l[6]);}if (a.length) {var h = u.smooth(a, !1, e);t.lineTo(a[0].x, a[0].y);for (var f = 0, p = h.length; f < p; f++) {var g = h[f];t.bezierCurveTo(g[1], g[2], g[3], g[4], g[5], g[6]);}}t.closePath();}, calculateBox: function calculateBox() {var t = this._attrs.attrs.points;return l.getBBoxFromPoints(t);} }) : n.addShape("Polyline", { className: "area", attrs: s.mix({ points: a }, i) });}function o(t, e, n) {var i = this,o = t.points,c = [],u = [];s.each(o, function (t) {u.push(t[0]), c.push(t[1]);});var l = s.mix({ fillStyle: t.color }, h.shape.area, t.style);return u.reverse(), c = i.parsePoints(c), u = i.parsePoints(u), t.isInCircle && (c.push(c[0]), u.unshift(u[u.length - 1]), r(u, t.center) && (u = [])), a(c, u, e, l, n);}var s = n(0),c = n(6),u = n(42),l = n(8),h = n(1),f = c.registerFactory("area", { defaultShapeType: "area", getDefaultPoints: function getDefaultPoints(t) {var e = t.x,n = t.y,i = t.y0;n = s.isArray(n) ? n : [i, n];var r = [];return r.push({ x: e, y: n[0] }, { x: e, y: n[1] }), r;} }),p = ["area", "smooth"];s.each(p, function (t) {c.registerShape("area", t, { draw: function draw(e, n) {var i = "smooth" === t;return o.call(this, e, n, i);} });}), t.exports = f;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(4),a = n(0);n(121);var o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n.getDefaultCfg = function () {var e = t.prototype.getDefaultCfg.call(this);return e.type = "polygon", e.shapeType = "polygon", e.generatePoints = !0, e;}, n.createShapePointsCfg = function (e) {var n,i = t.prototype.createShapePointsCfg.call(this, e),r = this,o = i.x,s = i.y;if (!a.isArray(o) || !a.isArray(s)) {var c = r.getXScale(),u = r.getYScale(),l = .5 / (c.values ? c.values.length : c.ticks.length),h = .5 / (u.values ? u.values.length : u.ticks.length);c.isCategory && u.isCategory ? (o = [o - l, o - l, o + l, o + l], s = [s - h, s + h, s + h, s - h]) : a.isArray(o) ? (o = [(n = o)[0], n[0], n[1], n[1]], s = [s - h / 2, s + h / 2, s + h / 2, s - h / 2]) : a.isArray(s) && (s = [(n = s)[0], n[1], n[1], n[0]], o = [o - l / 2, o - l / 2, o + l / 2, o + l / 2]), i.x = o, i.y = s;}return i;}, e;}(r);r.Polygon = o, t.exports = o;}, function (t, e, n) {var i = n(6),r = n(0),a = i.registerFactory("polygon", { defaultShapeType: "polygon", getDefaultPoints: function getDefaultPoints(t) {for (var e = [], n = t.x, i = t.y, r = 0, a = n.length; r < a; r++) {e.push({ x: n[r], y: i[r] });}return e;} });i.registerShape("polygon", "polygon", { draw: function draw(t, e) {var n = this.parsePoints(t.points),i = r.mix({ fill: t.color, points: n }, t.style);return e.addShape("Polygon", { className: "polygon", attrs: i });} }), t.exports = a;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}function r(t) {if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}var a = n(4),o = n(0),s = n(44);n(123);var c = function (t) {function e(e) {var n;return n = t.call(this, e) || this, o.mix(r(r(n)), s), n;}i(e, t);var n = e.prototype;return n.getDefaultCfg = function () {var e = t.prototype.getDefaultCfg.call(this);return e.type = "schema", e.shapeType = "schema", e.generatePoints = !0, e;}, n.createShapePointsCfg = function (e) {var n = t.prototype.createShapePointsCfg.call(this, e);return n.size = this.getNormalizedSize(e), n;}, n.clearInner = function () {t.prototype.clearInner.call(this), this.set("defaultSize", null);}, e;}(a);a.Schema = c, t.exports = c;}, function (t, e, n) {function i(t) {var e = t.sort(function (t, e) {return t < e ? 1 : -1;}),n = e.length;if (n < 4) for (var i = e[n - 1], r = 0; r < 4 - n; r++) {e.push(i);}return e;}function r(t, e, n) {var r = i(e);return [{ x: t, y: r[0] }, { x: t, y: r[1] }, { x: t - n / 2, y: r[2] }, { x: t - n / 2, y: r[1] }, { x: t + n / 2, y: r[1] }, { x: t + n / 2, y: r[2] }, { x: t, y: r[2] }, { x: t, y: r[3] }];}var a = n(6),o = n(0),s = a.registerFactory("schema", {});a.registerShape("schema", "candle", { getPoints: function getPoints(t) {return r(t.x, t.y, t.size);}, draw: function draw(t, e) {var n = this.parsePoints(t.points),i = o.mix({ stroke: t.color, fill: t.color, lineWidth: 1 }, t.style);return e.addShape("Custom", { className: "schema", attrs: i, createPath: function createPath(t) {t.beginPath(), t.moveTo(n[0].x, n[0].y), t.lineTo(n[1].x, n[1].y), t.moveTo(n[2].x, n[2].y);for (var e = 3; e < 6; e++) {t.lineTo(n[e].x, n[e].y);}t.closePath(), t.moveTo(n[6].x, n[6].y), t.lineTo(n[7].x, n[7].y);} });} }), t.exports = s;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(24),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {t.prototype._initDefaultCfg.call(this), this.startAngle = -Math.PI / 2, this.endAngle = 3 * Math.PI / 2, this.radius = null, this.center = null;}, n.getOffsetPoint = function (t) {var e = this.startAngle,n = e + (this.endAngle - e) * t;return this._getCirclePoint(n);}, n._getCirclePoint = function (t, e) {var n = this,i = n.center;return e = e || n.radius, { x: i.x + Math.cos(t) * e, y: i.y + Math.sin(t) * e };}, n.getTextAlignInfo = function (t, e) {var n,i = this.getOffsetVector(t, e),r = "middle";return i[0] > 0 ? n = "left" : i[0] < 0 ? n = "right" : (n = "center", i[1] > 0 ? r = "top" : i[1] < 0 && (r = "bottom")), { textAlign: n, textBaseline: r };}, n.getAxisVector = function (t) {var e = this.center,n = this.offsetFactor;return [(t.y - e.y) * n, -1 * (t.x - e.x) * n];}, n.drawLine = function (t) {var e = this.center,n = this.radius,i = this.startAngle,a = this.endAngle;this.getContainer(t.top).addShape("arc", { className: "axis-line", attrs: r.mix({ x: e.x, y: e.y, r: n, startAngle: i, endAngle: a }, t) });}, e;}(a);a.Circle = o, t.exports = o;}, function (t, e, n) {var i = n(126);t.exports = i;}, function (t, e, n) {function i(t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");}function r(t, e) {if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != typeof e && "function" != typeof e ? t : e;}function a(t, e) {if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);}var o = n(10),s = n(39),c = n(127),u = n(40),l = n(110),h = n(11),f = n(14),p = n(23),g = n(27),d = function (t) {function e() {return i(this, e), r(this, t.apply(this, arguments));}return a(e, t), e.prototype._initDefaultCfg = function () {t.prototype._initDefaultCfg.call(this), this.type = "timeCat", this.sortable = !0, this.tickCount = 5, this.mask = "YYYY-MM-DD";}, e.prototype.init = function () {var t = this,e = this.values;h(e, function (n, i) {e[i] = t._toTimeStamp(n);}), this.sortable && e.sort(function (t, e) {return t - e;}), t.ticks || (t.ticks = this.calculateTicks());}, e.prototype.calculateTicks = function () {var t = this,e = t.tickCount;return e ? u({ maxCount: e, data: t.values, isRounding: t.isRounding }).ticks : t.values;}, e.prototype.translate = function (t) {t = this._toTimeStamp(t);var e = this.values.indexOf(t);return -1 === e && (e = f(t) && t < this.values.length ? t : NaN), e;}, e.prototype.scale = function (t) {var e = this.rangeMin(),n = this.rangeMax(),i = this.translate(t),r = void 0;return r = 1 === this.values.length || isNaN(i) ? i : i > -1 ? i / (this.values.length - 1) : 0, e + r * (n - e);}, e.prototype.getText = function (t) {var e = "",n = this.translate(t);e = n > -1 ? this.values[n] : t;var i = this.formatter;return e = parseInt(e, 10), e = i ? i(e) : c.format(e, this.mask);}, e.prototype.getTicks = function () {var t = this,e = this.ticks,n = [];return h(e, function (e) {var i = void 0;i = p(e) ? e : { text: g(e) ? e : t.getText(e), value: t.scale(e), tickValue: e }, n.push(i);}), n;}, e.prototype._toTimeStamp = function (t) {return l.toTimeStamp(t);}, e;}(s);o.TimeCat = d, t.exports = d;}, function (t, e, n) {var i;!function (r) {"use strict";function a(t, e) {for (var n = [], i = 0, r = t.length; i < r; i++) {n.push(t[i].substr(0, e));}return n;}function o(t) {return function (e, n, i) {var r = i[t].indexOf(n.charAt(0).toUpperCase() + n.substr(1).toLowerCase());~r && (e.month = r);};}function s(t, e) {for (t = String(t), e = e || 2; t.length < e;) {t = "0" + t;}return t;}var c = {},u = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,l = /\d\d?/,h = /\d{3}/,f = /\d{4}/,p = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,g = /\[([^]*?)\]/gm,d = function d() {},v = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],y = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],m = a(y, 3),x = a(v, 3);c.i18n = { dayNamesShort: x, dayNames: v, monthNamesShort: m, monthNames: y, amPm: ["am", "pm"], DoFn: function DoFn(t) {return t + ["th", "st", "nd", "rd"][t % 10 > 3 ? 0 : (t - t % 10 != 10) * t % 10];} };var _ = { D: function D(t) {return t.getDate();}, DD: function DD(t) {return s(t.getDate());}, Do: function Do(t, e) {return e.DoFn(t.getDate());}, d: function d(t) {return t.getDay();}, dd: function dd(t) {return s(t.getDay());}, ddd: function ddd(t, e) {return e.dayNamesShort[t.getDay()];}, dddd: function dddd(t, e) {return e.dayNames[t.getDay()];}, M: function M(t) {return t.getMonth() + 1;}, MM: function MM(t) {return s(t.getMonth() + 1);}, MMM: function MMM(t, e) {return e.monthNamesShort[t.getMonth()];}, MMMM: function MMMM(t, e) {return e.monthNames[t.getMonth()];}, YY: function YY(t) {return String(t.getFullYear()).substr(2);}, YYYY: function YYYY(t) {return s(t.getFullYear(), 4);}, h: function h(t) {return t.getHours() % 12 || 12;}, hh: function hh(t) {return s(t.getHours() % 12 || 12);}, H: function H(t) {return t.getHours();}, HH: function HH(t) {return s(t.getHours());}, m: function m(t) {return t.getMinutes();}, mm: function mm(t) {return s(t.getMinutes());}, s: function s(t) {return t.getSeconds();}, ss: function ss(t) {return s(t.getSeconds());}, S: function S(t) {return Math.round(t.getMilliseconds() / 100);}, SS: function SS(t) {return s(Math.round(t.getMilliseconds() / 10), 2);}, SSS: function SSS(t) {return s(t.getMilliseconds(), 3);}, a: function a(t, e) {return t.getHours() < 12 ? e.amPm[0] : e.amPm[1];}, A: function A(t, e) {return t.getHours() < 12 ? e.amPm[0].toUpperCase() : e.amPm[1].toUpperCase();}, ZZ: function ZZ(t) {var e = t.getTimezoneOffset();return (e > 0 ? "-" : "+") + s(100 * Math.floor(Math.abs(e) / 60) + Math.abs(e) % 60, 4);} },S = { D: [l, function (t, e) {t.day = e;}], Do: [new RegExp(l.source + p.source), function (t, e) {t.day = parseInt(e, 10);}], M: [l, function (t, e) {t.month = e - 1;}], YY: [l, function (t, e) {var n = +("" + new Date().getFullYear()).substr(0, 2);t.year = "" + (e > 68 ? n - 1 : n) + e;}], h: [l, function (t, e) {t.hour = e;}], m: [l, function (t, e) {t.minute = e;}], s: [l, function (t, e) {t.second = e;}], YYYY: [f, function (t, e) {t.year = e;}], S: [/\d/, function (t, e) {t.millisecond = 100 * e;}], SS: [/\d{2}/, function (t, e) {t.millisecond = 10 * e;}], SSS: [h, function (t, e) {t.millisecond = e;}], d: [l, d], ddd: [p, d], MMM: [p, o("monthNamesShort")], MMMM: [p, o("monthNames")], a: [p, function (t, e, n) {var i = e.toLowerCase();i === n.amPm[0] ? t.isPm = !1 : i === n.amPm[1] && (t.isPm = !0);}], ZZ: [/([\+\-]\d\d:?\d\d|Z)/, function (t, e) {"Z" === e && (e = "+00:00");var n,i = (e + "").match(/([\+\-]|\d\d)/gi);i && (n = 60 * i[1] + parseInt(i[2], 10), t.timezoneOffset = "+" === i[0] ? n : -n);}] };S.dd = S.d, S.dddd = S.ddd, S.DD = S.D, S.mm = S.m, S.hh = S.H = S.HH = S.h, S.MM = S.M, S.ss = S.s, S.A = S.a, c.masks = { default: "ddd MMM DD YYYY HH:mm:ss", shortDate: "M/D/YY", mediumDate: "MMM D, YYYY", longDate: "MMMM D, YYYY", fullDate: "dddd, MMMM D, YYYY", shortTime: "HH:mm", mediumTime: "HH:mm:ss", longTime: "HH:mm:ss.SSS" }, c.format = function (t, e, n) {var i = n || c.i18n;if ("number" == typeof t && (t = new Date(t)), "[object Date]" !== Object.prototype.toString.call(t) || isNaN(t.getTime())) throw new Error("Invalid Date in fecha.format");var r = [];return e = (e = c.masks[e] || e || c.masks.default).replace(g, function (t, e) {return r.push(e), "??";}), (e = e.replace(u, function (e) {return e in _ ? _[e](t, i) : e.slice(1, e.length - 1);})).replace(/\?\?/g, function () {return r.shift();});}, c.parse = function (t, e, n) {var i = n || c.i18n;if ("string" != typeof e) throw new Error("Invalid format in fecha.parse");if (e = c.masks[e] || e, t.length > 1e3) return !1;var r = !0,a = {};if (e.replace(u, function (e) {if (S[e]) {var n = S[e],o = t.search(n[0]);~o ? t.replace(n[0], function (e) {return n[1](a, e, i), t = t.substr(o + e.length), e;}) : r = !1;}return S[e] ? "" : e.slice(1, e.length - 1);}), !r) return !1;var o = new Date();!0 === a.isPm && null != a.hour && 12 != +a.hour ? a.hour = +a.hour + 12 : !1 === a.isPm && 12 == +a.hour && (a.hour = 0);var s;return null != a.timezoneOffset ? (a.minute = +(a.minute || 0) - +a.timezoneOffset, s = new Date(Date.UTC(a.year || o.getFullYear(), a.month || 0, a.day || 1, a.hour || 0, a.minute || 0, a.second || 0, a.millisecond || 0))) : s = new Date(a.year || o.getFullYear(), a.month || 0, a.day || 1, a.hour || 0, a.minute || 0, a.second || 0, a.millisecond || 0), s;}, void 0 !== t && t.exports ? t.exports = c : void 0 !== (i = function () {return c;}.call(e, n, e, t)) && (t.exports = i);}();}, function (t, e, n) {var i = n(13);t.exports = function (t) {return i(t, "Date");};}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(9),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {this.type = "arc", this.start = [], this.end = [], this.style = { stroke: "#999", lineWidth: 1 };}, n.render = function (t, e) {var n = this,i = n.parsePoint(t, n.start),a = n.parsePoint(t, n.end);if (i && a) {var o = t.center,s = Math.sqrt((i.x - o.x) * (i.x - o.x) + (i.y - o.y) * (i.y - o.y)),c = Math.atan2(i.y - o.y, i.x - o.x),u = Math.atan2(a.y - o.y, a.x - o.x),l = e.addShape("arc", { className: "guide-arc", attrs: r.mix({ x: o.x, y: o.y, r: s, startAngle: c, endAngle: u }, n.style) });return n.element = l, l;}}, e;}(a);a.Arc = o, t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}function r(t, e, n, i) {var r = [];return "left" === t && "top" === e ? (r[0] = 0, r[1] = 0) : "right" === t && "top" === e ? (r[0] = -n, r[1] = 0) : "left" === t && "bottom" === e ? (r[0] = 0, r[1] = Math.floor(-i)) : "right" === t && "bottom" === e ? (r[0] = Math.floor(-n), r[1] = Math.floor(-i)) : "right" === t && "middle" === e ? (r[0] = Math.floor(-n), r[1] = Math.floor(-i / 2)) : "left" === t && "middle" === e ? (r[0] = 0, r[1] = Math.floor(-i / 2)) : "center" === t && "bottom" === e ? (r[0] = Math.floor(-n / 2), r[1] = Math.floor(-i)) : "center" === t && "top" === e ? (r[0] = Math.floor(-n / 2), r[1] = 0) : (r[0] = Math.floor(-n / 2), r[1] = Math.floor(-i / 2)), r;}function a(t, e) {for (var n in e) {e.hasOwnProperty(n) && (t.style[n] = e[n]);}return t;}function o(t) {var e = document.createElement("div");return t = t.replace(/(^\s*)|(\s*$)/g, ""), e.innerHTML = "" + t, e.childNodes[0];}var s = n(0),c = n(9),u = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {this.type = "html", this.position = null, this.alignX = "center", this.alignY = "middle", this.offsetX = null, this.offsetY = null, this.html = null;}, n.render = function (t, e) {var n = this,i = n.parsePoint(t, n.position);if (i) {var c = o(n.html);c = a(c, { position: "absolute", top: Math.floor(i.y) + "px", left: Math.floor(i.x) + "px", visibility: "hidden" });var u = e.get("canvas").get("el"),l = u.parentNode;l = a(l, { position: "relative" });var h = o('<div class="guideWapper" style="position: absolute;top: 0; left: 0;"></div>');l.appendChild(h), h.appendChild(c);var f = u.offsetTop,p = u.offsetLeft,g = n.alignX,d = n.alignY,v = n.offsetX,y = n.offsetY,m = r(g, d, s.getWidth(c), s.getHeight(c));i.x = i.x + m[0] + p, i.y = i.y + m[1] + f, v && (i.x += v), y && (i.y += y), a(c, { top: Math.floor(i.y) + "px", left: Math.floor(i.x) + "px", visibility: "visible" }), n.element = h;}}, n.remove = function () {var t = this.element;t && t.parentNode && t.parentNode.removeChild(t);}, e;}(c);c.Html = u, t.exports = u;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(9),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {this.type = "line", this.start = [], this.end = [], this.style = { stroke: "#000", lineWidth: 1 };}, n.render = function (t, e) {var n = [];if (n[0] = this.parsePoint(t, this.start), n[1] = this.parsePoint(t, this.end), n[0] && n[1]) {var i = e.addShape("Line", { className: "guide-line", attrs: r.mix({ x1: n[0].x, y1: n[0].y, x2: n[1].x, y2: n[1].y }, this.style) });return this.element = i, i;}}, e;}(a);a.Line = o, t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(9),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {this.type = "rect", this.start = [], this.end = [], this.style = { fill: "#CCD7EB", opacity: .4 };}, n.render = function (t, e) {var n = this.parsePoint(t, this.start),i = this.parsePoint(t, this.end);if (n && i) {var a = e.addShape("rect", { className: "guide-rect", attrs: r.mix({ x: Math.min(n.x, i.x), y: Math.min(n.y, i.y), width: Math.abs(i.x - n.x), height: Math.abs(n.y - i.y) }, this.style) });return this.element = a, a;}}, e;}(a);a.Rect = o, t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(9),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {this.type = "text", this.position = null, this.content = null, this.style = { fill: "#000" }, this.offsetX = 0, this.offsetY = 0;}, n.render = function (t, e) {var n = this.position,i = this.parsePoint(t, n);if (i) {var a = this.content,o = this.style,s = this.offsetX,c = this.offsetY;s && (i.x += s), c && (i.y += c);var u = e.addShape("text", { className: "guide-text", attrs: r.mix({ x: i.x, y: i.y, text: a }, o) });return this.element = u, u;}}, e;}(a);a.Text = o, t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(9),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {this.type = "tag", this.position = null, this.content = null, this.direct = "tl", this.autoAdjust = !0, this.offsetX = 0, this.offsetY = 0, this.side = 4, this.background = { padding: 5, radius: 2, fill: "#1890FF" }, this.textStyle = { fontSize: 12, fill: "#fff", textAlign: "center", textBaseline: "middle" }, this.withPoint = !0, this.pointStyle = { fill: "#1890FF", r: 3, lineWidth: 1, stroke: "#fff" };}, n._getDirect = function (t, e, n, i) {var r = this.direct,a = this.side,o = t.get("canvas"),s = o.get("width"),c = o.get("height"),u = e.x,l = e.y,h = r[0],f = r[1];"t" === h && l - a - i < 0 ? h = "b" : "b" === h && l + a + i > c && (h = "t");var p = "c" === h ? a : 0;return "l" === f && u - p - n < 0 ? f = "r" : "r" === f && u + p + n > s ? f = "l" : "c" === f && (n / 2 + u + p > s ? f = "l" : u - n / 2 - p < 0 && (f = "r")), r = h + f;}, n.render = function (t, e) {var n = this.parsePoint(t, this.position);if (n) {var i = this.content,a = this.background,o = this.textStyle,s = [],c = e.addGroup({ className: "guide-tag" });if (this.withPoint) {var u = c.addShape("Circle", { className: "guide-tag-point", attrs: r.mix({ x: n.x, y: n.y }, this.pointStyle) });s.push(u);}var l = c.addGroup(),h = l.addShape("text", { className: "guide-tag-text", zIndex: 1, attrs: r.mix({ x: 0, y: 0, text: i }, o) });s.push(h);var f = h.getBBox(),p = r.parsePadding(a.padding),g = f.width + p[1] + p[3],d = f.height + p[0] + p[2],v = f.minY - p[0],y = f.minX - p[3],m = l.addShape("rect", { className: "guide-tag-bg", zIndex: -1, attrs: r.mix({ x: y, y: v, width: g, height: d }, a) });s.push(m);var x,_ = this.autoAdjust ? this._getDirect(e, n, g, d) : this.direct,S = this.side,b = n.x + this.offsetX,w = n.y + this.offsetY,P = r.parsePadding(a.radius);"tl" === _ ? (x = [{ x: g + y - S - 1, y: d + v - 1 }, { x: g + y, y: d + v - 1 }, { x: g + y, y: d + S + v }], P[2] = 0, b -= g, w = w - S - d) : "cl" === _ ? (x = [{ x: g + y - 1, y: (d - S) / 2 + v - 1 }, { x: g + y - 1, y: (d + S) / 2 + v + 1 }, { x: g + S + y, y: d / 2 + v }], b = b - g - S, w -= d / 2) : "bl" === _ ? (x = [{ x: g + y, y: -S + v }, { x: g + y - S - 1, y: v + 1 }, { x: g + y, y: v + 1 }], P[1] = 0, b -= g, w += S) : "bc" === _ ? (x = [{ x: g / 2 + y, y: -S + v }, { x: (g - S) / 2 + y - 1, y: v + 1 }, { x: (g + S) / 2 + y + 1, y: v + 1 }], b -= g / 2, w += S) : "br" === _ ? (x = [{ x: y, y: v - S }, { x: y, y: v + 1 }, { x: y + S + 1, y: v + 1 }], P[0] = 0, w += S) : "cr" === _ ? (x = [{ x: y - S, y: d / 2 + v }, { x: y + 1, y: (d - S) / 2 + v - 1 }, { x: y + 1, y: (d + S) / 2 + v + 1 }], b += S, w -= d / 2) : "tr" === _ ? (x = [{ x: y, y: d + S + v }, { x: y, y: d + v - 1 }, { x: S + y + 1, y: d + v - 1 }], P[3] = 0, w = w - d - S) : "tc" === _ && (x = [{ x: (g - S) / 2 + y - 1, y: d + v - 1 }, { x: (g + S) / 2 + y + 1, y: d + v - 1 }, { x: g / 2 + y, y: d + S + v }], b -= g / 2, w = w - d - S);var C = l.addShape("Polygon", { className: "guide-tag-side", zIndex: 0, attrs: { points: x, fill: a.fill } });return s.push(C), m.attr("radius", P), l.moveTo(b - y, w - v), l.sort(), this.element = c, s;}}, e;}(a);a.Tag = o, t.exports = o;}, function (t, e, n) {function i(t) {var e = t.getAttr("color");if (e) {var n = e.getScale(e.type);if (n.isLinear) return n;}var i = t.getXScale(),r = t.getYScale();return r || i;}function r(t, e) {var n,r,a = t._getGroupScales();if (a.length && l.each(a, function (t) {return r = t, !1;}), r) {var o = r.field;n = r.getText(e[o]);} else {var s = i(t);n = s.alias || s.field;}return n;}function a(t, e) {var n = i(t);return n.getText(e[n.field]);}function o(t, e) {var n = t.getAttr("position").getFields()[0],i = t.get("scales")[n];return i.getText(e[i.field]);}function s(t, e) {var n = -1;return l.each(t, function (t, i) {if (t.title === e.title && t.name === e.name && t.value === e.value && t.color === e.color) return n = i, !1;}), n;}function c(t) {var e = [];return l.each(t, function (t) {var n = s(e, t);-1 === n ? e.push(t) : e[n] = t;}), e;}function u(t, e) {return JSON.stringify(t) === JSON.stringify(e);}var l = n(0),h = n(1),f = n(136),p = n(26);h.tooltip = l.deepMix({ triggerOn: ["touchstart", "touchmove"], alwaysShow: !1, showTitle: !1, showCrosshairs: !1, crosshairsStyle: { stroke: "rgba(0, 0, 0, 0.25)", lineWidth: 1 }, showTooltipMarker: !0, background: { radius: 1, fill: "rgba(0, 0, 0, 0.65)", padding: [3, 5] }, titleStyle: { fontSize: 12, fill: "#fff", textAlign: "start", textBaseline: "top" }, nameStyle: { fontSize: 12, fill: "rgba(255, 255, 255, 0.65)", textAlign: "start", textBaseline: "middle" }, valueStyle: { fontSize: 12, fill: "#fff", textAlign: "start", textBaseline: "middle" }, showItemMarker: !0, itemMarkerStyle: { radius: 3, symbol: "circle", lineWidth: 1, stroke: "#fff" }, layout: "horizontal" }, h.tooltip || {});var g = function () {function t(t) {this.enable = !0, this.cfg = {}, this.tooltip = null, this.chart = null, this.timeStamp = 0, l.mix(this, t);var e = this.chart;this.canvasDom = e.get("canvas").get("el");}var e = t.prototype;return e._setCrosshairsCfg = function () {var t = this.chart,e = l.mix({}, h.tooltip),n = t.get("geoms"),i = [];l.each(n, function (t) {var e = t.get("type");-1 === i.indexOf(e) && i.push(e);});var r = t.get("coord").type;return !n.length || "cartesian" !== r && "rect" !== r || 1 === i.length && -1 !== ["line", "area", "path", "point"].indexOf(i[0]) && l.mix(e, { showCrosshairs: !0 }), e;}, e._getMaxLength = function (t) {void 0 === t && (t = {});var e = t,n = e.layout,i = e.plotRange;return "horizontal" === n ? i.br.x - i.bl.x : i.bl.y - i.tr.y;}, e.render = function () {var t = this;if (!t.tooltip) {var e = t.chart,n = e.get("canvas"),i = e.get("frontPlot").addGroup({ className: "tooltipContainer", zIndex: 10 }),r = e.get("backPlot").addGroup({ className: "tooltipContainer" }),a = e.get("plotRange"),o = e.get("coord"),s = t._setCrosshairsCfg(),c = t.cfg;(c = l.deepMix({ plotRange: a, frontPlot: i, backPlot: r, canvas: n, fixed: o.transposed || o.isPolar }, s, c)).maxLength = t._getMaxLength(c), this.cfg = c;var u = new f(c);t.tooltip = u, t.bindEvents();}}, e.clear = function () {var t = this.tooltip;t && t.destroy(), this.tooltip = null, this.prePoint = null, this._lastActive = null, this.unBindEvents();}, e._getTooltipMarkerStyle = function (t) {void 0 === t && (t = {});var e = t,n = e.type,i = e.items,r = this.cfg;if ("rect" === n) {var a,o,s,c,u = this.chart,h = u.get("plotRange"),f = h.tl,p = h.br,g = u.get("coord"),d = i[0],v = i[i.length - 1],y = d.width;g.transposed ? (a = f.x, o = v.y - .75 * y, s = p.x - f.x, c = d.y - v.y + 1.5 * y) : (a = d.x - .75 * y, o = f.y, s = v.x - d.x + 1.5 * y, c = p.y - f.y), t.style = l.mix({ x: a, y: o, width: s, height: c, fill: "#CCD6EC", opacity: .3 }, r.tooltipMarkerStyle);} else t.style = l.mix({ radius: 4, fill: "#fff", lineWidth: 2 }, r.tooltipMarkerStyle);return t;}, e._setTooltip = function (t, e, n) {void 0 === n && (n = {});var i = this._lastActive,r = this.tooltip,a = this.cfg;if (e = c(e), a.onShow && a.onShow({ x: t.x, y: t.y, tooltip: r, items: e, tooltipMarkerCfg: n }), !u(i, e)) {if (this._lastActive = e, (a.onChange || l.isFunction(a.custom)) && (a.onChange || a.custom)({ x: t.x, y: t.y, tooltip: r, items: e, tooltipMarkerCfg: n }), !a.custom) {var o = e[0],s = o.title || o.name;r.setContent(s, e);}r.setPosition(e);var h = n.items;a.showTooltipMarker && h.length ? (n = this._getTooltipMarkerStyle(n), r.setMarkers(n)) : r.clearMarkers(), r.show();}}, e.showTooltip = function (t) {var e,n,i = this,s = i.chart,c = [],u = [],f = i.cfg;f.showItemMarker && (n = f.itemMarkerStyle);var p = s.get("geoms"),g = s.get("coord");if (l.each(p, function (i) {if (i.get("visible")) {var s = i.get("type"),f = i.getSnapRecords(t);l.each(f, function (t) {if (t.x && t.y) {var f = t.x,p = t.y,d = t._origin,v = t.color,y = { x: f, y: l.isArray(p) ? p[1] : p, color: v || h.defaultColor, origin: d, name: r(i, d), value: a(i, d), title: o(i, d) };n && (y.marker = l.mix({ fill: v || h.defaultColor }, n)), u.push(y), -1 !== ["line", "area", "path"].indexOf(s) ? (e = "circle", c.push(y)) : "interval" !== s || "cartesian" !== g.type && "rect" !== g.type || (e = "rect", y.width = i.getSize(t._origin), c.push(y));}});}}), u.length) {var d = { items: c, type: e };i._setTooltip(t, u, d);} else i.hideTooltip();}, e.hideTooltip = function () {var t = this.cfg;this._lastActive = null;var e = this.tooltip;e && (e.hide(), t.onHide && t.onHide({ tooltip: e }), this.chart.get("canvas").draw());}, e.handleShowEvent = function (t) {if (this.enable) {var e = this.chart,n = e.get("plotRange"),i = l.createEvent(t, e);if (p.isPointInPlot(i, n) || this.cfg.alwaysShow) {var r = this.timeStamp,a = +new Date();a - r > 16 && (this.showTooltip(i), this.timeStamp = a);} else this.hideTooltip();}}, e.handleHideEvent = function () {this.enable && this.hideTooltip();}, e.handleDocEvent = function (t) {if (this.enable) {var e = this.canvasDom;t.target !== e && this.hideTooltip();}}, e._handleEvent = function (t, e, n) {var i = this.canvasDom;l.each([].concat(t), function (t) {"bind" === n ? l.addEventListener(i, t, e) : l.removeEventListener(i, t, e);});}, e.bindEvents = function () {var t = this.cfg,e = t.triggerOn,n = t.triggerOff,i = t.alwaysShow,r = l.wrapBehavior(this, "handleShowEvent"),a = l.wrapBehavior(this, "handleHideEvent");if (e && this._handleEvent(e, r, "bind"), n && this._handleEvent(n, a, "bind"), !i) {var o = l.wrapBehavior(this, "handleDocEvent");l.isBrowser && l.addEventListener(document, "touchstart", o);}}, e.unBindEvents = function () {var t = this.cfg,e = t.triggerOn,n = t.triggerOff,i = t.alwaysShow,r = l.getWrapBehavior(this, "handleShowEvent"),a = l.getWrapBehavior(this, "handleHideEvent");if (e && this._handleEvent(e, r, "unBind"), n && this._handleEvent(n, a, "unBind"), !i) {var o = l.getWrapBehavior(this, "handleDocEvent");l.isBrowser && l.removeEventListener(document, "touchstart", o);}}, t;}();t.exports = { init: function init(t) {var e = new g({ chart: t });t.set("tooltipController", e), t.tooltip = function (t, n) {return l.isObject(t) && (n = t, t = !0), e.enable = t, n && (e.cfg = n), this;};}, afterGeomDraw: function afterGeomDraw(t) {var e = t.get("tooltipController");e.render(), t.showTooltip = function (t) {return e.showTooltip(t), this;}, t.hideTooltip = function () {return e.hideTooltip(), this;};}, clearInner: function clearInner(t) {t.get("tooltipController").clear();} };}, function (t, e, n) {var i = n(0),r = n(111),a = n(112),o = function () {function t(t) {i.deepMix(this, this.getDefaultCfg(), t);var e = this.frontPlot,n = this.plotRange;if (!this.custom) {var r = new a(i.mix({ parent: e, zIndex: 3 }, t));this.container = r, this.fixed || (this.tooltipArrow = e.addShape("Polygon", { className: "tooltip-arrow", visible: !1, zIndex: 2, attrs: { points: [], fill: this.background.fill } }));}if (this.showCrosshairs) {var o = this.crosshairsStyle,s = e.addShape("Line", { className: "tooltip-crosshairs", zIndex: 0, visible: !1, attrs: i.mix({ x1: 0, y1: n.bl.y, x2: 0, y2: n.tl.y }, o) });this.crosshairsShape = s;}e.sort();}var e = t.prototype;return e.getDefaultCfg = function () {return { showCrosshairs: !1, crosshairsStyle: { stroke: "rgba(0, 0, 0, 0.25)", lineWidth: 1 }, background: null, layout: "horizontal", offsetX: 0, offsetY: 0 };}, e.setContent = function (t, e) {this.title = t, this.items = e;var n = this.container;n.setTitle(t), n.setItems(e);}, e.setPosition = function (t) {var e = this.container,n = this.plotRange,r = this.offsetX,a = this.offsetY,o = this.crosshairsShape,s = this.fixed,c = this.tooltipArrow;if (o && o.moveTo(t[0].x, 0), e) {var u = e.container.getBBox(),l = u.minX,h = u.minY,f = u.width,p = u.height,g = n.tl,d = n.tr,v = 0,y = g.y - p - 4 + a;if (s) v = (g.x + d.x) / 2 - f / 2 + r;else {var m;if (m = t.length > 1 ? (t[0].x + t[t.length - 1].x) / 2 : t[0].x, (v = m - f / 2 + r) < g.x && (v = g.x), v + f > d.x && (v = d.x - f), c) {c.attr("points", [{ x: m - 3, y: g.y - 4 + a }, { x: m + 3, y: g.y - 4 + a }, { x: m, y: g.y + a }]);var x = e.backShape,_ = i.parsePadding(x.attr("radius"));m === g.x ? (_[3] = 0, c.attr("points", [{ x: g.x, y: g.y + a }, { x: g.x, y: g.y - 4 + a }, { x: g.x + 4, y: g.y - 4 + a }])) : m === d.x && (_[2] = 0, c.attr("points", [{ x: d.x, y: g.y + a }, { x: d.x - 4, y: g.y - 4 + a }, { x: d.x, y: g.y - 4 + a }])), x.attr("radius", _);}}e.moveTo(v - l, y - h);}}, e.setMarkers = function (t) {void 0 === t && (t = {});var e = this,n = t,a = n.items,o = n.style,s = n.type,c = e._getMarkerGroup(s);if ("circle" === s) for (var u = 0, l = a.length; u < l; u++) {var h = a[u],f = new r({ className: "tooltip-circle-marker", attrs: i.mix({ x: h.x, y: h.y, stroke: h.color }, o) });c.add(f);} else c.addShape("rect", { className: "tooltip-rect-marker", attrs: o });}, e.clearMarkers = function () {var t = this.markerGroup;t && t.clear();}, e.show = function () {var t = this.crosshairsShape,e = this.markerGroup,n = this.container,i = this.tooltipArrow,r = this.canvas;t && t.show(), e && e.show(), n && n.show(), i && i.show(), r.draw();}, e.hide = function () {var t = this.crosshairsShape,e = this.markerGroup,n = this.container,i = this.tooltipArrow;t && t.hide(), e && e.hide(), n && n.hide(), i && i.hide();}, e.destroy = function () {var t = this.crosshairsShape,e = this.markerGroup,n = this.container,i = this.tooltipArrow;t && t.remove(!0), e && e.remove(!0), n && n.clear(), i && i.remove(!0), this.destroyed = !0;}, e._getMarkerGroup = function (t) {var e = this.markerGroup;return e ? e.clear() : ("circle" === t ? (e = this.frontPlot.addGroup({ zIndex: 1 }), this.frontPlot.sort()) : e = this.backPlot.addGroup(), this.markerGroup = e), e;}, t;}();t.exports = o;}, function (t, e, n) {var i = n(0),r = n(9),a = n(1);a.guide = i.deepMix({ line: { style: { stroke: "#a3a3a3", lineWidth: 1 }, top: !0 }, text: { style: { fill: "#787878", textAlign: "center", textBaseline: "middle" }, offsetX: 0, offsetY: 0, top: !0 }, rect: { style: { fill: "#fafafa" }, top: !1 }, arc: { style: { stroke: "#a3a3a3" }, top: !0 }, html: { offsetX: 0, offsetY: 0, alignX: "center", alignY: "middle" }, tag: { top: !0, offsetX: 0, offsetY: 0, side: 4, background: { padding: 5, radius: 2, fill: "#1890FF" }, textStyle: { fontSize: 12, fill: "#fff", textAlign: "center", textBaseline: "middle" } }, point: { top: !0, offsetX: 0, offsetY: 0, style: { fill: "#fff", r: 3, lineWidth: 2, stroke: "#1890ff" } } }, a.guide || {});var o = function () {function t(t) {this.guides = [], this.xScale = null, this.yScales = null, this.guideShapes = [], i.mix(this, t);}var e = t.prototype;return e._toString = function (t) {return i.isFunction(t) && (t = t(this.xScale, this.yScales)), t = t.toString();}, e._getId = function (t, e) {var n = e.id;if (!n) {var i = e.type;n = "arc" === i || "line" === i || "rect" === i ? this._toString(e.start) + "-" + this._toString(e.end) : this._toString(e.position);}return n;}, e.paint = function (t) {var e = this,n = e.chart,r = e.guides,a = e.xScale,o = e.yScales,s = [];i.each(r, function (i, r) {i.xScale = a, i.yScales = o;var c;"regionFilter" === i.type ? i.chart = n : c = i.top ? e.frontPlot : e.backPlot, i.coord = t, i.container = c, i.canvas = n.get("canvas");var u = i.render(t, c);if (u) {var l = e._getId(u, i);[].concat(u).forEach(function (t) {t._id = t.get("className") + "-" + l, t.set("index", r), s.push(t);});}}), e.guideShapes = s;}, e.clear = function () {return this.reset(), this.guides = [], this;}, e.reset = function () {var t = this.guides;i.each(t, function (t) {t.remove();});}, e._createGuide = function (t, e) {var n = i.upperFirst(t),o = new r[n](i.deepMix({}, a.guide[t], e));return this.guides.push(o), o;}, e.line = function (t) {return void 0 === t && (t = {}), this._createGuide("line", t);}, e.text = function (t) {return void 0 === t && (t = {}), this._createGuide("text", t);}, e.arc = function (t) {return void 0 === t && (t = {}), this._createGuide("arc", t);}, e.html = function (t) {return void 0 === t && (t = {}), this._createGuide("html", t);}, e.rect = function (t) {return void 0 === t && (t = {}), this._createGuide("rect", t);}, e.tag = function (t) {return void 0 === t && (t = {}), this._createGuide("tag", t);}, e.point = function (t) {return void 0 === t && (t = {}), this._createGuide("point", t);}, e.regionFilter = function (t) {return void 0 === t && (t = {}), this._createGuide("regionFilter", t);}, t;}();t.exports = { init: function init(t) {var e = new o({ frontPlot: t.get("frontPlot").addGroup({ zIndex: 20, className: "guideContainer" }), backPlot: t.get("backPlot").addGroup({ className: "guideContainer" }) });t.set("guideController", e), t.guide = function () {return e;};}, afterGeomDraw: function afterGeomDraw(t) {var e = t.get("guideController");if (e.guides.length) {var n = t.getXScale(),i = t.getYScales(),r = t.get("coord");e.xScale = n, e.yScales = i, e.chart = t, e.paint(r);}}, clear: function clear(t) {t.get("guideController").clear();}, repaint: function repaint(t) {t.get("guideController").reset();} };}, function (t, e, n) {function i(t, e) {var n = 0;switch (e = r.parsePadding(e), t) {case "top":n = e[0];break;case "right":n = e[1];break;case "bottom":n = e[2];break;case "left":n = e[3];}return n;}var r = n(0),a = n(112),o = n(1),s = { itemMarginBottom: 12, itemGap: 10, showTitle: !1, titleStyle: { fontSize: 12, fill: "#808080", textAlign: "start", textBaseline: "top" }, nameStyle: { fill: "#808080", fontSize: 12, textAlign: "start", textBaseline: "middle" }, valueStyle: { fill: "#000000", fontSize: 12, textAlign: "start", textBaseline: "middle" }, unCheckStyle: { fill: "#bfbfbf" }, itemWidth: "auto", wordSpace: 6, selectedMode: "multiple" };o.legend = r.deepMix({ right: r.mix({ position: "right", layout: "vertical" }, s), left: r.mix({ position: "left", layout: "vertical" }, s), top: r.mix({ position: "top", layout: "horizontal" }, s), bottom: r.mix({ position: "bottom", layout: "horizontal" }, s) }, o.legend || {});var c = function () {function t(t) {this.legendCfg = {}, this.enable = !0, this.position = "top", r.mix(this, t);var e = this.chart;this.canvasDom = e.get("canvas").get("el"), this.clear();}var e = t.prototype;return e.addLegend = function (t, e, n) {var i = this,r = i.legendCfg,a = t.field,o = r[a];if (!1 === o) return null;if (o && o.custom) i.addCustomLegend(a);else {var s = r.position || i.position;o && o.position && (s = o.position), t.isCategory && i._addCategoryLegend(t, e, s, n);}}, e.addCustomLegend = function (t) {var e = this,n = e.legendCfg;t && n[t] && (n = n[t]);var i = n.position || e.position,s = e.legends;s[i] = s[i] || [];var c = n.items;if (!c) return null;var u = e.container;r.each(c, function (t) {r.isPlainObject(t.marker) ? t.marker.radius = t.marker.radius || 3 : t.marker = { symbol: t.marker || "circle", fill: t.fill, radius: 3 }, t.checked = !!r.isNil(t.checked) || t.checked, t.name = t.name || t.value;});var l = new a(r.deepMix({}, o.legend[i], n, { maxLength: e._getMaxLength(i), items: c, parent: u }));s[i].push(l);}, e.clear = function () {var t = this.legends;r.each(t, function (t) {r.each(t, function (t) {t.clear();});}), this.legends = {}, this.unBindEvents();}, e._isFiltered = function (t, e, n) {var i = !1;return r.each(e, function (e) {if (i = i || t.getText(e) === t.getText(n)) return !1;}), i;}, e._getMaxLength = function (t) {var e = this.chart,n = r.parsePadding(e.get("appendPadding"));return "right" === t || "left" === t ? e.get("height") - (n[0] + n[2]) : e.get("width") - (n[1] + n[3]);}, e._addCategoryLegend = function (t, e, n, i) {var s = this,c = s.legendCfg,u = s.legends,l = s.container,h = s.chart,f = t.field;u[n] = u[n] || [];var p = "circle";c[f] && c[f].marker ? p = c[f].marker : c.marker && (p = c.marker), r.each(e, function (e) {r.isPlainObject(p) ? r.mix(e.marker, p) : e.marker.symbol = p, i && (e.checked = s._isFiltered(t, i, e.dataValue));}), h.get("legendItems")[f] = e;var g = r.deepMix({}, o.legend[n], c[f] || c, { maxLength: s._getMaxLength(n), items: e, field: f, filterVals: i, parent: l });g.showTitle && r.deepMix(g, { title: t.alias || t.field });var d = new a(g);return u[n].push(d), d;}, e._alignLegend = function (t, e, n) {var i = this,a = i.plotRange,o = a.tl,s = a.bl,c = i.chart,u = t.offsetX || 0,l = t.offsetY || 0,h = c.get("width"),f = c.get("height"),p = r.parsePadding(c.get("appendPadding")),g = t.getHeight(),d = t.getWidth(),v = 0,y = 0;if ("left" === n || "right" === n) {var m = t.verticalAlign || "middle",x = Math.abs(o.y - s.y);v = "left" === n ? p[3] : h - d - p[1], y = (x - g) / 2 + o.y, "top" === m ? y = o.y : "bottom" === m && (y = s.y - g), e && (y = e.get("y") - g - 12);} else {var _ = t.align || "left";if (v = p[3], "center" === _ ? v = h / 2 - d / 2 : "right" === _ && (v = h - (d + p[1])), y = "top" === n ? p[0] + Math.abs(t.container.getBBox().minY) : f - g, e) {var S = e.getWidth();v = e.x + S + 12;}}"bottom" === n && l > 0 && (l = 0), "right" === n && u > 0 && (u = 0), t.moveTo(v + u, y + l);}, e.alignLegends = function () {var t = this,e = t.legends;return r.each(e, function (e, n) {r.each(e, function (i, r) {var a = e[r - 1];t._alignLegend(i, a, n);});}), t;}, e.handleEvent = function (t) {var e = this,n = e.chart,i = r.createEvent(t, n),a = function (t, n) {var i = null,a = e.legends;return r.each(a, function (e) {r.each(e, function (e) {var a = e.itemsGroup,o = e.legendHitBoxes,s = a.get("children");if (s.length) {var c = e.x,u = e.y;r.each(o, function (r, a) {if (t >= r.x + c && t <= r.x + r.width + c && n >= r.y + u && n <= r.height + r.y + u) return i = { clickedItem: s[a], clickedLegend: e }, !1;});}});}), i;}(i.x, i.y);if (a && !1 !== a.clickedLegend.clickable) {var o = a.clickedItem,s = a.clickedLegend;if (s.onClick) t.clickedItem = o, s.onClick(t);else if (!s.custom) {var c = o.get("checked"),u = o.get("dataValue"),l = s.filterVals,h = s.field;"single" === s.selectedMode ? n.filter(h, function (t) {return t === u;}) : (c ? r.Array.remove(l, u) : l.push(u), n.filter(h, function (t) {return -1 !== l.indexOf(t);})), n.repaint();}}}, e.bindEvents = function () {var t = this.legendCfg.triggerOn || "touchstart",e = r.wrapBehavior(this, "handleEvent");r.addEventListener(this.canvasDom, t, e);}, e.unBindEvents = function () {var t = this.legendCfg.triggerOn || "touchstart",e = r.getWrapBehavior(this, "handleEvent");r.removeEventListener(this.canvasDom, t, e);}, t;}();t.exports = { init: function init(t) {var e = new c({ container: t.get("backPlot"), plotRange: t.get("plotRange"), chart: t });t.set("legendController", e), t.legend = function (t, n) {var i = e.legendCfg;return e.enable = !0, r.isBoolean(t) ? (e.enable = t, i = n || {}) : r.isObject(t) ? i = t : i[t] = n, e.legendCfg = i, this;};}, beforeGeomDraw: function beforeGeomDraw(t) {var e = t.get("legendController");if (!e.enable) return null;var n = e.legendCfg;if (n && n.custom) e.addCustomLegend();else {var a = t.getLegendItems(),o = t.get("scales"),s = t.get("filters");r.each(a, function (t, n) {var i,r = o[n],a = r.values;i = s && s[n] ? a.filter(s[n]) : a.slice(0), e.addLegend(r, t, i);});}n && !1 !== n.clickable && e.bindEvents();var c = e.legends,u = { top: 0, right: 0, bottom: 0, left: 0 };r.each(c, function (e, n) {var a = 0;r.each(e, function (t) {var e = t.getWidth(),i = t.getHeight();"top" === n || "bottom" === n ? (a = Math.max(a, i), t.offsetY > 0 && (a += t.offsetY)) : (a = Math.max(a, e), t.offsetX > 0 && (a += t.offsetX));}), u[n] = a + i(n, t.get("appendPadding"));}), t.set("legendRange", u);}, afterGeomDraw: function afterGeomDraw(t) {t.get("legendController").alignLegends();}, clearInner: function clearInner(t) {t.get("legendController").clear(), t.set("legendRange", null);} };}, function (t, e, n) {function i(t, e) {var n = {};for (var i in e) {f.isNumber(t[i]) && t[i] !== e[i] ? n[i] = e[i] : f.isArray(t[i]) && JSON.stringify(t[i]) !== JSON.stringify(e[i]) && (n[i] = e[i]);}return n;}function r(t, e, n) {var i,r = t.get("type"),a = "geom" + n + "-" + r,o = t.getXScale(),s = t.getYScale(),c = o.field || "x",u = s.field || "y",l = e[u];i = o.isIdentity ? o.value : e[c], a += "interval" === r || "schema" === r ? "-" + i : "line" === r || "area" === r || "path" === r ? "-" + r : o.isCategory ? "-" + i : "-" + i + "-" + l;var h = t._getGroupScales();return f.each(h, function (t) {var n = t.field;"identity" !== t.type && (a += "-" + e[n]);}), a;}function a(t, e, n) {var i = [];return f.each(t, function (t, a) {var o = t.get("container").get("children"),s = t.get("type"),c = f.isNil(t.get("animateCfg")) ? l(s, e) : t.get("animateCfg");!1 !== c && f.each(o, function (e, o) {e.get("className") === s && (e._id = r(t, e.get("origin")._origin, a), e.set("coord", n), e.set("animateCfg", c), e.set("index", o), i.push(e));}), t.set("shapes", o);}), i;}function o(t) {for (var e = {}, n = 0, i = t.length; n < i; n++) {var r = t[n];if (r._id && !r.isClip) {var a = r._id;e[a] = { _id: a, type: r.get("type"), attrs: f.mix({}, r._attrs.attrs), className: r.get("className"), geomType: r.get("className"), index: r.get("index"), coord: r.get("coord"), animateCfg: r.get("animateCfg") };}}return e;}function s(t, e, n, i) {return f.isFunction(i) ? i : f.isString(i) ? v.Action[i] : v.getAnimation(t, e, n);}function c(t, e, n) {if (!1 === n || f.isObject(n) && !1 === n[e]) return !1;var i = v.getAnimateCfg(t, e);return n && n[e] ? f.deepMix({}, i, n[e]) : i;}function u(t, e, n) {var r,a,o = [],u = [];f.each(e, function (e) {var n = t[e._id];n ? (e.set("cacheShape", n), o.push(e), delete t[e._id]) : u.push(e);}), f.each(t, function (t) {var e = t.className,i = t.coord,o = t._id,u = t.attrs,l = t.index,h = t.type;if (!1 === (a = c(e, "leave", t.animateCfg))) return !0;if (r = s(e, i, "leave", a.animation), f.isFunction(r)) {var p = n.addShape(h, { attrs: u, index: l, canvas: n, className: e });p._id = o, r(p, a, i);}}), f.each(o, function (t) {var e = t.get("className");if (!1 === (a = c(e, "update", t.get("animateCfg")))) return !0;var n = t.get("coord"),o = t.get("cacheShape").attrs,u = i(o, t._attrs.attrs);Object.keys(u).length && (r = s(e, n, "update", a.animation), f.isFunction(r) ? r(t, a, n) : (t.attr(o), t.animate().to({ attrs: u, duration: a.duration, easing: a.easing, delay: a.delay }).onEnd(function () {t.set("cacheShape", null);})));}), f.each(u, function (t) {var e = t.get("className"),n = t.get("coord");if (!1 === (a = c(e, "enter", t.get("animateCfg")))) return !0;if (r = s(e, n, "enter", a.animation), f.isFunction(r)) if ("interval" === e && n.isPolar && n.transposed) {var i = t.get("index"),u = o[i - 1];r(t, a, u);} else r(t, a, n);});}function l(t, e) {if (!t) return null;var n = e.get("animate");return t.indexOf("guide-tag") > -1 && (t = "guide-tag"), f.isObject(n) ? n[t] : !1 !== n && null;}var h,f = n(0),p = n(25),g = n(140),d = n(141),v = n(113),y = n(143),m = n(144),x = n(15);p.prototype.animate = function () {var t = f.mix({}, this.get("attrs"));return new d(this, t, h);}, x.prototype.animate = function (t) {return this.set("animate", t), this;}, v.Action = y, v.defaultCfg = { interval: { enter: function enter(t) {return t.isPolar && t.transposed ? function (t) {t.set("zIndex", -1), t.get("parent").sort();} : y.fadeIn;} }, area: { enter: function enter(t) {return t.isPolar ? null : y.fadeIn;} }, line: { enter: function enter(t) {return t.isPolar ? null : y.fadeIn;} }, path: { enter: function enter(t) {return t.isPolar ? null : y.fadeIn;} } };var _ = { line: function line(t) {return t.isPolar ? m.groupScaleInXY : m.groupWaveIn;}, area: function area(t) {return t.isPolar ? m.groupScaleInXY : m.groupWaveIn;}, path: function path(t) {return t.isPolar ? m.groupScaleInXY : m.groupWaveIn;}, point: function point() {return m.shapesScaleInXY;}, interval: function interval(t) {var e;return t.isPolar ? (e = m.groupScaleInXY, t.transposed && (e = m.groupWaveIn)) : e = t.transposed ? m.groupScaleInX : m.groupScaleInY, e;}, schema: function schema() {return m.groupWaveIn;} };t.exports = { afterCanvasInit: function afterCanvasInit() {(h = new g()).play();}, beforeCanvasDraw: function beforeCanvasDraw(t) {if (!1 !== t.get("animate")) {var e = t.get("isUpdate"),n = t.get("canvas"),i = t.get("coord"),r = t.get("geoms"),h = n.get("caches") || [];0 === h.length && (e = !1);var p = a(r, t, i),g = t.get("axisController"),d = g.frontPlot,y = g.backPlot,x = d.get("children").concat(y.get("children")),S = [];t.get("guideController") && (S = t.get("guideController").guideShapes);var b = [];if (x.concat(S).forEach(function (e) {var n = l(e.get("className"), t);e.set("coord", i), e.set("animateCfg", n), b.push(e), p.push(e);}), n.set("caches", o(p)), e) u(h, p, n);else {var w, P;f.each(r, function (e) {var n = e.get("type"),r = f.isNil(e.get("animateCfg")) ? l(n, t) : e.get("animateCfg");if (!1 !== r) if (w = c(n, "appear", r), P = s(n, i, "appear", w.animation), f.isFunction(P)) {var a = e.get("shapes");f.each(a, function (t) {P(t, w, i);});} else if (_[n]) {P = m[w.animation] || _[n](i);var o = e.getYScale(),u = i.convertPoint({ x: 0, y: o.scale(e.getYMinValue()) }),h = e.get("container");P && P(h, w, i, u);}}), f.each(b, function (t) {var e = t.get("animateCfg"),n = t.get("className");if (e && e.appear) {var r = v.getAnimateCfg(n, "appear"),a = f.deepMix({}, r, e.appear),o = s(n, i, "appear", a.animation);f.isFunction(o) && o(t, a, i);}});}}}, afterCanvasDestroyed: function afterCanvasDestroyed() {h.stop();} };}, function (t, e, n) {var i = n(41).requestAnimationFrame,r = "object" == typeof performance && performance.now ? performance : Date,a = function () {function t() {this.anims = [], this.time = null, this.playing = !1, this.canvas = [];}var e = t.prototype;return e.play = function () {function t() {e.playing && (i(t), e.update());}var e = this;e.time = r.now(), e.playing = !0, i(t);}, e.stop = function () {this.playing = !1, this.time = null, this.canvas = [];}, e.update = function () {var t = r.now();this.canvas = [];for (var e = 0; e < this.anims.length; e++) {var n = this.anims[e];if (!(t < n.startTime || n.hasEnded)) {var i = n.shape;if (i.get("destroyed")) this.anims.splice(e, 1), e--;else {var a = n.startState,o = n.endState,s = n.interpolate,c = n.duration;t >= n.startTime && !n.hasStarted && (n.hasStarted = !0, n.onStart && n.onStart());var u = (t - n.startTime) / c;if (u = Math.max(0, Math.min(u, 1)), u = n.easing(u), n.onFrame) n.onFrame(u);else for (var l in s) {var h = (0, s[l])(u),f = void 0;if ("points" === l) {f = [];for (var p = Math.max(a.points.length, o.points.length), g = 0; g < p; g += 2) {f.push({ x: h[g], y: h[g + 1] });}} else f = h;i._attrs.attrs[l] = f;}var d = i.get("canvas");-1 === this.canvas.indexOf(d) && this.canvas.push(d), n.onUpdate && n.onUpdate(u), t >= n.endTime && !n.hasEnded && (n.hasEnded = !0, n.onEnd && n.onEnd()), 1 === u && (this.anims.splice(e, 1), e--);}}}this.canvas.map(function (t) {return t.draw(), t;}), this.time = r.now();}, t;}();t.exports = a;}, function (t, e, n) {function i(t) {for (var e = [], n = 0, i = t.length; n < i; n++) {t[n] && (e.push(t[n].x), e.push(t[n].y));}return e;}function r(t, e) {return t = +t, e -= t, function (n) {return t + e * n;};}function a(t, e) {var n,i = e ? e.length : 0,a = t ? Math.min(i, t.length) : 0,o = new Array(a),s = new Array(i);for (n = 0; n < a; ++n) {o[n] = r(t[n], e[n]);}for (; n < i; ++n) {s[n] = e[n];}return function (t) {for (n = 0; n < a; ++n) {s[n] = o[n](t);}return s;};}var o = n(142),s = function () {function t(t, e, n) {this.hasStarted = !1, this.hasEnded = !1, this.shape = t, this.source = e, this.timeline = n, this.animate = null;}var e = t.prototype;return e.to = function (t) {void 0 === t && (t = {});var e,n = t.delay || 0,s = t.attrs || {},c = t.duration || 1e3;e = "function" == typeof t.easing ? t.easing : o[t.easing] || o.linear;var u = { shape: this.shape, startTime: this.timeline.time + n, duration: c, easing: e },l = {};for (var h in s) {var f = this.source[h],p = s[h];"points" === h ? (f = i(f), p = i(p), l.points = a(f, p), this.source.points = f, s.points = p) : "matrix" === h ? l.matrix = a(f, p) : l[h] = r(f, p);}return u.interpolate = l, u.startState = this.source, u.endState = s, u.endTime = u.startTime + c, this.timeline.anims.push(u), this.animate = u, this;}, e.onFrame = function (t) {return this.animate && (this.animate.onFrame = function (e) {t(e);}), this;}, e.onStart = function (t) {return this.animate && (this.animate.onStart = function () {t();}), this;}, e.onUpdate = function (t) {return this.animate && (this.animate.onUpdate = function (e) {t(e);}), this;}, e.onEnd = function (t) {return this.animate && (this.animate.onEnd = function () {t();}), this;}, t;}();t.exports = s;}, function (t, e) {var n = { linear: function linear(t) {return t;}, quadraticIn: function quadraticIn(t) {return t * t;}, quadraticOut: function quadraticOut(t) {return t * (2 - t);}, quadraticInOut: function quadraticInOut(t) {return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);}, cubicIn: function cubicIn(t) {return t * t * t;}, cubicOut: function cubicOut(t) {return --t * t * t + 1;}, cubicInOut: function cubicInOut(t) {return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);}, elasticIn: function elasticIn(t) {var e,n = .1,i = .4;return 0 === t ? 0 : 1 === t ? 1 : (i || (i = .3), !n || n < 1 ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), -n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i));}, elasticOut: function elasticOut(t) {var e,n = .1,i = .4;return 0 === t ? 0 : 1 === t ? 1 : (i || (i = .3), !n || n < 1 ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), n * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / i) + 1);}, elasticInOut: function elasticInOut(t) {var e,n = .1,i = .4;return 0 === t ? 0 : 1 === t ? 1 : (i || (i = .3), !n || n < 1 ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), (t *= 2) < 1 ? n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i) * -.5 : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i) * .5 + 1);}, backIn: function backIn(t) {var e = 1.70158;return t * t * ((e + 1) * t - e);}, backOut: function backOut(t) {var e = 1.70158;return (t -= 1) * t * ((e + 1) * t + e) + 1;}, backInOut: function backInOut(t) {var e = 2.5949095;return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);}, bounceIn: function bounceIn(t) {return 1 - n.bounceOut(1 - t);}, bounceOut: function bounceOut(t) {return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;}, bounceInOut: function bounceInOut(t) {return t < .5 ? .5 * n.bounceIn(2 * t) : .5 * n.bounceOut(2 * t - 1) + .5;} };t.exports = n;}, function (t, e, n) {var i = n(0),r = n(114);t.exports = { fadeIn: function fadeIn(t, e) {var n = i.isNil(t.attr("fillOpacity")) ? 1 : t.attr("fillOpacity"),a = i.isNil(t.attr("strokeOpacity")) ? 1 : t.attr("strokeOpacity");t.attr("fillOpacity", 0), t.attr("strokeOpacity", 0);var o = { fillOpacity: n, strokeOpacity: a };r.doAnimation(t, o, e);} };}, function (t, e, n) {function i(t, e, n, i, r) {var o,c,u = a.getCoordInfo(n),l = u.start,h = u.end,f = u.width,p = u.height,g = new s.Rect({ attrs: { x: l.x, y: h.y, width: f, height: p } });"y" === r ? (o = l.x + f / 2, c = i.y < l.y ? i.y : l.y) : "x" === r ? (o = i.x > l.x ? i.x : l.x, c = l.y + p / 2) : "xy" === r && (n.isPolar ? (o = n.center.x, c = n.center.y) : (o = (l.x + h.x) / 2, c = (l.y + h.y) / 2));var d = a.getScaledMatrix(g, [o, c], r);g.isClip = !0, g.endState = { matrix: d }, g.set("canvas", t.get("canvas")), t.attr("clip", g);a.doAnimation(g, g.endState, e, function () {t.attr("clip", null), g.remove(!0);});}function r(t, e, n) {for (var i, r, o, s = t.get("children"), c = 0, u = s.length; c < u; c++) {var l = s[c],h = l.getBBox();i = (h.minX + h.maxX) / 2, r = (h.minY + h.maxY) / 2, o = a.getScaledMatrix(l, [i, r], n), a.doAnimation(l, { matrix: o }, e);}}var a = n(114),o = n(26),s = n(7).Shape;t.exports = { groupWaveIn: function groupWaveIn(t, e, n) {var i = o.getClip(n);i.set("canvas", t.get("canvas")), t.attr("clip", i);var r = {};if (n.isPolar) {var s = n.startAngle,c = n.endAngle;r.endAngle = c, i.attr("endAngle", s);} else {var u = n.start,l = n.end,h = Math.abs(u.x - l.x),f = Math.abs(u.y - l.y);n.isTransposed ? (i.attr("height", 0), r.height = f) : (i.attr("width", 0), r.width = h);}a.doAnimation(i, r, e, function () {t.attr("clip", null), i.remove(!0);});}, groupScaleInX: function groupScaleInX(t, e, n, r) {i(t, e, n, r, "x");}, groupScaleInY: function groupScaleInY(t, e, n, r) {i(t, e, n, r, "y");}, groupScaleInXY: function groupScaleInXY(t, e, n, r) {i(t, e, n, r, "xy");}, shapesScaleInX: function shapesScaleInX(t, e) {r(t, e, "x");}, shapesScaleInY: function shapesScaleInY(t, e) {r(t, e, "y");}, shapesScaleInXY: function shapesScaleInXY(t, e) {r(t, e, "xy");} };}, function (t, e, n) {var i = n(110),r = n(0);t.exports = { directionEnabled: function directionEnabled(t, e) {return void 0 === t || "string" == typeof t && -1 !== t.indexOf(e);}, getColDef: function getColDef(t, e) {var n;return t.get("colDefs") && t.get("colDefs")[e] && (n = t.get("colDefs")[e]), n;}, _getFieldRange: function _getFieldRange(t, e, n) {if (!t) return [0, 1];var i = 0,r = 0;if ("linear" === n) {var a = e.min,o = e.max;i = (t.min - a) / (o - a), r = (t.max - a) / (o - a);} else {var s = e,c = t.values,u = s.indexOf(c[0]),l = s.indexOf(c[c.length - 1]);i = u / (s.length - 1), r = l / (s.length - 1);}return [i, r];}, _getLimitRange: function _getLimitRange(t, e) {var n,a = e.field,o = e.type,s = r.Array.values(t, a);return "linear" === o ? (n = r.Array.getRange(s), e.min < n.min && (n.min = e.min), e.max > n.max && (n.max = e.max)) : "timeCat" === o ? (r.each(s, function (t, e) {s[e] = i.toTimeStamp(t);}), s.sort(function (t, e) {return t - e;}), n = s) : n = s, n;} };}, function (t, e, n) {var i = n(0),r = n(110);t.exports = { beforeGeomInit: function beforeGeomInit(t) {t.set("limitInPlot", !0);var e = t.get("data"),n = t.get("colDefs");if (!n) return e;var a = t.get("geoms"),o = !1;i.each(a, function (t) {if (-1 !== ["area", "line", "path"].indexOf(t.get("type"))) return o = !0, !1;});var s = [];if (i.each(n, function (t, e) {!o && t && (t.values || t.min || t.max) && s.push(e);}), 0 === s.length) return e;var c = [];i.each(e, function (t) {var e = !0;i.each(s, function (a) {var o = t[a];if (o) {var s = n[a];if ("timeCat" === s.type) {var c = s.values;i.isNumber(c[0]) && (o = r.toTimeStamp(o));}(s.values && -1 === s.values.indexOf(o) || s.min && o < s.min || s.max && o > s.max) && (e = !1);}}), e && c.push(t);}), t.set("filteredData", c);} };},,, function (t, e, n) {var i = n(46);n(115), n(100), n(109), n(124), n(125), n(150);var r = n(135),a = n(137),o = n(138),s = n(139),c = n(153);i.Animate = n(113), i.Chart.plugins.register([r, o, a, s, c]), n(154), i.Interaction = n(45), t.exports = i;}, function (t, e, n) {t.exports = { Text: n(133), Line: n(131), Arc: n(129), Rect: n(132), Html: n(130), Tag: n(134), Point: n(151), RegionFilter: n(152) };}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(9),o = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {this.type = "point", this.position = null, this.offsetX = 0, this.offsetY = 0, this.style = { fill: "#1890FF", r: 3, lineWidth: 1, stroke: "#fff" };}, n.render = function (t, e) {var n = this.parsePoint(t, this.position),i = e.addShape("Circle", { className: "guide-point", attrs: r.mix({ x: n.x + this.offsetX, y: n.y + this.offsetY }, this.style) });return this.element = i, i;}, e;}(a);a.Point = o, t.exports = o;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(9),o = n(2).Rect,s = function (t) {function e() {return t.apply(this, arguments) || this;}i(e, t);var n = e.prototype;return n._initDefaultCfg = function () {this.type = "regionFilter", this.start = [], this.end = [], this.color = null, this.style = null;}, n.render = function (t) {var e = this.parsePoint(t, this.start),n = this.parsePoint(t, this.end);if (e && n) {var i = new o({ attrs: { x: Math.min(e.x, n.x), y: Math.min(e.y, n.y), width: Math.abs(n.x - e.x), height: Math.abs(n.y - e.y) } });this.clip = i;var a = this.chart,s = this.color,c = this.style || {},u = [];a.get("geoms").map(function (t) {var e = t.get("container"),n = e.get("children"),a = e.addGroup({ zIndex: 10, className: "guide-region-filter" });return n.map(function (t) {if (t.get("isShape")) {var e = t.get("type"),n = r.mix({}, t.get("attrs"), c);s && (n.fill || n.fillStyle) && (n.fill = n.fillStyle = s), s && (n.stroke || n.strokeStyle) && (n.stroke = n.strokeStyle = s);var i = { attrs: n };"custom" !== e && "Custom" !== e || (i.createPath = t.get("createPath"), i.calculateBox = t.get("calculateBox")), a.addShape(e, i);}return t;}), a.attr("clip", i), e.sort(), u.push(a), t;}), this.element = u;}}, n.remove = function () {var t = this.element;r.each(t, function (t) {t && t.remove(!0);}), this.clip && this.clip.remove(!0);}, e;}(a);a.RegionFilter = s, t.exports = s;}, function (t, e, n) {var i = n(145),r = n(0),a = { mode: "x", xStyle: { backgroundColor: "rgba(202, 215, 239, .2)", fillerColor: "rgba(202, 215, 239, .5)", size: 4, lineCap: "round", offsetX: 0, offsetY: 8 }, yStyle: { backgroundColor: "rgba(202, 215, 239, .2)", fillerColor: "rgba(202, 215, 239, .5)", size: 4, lineCap: "round", offsetX: 8, offsetY: 0 } };t.exports = { init: function init(t) {t.set("_limitRange", {}), t.scrollBar = function (t) {!0 === t ? t = a : r.isObject(t) && (t = r.deepMix({}, a, t)), this.set("_scrollBarCfg", t);};}, clear: function clear(t) {t.set("_limitRange", {});}, changeData: function changeData(t) {t.set("_limitRange", {});}, clearInner: function clearInner(t) {var e = t.get("_horizontalBar"),n = t.get("_verticalBar");e && e.remove(!0), n && n.remove(!0), t.set("_horizontalBar", null), t.set("_verticalBar", null);}, afterGeomDraw: function afterGeomDraw(t) {var e = t.get("_scrollBarCfg");if (e) {var n = t.get("data"),r = t.get("plotRange"),a = t.get("backPlot"),o = t.get("canvas").get("height"),s = t.get("_limitRange"),c = e.mode;if (i.directionEnabled(c, "x")) {var u = e.xStyle,l = u.offsetX,h = u.offsetY,f = u.lineCap,p = u.backgroundColor,g = u.fillerColor,d = u.size,v = t.getXScale(),y = s[v.field];y || (y = i._getLimitRange(n, v), s[v.field] = y);var m = i._getFieldRange(v, y, v.type),x = t.get("_horizontalBar"),_ = o - d / 2 + h;x ? x.get("children")[1].attr({ x1: Math.max(r.bl.x + r.width * m[0] + l, r.bl.x), x2: Math.min(r.bl.x + r.width * m[1] + l, r.br.x) }) : ((x = a.addGroup({ className: "horizontalBar" })).addShape("line", { attrs: { x1: r.bl.x + l, y1: _, x2: r.br.x + l, y2: _, lineWidth: d, stroke: p, lineCap: f } }), x.addShape("line", { attrs: { x1: Math.max(r.bl.x + r.width * m[0] + l, r.bl.x), y1: _, x2: Math.min(r.bl.x + r.width * m[1] + l, r.br.x), y2: _, lineWidth: d, stroke: g, lineCap: f } }), t.set("_horizontalBar", x));}if (i.directionEnabled(c, "y")) {var S = e.yStyle,b = S.offsetX,w = S.offsetY,P = S.lineCap,C = S.backgroundColor,M = S.fillerColor,A = S.size,T = t.getYScales()[0],O = s[T.field];O || (O = i._getLimitRange(n, T), s[T.field] = O);var D = i._getFieldRange(T, O, T.type),k = t.get("_verticalBar"),I = A / 2 + b;k ? k.get("children")[1].attr({ y1: Math.max(r.tl.y + r.height * D[0] + w, r.tl.y), y2: Math.min(r.tl.y + r.height * D[1] + w, r.bl.y) }) : ((k = a.addGroup({ className: "verticalBar" })).addShape("line", { attrs: { x1: I, y1: r.tl.y + w, x2: I, y2: r.bl.y + w, lineWidth: A, stroke: C, lineCap: P } }), k.addShape("line", { attrs: { x1: I, y1: Math.max(r.tl.y + r.height * D[0] + w, r.tl.y), x2: I, y2: Math.min(r.tl.y + r.height * D[1] + w, r.bl.y), lineWidth: A, stroke: M, lineCap: P } }), t.set("_verticalBar", k));}}} };}, function (t, e, n) {t.exports = { Interaction: n(45), PieSelect: n(156), IntervalSelect: n(157), Pan: n(158), Pinch: n(159) };}, function (t, e, n) {var i;!function (r, a, o, s) {"use strict";function c(t, e, n) {return setTimeout(p(t, n), e);}function u(t, e, n) {return !!Array.isArray(t) && (l(t, n[e], n), !0);}function l(t, e, n) {var i;if (t) if (t.forEach) t.forEach(e, n);else if (t.length !== s) for (i = 0; i < t.length;) {e.call(n, t[i], i, t), i++;} else for (i in t) {t.hasOwnProperty(i) && e.call(n, t[i], i, t);}}function h(t, e, n) {var i = "DEPRECATED METHOD: " + e + "\n" + n + " AT \n";return function () {var e = new Error("get-stack-trace"),n = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",a = r.console && (r.console.warn || r.console.log);return a && a.call(r.console, i, n), t.apply(this, arguments);};}function f(t, e, n) {var i,r = e.prototype;(i = t.prototype = Object.create(r)).constructor = t, i._super = r, n && gt(i, n);}function p(t, e) {return function () {return t.apply(e, arguments);};}function g(t, e) {return typeof t == yt ? t.apply(e ? e[0] || s : s, e) : t;}function d(t, e) {return t === s ? e : t;}function v(t, e, n) {l(_(e), function (e) {t.addEventListener(e, n, !1);});}function y(t, e, n) {l(_(e), function (e) {t.removeEventListener(e, n, !1);});}function m(t, e) {for (; t;) {if (t == e) return !0;t = t.parentNode;}return !1;}function x(t, e) {return t.indexOf(e) > -1;}function _(t) {return t.trim().split(/\s+/g);}function S(t, e, n) {if (t.indexOf && !n) return t.indexOf(e);for (var i = 0; i < t.length;) {if (n && t[i][n] == e || !n && t[i] === e) return i;i++;}return -1;}function b(t) {return Array.prototype.slice.call(t, 0);}function w(t, e, n) {for (var i = [], r = [], a = 0; a < t.length;) {var o = e ? t[a][e] : t[a];S(r, o) < 0 && i.push(t[a]), r[a] = o, a++;}return n && (i = e ? i.sort(function (t, n) {return t[e] > n[e];}) : i.sort()), i;}function P(t, e) {for (var n, i, r = e[0].toUpperCase() + e.slice(1), a = 0; a < dt.length;) {if (n = dt[a], (i = n ? n + r : e) in t) return i;a++;}return s;}function C() {return wt++;}function M(t) {var e = t.ownerDocument || t;return e.defaultView || e.parentWindow || r;}function A(t, e) {var n = this;this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function (e) {g(t.options.enable, [t]) && n.handler(e);}, this.init();}function T(t) {var e = t.options.inputClass;return new (e || (Mt ? L : At ? H : Ct ? q : X))(t, O);}function O(t, e, n) {var i = n.pointers.length,r = n.changedPointers.length,a = e & Ot && i - r == 0,o = e & (kt | It) && i - r == 0;n.isFirst = !!a, n.isFinal = !!o, a && (t.session = {}), n.eventType = e, D(t, n), t.emit("hammer.input", n), t.recognize(n), t.session.prevInput = n;}function D(t, e) {var n = t.session,i = e.pointers,r = i.length;n.firstInput || (n.firstInput = E(e)), r > 1 && !n.firstMultiple ? n.firstMultiple = E(e) : 1 === r && (n.firstMultiple = !1);var a = n.firstInput,o = n.firstMultiple,s = o ? o.center : a.center,c = e.center = F(i);e.timeStamp = _t(), e.deltaTime = e.timeStamp - a.timeStamp, e.angle = R(s, c), e.distance = B(s, c), k(n, e), e.offsetDirection = N(e.deltaX, e.deltaY);var u = Y(e.deltaTime, e.deltaX, e.deltaY);e.overallVelocityX = u.x, e.overallVelocityY = u.y, e.overallVelocity = xt(u.x) > xt(u.y) ? u.x : u.y, e.scale = o ? z(o.pointers, i) : 1, e.rotation = o ? j(o.pointers, i) : 0, e.maxPointers = n.prevInput ? e.pointers.length > n.prevInput.maxPointers ? e.pointers.length : n.prevInput.maxPointers : e.pointers.length, I(n, e);var l = t.element;m(e.srcEvent.target, l) && (l = e.srcEvent.target), e.target = l;}function k(t, e) {var n = e.center,i = t.offsetDelta || {},r = t.prevDelta || {},a = t.prevInput || {};e.eventType !== Ot && a.eventType !== kt || (r = t.prevDelta = { x: a.deltaX || 0, y: a.deltaY || 0 }, i = t.offsetDelta = { x: n.x, y: n.y }), e.deltaX = r.x + (n.x - i.x), e.deltaY = r.y + (n.y - i.y);}function I(t, e) {var n,i,r,a,o = t.lastInterval || e,c = e.timeStamp - o.timeStamp;if (e.eventType != It && (c > Tt || o.velocity === s)) {var u = e.deltaX - o.deltaX,l = e.deltaY - o.deltaY,h = Y(c, u, l);i = h.x, r = h.y, n = xt(h.x) > xt(h.y) ? h.x : h.y, a = N(u, l), t.lastInterval = e;} else n = o.velocity, i = o.velocityX, r = o.velocityY, a = o.direction;e.velocity = n, e.velocityX = i, e.velocityY = r, e.direction = a;}function E(t) {for (var e = [], n = 0; n < t.pointers.length;) {e[n] = { clientX: mt(t.pointers[n].clientX), clientY: mt(t.pointers[n].clientY) }, n++;}return { timeStamp: _t(), pointers: e, center: F(e), deltaX: t.deltaX, deltaY: t.deltaY };}function F(t) {var e = t.length;if (1 === e) return { x: mt(t[0].clientX), y: mt(t[0].clientY) };for (var n = 0, i = 0, r = 0; r < e;) {n += t[r].clientX, i += t[r].clientY, r++;}return { x: mt(n / e), y: mt(i / e) };}function Y(t, e, n) {return { x: e / t || 0, y: n / t || 0 };}function N(t, e) {return t === e ? Et : xt(t) >= xt(e) ? t < 0 ? Ft : Yt : e < 0 ? Nt : Bt;}function B(t, e, n) {n || (n = Xt);var i = e[n[0]] - t[n[0]],r = e[n[1]] - t[n[1]];return Math.sqrt(i * i + r * r);}function R(t, e, n) {n || (n = Xt);var i = e[n[0]] - t[n[0]],r = e[n[1]] - t[n[1]];return 180 * Math.atan2(r, i) / Math.PI;}function j(t, e) {return R(e[1], e[0], Lt) + R(t[1], t[0], Lt);}function z(t, e) {return B(e[0], e[1], Lt) / B(t[0], t[1], Lt);}function X() {this.evEl = Gt, this.evWin = Ht, this.pressed = !1, A.apply(this, arguments);}function L() {this.evEl = Ut, this.evWin = Zt, A.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];}function W() {this.evTarget = $t, this.evWin = Kt, this.started = !1, A.apply(this, arguments);}function G(t, e) {var n = b(t.touches),i = b(t.changedTouches);return e & (kt | It) && (n = w(n.concat(i), "identifier", !0)), [n, i];}function H() {this.evTarget = te, this.targetIds = {}, A.apply(this, arguments);}function V(t, e) {var n = b(t.touches),i = this.targetIds;if (e & (Ot | Dt) && 1 === n.length) return i[n[0].identifier] = !0, [n, n];var r,a,o = b(t.changedTouches),s = [],c = this.target;if (a = n.filter(function (t) {return m(t.target, c);}), e === Ot) for (r = 0; r < a.length;) {i[a[r].identifier] = !0, r++;}for (r = 0; r < o.length;) {i[o[r].identifier] && s.push(o[r]), e & (kt | It) && delete i[o[r].identifier], r++;}return s.length ? [w(a.concat(s), "identifier", !0), s] : void 0;}function q() {A.apply(this, arguments);var t = p(this.handler, this);this.touch = new H(this.manager, t), this.mouse = new X(this.manager, t), this.primaryTouch = null, this.lastTouches = [];}function U(t, e) {t & Ot ? (this.primaryTouch = e.changedPointers[0].identifier, Z.call(this, e)) : t & (kt | It) && Z.call(this, e);}function Z(t) {var e = t.changedPointers[0];if (e.identifier === this.primaryTouch) {var n = { x: e.clientX, y: e.clientY };this.lastTouches.push(n);var i = this.lastTouches;setTimeout(function () {var t = i.indexOf(n);t > -1 && i.splice(t, 1);}, ee);}}function J(t) {for (var e = t.srcEvent.clientX, n = t.srcEvent.clientY, i = 0; i < this.lastTouches.length; i++) {var r = this.lastTouches[i],a = Math.abs(e - r.x),o = Math.abs(n - r.y);if (a <= ne && o <= ne) return !0;}return !1;}function $(t, e) {this.manager = t, this.set(e);}function K(t) {if (x(t, se)) return se;var e = x(t, ce),n = x(t, ue);return e && n ? se : e || n ? e ? ce : ue : x(t, oe) ? oe : ae;}function Q(t) {this.options = gt({}, this.defaults, t || {}), this.id = C(), this.manager = null, this.options.enable = d(this.options.enable, !0), this.state = he, this.simultaneous = {}, this.requireFail = [];}function tt(t) {return t & ve ? "cancel" : t & ge ? "end" : t & pe ? "move" : t & fe ? "start" : "";}function et(t) {return t == Bt ? "down" : t == Nt ? "up" : t == Ft ? "left" : t == Yt ? "right" : "";}function nt(t, e) {var n = e.manager;return n ? n.get(t) : t;}function it() {Q.apply(this, arguments);}function rt() {it.apply(this, arguments), this.pX = null, this.pY = null;}function at() {it.apply(this, arguments);}function ot() {Q.apply(this, arguments), this._timer = null, this._input = null;}function st() {it.apply(this, arguments);}function ct() {it.apply(this, arguments);}function ut() {Q.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;}function lt(t, e) {return e = e || {}, e.recognizers = d(e.recognizers, lt.defaults.preset), new ht(t, e);}function ht(t, e) {this.options = gt({}, lt.defaults, e || {}), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = t, this.input = T(this), this.touchAction = new $(this, this.options.touchAction), ft(this, !0), l(this.options.recognizers, function (t) {var e = this.add(new t[0](t[1]));t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3]);}, this);}function ft(t, e) {var n = t.element;if (n.style) {var i;l(t.options.cssProps, function (r, a) {i = P(n.style, a), e ? (t.oldCssProps[i] = n.style[i], n.style[i] = r) : n.style[i] = t.oldCssProps[i] || "";}), e || (t.oldCssProps = {});}}function pt(t, e) {var n = a.createEvent("Event");n.initEvent(t, !0, !0), n.gesture = e, e.target.dispatchEvent(n);}var gt,dt = ["", "webkit", "Moz", "MS", "ms", "o"],vt = a.createElement("div"),yt = "function",mt = Math.round,xt = Math.abs,_t = Date.now;gt = "function" != typeof Object.assign ? function (t) {if (t === s || null === t) throw new TypeError("Cannot convert undefined or null to object");for (var e = Object(t), n = 1; n < arguments.length; n++) {var i = arguments[n];if (i !== s && null !== i) for (var r in i) {i.hasOwnProperty(r) && (e[r] = i[r]);}}return e;} : Object.assign;var St = h(function (t, e, n) {for (var i = Object.keys(e), r = 0; r < i.length;) {(!n || n && t[i[r]] === s) && (t[i[r]] = e[i[r]]), r++;}return t;}, "extend", "Use `assign`."),bt = h(function (t, e) {return St(t, e, !0);}, "merge", "Use `assign`."),wt = 1,Pt = /mobile|tablet|ip(ad|hone|od)|android/i,Ct = ("ontouchstart" in r),Mt = P(r, "PointerEvent") !== s,At = Ct && Pt.test(navigator.userAgent),Tt = 25,Ot = 1,Dt = 2,kt = 4,It = 8,Et = 1,Ft = 2,Yt = 4,Nt = 8,Bt = 16,Rt = Ft | Yt,jt = Nt | Bt,zt = Rt | jt,Xt = ["x", "y"],Lt = ["clientX", "clientY"];A.prototype = { handler: function handler() {}, init: function init() {this.evEl && v(this.element, this.evEl, this.domHandler), this.evTarget && v(this.target, this.evTarget, this.domHandler), this.evWin && v(M(this.element), this.evWin, this.domHandler);}, destroy: function destroy() {this.evEl && y(this.element, this.evEl, this.domHandler), this.evTarget && y(this.target, this.evTarget, this.domHandler), this.evWin && y(M(this.element), this.evWin, this.domHandler);} };var Wt = { mousedown: Ot, mousemove: Dt, mouseup: kt },Gt = "mousedown",Ht = "mousemove mouseup";f(X, A, { handler: function handler(t) {var e = Wt[t.type];e & Ot && 0 === t.button && (this.pressed = !0), e & Dt && 1 !== t.which && (e = kt), this.pressed && (e & kt && (this.pressed = !1), this.callback(this.manager, e, { pointers: [t], changedPointers: [t], pointerType: "mouse", srcEvent: t }));} });var Vt = { pointerdown: Ot, pointermove: Dt, pointerup: kt, pointercancel: It, pointerout: It },qt = { 2: "touch", 3: "pen", 4: "mouse", 5: "kinect" },Ut = "pointerdown",Zt = "pointermove pointerup pointercancel";r.MSPointerEvent && !r.PointerEvent && (Ut = "MSPointerDown", Zt = "MSPointerMove MSPointerUp MSPointerCancel"), f(L, A, { handler: function handler(t) {var e = this.store,n = !1,i = t.type.toLowerCase().replace("ms", ""),r = Vt[i],a = qt[t.pointerType] || t.pointerType,o = "touch" == a,s = S(e, t.pointerId, "pointerId");r & Ot && (0 === t.button || o) ? s < 0 && (e.push(t), s = e.length - 1) : r & (kt | It) && (n = !0), s < 0 || (e[s] = t, this.callback(this.manager, r, { pointers: e, changedPointers: [t], pointerType: a, srcEvent: t }), n && e.splice(s, 1));} });var Jt = { touchstart: Ot, touchmove: Dt, touchend: kt, touchcancel: It },$t = "touchstart",Kt = "touchstart touchmove touchend touchcancel";f(W, A, { handler: function handler(t) {var e = Jt[t.type];if (e === Ot && (this.started = !0), this.started) {var n = G.call(this, t, e);e & (kt | It) && n[0].length - n[1].length == 0 && (this.started = !1), this.callback(this.manager, e, { pointers: n[0], changedPointers: n[1], pointerType: "touch", srcEvent: t });}} });var Qt = { touchstart: Ot, touchmove: Dt, touchend: kt, touchcancel: It },te = "touchstart touchmove touchend touchcancel";f(H, A, { handler: function handler(t) {var e = Qt[t.type],n = V.call(this, t, e);n && this.callback(this.manager, e, { pointers: n[0], changedPointers: n[1], pointerType: "touch", srcEvent: t });} });var ee = 2500,ne = 25;f(q, A, { handler: function handler(t, e, n) {var i = "touch" == n.pointerType,r = "mouse" == n.pointerType;if (!(r && n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents)) {if (i) U.call(this, e, n);else if (r && J.call(this, n)) return;this.callback(t, e, n);}}, destroy: function destroy() {this.touch.destroy(), this.mouse.destroy();} });var ie = P(vt.style, "touchAction"),re = ie !== s,ae = "auto",oe = "manipulation",se = "none",ce = "pan-x",ue = "pan-y",le = function () {if (!re) return !1;var t = {},e = r.CSS && r.CSS.supports;return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (n) {t[n] = !e || r.CSS.supports("touch-action", n);}), t;}();$.prototype = { set: function set(t) {"compute" == t && (t = this.compute()), re && this.manager.element.style && le[t] && (this.manager.element.style[ie] = t), this.actions = t.toLowerCase().trim();}, update: function update() {this.set(this.manager.options.touchAction);}, compute: function compute() {var t = [];return l(this.manager.recognizers, function (e) {g(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()));}), K(t.join(" "));}, preventDefaults: function preventDefaults(t) {var e = t.srcEvent,n = t.offsetDirection;if (this.manager.session.prevented) e.preventDefault();else {var i = this.actions,r = x(i, se) && !le[se],a = x(i, ue) && !le[ue],o = x(i, ce) && !le[ce];if (r) {var s = 1 === t.pointers.length,c = t.distance < 2,u = t.deltaTime < 250;if (s && c && u) return;}if (!o || !a) return r || a && n & Rt || o && n & jt ? this.preventSrc(e) : void 0;}}, preventSrc: function preventSrc(t) {this.manager.session.prevented = !0, t.preventDefault();} };var he = 1,fe = 2,pe = 4,ge = 8,de = ge,ve = 16;Q.prototype = { defaults: {}, set: function set(t) {return gt(this.options, t), this.manager && this.manager.touchAction.update(), this;}, recognizeWith: function recognizeWith(t) {if (u(t, "recognizeWith", this)) return this;var e = this.simultaneous;return t = nt(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this;}, dropRecognizeWith: function dropRecognizeWith(t) {return u(t, "dropRecognizeWith", this) ? this : (t = nt(t, this), delete this.simultaneous[t.id], this);}, requireFailure: function requireFailure(t) {if (u(t, "requireFailure", this)) return this;var e = this.requireFail;return t = nt(t, this), -1 === S(e, t) && (e.push(t), t.requireFailure(this)), this;}, dropRequireFailure: function dropRequireFailure(t) {if (u(t, "dropRequireFailure", this)) return this;t = nt(t, this);var e = S(this.requireFail, t);return e > -1 && this.requireFail.splice(e, 1), this;}, hasRequireFailures: function hasRequireFailures() {return this.requireFail.length > 0;}, canRecognizeWith: function canRecognizeWith(t) {return !!this.simultaneous[t.id];}, emit: function emit(t) {function e(e) {n.manager.emit(e, t);}var n = this,i = this.state;i < ge && e(n.options.event + tt(i)), e(n.options.event), t.additionalEvent && e(t.additionalEvent), i >= ge && e(n.options.event + tt(i));}, tryEmit: function tryEmit(t) {if (this.canEmit()) return this.emit(t);this.state = 32;}, canEmit: function canEmit() {for (var t = 0; t < this.requireFail.length;) {if (!(this.requireFail[t].state & (32 | he))) return !1;t++;}return !0;}, recognize: function recognize(t) {var e = gt({}, t);if (!g(this.options.enable, [this, e])) return this.reset(), void (this.state = 32);this.state & (de | ve | 32) && (this.state = he), this.state = this.process(e), this.state & (fe | pe | ge | ve) && this.tryEmit(e);}, process: function process(t) {}, getTouchAction: function getTouchAction() {}, reset: function reset() {} }, f(it, Q, { defaults: { pointers: 1 }, attrTest: function attrTest(t) {var e = this.options.pointers;return 0 === e || t.pointers.length === e;}, process: function process(t) {var e = this.state,n = t.eventType,i = e & (fe | pe),r = this.attrTest(t);return i && (n & It || !r) ? e | ve : i || r ? n & kt ? e | ge : e & fe ? e | pe : fe : 32;} }), f(rt, it, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: zt }, getTouchAction: function getTouchAction() {var t = this.options.direction,e = [];return t & Rt && e.push(ue), t & jt && e.push(ce), e;}, directionTest: function directionTest(t) {var e = this.options,n = !0,i = t.distance,r = t.direction,a = t.deltaX,o = t.deltaY;return r & e.direction || (e.direction & Rt ? (r = 0 === a ? Et : a < 0 ? Ft : Yt, n = a != this.pX, i = Math.abs(t.deltaX)) : (r = 0 === o ? Et : o < 0 ? Nt : Bt, n = o != this.pY, i = Math.abs(t.deltaY))), t.direction = r, n && i > e.threshold && r & e.direction;}, attrTest: function attrTest(t) {return it.prototype.attrTest.call(this, t) && (this.state & fe || !(this.state & fe) && this.directionTest(t));}, emit: function emit(t) {this.pX = t.deltaX, this.pY = t.deltaY;var e = et(t.direction);e && (t.additionalEvent = this.options.event + e), this._super.emit.call(this, t);} }), f(at, it, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {return [se];}, attrTest: function attrTest(t) {return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & fe);}, emit: function emit(t) {if (1 !== t.scale) {var e = t.scale < 1 ? "in" : "out";t.additionalEvent = this.options.event + e;}this._super.emit.call(this, t);} }), f(ot, Q, { defaults: { event: "press", pointers: 1, time: 251, threshold: 9 }, getTouchAction: function getTouchAction() {return [ae];}, process: function process(t) {var e = this.options,n = t.pointers.length === e.pointers,i = t.distance < e.threshold,r = t.deltaTime > e.time;if (this._input = t, !i || !n || t.eventType & (kt | It) && !r) this.reset();else if (t.eventType & Ot) this.reset(), this._timer = c(function () {this.state = de, this.tryEmit();}, e.time, this);else if (t.eventType & kt) return de;return 32;}, reset: function reset() {clearTimeout(this._timer);}, emit: function emit(t) {this.state === de && (t && t.eventType & kt ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = _t(), this.manager.emit(this.options.event, this._input)));} }), f(st, it, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {return [se];}, attrTest: function attrTest(t) {return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & fe);} }), f(ct, it, { defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Rt | jt, pointers: 1 }, getTouchAction: function getTouchAction() {return rt.prototype.getTouchAction.call(this);}, attrTest: function attrTest(t) {var e,n = this.options.direction;return n & (Rt | jt) ? e = t.overallVelocity : n & Rt ? e = t.overallVelocityX : n & jt && (e = t.overallVelocityY), this._super.attrTest.call(this, t) && n & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && xt(e) > this.options.velocity && t.eventType & kt;}, emit: function emit(t) {var e = et(t.offsetDirection);e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t);} }), f(ut, Q, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 }, getTouchAction: function getTouchAction() {return [oe];}, process: function process(t) {var e = this.options,n = t.pointers.length === e.pointers,i = t.distance < e.threshold,r = t.deltaTime < e.time;if (this.reset(), t.eventType & Ot && 0 === this.count) return this.failTimeout();if (i && r && n) {if (t.eventType != kt) return this.failTimeout();var a = !this.pTime || t.timeStamp - this.pTime < e.interval,o = !this.pCenter || B(this.pCenter, t.center) < e.posThreshold;if (this.pTime = t.timeStamp, this.pCenter = t.center, o && a ? this.count += 1 : this.count = 1, this._input = t, 0 === this.count % e.taps) return this.hasRequireFailures() ? (this._timer = c(function () {this.state = de, this.tryEmit();}, e.interval, this), fe) : de;}return 32;}, failTimeout: function failTimeout() {return this._timer = c(function () {this.state = 32;}, this.options.interval, this), 32;}, reset: function reset() {clearTimeout(this._timer);}, emit: function emit() {this.state == de && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));} }), lt.VERSION = "2.0.7", lt.defaults = { domEvents: !1, touchAction: "compute", enable: !0, inputTarget: null, inputClass: null, preset: [[st, { enable: !1 }], [at, { enable: !1 }, ["rotate"]], [ct, { direction: Rt }], [rt, { direction: Rt }, ["swipe"]], [ut], [ut, { event: "doubletap", taps: 2 }, ["tap"]], [ot]], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };ht.prototype = { set: function set(t) {return gt(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this;}, stop: function stop(t) {this.session.stopped = t ? 2 : 1;}, recognize: function recognize(t) {var e = this.session;if (!e.stopped) {this.touchAction.preventDefaults(t);var n,i = this.recognizers,r = e.curRecognizer;(!r || r && r.state & de) && (r = e.curRecognizer = null);for (var a = 0; a < i.length;) {n = i[a], 2 === e.stopped || r && n != r && !n.canRecognizeWith(r) ? n.reset() : n.recognize(t), !r && n.state & (fe | pe | ge) && (r = e.curRecognizer = n), a++;}}}, get: function get(t) {if (t instanceof Q) return t;for (var e = this.recognizers, n = 0; n < e.length; n++) {if (e[n].options.event == t) return e[n];}return null;}, add: function add(t) {if (u(t, "add", this)) return this;var e = this.get(t.options.event);return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t;}, remove: function remove(t) {if (u(t, "remove", this)) return this;if (t = this.get(t)) {var e = this.recognizers,n = S(e, t);-1 !== n && (e.splice(n, 1), this.touchAction.update());}return this;}, on: function on(t, e) {if (t !== s && e !== s) {var n = this.handlers;return l(_(t), function (t) {n[t] = n[t] || [], n[t].push(e);}), this;}}, off: function off(t, e) {if (t !== s) {var n = this.handlers;return l(_(t), function (t) {e ? n[t] && n[t].splice(S(n[t], e), 1) : delete n[t];}), this;}}, emit: function emit(t, e) {this.options.domEvents && pt(t, e);var n = this.handlers[t] && this.handlers[t].slice();if (n && n.length) {e.type = t, e.preventDefault = function () {e.srcEvent.preventDefault();};for (var i = 0; i < n.length;) {n[i](e), i++;}}}, destroy: function destroy() {this.element && ft(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;} }, gt(lt, { INPUT_START: Ot, INPUT_MOVE: Dt, INPUT_END: kt, INPUT_CANCEL: It, STATE_POSSIBLE: he, STATE_BEGAN: fe, STATE_CHANGED: pe, STATE_ENDED: ge, STATE_RECOGNIZED: de, STATE_CANCELLED: ve, STATE_FAILED: 32, DIRECTION_NONE: Et, DIRECTION_LEFT: Ft, DIRECTION_RIGHT: Yt, DIRECTION_UP: Nt, DIRECTION_DOWN: Bt, DIRECTION_HORIZONTAL: Rt, DIRECTION_VERTICAL: jt, DIRECTION_ALL: zt, Manager: ht, Input: A, TouchAction: $, TouchInput: H, MouseInput: X, PointerEventInput: L, TouchMouseInput: q, SingleTouchInput: W, Recognizer: Q, AttrRecognizer: it, Tap: ut, Pan: rt, Swipe: ct, Pinch: at, Rotate: st, Press: ot, on: v, off: y, each: l, merge: bt, extend: St, assign: gt, inherit: f, bindFn: p, prefixed: P }), (void 0 !== r ? r : "undefined" != typeof self ? self : {}).Hammer = lt, (i = function () {return lt;}.call(e, n, e, t)) !== s && (t.exports = i);}(window, document);}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}function r(t) {if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}var a = n(0),o = n(45),s = n(15),c = function (t) {function e(e, n) {var i,o = r(r(i = t.call(this, e, n) || this));n.registerPlugins({ clearInner: function clearInner() {o.halo && o.halo.remove(!0), o.selected = !1, o.selectedShape = null, o.lastShape = null, o.halo = null, o.defaultSelected = null;} });var s = o.defaultSelected;if (a.isObject(s)) {var c = o._getSelectedShapeByData(s);c && o._selectedShape(c), i.canvas.draw();}return i;}i(e, t);var n = e.prototype;return n.getDefaultCfg = function () {var e = t.prototype.getDefaultCfg.call(this);return e = a.mix({}, e, { startEvent: "tap", processEvent: null, animate: !1, offset: 1, appendRadius: 8, style: { fillOpacity: .5 }, cancelable: !0, defaultSelected: null }), (a.isWx || a.isMy) && (e.startEvent = "touchstart", e.endEvent = "touchend"), e;}, n._getSelectedShapeByData = function (t) {var e = null,n = this.chart.get("geoms")[0],i = n.get("container").get("children");return a.each(i, function (i) {if (i.get("isShape") && i.get("className") === n.get("type")) {var r = i.get("origin")._origin;if (a.isObjectValueEqual(r, t)) return e = i, !1;}}), e;}, n._selectedShape = function (t) {var e = this.offset,n = this.style,i = this.appendRadius,r = this.chart;this.lastShape = t;var o = t._attrs.attrs,s = o.x,c = o.y,u = o.startAngle,l = o.endAngle,h = o.r,f = o.fill,p = r.get("frontPlot").addShape("sector", { attrs: a.mix({ x: s, y: c, r: h + e + i, r0: h + e, fill: f, startAngle: u, endAngle: l }, n) });this.halo = p;var g = this.animate;g && (!0 === g && (g = { duration: 300 }), p.attr("r", h + e), p.animate().to(a.mix({ attrs: { r: h + e + i } }, g)));}, n.start = function (t) {var e = this.chart;"tap" === t.type && (t.clientX = t.center.x, t.clientY = t.center.y);var n = a.createEvent(t, e),i = n.x,r = n.y;this.halo && this.halo.remove(!0);var o = e.getSnapRecords({ x: i, y: r });if (!o.length) return this.selected = !1, void (this.selectedShape = null);var s = o[0]._origin,c = this._getSelectedShapeByData(s),u = this.lastShape;if (this.selectedShape = c, this.selected = !0, c === u) {if (!this.cancelable) return;this.halo && this.halo.remove(!0), this.lastShape = null, this.selected = !1;} else this._selectedShape(c);this.canvas.draw();}, n.end = function (t) {var e = this.selectedShape;e && !e.get("destroyed") && (t.data = e.get("origin")._origin, t.shapeInfo = e.get("origin"), t.shape = e, t.selected = !!this.selected);}, e;}(o);s.registerInteraction("pie-select", c), t.exports = c;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}var r = n(0),a = n(26),o = n(45),s = n(15),c = function (t) {function e(e, n) {var i,a = (i = t.call(this, e, n) || this).defaultSelected;if (r.isObject(a)) {var o = i._selectShapesByData(a),s = o.selectedShape,c = o.unSelectedShapes;s && i._selectShapes(s, c), i.selectedShape = s;}return i;}i(e, t);var n = e.prototype;return n.getDefaultCfg = function () {var e = t.prototype.getDefaultCfg.call(this);return e = r.mix({}, e, { startEvent: "tap", processEvent: null, selectAxis: !0, selectAxisStyle: { fontWeight: "bold" }, mode: "shape", selectStyle: { fillOpacity: 1 }, unSelectStyle: { fillOpacity: .4 }, cancelable: !0, defaultSelected: null }), (r.isWx || r.isMy) && (e.startEvent = "touchstart", e.endEvent = "touchend"), e;}, n._resetShape = function (t) {var e = t.get("_originAttrs");e && (t._attrs.attrs = e, t.set("_originAttrs", null));}, n._setEventData = function (t) {var e = this.selectedShape;e && !e.get("destroyed") && (t.data = e.get("origin")._origin, t.shapeInfo = e.get("origin"), t.shape = e, t.selected = !!e.get("_selected"));}, n._selectShapesByData = function (t) {var e = this.chart.get("geoms")[0],n = e.get("container").get("children"),i = null,a = [];return r.each(n, function (n) {if (n.get("isShape") && n.get("className") === e.get("type")) {var o = n.get("origin")._origin;r.isObjectValueEqual(o, t) ? i = n : a.push(n);}}), { selectedShape: i, unSelectedShapes: a };}, n._selectShapes = function (t, e) {var n = this.selectStyle,i = this.unSelectStyle,a = this.selectAxisStyle,o = this.chart;if (!t.get("_originAttrs")) {var s = Object.assign({}, t.attr());t.set("_originAttrs", s);}if (t.attr(n), r.each(e, function (t) {if (t.get("_originAttrs")) t.attr(t.get("_originAttrs"));else {var e = Object.assign({}, t.attr());t.set("_originAttrs", e);}t.set("_selected", !1), i && t.attr(i);}), t.set("_selected", !0), this.selectAxis) {this.selectedAxisShape && this._resetShape(this.selectedAxisShape);var c,u = o.get("geoms")[0].getXScale(),l = t.get("origin")._origin,h = o.get("axisController"),f = h.frontPlot,p = h.backPlot;r.each(f.get("children").concat(p.get("children")), function (t) {if (t.get("value") === u.scale(l[u.field])) return c = t, !1;}), this.selectedAxisShape = c, c.set("_originAttrs", Object.assign({}, c.attr())), c.attr(a);}this.canvas.draw();}, n.reset = function () {var t = this;if (t.selectedShape) {var e = t.chart.get("geoms")[0].get("container").get("children");r.each(e, function (e) {t._resetShape(e), e.set("_selected", !1);}), t.selectedAxisShape && t._resetShape(t.selectedAxisShape), t.canvas.draw(), t.selectedShape = null, t.selectedAxisShape = null;}}, n.start = function (t) {var e = this.chart;"tap" === t.type && (t.clientX = t.center.x, t.clientY = t.center.y);var n,i = r.createEvent(t, e),o = i.x,s = i.y,c = this.mode,u = e.get("geoms")[0].get("container").get("children"),l = [];if ("shape" === c) {var h = e.get("plotRange");if (!a.isPointInPlot({ x: o, y: s }, h)) return void this.reset();r.each(u, function (t) {var e = t.getBBox();o >= e.x && o <= e.x + e.width && s >= e.y && s <= e.height + e.y ? n = t : l.push(t);});} else if ("range" === c) {var f = e.getSnapRecords({ x: o, y: s });if (!f.length) return void this.reset();var p = f[0]._origin,g = this._selectShapesByData(p);n = g.selectedShape, l = g.unSelectedShapes;}if (n) {if (this.selectedShape = n, n.get("_selected")) {if (!this.cancelable) return void this._setEventData(t);this.reset();} else this._selectShapes(n, l);} else this.reset();this._setEventData(t);}, n.end = function (t) {this._setEventData(t);}, e;}(o);s.registerInteraction("interval-select", c), t.exports = c;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}function r(t) {if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}var a = n(0),o = n(145),s = n(45),c = n(15),u = n(146),l = ["touchstart", "touchmove", "touchend", "touchStart", "touchMove", "touchEnd"],h = function (t) {function e(e, n) {var i,o = r(r(i = t.call(this, e, n) || this)),s = o.hammer,c = o.panThreshold,l = o.pressThreshold,h = o.pressTime;s && s.get("pan").set({ threshold: c });var f = n.get("tooltipController");return f && f.enable && (n.tooltip(!1), s ? (s.get("press").set({ threshold: l, time: h }), s.on("press", a.wrapBehavior(r(r(i)), "_handlePress"))) : a.addEventListener(i.el, "press", a.wrapBehavior(r(r(i)), "_handlePress"))), n.registerPlugins([u, { changeData: function changeData() {o.limitRange = {};}, clear: function clear() {o.limitRange = {};} }]), i;}i(e, t);var n = e.prototype;return n.getDefaultCfg = function () {var e = t.prototype.getDefaultCfg.call(this);return e = a.mix({}, e, { startEvent: "panstart", processEvent: "panmove", endEvent: "panend", resetEvent: "touchend", mode: "x", panThreshold: 10, pressThreshold: 9, pressTime: 251, currentDeltaX: null, currentDeltaY: null, panning: !1, limitRange: {}, _timestamp: 0, lastPoint: null }), (a.isWx || a.isMy) && (e.startEvent = "touchstart", e.processEvent = "touchmove", e.endEvent = "touchend"), e;}, n.start = function (t) {this.pressed || (this.currentDeltaX = 0, this.currentDeltaY = 0, "touchstart" !== t.type && "touchStart" !== t.type || (this.lastPoint = t.touches[0]), this._handlePan(t));}, n.process = function (t) {this.pressed || this._handlePan(t);}, n.end = function () {this.pressed || (this.currentDeltaX = null, this.currentDeltaY = null, this.lastPoint = null);}, n.reset = function () {var t = this.chart;t.get("tooltipController") && (this.pressed = !1, t.hideTooltip(), t.tooltip(!1));}, n._handlePress = function (t) {this.pressed = !0;var e = t.center || t.touches[0];this.chart.tooltip(!0), this.chart.showTooltip(e);}, n._handlePan = function (t) {var e,n,i = this.currentDeltaX,r = this.currentDeltaY,o = this.lastPoint;if (-1 !== l.indexOf(t.type)) {var s = t.touches[0];e = s.x - o.x, n = s.y - o.y, this.lastPoint = s;} else null !== i && null !== r && (this.panning = !0, e = t.deltaX - i, n = t.deltaY - r, this.currentDeltaX = t.deltaX, this.currentDeltaY = t.deltaY);if (!a.isNil(e) || !a.isNil(n)) {var c = this._timestamp,u = +new Date();u - c > 16 && (this._doPan(e, n), this._timestamp = u);}}, n._doPan = function (t, e) {var n = this,i = n.mode,r = n.chart,s = n.limitRange,c = r.get("coord"),u = c.start,l = c.end,h = r.get("data");if (o.directionEnabled(i, "x") && 0 !== t) {var f = r.getXScale(),p = f.field;s[p] || (s[p] = o._getLimitRange(h, f));var g = l.x - u.x;f.isCategory ? n._panCatScale(f, t, g) : f.isLinear && n._panLinearScale(f, t, g, "x");var d = o.getColDef(r, p);this.xRange = o._getFieldRange(d, s[p], f.type);}if (o.directionEnabled(i, "y") && 0 !== e) {var v = u.y - l.y,y = r.getYScales();a.each(y, function (t) {var i = t.field;s[i] || (s[i] = o._getLimitRange(h, t)), t.isLinear && n._panLinearScale(t, e, v, "y");});var m = o.getColDef(r, y[0].field);this.yRange = o._getFieldRange(m, s[y[0].field], y[0].type);}r.repaint();}, n._panLinearScale = function (t, e, n, i) {var r = t.field,s = t.min,c = t.max,u = this.limitRange;if (s !== u[r].min || c !== u[r].max) {var l = this.chart,h = e / n * (c - s),f = "x" === i ? c - h : c + h,p = "x" === i ? s - h : s + h;u[r] && !a.isNil(u[r].min) && p <= u[r].min && (f = c - s + (p = u[r].min)), u[r] && !a.isNil(u[r].max) && f >= u[r].max && (p = (f = u[r].max) - (c - s));var g = o.getColDef(l, r);l.scale(r, a.mix({}, g, { min: p, max: f, nice: !1 }));}}, n._panCatScale = function (t, e, n) {var i = this.chart,r = t.type,s = t.field,c = t.values,u = t.ticks,l = o.getColDef(i, s),h = this.limitRange[s],f = e / n,p = c.length,g = Math.max(1, Math.abs(parseInt(f * p))),d = h.indexOf(c[0]),v = h.indexOf(c[p - 1]);if (e > 0 && d >= 0) {for (var y = 0; y < g && d > 0; y++) {d -= 1, v -= 1;}var m = h.slice(d, v + 1),x = null;if ("timeCat" === r) {for (var _ = u.length > 2 ? u[1] - u[0] : 864e5, S = u[0] - _; S >= m[0]; S -= _) {u.unshift(S);}x = u;}i.scale(s, a.mix({}, l, { values: m, ticks: x }));} else if (e < 0 && v <= h.length - 1) {for (var b = 0; b < g && v < h.length - 1; b++) {d += 1, v += 1;}var w = h.slice(d, v + 1),P = null;if ("timeCat" === r) {for (var C = u.length > 2 ? u[1] - u[0] : 864e5, M = u[u.length - 1] + C; M <= w[w.length - 1]; M += C) {u.push(M);}P = u;}i.scale(s, a.mix({}, l, { values: w, ticks: P }));}}, e;}(s);c.registerInteraction("pan", h), t.exports = h;}, function (t, e, n) {function i(t, e) {t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;}function r(t) {if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}var a = n(0),o = n(145),s = n(45),c = n(15),u = n(146),l = function (t) {function e(e, n) {var i,o = r(r(i = t.call(this, e, n) || this)),s = o.hammer,c = o.pressThreshold,l = o.pressTime;s.get("pinch").set({ enable: !0 }), n.registerPlugins([u, { changeData: function changeData() {o.limitRange = {}, o.originTicks = null;}, clear: function clear() {o.limitRange = {}, o.originTicks = null;} }]);var h = n.get("tooltipController");return h && h.enable && (n.tooltip(!1), s.get("press").set({ threshold: c, time: l }), s.on("press", a.wrapBehavior(r(r(i)), "_handlePress"))), i;}i(e, t);var n = e.prototype;return n.getDefaultCfg = function () {var e = t.prototype.getDefaultCfg.call(this);return a.mix({}, e, { startEvent: "pinchstart", processEvent: "pinch", endEvent: "pinchend", resetEvent: "touchend", pressThreshold: 9, pressTime: 251, mode: "x", currentPinchScaling: null, originValues: null, minScale: null, maxScale: null, _timestamp: 0, limitRange: {} });}, n.start = function () {this.pressed || (this.currentPinchScaling = 1);}, n.process = function (t) {this.pressed || this._handlePinch(t);}, n.end = function (t) {this.pressed || (this._handlePinch(t), this.currentPinchScaling = null);}, n.reset = function () {var t = this.chart;t.get("tooltipController") && (this.pressed = !1, t.hideTooltip(), t.tooltip(!1));}, n._handlePress = function (t) {this.pressed = !0;var e = t.center;this.chart.tooltip(!0), this.chart.showTooltip(e);}, n._handlePinch = function (t) {var e,n = 1 / this.currentPinchScaling * t.scale,i = t.target.getBoundingClientRect(),r = { x: t.center.x - i.left, y: t.center.y - i.top },a = Math.abs(t.pointers[0].clientX - t.pointers[1].clientX),o = Math.abs(t.pointers[0].clientY - t.pointers[1].clientY),s = a / o;e = s > .3 && s < 1.7 ? "xy" : a > o ? "x" : "y";var c = this._timestamp,u = +new Date();u - c > 16 && (this._doZoom(n, r, e), this._timestamp = u), this.currentPinchScaling = t.scale;}, n._doZoom = function (t, e, n) {var i,r = this,s = r.mode,c = r.chart,u = r.limitRange;i = "xy" === s && void 0 !== n ? n : "xy";var l = c.get("data");if (o.directionEnabled(s, "x") && o.directionEnabled(i, "x")) {var h = c.getXScale(),f = h.field;u[f] || (u[f] = o._getLimitRange(l, h)), h.isCategory ? r._zoomCatScale(h, t, e) : h.isLinear && r._zoomLinearScale(h, t, e, "x");var p = o.getColDef(c, f);this.xRange = o._getFieldRange(p, u[f], h.type);}if (o.directionEnabled(s, "y") && o.directionEnabled(i, "y")) {var g = c.getYScales();a.each(g, function (n) {var i = n.field;u[i] || (u[i] = o._getLimitRange(l, n)), n.isLinear && r._zoomLinearScale(n, t, e, "y");});var d = o.getColDef(c, g[0].field);this.yRange = o._getFieldRange(d, u[g[0].field], g[0].type);}c.repaint();}, n._zoomLinearScale = function (t, e, n, i) {if ("linear" === t.type) {var r = t.field,s = this.chart,c = t.min,u = t.max,l = u - c,h = this.limitRange,f = h[r].max - h[r].min,p = s.get("coord"),g = o.getColDef(s, r),d = l * (e - 1);if (this.minScale && e < 1) {var v = f / this.minScale;d = Math.max(l - v, d);}if (this.maxScale && e >= 1) {var y = f / this.maxScale;d = Math.min(l - y, d);}var m = p.invertPoint(n),x = "x" === i ? m.x : m.y,_ = u - d * (1 - x),S = c + d * x;s.scale(r, a.mix({}, g, { min: S, max: _, nice: !1 }));}}, n._zoomCatScale = function (t, e, n) {var i = t.field,r = t.values,s = this.chart,c = s.get("coord"),u = o.getColDef(s, i);this.originTicks || (this.originTicks = t.ticks);var l = this.originTicks,h = this.limitRange[i],f = h.length,p = f / (this.maxScale || 4),g = f / (this.minScale || 1),d = r.length,v = c.invertPoint(n).x,y = parseInt(d * Math.abs(e - 1)),m = parseInt(y * v),x = y - m;if (e >= 1 && d >= p) {var _ = r.slice(m, d - x);s.scale(i, a.mix({}, u, { values: _, ticks: l }));} else if (e < 1 && d <= g) {var S = h.indexOf(r[0]),b = h.indexOf(r[d - 1]),w = Math.max(0, S - m),P = Math.min(b + x, f),C = h.slice(w, P);s.scale(i, a.mix({}, u, { values: C, ticks: l }));}}, e;}(s);c.registerInteraction("pinch", l), t.exports = l;}]);});

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 31:
/*!*****************************************************!*\
  !*** D:/uniapp/uniapp-f2/f2-canvas/lib/renderer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _EventEmitterMin = _interopRequireDefault(__webpack_require__(/*! ./EventEmitter.min.js */ 32));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}

var CAPITALIZED_ATTRS_MAP = {
  fontSize: 'FontSize',
  opacity: 'GlobalAlpha',
  lineDash: 'LineDash',
  textAlign: 'TextAlign' };


/**
                             * wxapp textAlign align 可选值为 left|center|right
                             * 标准canvas textAlign align 可选值为 left|center|right|start|end
                             */
var TEXT_ALIGN_MAP = {
  'start': 'left',
  'end': 'right' };var


Renderer = /*#__PURE__*/function (_EventEmitter) {_inherits(Renderer, _EventEmitter);var _super = _createSuper(Renderer);
  function Renderer(wxCtx) {var _this;_classCallCheck(this, Renderer);
    _this = _super.call(this);
    var self = _assertThisInitialized(_this);
    self.ctx = wxCtx;
    self.style = {}; // just mock
    self._initContext(wxCtx);return _this;
  }_createClass(Renderer, [{ key: "getContext", value: function getContext(

    type) {
      if (type === '2d') {
        return this.ctx;
      }
    } }, { key: "_initContext", value: function _initContext(

    wxCtx) {
      Object.keys(CAPITALIZED_ATTRS_MAP).map(function (style) {
        Object.defineProperty(wxCtx, style, {
          set: function set(value) {
            if (style == "textAlign") {
              value = TEXT_ALIGN_MAP[value] ? TEXT_ALIGN_MAP[value] : value;
            }
            var name = 'set' + CAPITALIZED_ATTRS_MAP[style];
            wxCtx[name](value);
          } });

      });
    } }]);return Renderer;}(_EventEmitterMin.default);exports.default = Renderer;

/***/ }),

/***/ 32:
/*!*************************************************************!*\
  !*** D:/uniapp/uniapp-f2/f2-canvas/lib/EventEmitter.min.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter v5.2.4 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */
!function (e) {"use strict";function t() {}function n(e, t) {for (var n = e.length; n--;) {if (e[n].listener === t) return n;}return -1;}function r(e) {return function () {return this[e].apply(this, arguments);};}function i(e) {return "function" == typeof e || e instanceof RegExp || !(!e || "object" != typeof e) && i(e.listener);}var s = t.prototype,o = e.EventEmitter;s.getListeners = function (e) {var t,n,r = this._getEvents();if (e instanceof RegExp) {t = {};for (n in r) {r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n]);}} else t = r[e] || (r[e] = []);return t;}, s.flattenListeners = function (e) {var t,n = [];for (t = 0; t < e.length; t += 1) {n.push(e[t].listener);}return n;}, s.getListenersAsObject = function (e) {var t,n = this.getListeners(e);return n instanceof Array && (t = {}, t[e] = n), t || n;}, s.addListener = function (e, t) {if (!i(t)) throw new TypeError("listener must be a function");var r,s = this.getListenersAsObject(e),o = "object" == typeof t;for (r in s) {s.hasOwnProperty(r) && n(s[r], t) === -1 && s[r].push(o ? t : { listener: t, once: !1 });}return this;}, s.on = r("addListener"), s.addOnceListener = function (e, t) {return this.addListener(e, { listener: t, once: !0 });}, s.once = r("addOnceListener"), s.defineEvent = function (e) {return this.getListeners(e), this;}, s.defineEvents = function (e) {for (var t = 0; t < e.length; t += 1) {this.defineEvent(e[t]);}return this;}, s.removeListener = function (e, t) {var r,i,s = this.getListenersAsObject(e);for (i in s) {s.hasOwnProperty(i) && (r = n(s[i], t), r !== -1 && s[i].splice(r, 1));}return this;}, s.off = r("removeListener"), s.addListeners = function (e, t) {return this.manipulateListeners(!1, e, t);}, s.removeListeners = function (e, t) {return this.manipulateListeners(!0, e, t);}, s.manipulateListeners = function (e, t, n) {var r,i,s = e ? this.removeListener : this.addListener,o = e ? this.removeListeners : this.addListeners;if ("object" != typeof t || t instanceof RegExp) for (r = n.length; r--;) {s.call(this, t, n[r]);} else for (r in t) {t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i));}return this;}, s.removeEvent = function (e) {var t,n = typeof e,r = this._getEvents();if ("string" === n) delete r[e];else if (e instanceof RegExp) for (t in r) {r.hasOwnProperty(t) && e.test(t) && delete r[t];} else delete this._events;return this;}, s.removeAllListeners = r("removeEvent"), s.emitEvent = function (e, t) {var n,r,i,s,o,u = this.getListenersAsObject(e);for (s in u) {if (u.hasOwnProperty(s)) for (n = u[s].slice(0), i = 0; i < n.length; i++) {r = n[i], r.once === !0 && this.removeListener(e, r.listener), o = r.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, r.listener);}}return this;}, s.trigger = r("emitEvent"), s.emit = function (e) {var t = Array.prototype.slice.call(arguments, 1);return this.emitEvent(e, t);}, s.setOnceReturnValue = function (e) {return this._onceReturnValue = e, this;}, s._getOnceReturnValue = function () {return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue;}, s._getEvents = function () {return this._events || (this._events = {});}, t.noConflict = function () {return e.EventEmitter = o, t;},  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {return t;}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;}(this || {});

/***/ }),

/***/ 4:
/*!**************************************!*\
  !*** D:/uniapp/uniapp-f2/pages.json ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map