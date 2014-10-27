'use strict';

module.exports = function (grunt) {

  // Load all grunt tasks matching the `grunt-*` pattern.
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take.
  require('time-grunt')(grunt);

  var pkg = grunt.file.readJSON('package.json');

  var config = {

    sassdoc: {
      config: {
        src: 'test/fixture',
        dest: 'test/docs',
        options: {
          verbose: true,
          config: 'test/view.json',
          force: true,
          interactive: false
        }
      },
      opts: {
        src: 'test/fixture',
        dest: 'test/docs',
        options: {
          verbose: true,
          display: {
            access: ['public', 'private'],
            alias: true,
            watermark: true
          },
          groups: {
            'undefined': 'Ungrouped',
            'foo': 'Foo group',
            'bar': 'Bar group'
          },
          package: pkg,
          theme: 'default',
          basePath: 'https://github.com/SassDoc/grunt-sassdoc/tree/master/test/fixture',
          force: true,
          interactive: false
        }
      },
      fail: {
        src: 'should/fail',
        dest: 'test/docs'
      },
      bare: {
        src: 'test/fixture',
        dest: 'test/docs'
      }
    },

    tape: {
      files: ['test/*-test.js']
    },

    clean: {
      test: ['test/docs']
    },

    eslint: {
      target: ['tasks/*.js', 'test/*.js']
    }

  };

  grunt.initConfig(config);

  grunt.loadTasks('tasks');

  grunt.registerTask('test', [
    'eslint',
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
