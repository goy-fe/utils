/*!
 * @goy/utils - GoyFE team's utils
 *
 * @version v0.0.1
 * @link https://github.com/goy-fe/utils
 * @license MIT
 * @copyright 2019 ntnyq <ntnyq13@gmail.com> (https://ntnyq.com)
 */

;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.GoyUtils = {})))
})(this, function (exports) {
  'use strict'

  /**
   * 检测是否为 IOS 环境
   * @param {string} [ua] 用户代理
   * @returns {boolean} 检测结果
   */
  function isIOS(ua) {
    if (ua === void 0) ua = navigator.userAgent

    return /iPad|iPhone|iPod/i.test(ua)
  }

  /**
   * 检测是否为微信环境
   * @param {string} [ua] 用户代理
   * @returns {boolean} 检测结果
   */
  function isWechat(ua) {
    if (ua === void 0) ua = navigator.userAgent

    return /micromessenger\/([\d.]+)/i.test(ua) || ua.includes('MicroMessenger')
  }

  /**
   * 检测是否为安卓环境
   * @param {string} [ua] 用户代理
   * @returns {boolean} 检测结果
   */
  function isAndroid(ua) {
    if (ua === void 0) ua = navigator.userAgent

    return /android/i.test(ua) || ua.includes('Adr')
  }

  /**
   * 检测是否为浏览器环境
   * @returns {boolean} 检测结果
   */
  function isBrowser() {
    return (
      typeof window === 'object' &&
      typeof document === 'object' &&
      document.nodeType === 9
    )
  }

  /**
   * 空函数
   */
  function noop() {}

  /**
   * @callback loopFnCallback
   * @param {number} idx 当前次数索引
   */

  /**
   * 循环执行方法
   * @param {number} length 循环次数
   * @param {loopFnCallback} cb 回调函数
   */
  function loopFn(length, cb) {
    Array.apply(null, { length: length }).map(function (_, idx) {
      typeof cb === 'function' && cb(idx)
    })
  }

  /**
   * 检测数字或字符串是否可转为安全数字
   * @param {number} number 检测的数字
   * @returns {boolean} 检测结果
   */
  function isSafeNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number)
  }

  /**
   * 数字格式化
   * @param {number} number 要格式化的数字
   * @param {object} [options] 格式化参数
   * @param {number} [options.decimals = 0] 小数位数
   * @param {string} [options.decimal = '.'] 整数与小数分隔符
   * @param {string} [options.separator = ','] 千分位分隔符
   * @param {string} [options.roundMethod = 'floor'] 取整方式
   * @returns {string} 格式化结果
   */
  function formatNumber(number, ref) {
    if (ref === void 0) ref = {}
    var decimals = ref.decimals
    if (decimals === void 0) decimals = 0
    var decimal = ref.decimal
    if (decimal === void 0) decimal = '.'
    var separator = ref.separator
    if (separator === void 0) separator = ','
    var roundMethod = ref.roundMethod
    if (roundMethod === void 0) roundMethod = 'floor'

    if (!isSafeNumber(number)) {
      return 0
    }

    number = Number(number)

    var toFixedFix = function (x, y) {
      var k = Math.pow(10, decimals)

      return '' + (Math[roundMethod](x * k) / k).toFixed(y)
    }
    var s = (decimals
      ? toFixedFix(number, decimals)
      : '' + Math[roundMethod](number)
    ).split(decimal)

    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separator)
    }

    if (typeof s[1] === 'string' && s[1].length < decimals) {
      s[1] = ('' + '0'.repeat(decimals) + s[1]).slice(-decimals)
    }

    return s.join(decimal)
  }

  /**
   * 格式化时间
   * @param {string} value 时间
   * @param {string} [fmt = 'yyyy-MM-dd hh:mm:ss'] 格式
   * @returns {string} 格式化后的时间字符串
   */
  function formatTime(value, fmt) {
    if (fmt === void 0) fmt = 'yyyy-MM-dd hh:mm:ss'

    var time = new Date(value)
    var obj = {
      'M+': time.getMonth() + 1,
      'd+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds(),
      'q+': ~~((time.getMonth() + 3) / 3),
      S: time.getMilliseconds(),
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (time.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }

    for (var k in obj) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? obj[k]
            : ('00' + obj[k]).substr(('' + obj[k]).length)
        )
      }
    }

    return fmt
  }

  var RE_EXTERNAL_URL = /^(https?:|mailto:|tel:|[a-zA-Z]{4,}:)/i

  /**
   * 检测URL是否为外部URL
   * @param {string} url 要检测的URL
   * @returns {boolean} 检测结果
   */
  function isExternalURL(url) {
    return RE_EXTERNAL_URL.test(url)
  }

  /**
   * 获取URL上的查询参数对象
   * @param {string} url 要格式化的URL
   * @returns {object} 格式化的参数对象，若无参数则为空对象
   */
  function getQueryParams(url) {
    if (url === void 0) url = ''

    var search = url.split('?')[1]

    if (!search) {
      return {}
    }

    var jsonData = decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')

    return JSON.parse('{"' + jsonData + '"}')
  }

  var VERSION = '0.0.1'

  exports.VERSION = VERSION
  exports.formatNumber = formatNumber
  exports.formatTime = formatTime
  exports.getQueryParams = getQueryParams
  exports.isAndroid = isAndroid
  exports.isBrowser = isBrowser
  exports.isExternalURL = isExternalURL
  exports.isIOS = isIOS
  exports.isSafeNumber = isSafeNumber
  exports.isWechat = isWechat
  exports.loopFn = loopFn
  exports.noop = noop

  Object.defineProperty(exports, '__esModule', { value: true })
})
