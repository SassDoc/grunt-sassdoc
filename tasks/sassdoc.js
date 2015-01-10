/**
 * grunt-sassdoc
 *
 * unlicenced
 * https://github.com/SassDoc/grunt-sassdoc/blob/master/UNLICENCE
 */

'use strict';

var sassdoc = require('sassdoc');
var ensure = require('lodash.assign');

module.exports = function (grunt) {

  function environment() {
    // Defaults.
    var options = this.options({
      noUpdateNotifier: true
    });

    // Instantiate a new SassDoc Logger.
    var logger = new sassdoc.Logger(options.verbose);

    // Instantiate a new SassDoc Environment.
    var env = new sassdoc.Environment(logger, options.strict);

    env.on('error', grunt.log.error);

    // Load and process config file, if any.
    env.load(options.config);

    // Ensure that options take precedence over configuration values.
    ensure(env, options);

    env.postProcess();

    return env;
  }

  grunt.registerMultiTask('sassdoc', 'Generates documentation', function () {
    var done = this.async();
    var target = this.target;
    var env = environment.call(this);

    function compile(filePair) {
      var src = filePair.orig.src;

      if (!src.length) {
        return grunt.fail.warn('No valid source provided');
      }

      // Emit start event if anyone is listening.
      if (grunt.event.listeners('sassdoc.start').length > 0) {
        grunt.event.emit('sassdoc.start', target, src);
      }

      sassdoc(src, env)
        .then(function () {
          grunt.log.ok('SassDoc documentation successfully generated.');

          // Emit done event if anyone is listening.
          if (grunt.event.listeners('sassdoc.done').length > 0) {
            grunt.event.emit('sassdoc.done', target, src);
          }

          done();
        })
        .catch(function (err) {
          grunt.log.error(err);
          grunt.fail.warn('SassDoc documentation failed.');
        });
    }

    this.files.forEach(compile);
  });

};
