
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
        src: 'test/stylesheets',
        dest: 'test/docs',
        options: {
          config: 'test/view.json'
        }
      },
      test_options: {
        src: 'test/stylesheets',
        dest: 'test/docs',
        options: {
          display: {
            access: ['public', 'private'],
            alias: false,
            watermark: true
          },
          package: {
            name: pkg.title,
            version: pkg.version,
            license: pkg.license.type,
            homepage: pkg.homepage,
            description: pkg.description
          }
        }
      }
    },

    simplemocha: {
      test: {
        src: 'test/*.js'
      }
    },

    clean: {
      test: ['test/docs']
    },

    eslint: {
      target: ['tasks/*.js', 'test/*.js'],
      options: {
        // config: 'conf/eslint.json'
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.registerTask('test_config', [
    'sassdoc:test_config',
    'simplemocha:test',
    'clean:test'
  ]);

  grunt.registerTask('test_options', [
    'sassdoc:test_options',
    'simplemocha:test',
    'clean:test'
  ]);

  grunt.registerTask('test', function () {
    // https://github.com/yaymukund/grunt-simple-mocha/pull/30
    grunt.task.run(['test_config', 'test_options']);
  });

};
