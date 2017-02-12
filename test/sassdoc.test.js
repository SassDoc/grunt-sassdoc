'use strict'

var fs = require('fs')
var path = require('path')
var test = require('tape')

var docsDir = path.resolve(process.cwd(), 'sassdoc')

test('sassdoc', function (assert) {
  assert.plan(3)

  assert.ok(
    fs.existsSync(docsDir),
    'Should create a `sassdoc` dir'
  )

  assert.ok(
    fs.existsSync(path.join(docsDir, 'index.html')),
    'Should create SassDocs index'
  )

  assert.ok(
    fs.existsSync(path.join(docsDir, 'assets')),
    'Should dump SassDocs assets'
  )
})
