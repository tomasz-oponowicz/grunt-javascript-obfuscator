module.exports = require('./gruntfile_generic').setup({
    options: {},
    multiple_files1: {
        files: {
            '../../tmp/multiple_files1.js': ['first_sample.js', 'second_sample.js']
        }
    }
});