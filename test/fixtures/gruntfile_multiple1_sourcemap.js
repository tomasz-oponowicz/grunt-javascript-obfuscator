module.exports = require('./gruntfile_generic').setup({
    options: {
        sourceMap: true,
        sourceMapMode: 'separate'
    },
    multiple_sources1: {
        files: {
            '../../tmp/multiple_files3.js': '../../tmp/first_sample1.js',
            '../../tmp/multiple_files4.js': '../../tmp/second_sample1.js'
        }
    }
});
