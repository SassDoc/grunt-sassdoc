
module.exports = function (grunt) {
  'use strict';

  // Load all grunt tasks matching the `grunt-*` pattern.
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take.
  require('time-grunt')(grunt);

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    sassdoc: {
      test_config: {
        src: 'test/fixture',
        dest: 'test/docs',
        options: {
          verbose: true,
          config: 'test/view.json'
        }
      },
      test_options: {
        src: 'test/fixture',
        dest: 'test/docs',
        options: {
          verbose: true,
          display: {
            access: ['public', 'private'],
            alias: false,
            watermark: true
          },
          package: pkg
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: ['test/*.js']
      }
    },

    clean: {
      test: ['test/docs']
    },

    eslint: {
      target: ['tasks/*.js', 'test/*.js'],
      options: {
        config: 'conf/eslint.json'
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.registerTask('test_config', [
    'sassdoc:test_config',
    'mochaTest:test',
    'clean:test'
  ]);

  grunt.registerTask('test_options', [
    'sassdoc:test_options',
    'mochaTest:test',
    'clean:test'
  ]);

  grunt.registerTask('test', [
    'eslint',
    'test_config',
    'test_options'
  ]);

};
