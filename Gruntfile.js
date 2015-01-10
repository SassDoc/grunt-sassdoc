'use strict';

module.exports = function (grunt) {

  // Load all grunt tasks matching the `grunt-*` pattern.
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take.
  require('time-grunt')(grunt);

  var pkg = grunt.file.readJSON('package.json');

  var config = {

    sassdoc: {

      // Bare minimum.
      bare: {
        src: 'test/fixture/**/*.scss'
      },

      // Glob patterns Array.
      srcs: {
        src: ['test/fixture/scss-one/**/*.scss', 'test/fixture/scss-two/**/*.scss']
      },

      // With config passed in as an external file.
      config: {
        src: ['test/fixture/**/*.scss'],
        options: {
          config: 'test/config.json'
        }
      },

      // With config passed in as object.
      opts: {
        src: 'test/fixture/**/*.scss',
        options: {
          // cli opts.
          verbose: true,
          theme: 'default',
          // SassDoc opts.
          package: pkg,
          autofill: ['requires', 'throws'],
          groups: {
            'undefined': 'Ungrouped',
            'foo': 'Foo group',
            'bar': 'Bar group'
          },
          // theme opts.
          display: {
            access: ['public', 'private'],
            alias: true,
            watermark: true
          },
          basePath: 'https://github.com/SassDoc/grunt-sassdoc/tree/master/test/fixture'
        }
      }

    },

    tape: {
      files: ['test/*.test.js']
    },

    clean: {
      test: ['sassdoc']
    },

    eslint: {
      target: ['tasks/*.js', 'test/*.js', 'Gruntfile.js']
    }

  };

  grunt.initConfig(config);

  grunt.loadTasks('tasks');

  grunt.registerTask('test', [
    'eslint',
    'sassdoc:bare',
    'tape',
    'clean:test',
    'sassdoc:srcs',
    'tape',
    'clean:test',
    'sassdoc:config',
    'tape',
    'clean:test',
    'sassdoc:opts',
    'tape',
    'clean:test'
  ]);


  // // Examples using start and done events.
  // grunt.event.on('sassdoc.start', function (target, src, dest) {
  //   grunt.log.writeln(target + ': compiling ' + src + ' to ' + dest);
  // });
  //
  // grunt.event.on('sassdoc.done', function (target, src, dest) {
  //   grunt.log.writeln(target + ': ' + src + ' compiled to ' + dest);
  // });

};
