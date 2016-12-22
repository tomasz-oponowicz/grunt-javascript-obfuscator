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
    return grunt.file.read(path);
  }).join(grunt.util.normalizelf(';'));
}

function obfuscate(grunt, originalSource, destFile, options) {
  var obfuscatedSource = JavaScriptObfuscator.obfuscate(originalSource, options).getObfuscatedCode();
  grunt.file.write(destFile, obfuscatedSource);
  grunt.log.writeln('File "' + destFile + '" obfuscated.');
}

function obfuscateSingleTarget(grunt, srcFiles, destFile, options) {
  var source;

  try {
    source = concat(grunt, srcFiles);
  } catch (error) {
    return grunt.fail.warn(error);
  }

  obfuscate(grunt, source, destFile, options);
}

function obfuscateMultiplesTargets(grunt, destFiles, options) {
  destFiles.forEach(function (destFile) {
    var source = grunt.file.read(destFile);
    obfuscate(grunt, source, destFile, options);
  });
}

module.exports = function(grunt) {
  grunt.registerMultiTask('javascript_obfuscator', 'Obfuscates JavaScript files.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});
    var files = this.files;

    if (files.length === 0) {
      throw new Error('Target files not found.');
    }

    files.forEach(function(file) {
      if (file.dest) {
        obfuscateSingleTarget(grunt, file.src, file.dest, options);
      } else {
        obfuscateMultiplesTargets(grunt, file.src, options);
      }
    });
  });
};
