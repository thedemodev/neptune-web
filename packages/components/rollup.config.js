import { dirname } from 'path';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { uglify } from 'rollup-plugin-uglify';

import pkg from './package.json';

// eslint-disable-next-line
let config;

if (process.env.NODE_ENV === 'es') {
  const postCssConfig = () => ({
    extract: true,
    modules: true,
    sourceMap: false,
  });

  const isExternal = id => !id.startsWith('.') && !id.startsWith('/');

  config = [
    {
      input: ['./src/Button/button.js'],
      output: {
        dir: dirname(pkg.module),
        exports: 'named',
        format: 'esm',
        sourcemap: false,
      },
      preserveModules: true,
      external: isExternal,
      plugins: [
        resolve(),
        babel({
          configFile: './babel.config.js',
          only: ['./src/Button'],
          exclude: ['*.spec.js', '*.story.js'],
          runtimeHelpers: true,
          sourceMaps: false,
        }),
        postcss(postCssConfig()),
      ],
    },
  ];
} else {
  // Rollup
  const input = 'src/index.js';
  const file =
    process.env.NODE_ENV === 'umd-nopolyfill' ? './build/umd/no-polyfill/main.js' : pkg.main;

  // Rollup can resolve only explicit exports.
  // https://github.com/rollup/rollup/issues/2671
  // https://github.com/rollup/rollup-plugin-commonjs
  const namedExports = {
    '../../node_modules/@transferwise/formatting/dist/formatting.js': [
      'formatAmount',
      'formatMoney',
      'formatDate',
      'formatNumber',
    ],
  };

  const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
  };

  // Plugins
  const plugins = [
    // Resolves modules from node_modules
    resolve(),
    babel({
      runtimeHelpers: true,
      exclude: ['node_modules/**', '../../node_modules/**'],
    }),
    // Convert CJ into ES6
    commonjs({ sourcemap: false, namedExports }),
    postcss({
      config: true,
      extract: pkg.style,
      extensions: ['.css'],
    }),
    uglify(),
  ];

  config = [
    {
      input,
      output: [{ file, name: pkg.name, format: 'umd', globals }],
      external: [
        ...Object.keys(pkg.devDependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ],
      plugins,
    },
  ];
}
export default config;
