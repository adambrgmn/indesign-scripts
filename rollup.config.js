import { join, dirname } from 'path';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { version } from './package.json';

const files = ['src/pack-ztory/index.js'];

const configs = files.map(file => {
  const entryName = dirname(file, '.js')
    .split('/')
    .slice(-1)[0];

  return {
    entry: file,
    format: 'iife',
    exports: 'none',
    plugins: [
      resolve({ jsnext: true, main: true, browser: true }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [['env', { modules: false }]],
        plugins: [
          'transform-object-rest-spread',
          'transform-class-properties',
          'external-helpers',
        ],
      }),
    ],
    banner: '//@target indesign',
    dest: join('build', `${entryName}.${version}.jsx`),
  };
});

export default configs;
