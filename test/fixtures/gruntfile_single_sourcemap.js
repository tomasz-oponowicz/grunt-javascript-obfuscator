module.exports = require('./gruntfile_generic').setup({
    options: {
        sourceMap: true,
        sourceMapMode: 'separate'
    },
    source_file: {
        files: {
            '../../tmp/single_file.js': '../../tmp/first_source.js'
        }
    }
});