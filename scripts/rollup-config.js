const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const babel = require('rollup-plugin-babel')
const { terser } = require('rollup-plugin-terser')

const {
  pkg: { version },
  banner,
  pathSrc,
  pathDist,
} = require('./utils')

module.exports = [
  { output: 'goy-utils.js', format: 'umd' },
  { output: 'goy-utils.min.js', format: 'umd' },
  { output: 'goy-utils.cjs.js', format: 'cjs' },
  { output: 'goy-utils.esm.js', format: 'es' },
].map(opts => {
  const { output, format } = opts
  const minify = Boolean(/min\.js$/.test(output))
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

      resolve({
        browser: true,
        preferBuiltins: true,
      }),

      commonjs(),

      json(),

      ...(minify
        ? [
          terser({
            output: {
              comments: /^!/,
            },
          }),
        ]
        : []),

      ...(format === 'umd'
        ? [
          babel({
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
            ],
            exclude: 'node_modules/**',
          }),
        ]
        : []),
    ],
  }

  return config
})
