import replace from '@rollup/plugin-replace'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

import { pkg, banner, pathSrc, pathDist } from './utils'

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
        'process.env.VERSION': JSON.stringify(pkg.version),
      }),

      nodeResolve(),

      commonjs(),

      ...plugins,
    ],
  }

  return config
})
