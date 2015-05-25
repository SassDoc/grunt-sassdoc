'use strict';

var fs = require('fs');
var path = require('path');
var test = require('tape');

test('sassdoc', function (assert) {
  assert.plan(3);

  assert.ok(
    fs.existsSync(path.resolve(__dirname, 'sassdoc')),
    'Should create a `sassdoc` dir'
  );

  assert.ok(
    fs.existsSync(path.resolve(__dirname, 'sassdoc/index.html')),
    'Should create SassDocs index'
  );

  assert.ok(
    fs.existsSync(path.resolve(__dirname, 'sassdoc/assets')),
    'Should dump SassDocs assets'
  );

});
