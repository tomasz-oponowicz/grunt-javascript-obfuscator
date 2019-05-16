/*
 * grunt-javascript-obfuscator
 * https://github.com/tomasz-oponowicz/grunt-javascript-obfuscator
 *
 * Copyright (c) 2016 Tomasz Oponowicz
 * Licensed under the MIT license.
 */

'use strict';

var JavaScriptObfuscator = require('javascript-obfuscator');
var path = require('path');

function concat(grunt, paths) {
  if (paths.length === 0) {
    throw new Error('Source files not found.');
  }

  return paths.map(function(path) {
    return grunt.file.read(path);
  }).join(grunt.util.normalizelf(';'));
}

function obfuscate(grunt, originalSource, destFile, options) {
  var obfuscated = JavaScriptObfuscator.obfuscate(originalSource, options);
  var obfuscatedSource = obfuscated.getObfuscatedCode();
  grunt.file.write(destFile, obfuscatedSource);
  grunt.log.writeln('File "' + destFile + '" obfuscated.');

  sourceMap(grunt, obfuscated, destFile, options);
}

function sourceMap(grunt, obfuscated, destFile, options) {
  if (!options.sourceMap || options.sourceMapMode !== 'separate') {
    return false;
  }

  var sourceMap = obfuscated.getSourceMap();
  var sourceMapFileName = destFile + '.map';

  if (options.sourceMapFileName) {
    sourceMapFileName = path.normalize(
      path.dirname(destFile) +
      '/' +
      options.sourceMapFileName +
      '.js.map'
    );
  }

  grunt.file.write(sourceMapFileName, sourceMap);
  grunt.log.writeln('File "' + sourceMapFileName + '" saved as source map.');
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
