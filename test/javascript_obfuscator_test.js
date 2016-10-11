'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.javascript_obfuscator = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(4);

    var obfuscated = grunt.file.read('tmp/default_options');

    // should NOT be obfuscated
    test.ok(obfuscated.indexOf('console') > -1, '`console` shouldn\'t be obfuscated');
    test.ok(obfuscated.indexOf('TEST_LOCAL_VARIABLE') > -1, '`TEST_LOCAL_VARIABLE` shouldn\'t be obfuscated');

    // should be obfuscated
    test.ok(obfuscated.indexOf('.log') > -1, '`.log` shouldn\'t be obfuscated');
    test.ok(obfuscated.indexOf('TEST_STRING_LITERAL') === -1, '`TEST_STRING_LITERAL` should be obfuscated');

    test.done();
  }
};
