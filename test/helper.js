'use strict';

var cp = require("child_process");

exports.callGruntfile = function (filename, whenDoneCallback) {
    var command, options;
    command = "grunt --gruntfile " + filename + " --no-color";
    options = {cwd: 'test/'};
    cp.exec(command, options, whenDoneCallback);
};