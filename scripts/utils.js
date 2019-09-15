const { resolve } = require('path')
const pkg = require('../package.json')

const pathSrc = (...args) => resolve(__dirname, '../src', ...args)
const pathDist = (...args) => resolve(__dirname, '../dist', ...args)

const banner = `\
/*!
 * ${pkg.name} - ${pkg.description}
 *
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 * @copyright 2019 ${pkg.author}
 */
`

module.exports = {
  pkg,
  banner,
  pathSrc,
  pathDist,
}
