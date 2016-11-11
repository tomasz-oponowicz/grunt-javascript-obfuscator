# grunt-javascript-obfuscator

[![Build Status](https://travis-ci.org/tomasz-oponowicz/grunt-javascript-obfuscator.svg?branch=master)](https://travis-ci.org/tomasz-oponowicz/grunt-javascript-obfuscator)

> Obfuscates JavaScript files using amazing [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator).

Conceal your logic and hide any data contained in the code. Please read documentation [how to protect your code effectively](https://github.com/javascript-obfuscator/javascript-obfuscator/blob/master/README.md). Basic protection:

Original code:

    (function(){
        var variable = 'abc';
        console.log(variable);
    })();

Protected code:

    var _0xabf1 = [
        '\x61\x62\x63',
        '\x6c\x6f\x67'
    ];
    (function() {
        var _0xe6fab6 = _0xabf1[0x0];
        console[_0xabf1[0x1]](_0xe6fab6);
    }());



Special thanks for [@sanex3339](https://github.com/sanex3339) for his outstanding [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) library.

## Getting Started
This plugin requires Grunt `>=0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin and _javascript-obfuscator_ with this command:

```shell
npm install grunt-javascript-obfuscator javascript-obfuscator --save-dev
```

..._javascript-obfuscator_ is defined as a peer dependency. In other words you can experiment with every version above `0.7.2`. 

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-javascript-obfuscator');
```

## The "javascript_obfuscator" task

### Overview
In your project's Gruntfile, add a section named `javascript_obfuscator` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  javascript_obfuscator: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

Options are passed directly to _javascript-obfuscator_. Please visit [documentation of the project](https://github.com/javascript-obfuscator/javascript-obfuscator) for a complete list of options.

### Usage Examples

#### Default Options

In this example, the default options are used to obfuscate scripts:

```js
grunt.initConfig({
  javascript_obfuscator: {
    options: {
      /* Default options */
    },
    main: {
      files: {
        'dist/obfuscated.js': ['src/module1.js', 'src/module2.js']
      }
    }
  },
});
```

#### Custom Options

In this example, custom options are used to obfuscate scripts. `debugProtection` makes it almost impossible to use the console tab of the Developer Tools:

```js
grunt.initConfig({
  javascript_obfuscator: {
    options: {
      debugProtection: true,
      debugProtectionInterval: true
    },
    main: {
      files: {
        'dist/obfuscated.js': ['src/module1.js', 'src/module2.js']
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 * 2016-11-11 / v1.0.4 / Updated README.
 * 2016-11-09 / v1.0.3 / Updated README.
 * 2016-11-09 / v1.0.2 / Fixed examples.
 * 2016-11-09 / v1.0.1 / Relaxed peer dependencies.
 * 2016-11-08 / v1.0.0 / First release.
