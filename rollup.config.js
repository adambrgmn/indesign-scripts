import { readdirSync } from 'fs';
import { join } from 'path';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import nodeBuiltIns from 'rollup-plugin-node-builtins';
import camelcase from 'lodash.camelcase';

const capitalize = s => s[0].toUpperCase() + s.slice(1);

const files = readdirSync(join(__dirname, 'src')).filter(
  item => item !== 'polyfills' && item !== 'utils',
);

const configs = files.map(file => {
  const name = capitalize(camelcase(file));
  const input = join('src', file, 'index.js');

  return {
    input,
    output: {
      file: join('dist', `${file}.jsx`),
      format: 'iife',
    },
    name,
    exports: 'none',
    plugins: [
      nodeBuiltIns(),
      resolve({ preferBuiltins: false, jsnext: true, main: true }),
      commonjs({ include: 'node_modules/**' }),
      babel({
        exclude: 'node_modules/**',
        presets: [['env', { modules: false }]],
        plugins: [
          'external-helpers',
          'transform-object-rest-spread',
          'transform-class-properties',
        ],
      }),
    ],
    banner: '// @target indesign',
  };
});

export default configs;
