const number = {
  isSafeNumber (number) {
    return !isNaN(parseFloat(number)) && isFinite(number)
  },

  formatNumber (number, {
    decimals = 0,
    decimal = '.',
    separator = ',',
    roundMethod = 'ceil',
  } = {}) {
    if (!this.isSafeNumber(number)) return 0

    number = Number(number)

    const toFixedFix = (x, y) => {
      const k = Math.pow(10, decimals)

      return `${(Math[roundMethod](x * k) / k).toFixed(y)}`
    }
    const s = (decimals ? toFixedFix(number, decimals) : `${Math.round(number)}`).split(decimal)

    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separator)
    }

    if (typeof s[1] === 'string' && s[1].length < decimals) {
      s[1] = `${'0'.repeat(decimals)}${s[1]}`.slice(-decimals)
    }

    return s.join(decimal)
  },
}

export default number

export const isSafeNumber = number.isSafeNumber
export const formatNumber = number.formatNumber
