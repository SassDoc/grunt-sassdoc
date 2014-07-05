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

  grunt.registerMultiTask('sassdoc', 'Generates documentation', function () {
    var done = this.async();

    // Try to fetch a custom title from package,
    // defaults to 'SassDoc'.
    var pkg = grunt.file.readJSON('package.json');
    var title = pkg ? pkg.title || pkg.name : 'SassDoc';

    var options = this.options({
      title: title,
      display: {
        private: true,
        alias: true
      }
    });

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
