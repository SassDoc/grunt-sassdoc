/*
 * grunt-sassdoc
 *
 * unlicenced
 * https://github.com/pascalduez/grunt-SassDoc/blob/master/UNLICENCE
 */

module.exports = function (grunt) {
  'use strict';

  var sassdoc = require('sassdoc');
  var chalk = require('chalk');
  var _ = require('lodash');

  var validateSrc = function (filePair) {
    return filePair.src.filter(function (filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + chalk.cyan(filepath) + '" not found.');
        return false;
      }
      else {
        return true;
      }
    });
  };

  var loadConfig = function (path) {
    if (!grunt.file.exists(path)) {
      grunt.log.warn('Config file "' + chalk.cyan(path) + '" not found.');
      return false;
    }
    else {
      return grunt.file.readJSON(path);
    }
  };

  grunt.registerMultiTask('sassdoc', 'Generates documentation', function () {
    var done = this.async();

    var options = this.options({
      config: null,
      display: {
        access: ['public', 'private'],
        alias: false,
        watermark: true
      },
      package: null
    });

    // If a config file is passed and found,
    // its options will prevail over defauts.
    if (options.config) {
      var config = loadConfig(options.config);

      if (config) {
        options = _.assign(options, config);
        options = _.omit(options, 'config');
      }
    }

    this.files.forEach(function (filePair) {
      var src = validateSrc(filePair);

      if (!src.length) {
        return grunt.fail.warn('No valid source provided');
      }

      sassdoc.documentize(src[0], filePair.dest, options)
        .then(function () {
          grunt.log.ok('SassDoc documentation successfully generated.');
          done();
        })
        .catch(function (err) {
          grunt.log.error(err);
          grunt.fail.warn('SassDoc documentation failed.');
        });
    });
  });

};
