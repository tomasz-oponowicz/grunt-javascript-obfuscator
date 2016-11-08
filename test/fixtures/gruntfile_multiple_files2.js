module.exports = require('./gruntfile_generic').setup({
    options: {},
    multiple_files2: {
        src: ['first_sample.js', 'second_sample.js'],
        dest: '../../tmp/multiple_files2.js'
    }
});