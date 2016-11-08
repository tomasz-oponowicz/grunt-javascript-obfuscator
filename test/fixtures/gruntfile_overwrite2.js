module.exports = require('./gruntfile_generic').setup({
    options: {},
    overwrite: {
        files: {
            '../../tmp/overwrite2.js': '../../tmp/overwrite2.js'
        }
    }
});