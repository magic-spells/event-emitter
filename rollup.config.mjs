import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const name = 'event-emitter';

export default [
  // ESM build
  {
    input: 'src/event-emitter.js',
    output: {
      file: `dist/${name}.esm.js`,
      format: 'es',
      sourcemap: true,
    },
    plugins: [resolve()],
  },
  // CommonJS build
  {
    input: 'src/event-emitter.js',
    output: {
      file: `dist/${name}.cjs.js`,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [resolve()],
  },
  // UMD build
  {
    input: 'src/event-emitter.js',
    output: {
      file: `dist/${name}.js`,
      format: 'umd',
      name: 'EventEmitter',
      sourcemap: true,
    },
    plugins: [resolve()],
  },
  // Minified UMD for browsers
  {
    input: 'src/event-emitter.js',
    output: {
      file: `dist/${name}.min.js`,
      format: 'umd',
      name: 'EventEmitter',
      sourcemap: false,
    },
    plugins: [
      resolve(),
      terser({
        keep_classnames: true,
        format: {
          comments: false,
        },
      }),
    ],
  },
];