exports.setup = function(configuration) {
    return function (grunt) {
        'use strict';

        grunt.initConfig({
            javascript_obfuscator: configuration
        });

        grunt.loadTasks('../../tasks');
        grunt.registerTask('default', 'javascript_obfuscator');
    };
};