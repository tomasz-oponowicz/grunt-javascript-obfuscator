module.exports = require('./gruntfile_generic').setup({
    options: {
        sourceMap: true,
        sourceMapMode: 'separate',
        sourceMapFileName: 'example-new'
    },
    renamed: {
        files: {
            '../../tmp/example.js': '../../tmp/renamed.js'
        }
    }
});