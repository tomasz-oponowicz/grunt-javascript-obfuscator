module.exports = require('./gruntfile_generic').setup({
    options: {},
    multiple_files: {
        files: {
            '../../tmp/multiple_files': ['first_sample.js', 'second_sample.js']
        }
    }
});