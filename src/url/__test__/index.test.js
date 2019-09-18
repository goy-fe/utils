import { getQueryParams, isExternalURL } from '..'

describe('Group Url', () => {
  test(`Should getQueryParams() return {}`, () => {
    expect(getQueryParams()).toStrictEqual({})
  })

  test(`Should getQueryParams('https://foo.bar?foo=bar') return { foo: 'bar' }`, () => {
    expect(getQueryParams('https://foo.bar?foo=bar')).toEqual({ foo: 'bar' })
  })

  test(`Should isExternalURL('https://www.google.com') return true`, () => {
    expect(isExternalURL('https://www.google.com')).toBe(true)
  })

  test(`Should isExternalURL('/path/README.md') return false`, () => {
    expect(isExternalURL('/path/README.md')).toBe(false)
  })
})
