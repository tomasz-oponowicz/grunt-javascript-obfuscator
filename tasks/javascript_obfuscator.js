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
    grunt.log.warn('Source files don\'t exist');
    return '';
  }

  return paths.filter(function(path) {
    // Warn on and remove invalid source files (if nonull was set).
    if (!grunt.file.exists(path)) {
      grunt.log.warn('Source file "' + path + '" not found.');
      return false;
    } else {
      return true;
    }
  }).map(function(path) {
    // Read file source.
    return grunt.file.read(path);
  }).join(grunt.util.normalizelf(';'));
}

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('javascript_obfuscator', 'Obfuscates JavaScript files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.

      var src = concat(grunt, f.src);

      src = JavaScriptObfuscator.obfuscate(src, options).getObfuscatedCode();

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
