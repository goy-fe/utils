const replace = require('@rollup/plugin-replace')
const node = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const buble = require('@rollup/plugin-buble')
const { terser } = require('rollup-plugin-terser')

const {
  pkg: { version },
  banner,
  pathSrc,
  pathDist,
} = require('./utils')

module.exports = [
  {
    output: 'goy-utils.js',
    format: 'umd',
    plugins: [buble()],
  },
  {
    output: 'goy-utils.min.js',
    format: 'umd',
    plugins: [buble(), terser({ output: { comments: /^!/ } })],
  },
  {
    output: 'goy-utils.cjs.js',
    format: 'cjs',
  },
  {
    output: 'goy-utils.esm.js',
    format: 'es',
  },
].map(opts => {
  const { output, format, plugins = [] } = opts
  const config = {
    input: pathSrc('main.js'),

    output: {
      file: pathDist(output),
      format,
      name: 'GoyUtils',
      banner,
    },

    plugins: [
      replace({
        'process.env.VERSION': JSON.stringify(version),
      }),

      node(),

      commonjs(),

      ...plugins,
    ],
  }

  return config
})
