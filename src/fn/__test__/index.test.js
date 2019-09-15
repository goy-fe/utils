import fn from '..'
const { noop } = fn

describe('Group Fn', () => {
  test('Should noop exist', () => {
    expect(noop).toBeDefined()
  })
})
