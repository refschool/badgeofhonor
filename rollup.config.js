import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'

export default {
  input: ['./src/bin/www.ts'],
  output: {
    dir: 'dist'
  },
  plugins: [
    json(),
    commonjs(),
    typescript(),
    terser({ module: true, output: { comments: 'some' } }),
    copy({
      targets: [
        { src: ['package.json', '.env', 'loader_CJS_to_ESM.cjs'], dest: 'dist' }
      ]
    })
  ]
}
