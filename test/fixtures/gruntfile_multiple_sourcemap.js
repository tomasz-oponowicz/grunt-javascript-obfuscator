module.exports = require('./gruntfile_generic').setup({
    options: {
        sourceMap: true,
        sourceMapMode: 'separate'
    },
    multiple_sources_new: {
        files: {
            '../../tmp/multiple_files_new.js': ['../../tmp/first_sample_new.js', '../../tmp/second_sample_new.js']
        }
    }
});
