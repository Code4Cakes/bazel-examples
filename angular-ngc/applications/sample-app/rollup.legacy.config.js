import amd from 'rollup-plugin-amd';
import html from 'rollup-plugin-html';
import replace from 'rollup-plugin-re';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import node from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';

module.exports = {
  plugins: [
    html(),
    alias({
      entries: [
        {
          find: 'interfolio',
          replacement: `${__dirname}/../..`,
        },
        {
          find: '@medicine-cabinet/v2',
          replacement: `${__dirname}/../medicine-cabinet/v2`,
        },
        {
          find: '@intf/components',
          replacement: `${__dirname}/../../packages/components/src/app`,
        },
        {
          find: '@intf',
          replacement: `${__dirname}/../../packages`,
        },
      ],
    }),
    node({
      mainFields: ['browser', 'es5', 'module'],
    }),
    // Work-around for the generated Angular ViewEngine ngfactory imports that
    // starts with `interfolio/external/npm/node_modules/`.
    replace({
      patterns: [
        {
          match: /\.ngfactory\.mjs/,
          test: 'interfolio/external/npm/node_modules/',
          replace: '',
        },
      ],
    }),
    amd({
      // Work-around for Angular ngfactory issue https://github.com/angular/angular/issues/29491.
      // Filter to only convert .ngfactory.js files since any UMD files that may be bundled will
      // break with the AMD plugin. In addition, the @buxlabs/amd-to-es6 npm library that is used
      // by rollup-plugin-amd needs to be patched so that the ngc generated AMD .ngfactory.js files
      // (configured by angular-metadata.tsconfig.json) have their imports correctly transformed to
      // es6. See /examples/angular_view_engine/patches/@buxlabs+amd-to-es6+0.13.3.patch.
      include: /\.ngfactory\.js$/i,
    }),
    commonjs(),
    babel({
      babelrc: false,
      configFile: false,
      extensions: ['.js', '.ts', '.mjs'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: 'defaults, ie >= 11',
            debug: false,
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    }),
  ],
};
