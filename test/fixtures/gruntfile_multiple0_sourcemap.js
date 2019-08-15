module.exports = require('./gruntfile_generic').setup({
    options: {
        sourceMap: true,
        sourceMapMode: 'separate'
    },
    multiple_sources0: {
        src: ['../../tmp/first_sample0.js', '../../tmp/second_sample0.js'],
        dest: '../../tmp/multiple_files2.js'
    }
});
