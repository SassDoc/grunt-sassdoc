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

    // Try to fetch some custom config from package,
    var pkg = grunt.file.readJSON('package.json');
    var title = pkg ? pkg.title || pkg.name : 'SassDoc';
    var version = pkg ? 'v' + pkg.version : false;

    var options = this.options({
      config: null,
      title: title,
      version: version,
      display_access: ['public', 'private'],
      display_alias: false
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
