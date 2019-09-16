/**
 * 检测是否为 IOS 环境
 * @param {string} [ua] 用户代理
 * @returns {boolean} 检测结果
 */
export function isIOS (ua = navigator.userAgent) {
  return /iPad|iPhone|iPod/i.test(ua)
}

/**
 * 检测是否为微信环境
 * @param {string} [ua] 用户代理
 * @returns {boolean} 检测结果
 */
export function isWechat (ua = navigator.userAgent) {
  return /micromessenger\/([\d.]+)/i.test(ua) || ua.includes('MicroMessenger')
}

/**
 * 检测是否为安卓环境
 * @param {string} [ua] 用户代理
 * @returns {boolean} 检测结果
 */
export function isAndroid (ua = navigator.userAgent) {
  return /android/i.test(ua) || ua.includes('Adr')
}

/**
 * 检测是否为浏览器环境
 * @returns {boolean} 检测结果
 */
export function isBrowser () {
  return (
    typeof window === 'object' &&
    typeof document === 'object' &&
    document.nodeType === 9
  )
}
