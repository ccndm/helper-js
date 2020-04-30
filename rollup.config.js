import { version } from './package.json'
import buble from 'rollup-plugin-buble'
const babel = require("rollup-plugin-babel");
const banner = `/**
 * helper-js v${version}
 * https://github.com/defypro/helper-js
 * @license MIT
 */`

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/helper-js.esm.js',
            format: 'es',
            banner
        }, {
            file: 'dist/helper-js.common.js',
            format: 'cjs',
            banner
        }, {
            file: 'dist/helper-js.js',
            format: 'umd',
            name: 'helperJS',
            banner
        }
    ],
    plugins: [
        buble(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**'
        })
    ]
}