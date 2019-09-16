/*!
 * @goy/utils - GoyFE team's utils
 *
 * @version v0.0.1
 * @link https://github.com/goy-fe/utils
 * @license MIT
 * @copyright 2019 ntnyq <ntnyq13@gmail.com> (https://ntnyq.com)
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 检测是否为 IOS 环境
 * @param {string} [ua] 用户代理
 * @returns {boolean} 检测结果
 */
function isIOS (ua = navigator.userAgent) {
  return /iPad|iPhone|iPod/i.test(ua)
}

/**
 * 检测是否为微信环境
 * @param {string} [ua] 用户代理
 * @returns {boolean} 检测结果
 */
function isWechat (ua = navigator.userAgent) {
  return /micromessenger\/([\d.]+)/i.test(ua) || ua.includes('MicroMessenger')
}

/**
 * 检测是否为安卓环境
 * @param {string} [ua] 用户代理
 * @returns {boolean} 检测结果
 */
function isAndroid (ua = navigator.userAgent) {
  return /android/i.test(ua) || ua.includes('Adr')
}

/**
 * 检测是否为浏览器环境
 * @returns {boolean} 检测结果
 */
function isBrowser () {
  return (
    typeof window === 'object' &&
    typeof document === 'object' &&
    document.nodeType === 9)
}

/**
 * 空函数
 */
function noop () { }

/**
 * @callback loopFnCallback
 * @param {number} idx 当前次数索引
 */

/**
 * 循环执行方法
 * @param {number} length 循环次数
 * @param {loopFnCallback} cb 回调函数
 */
function loopFn (length, cb) {
  Array.apply(null, { length }).map((_, idx) => {
    typeof cb === 'function' && cb(idx);
  });
}

/**
 * 检测数字或字符串是否可转为安全数字
 * @param {number} number 检测的数字
 * @returns {boolean} 检测结果
 */
function isSafeNumber (number) {
  return !isNaN(parseFloat(number)) && isFinite(number)
}

/**
 * 数字格式化
 * @param {number} number 要格式化的数字
 * @param {object} [options] 格式化参数
 * @param {number} [options.decimals = 0] 小数位数
 * @param {string} [options.decimal = '.'] 整数与小数分隔符
 * @param {string} [options.separator = ','] 千分位分隔符
 * @param {string} [options.roundMethod = 'ceil'] 取整方式
 * @returns {string} 格式化结果
 */
function formatNumber (number, {
  decimals = 0,
  decimal = '.',
  separator = ',',
  roundMethod = 'ceil',
} = {}) {
  if (!isSafeNumber(number)) return 0

  number = Number(number);

  const toFixedFix = (x, y) => {
    const k = Math.pow(10, decimals);

    return `${(Math[roundMethod](x * k) / k).toFixed(y)}`
  };
  const s = (decimals ? toFixedFix(number, decimals) : `${Math.round(number)}`).split(decimal);

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);
  }

  if (typeof s[1] === 'string' && s[1].length < decimals) {
    s[1] = `${'0'.repeat(decimals)}${s[1]}`.slice(-decimals);
  }

  return s.join(decimal)
}

exports.formatNumber = formatNumber;
exports.isAndroid = isAndroid;
exports.isBrowser = isBrowser;
exports.isIOS = isIOS;
exports.isSafeNumber = isSafeNumber;
exports.isWechat = isWechat;
exports.loopFn = loopFn;
exports.noop = noop;
