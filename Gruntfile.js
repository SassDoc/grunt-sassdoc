
module.exports = function (grunt) {
  'use strict';

  // Load all grunt tasks matching the `grunt-*` pattern.
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take.
  require('time-grunt')(grunt);

  grunt.initConfig({

    sassdoc: {
      test: {
        src: 'test/stylesheets',
        dest: 'test/docs',
        options: {
          config: 'test/view.json',
          // Pass additional options.
          // title: 'grunt-sassdoc test',
          // display_access: ['public'],
          display_alias: true
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

  grunt.registerTask('test', [
    'sassdoc:test',
    'simplemocha:test',
    'clean:test'
  ]);

};
