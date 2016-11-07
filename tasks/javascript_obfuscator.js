/*
 * grunt-javascript-obfuscator
 * https://github.com/tomasz-oponowicz/grunt-javascript-obfuscator
 *
 * Copyright (c) 2016 Tomasz Oponowicz
 * Licensed under the MIT license.
 */

'use strict';

var JavaScriptObfuscator = require('javascript-obfuscator');

function concat(grunt, paths) {
  if (paths.length === 0) {
    throw new Error('Source files not found.');
  }

  return paths.map(function(path) {

    // Read file source.
    return grunt.file.read(path);
  }).join(grunt.util.normalizelf(';'));
}

module.exports = function(grunt) {
  grunt.registerMultiTask('javascript_obfuscator', 'Obfuscates JavaScript files.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});
    var files = this.files;

    if (files.length === 0) {
      throw new Error('Target files not found.');
    }

    files.forEach(function(f) {
      var src;

      try {
        src = concat(grunt, f.src);
      } catch (e) {
        return grunt.fail.warn(e);
      }

      src = JavaScriptObfuscator.obfuscate(src, options).getObfuscatedCode();

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
