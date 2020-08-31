const { resolve } = require('path')
export const pkg = require('../package.json')

export const pathSrc = (...args) => resolve(__dirname, '../src', ...args)
export const pathDist = (...args) => resolve(__dirname, '../dist', ...args)

export const banner = `\
/*!
 * ${pkg.name} - ${pkg.description}
 *
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 * @copyright 2019 ${pkg.author}
 */
`
