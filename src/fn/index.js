const fn = {
  noop () { },

  loopFn (length, cb) {
    Array.apply(null, { length }).map((_, idx) => {
      typeof cb === 'function' && cb(idx)
    })
  },
}

export default fn

export const noop = fn.noop
export const loopFn = fn.loopFn
