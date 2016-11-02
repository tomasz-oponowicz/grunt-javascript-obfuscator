module.exports = require('./gruntfile_generic').setup({
    options: {},
    overwrite: {
        src: ['../../tmp/overwrite.js'],
        dest: '../../tmp/overwrite.js'
    }
});