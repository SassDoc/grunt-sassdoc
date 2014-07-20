
'use strict';

var fs = require('fs');
var test = require('tape');

test('sassdoc', function (t) {
  t.plan(3);

  t.assert(
    fs.existsSync('test/docs'),
    'Should create a `docs` dir'
  );

  t.assert(
    fs.existsSync('test/docs/index.html'),
    'Should create SassDocs index'
  );

  t.assert(
    fs.existsSync('test/docs/assets'),
    'Should dump SassDocs assets'
  );
});
