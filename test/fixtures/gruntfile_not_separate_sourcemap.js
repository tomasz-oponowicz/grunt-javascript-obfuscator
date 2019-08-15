module.exports = require('./gruntfile_generic').setup({
    options: {
        sourceMap: true,
        sourceMapMode: 'inline'
    },
    single_file: {
        files: {
            '../../tmp/second_no_source_out.js': '../../tmp/second_no_source.js'
        }
    }
});