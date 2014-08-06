/*
 * grunt-sassdoc
 *
 * unlicenced
 * https://github.com/SassDoc/grunt-sassdoc/blob/master/UNLICENCE
 */

'use strict';

var sassdoc = require('sassdoc');
var chalk = require('chalk');
var _ = require('lodash');

module.exports = function (grunt) {

  function validateSrc(filePair) {
    return filePair.src.filter(function (filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + chalk.cyan(filepath) + '" not found.');
        return false;
      }
      else {
        return true;
      }
    });
  }

  function loadJSON(path) {
    if (!grunt.file.exists(path)) {
      grunt.log.warn('JSON file "' + chalk.cyan(path) + '" not found.');
      return false;
    }
    else {
      return grunt.file.readJSON(path);
    }
  }

  function handleOptions() {
    // Defaults
    var options = this.options({
      verbose: false,
      config: null,
      display: {
        access: ['public', 'private'],
        alias: false,
        watermark: true
      },
      groups: {
        'undefined': 'Ungrouped'
      },
      package: null,
      theme: 'default',
      basePath: null
    });

    // If a config file is passed and found,
    // its options will prevail over defauts.
    if (options.config) {
      var config = loadJSON(options.config);

      if (config) {
        options = _.assign(options, config);
      }
    }

    // If a package path is passed try to load the file.
    if (_.isString(options.package)) {
      options.package = loadJSON(options.package);
    }
    // If options.package is not usable, delete it.
    if (!_.isPlainObject(options.package) || _.isEmpty(options.package)) {
      options = _.omit(options, 'package');
    }

    // Enable SassDoc logger.
    if (options.verbose) {
      sassdoc.logger.enabled = true;
    }

    // Clean options not expected by SassDoc.
    options = _.omit(options, ['verbose', 'config']);

    return options;
  }


  grunt.registerMultiTask('sassdoc', 'Generates documentation', function () {
    var done = this.async();
    var target = this.target;
    var options = handleOptions.call(this);

    function compile(filePair) {
      var src = validateSrc(filePair);
      var dest = filePair.dest;

      if (!src.length) {
        return grunt.fail.warn('No valid source provided');
      }

      src = src[0];

      // Emit start event if anyone is listening.
      if (grunt.event.listeners('sassdoc.start').length > 0) {
        grunt.event.emit('sassdoc.start', target, src, dest);
      }

      sassdoc.documentize(src, dest, options)
        .then(function () {
          grunt.log.ok('SassDoc documentation successfully generated.');

          // Emit done event if anyone is listening.
          if (grunt.event.listeners('sassdoc.done').length > 0) {
            grunt.event.emit('sassdoc.done', target, src, dest);
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
