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
}

export default env

export const isIOS = env.isIOS
export const isWechat = env.isWechat
export const isAndroid = env.isAndroid
export const isBrowser = env.isBrowser
