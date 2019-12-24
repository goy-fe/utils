const RE_EXTERNAL_URL = /^(https?:|mailto:|tel:|[a-zA-Z]{4,}:)/i

/**
 * 检测URL是否为外部URL
 * @param {string} url 要检测的URL
 * @returns {boolean} 检测结果
 */
export function isExternalURL (url) {
  return RE_EXTERNAL_URL.test(url)
}

/**
 * 获取URL上的查询参数对象
 * @param {string} url 要格式化的URL
 * @returns {object} 格式化的参数对象，若无参数则为空对象
 */
export function getQueryParams (url = '') {
  const search = url.split('?')[1]

  if (!search) return {}

  const jsonData = decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')

  return JSON.parse(`{"${jsonData}"}`)
}
