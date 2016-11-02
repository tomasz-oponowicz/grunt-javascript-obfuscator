'use strict';

var helper = require('./helper');
var grunt = require('grunt');

exports.javascript_obfuscator = {
    setUp: function(done) {
        done();
    },

    unknown_file: function(test) {
        test.expect(2);

        helper.callGruntfile('fixtures/gruntfile_unknown_file.js', function (error, stdout, stderr) {
            test.ok(error, "Command should fail.");
            test.ok(stdout.indexOf("Source files not found.") > -1, "Standard error stream should be contain error message.");

            test.done();
        });
    },

    single_file: function(test) {
        test.expect(5);

        helper.callGruntfile('fixtures/gruntfile_single_file.js', function (error, stdout, stderr) {
            test.equal(error, null, "Command should not fail.");
            test.equal(stderr, '', "Standard error stream should be empty.");

            var obfuscated = grunt.file.read('tmp/single_file');

            // should NOT be obfuscated
            test.ok(obfuscated.indexOf('console') > -1, '`console` shouldn\'t be obfuscated');
            test.ok(obfuscated.indexOf('FIRST_LOCAL_VARIABLE') > -1, '`FIRST_LOCAL_VARIABLE` shouldn\'t be obfuscated');

            // should be obfuscated
            test.ok(obfuscated.indexOf('FIRST_STRING_LITERAL') === -1, '`FIRST_STRING_LITERAL` should be obfuscated');

            test.done();
        });
    },

    multiple_files: function(test) {
        test.expect(7);

        helper.callGruntfile('fixtures/gruntfile_multiple_files.js', function (error, stdout, stderr) {
            test.equal(error, null, "Command should not fail.");
            test.equal(stderr, '', "Standard error stream should be empty.");

            var obfuscated = grunt.file.read('tmp/multiple_files');

            // should NOT be obfuscated
            test.ok(obfuscated.indexOf('console') > -1, '`console` shouldn\'t be obfuscated');
            test.ok(obfuscated.indexOf('FIRST_LOCAL_VARIABLE') > -1, '`FIRST_LOCAL_VARIABLE` shouldn\'t be obfuscated');
            test.ok(obfuscated.indexOf('SECOND_LOCAL_VARIABLE') > -1, '`SECOND_LOCAL_VARIABLE` shouldn\'t be obfuscated');

            // should be obfuscated
            test.ok(obfuscated.indexOf('FIRST_STRING_LITERAL') === -1, '`FIRST_STRING_LITERAL` should be obfuscated');
            test.ok(obfuscated.indexOf('SECOND_STRING_LITERAL') === -1, '`SECOND_STRING_LITERAL` should be obfuscated');

            test.done();
        });
    },

    overwrite: function(test) {
        test.expect(5);

        grunt.file.copy('test/fixtures/first_sample.js', 'tmp/overwrite.js');

        helper.callGruntfile('fixtures/gruntfile_overwrite.js', function (error, stdout, stderr) {
            test.equal(error, null, "Command should not fail.");
            test.equal(stderr, '', "Standard error stream should be empty.");

            var obfuscated = grunt.file.read('tmp/overwrite.js');

            // should NOT be obfuscated
            test.ok(obfuscated.indexOf('console') > -1, '`console` shouldn\'t be obfuscated');
            test.ok(obfuscated.indexOf('FIRST_LOCAL_VARIABLE') > -1, '`FIRST_LOCAL_VARIABLE` shouldn\'t be obfuscated');

            // should be obfuscated
            test.ok(obfuscated.indexOf('FIRST_STRING_LITERAL') === -1, '`FIRST_STRING_LITERAL` should be obfuscated');

            test.done();
        });
    }
};
