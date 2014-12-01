/**
 * grunt-sassdoc
 *
 * unlicenced
 * https://github.com/SassDoc/grunt-sassdoc/blob/master/UNLICENCE
 */

'use strict';

var sassdoc = require('sassdoc');
var ensure = require('lodash').assign;

module.exports = function (grunt) {

  function cfg() {
    // Defaults.
    var options = this.options({
      noUpdateNotifier: true
    });

    // Instanciate a new SassDoc Logger.
    var logger = new sassdoc.Logger(options.verbose);

    // Load raw configuration.
    var config = sassdoc.cfg.pre(options.config, logger);

    // Ensure that options take precedence over configuration values.
    ensure(config, options);

    // Post process configuration.
    sassdoc.cfg.post(config);

    return config;
  }

  grunt.registerMultiTask('sassdoc', 'Generates documentation', function () {
    var done = this.async();
    var target = this.target;
    var config = cfg.call(this);

    function compile(filePair) {
      var src = filePair.orig.src;
      var dest = filePair.orig.dest;

      if (!src.length) {
        return grunt.fail.warn('No valid source provided');
      }

      // Emit start event if anyone is listening.
      if (grunt.event.listeners('sassdoc.start').length > 0) {
        grunt.event.emit('sassdoc.start', target, src, dest);
      }

      sassdoc.documentize(src, dest, config)
        .then(function () {
          grunt.log.ok('SassDoc documentation successfully generated.');

          // Emit done event if anyone is listening.
          if (grunt.event.listeners('sassdoc.done').length > 0) {
            grunt.event.emit('sassdoc.done', target, src, dest);
          }

          done();
        }, function (err) {
          grunt.log.error(err);
          grunt.fail.warn('SassDoc documentation failed.');
        });
    }

    this.files.forEach(compile);
  });

};
