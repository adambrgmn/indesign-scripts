import globby from 'globby';
import { basename, join } from 'path';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { version } from './package.json';

const files = globby.sync(['src/*.js', '!**/polyfills.js']);

const configs = files.map(file => {
  const entryName = basename(file, '.js');

  return {
    entry: file,
    format: 'iife',
    exports: 'none',
    plugins: [
      resolve({ jsnext: true, main: true, browser: true }),
      commonjs(),
      babel({ exclude: 'node_modules/**' }),
    ],
    dest: join('build', `${entryName}.${version}.jsx`),
  };
});

export default configs;
