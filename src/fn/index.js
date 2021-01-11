/**
 * 空函数
 */
export function noop () {}

/**
 * @callback loopFnCallback
 * @param {number} idx 当前次数索引
 */

/**
 * 循环执行方法
 * @param {number} length 循环次数
 * @param {loopFnCallback} cb 回调函数
 */
export function loopFn (length, cb) {
  Array.apply(null, { length }).foreach((_, idx) => {
    typeof cb === 'function' && cb(idx)
  })
}
