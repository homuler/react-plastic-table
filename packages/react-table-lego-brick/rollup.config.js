const commonjs = require('rollup-plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.bundle.js',
      format: 'cjs',
    },
    {
      file: 'lib/index.js',
      format: 'esm',
    },
  ],
  plugins: [
    commonjs({
      namedExports: {
        'react': [
          'Component',
          'cloneElement', 'createContext', 'createElement',
          'useCallback', 'useContext', 'useEffect', 'useMemo', 'useRef', 'useState',
        ],
        'react-is': [
          'ForwardRef',
          'isElement', 'isFragment', 'isValidElementType',
        ],
      },
    }),
    resolve({ preferBuiltins: false }),
    typescript(),
  ],
  external: ['react', 'react-dom', 'stream'],
};
