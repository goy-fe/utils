/**
 * 检测数字或字符串是否可转为安全数字
 * @param {number} number 检测的数字
 * @returns {boolean} 检测结果
 */
export function isSafeNumber (number) {
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
export function formatNumber (
  number,
  { decimals = 0, decimal = '.', separator = ',', roundMethod = 'floor' } = {}
) {
  if (!isSafeNumber(number)) return 0

  number = Number(number)

  const toFixedFix = (x, y) => {
    const k = Math.pow(10, decimals)

    return `${(Math[roundMethod](x * k) / k).toFixed(y)}`
  }
  const s = (decimals
    ? toFixedFix(number, decimals)
    : `${Math[roundMethod](number)}`
  ).split(decimal)

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separator)
  }

  if (typeof s[1] === 'string' && s[1].length < decimals) {
    s[1] = `${'0'.repeat(decimals)}${s[1]}`.slice(-decimals)
  }

  return s.join(decimal)
}
