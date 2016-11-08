module.exports = require('./gruntfile_generic').setup({
    options: {},
    single_file: {
        files: {
            '../../tmp/single_file.js': 'first_sample.js'
        }
    }
});