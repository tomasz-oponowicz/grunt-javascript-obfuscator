module.exports = require('./gruntfile_generic').setup({
    options: {},
    single_file: {
        files: {
            '../../tmp/single_file': ['first_sample.js']
        }
    }
});