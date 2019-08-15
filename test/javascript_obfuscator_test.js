'use strict';

var helper = require('./helper');
var grunt = require('grunt');
var fs = require("fs");

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
    },

    overwrite_without_dest: function(test) {
        test.expect(8);

        grunt.file.copy('test/fixtures/first_sample.js', 'tmp/overwrite_without_dest_first.js');
        grunt.file.copy('test/fixtures/second_sample.js', 'tmp/overwrite_without_dest_second.js');

        helper.callGruntfile('fixtures/gruntfile_overwrite_without_dest.js', function (error, stdout, stderr) {
            test.equal(error, null, "Command should not fail.");
            test.equal(stderr, '', "Standard error stream should be empty.");

            var obfuscated;

            obfuscated = grunt.file.read('tmp/overwrite_without_dest_first.js');

            // should NOT be obfuscated
            test.ok(obfuscated.indexOf('console') > -1, '`console` shouldn\'t be obfuscated');
            test.ok(obfuscated.indexOf('FIRST_LOCAL_VARIABLE') > -1, '`FIRST_LOCAL_VARIABLE` shouldn\'t be obfuscated');

            // should be obfuscated
            test.ok(obfuscated.indexOf('FIRST_STRING_LITERAL') === -1, '`FIRST_STRING_LITERAL` should be obfuscated');

            obfuscated = grunt.file.read('tmp/overwrite_without_dest_second.js');

            // should NOT be obfuscated
            test.ok(obfuscated.indexOf('console') > -1, '`console` shouldn\'t be obfuscated');
            test.ok(obfuscated.indexOf('SECOND_LOCAL_VARIABLE') > -1, '`SECOND_LOCAL_VARIABLE` shouldn\'t be obfuscated');

            // should be obfuscated
            test.ok(obfuscated.indexOf('SECOND_STRING_LITERAL') === -1, '`SECOND_STRING_LITERAL` should be obfuscated');

            test.done();
        });
    },

    no_source_map: function(test) {
        test.expect(2);

        grunt.file.copy('test/fixtures/first_sample.js', 'tmp/first_no_source.js');

        helper.callGruntfile('fixtures/gruntfile_no_sourcemap.js', function (error, stdout, stderr) {
            // Check if the source map file exists
            var mapCreated = fs.existsSync('tmp/first_no_source_out.js.map');
            test.equal(mapCreated, false, "The source map should not exist.");

            var obfuscated = grunt.file.read('tmp/first_no_source_out.js');
            test.ok(obfuscated.indexOf('sourceMappingURL') === -1, 'The source map should not be mentioned in the obfuscated file.');

            test.done();
        });
    },

    not_separate_source_map: function(test) {
        test.expect(2);

        grunt.file.copy('test/fixtures/second_sample.js', 'tmp/second_no_source.js');

        helper.callGruntfile('fixtures/gruntfile_not_separate_sourcemap.js', function (error, stdout, stderr) {
            // Check if the source map file exists
            var mapCreated = fs.existsSync('tmp/second_no_source_out.js.map');
            test.equal(mapCreated, false, "The source map should not exist.");

            var obfuscated = grunt.file.read('tmp/second_no_source_out.js');
            test.ok(obfuscated.indexOf('sourceMappingURL') > -1, 'The source map should be inline.');

            test.done();
        });
    },

    single_source_map: function(test) {
        test.expect(1);

        grunt.file.copy('test/fixtures/first_sample.js', 'tmp/first_source.js');

        helper.callGruntfile('fixtures/gruntfile_single_sourcemap.js', function (error, stdout, stderr) {
            // Check if the source map file exists
            var mapCreated = fs.existsSync('tmp/single_file.js.map');
            test.equal(mapCreated, true, "The source map exist.");

            test.done();
        });
    },

    multiple_source_maps: function(test) {
        test.expect(1);

        grunt.file.copy('test/fixtures/first_sample.js', 'tmp/first_sample_new.js');
        grunt.file.copy('test/fixtures/second_sample.js', 'tmp/second_sample_new.js');

        helper.callGruntfile('fixtures/gruntfile_multiple_sourcemap.js', function (error, stdout, stderr) {
            // Check if the source map file exists
            var mapCreated = fs.existsSync('tmp/multiple_files_new.js.map');
            test.equal(mapCreated, true, "The source map for the first and second files was created.");

            test.done();
        });
    },

    multiple0_source_maps: function(test) {
        test.expect(1);

        grunt.file.copy('test/fixtures/first_sample.js', 'tmp/first_sample0.js');
        grunt.file.copy('test/fixtures/second_sample.js', 'tmp/second_sample0.js');

        helper.callGruntfile('fixtures/gruntfile_multiple0_sourcemap.js', function (error, stdout, stderr) {
            // Check if the source map file exists
            var mapCreated = fs.existsSync('tmp/multiple_files2.js.map');
            test.equal(mapCreated, true, "The source map for the first and second files was created.");

            test.done();
        });
    },

    multiple1_source_maps: function(test) {
        test.expect(2);
        grunt.file.copy('test/fixtures/first_sample.js', 'tmp/first_sample1.js');
        grunt.file.copy('test/fixtures/second_sample.js', 'tmp/second_sample1.js');

        helper.callGruntfile('fixtures/gruntfile_multiple1_sourcemap.js', function (error, stdout, stderr) {
            // Check if the source map file exists
            var mapCreated = fs.existsSync('tmp/multiple_files3.js.map');
            var mapCreated0 = fs.existsSync('tmp/multiple_files4.js.map');

            test.equal(mapCreated, true, "The source map for the first file exists.");
            test.equal(mapCreated0, true, "The source map for the second file exists.");

            test.done();
        });
    },

    single_source_map_renamed: function(test) {
        test.expect(3);
        grunt.file.copy('test/fixtures/first_sample.js', 'tmp/renamed.js');

        helper.callGruntfile('fixtures/gruntfile_single_sourcemap_renamed.js', function (error, stdout, stderr) {
            // Check if the source map file exists
            var mapCreated = fs.existsSync('tmp/example-new.js.map');
            var obfuscatedExists = fs.existsSync('tmp/example.js');

            test.equal(mapCreated, true, "The source map exist.");
            test.equal(obfuscatedExists, true, "The source map exist.");

            var obfuscated = grunt.file.read('tmp/example.js');
            test.ok(obfuscated.indexOf('example-new.js.map') > -1, 'The source map should be mentioned in the obfuscated file.');

            test.done();
        });
    }
};
