/*
 * grunt-sassdoc
 *
 * unlicenced
 * https://github.com/SassDoc/grunt-SassDoc/blob/master/UNLICENCE
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

  var loadJSON = function (path) {
    if (!grunt.file.exists(path)) {
      grunt.log.warn('JSON file "' + chalk.cyan(path) + '" not found.');
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
      var config = loadJSON(options.config);

      if (config) {
        options = _.assign(options, config);
        options = _.omit(options, 'config');
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
