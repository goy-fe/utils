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

const env = {
  /**
   * IOS环境
   * @param ua UserAgent
   */
  isIOS (ua = navigator.userAgent) {
    return /iPad|iPhone|iPod/i.test(ua)
  },

  isWechat (ua = navigator.userAgent) {
    return /micromessenger\/([\d.]+)/i.test(ua) || ua.includes('MicroMessenger')
  },

  isAndroid (ua = navigator.userAgent) {
    return /android/i.test(ua) || ua.includes('Adr')
  },

  isBrowser () {
    return (
      typeof window === 'object' &&
      typeof document === 'object' &&
      document.nodeType === 9
    )
  },
};

const isIOS = env.isIOS;
const isWechat = env.isWechat;
const isAndroid = env.isAndroid;
const isBrowser = env.isBrowser;

const fn = {
  noop () { },

  loopFn (length, cb) {
    Array.apply(null, { length }).map((_, idx) => {
      typeof cb === 'function' && cb(idx);
    });
  },
};

const noop = fn.noop;
const loopFn = fn.loopFn;

exports.isAndroid = isAndroid;
exports.isBrowser = isBrowser;
exports.isIOS = isIOS;
exports.isWechat = isWechat;
exports.loopFn = loopFn;
exports.noop = noop;
