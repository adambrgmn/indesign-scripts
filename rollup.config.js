import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { version } from './package.json';

export default {
  entry: 'src/merge-files.js',
  moduleName: 'mergeFiles',
  format: 'iife',
  plugins: [
    resolve({ jsnext: true, main: true, browser: true }),
    commonjs(),
    babel({ exclude: 'node_modules/**' }),
  ],
  dest: `build/merge-files_${version}.jsx`,
};
