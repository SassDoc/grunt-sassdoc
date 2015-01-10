'use strict';

var fs = require('fs');
var test = require('tape');

test('sassdoc', function (assert) {
  assert.plan(3);

  assert.ok(
    fs.existsSync('sassdoc'),
    'Should create a `docs` dir'
  );

  assert.ok(
    fs.existsSync('sassdoc/index.html'),
    'Should create SassDocs index'
  );

  assert.ok(
    fs.existsSync('sassdoc/assets'),
    'Should dump SassDocs assets'
  );

});
