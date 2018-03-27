import rollup from 'rollup'
import babel from 'rollup-plugin-babel'

export default {
    input: 'src/kalendar.js',
    plugins: [babel()],
    output: {
        name: 'Kalendar',
        file: 'dist/kalendar.js',
        format: 'umd'
    }
}