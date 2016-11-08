module.exports = require('./gruntfile_generic').setup({
    options: {},
    unknown_file: {
        files: {
            '../../tmp/unknown_file': ['unknown.js']
        }
    }
});