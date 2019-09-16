import { isSafeNumber, formatNumber } from '..'

describe('Group Number', () => {
  test(`Should 0 be a safe number`, () => {
    expect(isSafeNumber(0)).toBe(true)
  })

  test(`Should formatNumber(123456.789) return 123,456`, () => {
    expect(formatNumber(123456.789)).toBe('123,456')
  })
})
