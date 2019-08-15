module.exports = require('./gruntfile_generic').setup({
    options: {},
    single_file: {
        files: {
            '../../tmp/first_no_source_out.js': '../../tmp/first_no_source.js'
        }
    }
});