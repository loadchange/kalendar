import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import {uglify} from 'rollup-plugin-uglify';

export default {
    entry: 'src/kalendar.js',
    output: {
        name: 'Kalendar',
        file: 'dist/kalendar.js',
        format: 'umd',
        sourcemap: true
    },
    plugins: [
        resolve(),
        commonjs(),
        eslint({include: ['src/**/*.js']}),
        babel({exclude: 'node_modules/**'}),
        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && uglify()),
    ],
};
