'use strict';

var fs = require('fs');
var test = require('tape');

test('sassdoc', function (assert) {
  assert.plan(3);

  assert.ok(
    fs.existsSync('test/docs'),
    'Should create a `docs` dir'
  );

  assert.ok(
    fs.existsSync('test/docs/index.html'),
    'Should create SassDocs index'
  );

  assert.ok(
    fs.existsSync('test/docs/assets'),
    'Should dump SassDocs assets'
  );

});
