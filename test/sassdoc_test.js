
'use strict';

var fs = require('fs');
var assert = require('assert');

describe('sassdoc', function () {

  it('Should create a `docs` dir', function () {
    assert(fs.existsSync('test/docs'));
  });

  it('Should create SassDocs files', function () {
    assert(fs.existsSync('test/docs/index.html'));
    assert(fs.existsSync('test/docs/assets'));
  });

});
