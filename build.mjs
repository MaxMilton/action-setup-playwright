/* eslint-disable import/no-extraneous-dependencies */

import esbuild from 'esbuild';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    platform: 'node',
    target: ['node12'],
    define: {
      'process.env.npm_package_version': JSON.stringify(
        process.env.npm_package_version,
      ),
    },
    banner: { js: '"use strict";' },
    bundle: true,
    minify: !dev,
    sourcemap: true,
    watch: dev,
    logLevel: 'debug',
  })
  .catch((err) => {
    throw err;
  });
