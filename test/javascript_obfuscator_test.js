'use strict';

var helper = require('./helper');
var grunt = require('grunt');

exports.javascript_obfuscator = {
    unknown_file: function(test) {
        test.expect(2);

        helper.callGruntfile('fixtures/gruntfile_unknown_file.js', function (error, stdout, stderr) {
            test.ok(error, "Command should fail.");
            test.ok(stdout.indexOf("Source files not found.") > -1, "Standard error stream should be contain error message.");

            test.done();
        });
    },

    no_file: function(test) {
        test.expect(2);

        helper.callGruntfile('fixtures/gruntfile_no_file.js', function (error, stdout, stderr) {
            test.ok(error, "Command should fail.");
            test.ok(stdout.indexOf("Target files not found.") > -1, "Standard error stream should be contain error message.");

            test.done();
        });
    },

    single_file: function(test) {
        test.expect(5);

        helper.callGruntfile('fixtures/gruntfile_single_file.js', function (error, stdout, stderr) {
            test.equal(error, null, "Command should not fail.");
            test.equal(stderr, '', "Standard error stream should be empty.");

            var obfuscated = grunt.file.read('tmp/single_file.js');

            // should NOT be obfuscated
            test.ok(obfuscated.indexOf('console') > -1, '`console` shouldn\'t be obfuscated');
            test.ok(obfuscated.indexOf('FIRST_LOCAL_VARIABLE') > -1, '`FIRST_LOCAL_VARIABLE` shouldn\'t be obfuscated');

            // should be obfuscated
            test.ok(obfuscated.indexOf('FIRST_STRING_LITERAL') === -1, '`FIRST_STRING_LITERAL` should be obfuscated');

            test.done();
        });
    },

    multiple_files1: function(test) {
        test.expect(7);

        helper.callGruntfile('fixtures/gruntfile_multiple_files1.js', function (error, stdout, stderr) {
            test.equal(error, null, "Command should not fail.");
            test.equal(stderr, '', "Standard error stream should be empty.");

            var obfuscated = grunt.file.read('tmp/multiple_files1.js');

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

    multiple_files2: function(test) {
        test.expect(7);

        helper.callGruntfile('fixtures/gruntfile_multiple_files2.js', function (error, stdout, stderr) {
            test.equal(error, null, "Command should not fail.");
            test.equal(stderr, '', "Standard error stream should be empty.");

            var obfuscated = grunt.file.read('tmp/multiple_files2.js');

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


    overwrite1: function(test) {
        test.expect(5);

        grunt.file.copy('test/fixtures/first_sample.js', 'tmp/overwrite1.js');

        helper.callGruntfile('fixtures/gruntfile_overwrite1.js', function (error, stdout, stderr) {
            test.equal(error, null, "Command should not fail.");
            test.equal(stderr, '', "Standard error stream should be empty.");

            var obfuscated = grunt.file.read('tmp/overwrite1.js');

            // should NOT be obfuscated
            test.ok(obfuscated.indexOf('console') > -1, '`console` shouldn\'t be obfuscated');
            test.ok(obfuscated.indexOf('FIRST_LOCAL_VARIABLE') > -1, '`FIRST_LOCAL_VARIABLE` shouldn\'t be obfuscated');

            // should be obfuscated
            test.ok(obfuscated.indexOf('FIRST_STRING_LITERAL') === -1, '`FIRST_STRING_LITERAL` should be obfuscated');

            test.done();
        });
    },

    overwrite2: function(test) {
        test.expect(5);

        grunt.file.copy('test/fixtures/first_sample.js', 'tmp/overwrite2.js');

        helper.callGruntfile('fixtures/gruntfile_overwrite2.js', function (error, stdout, stderr) {
            test.equal(error, null, "Command should not fail.");
            test.equal(stderr, '', "Standard error stream should be empty.");

            var obfuscated = grunt.file.read('tmp/overwrite2.js');

            // should NOT be obfuscated
            test.ok(obfuscated.indexOf('console') > -1, '`console` shouldn\'t be obfuscated');
            test.ok(obfuscated.indexOf('FIRST_LOCAL_VARIABLE') > -1, '`FIRST_LOCAL_VARIABLE` shouldn\'t be obfuscated');

            // should be obfuscated
            test.ok(obfuscated.indexOf('FIRST_STRING_LITERAL') === -1, '`FIRST_STRING_LITERAL` should be obfuscated');

            test.done();
        });
    }
};
