# grunt-sassdoc [![npm version](http://img.shields.io/npm/v/grunt-sassdoc.svg?style=flat)](https://www.npmjs.org/package/grunt-sassdoc) [![Build Status: Linux](http://img.shields.io/travis/SassDoc/grunt-sassdoc.svg?style=flat)](https://travis-ci.org/SassDoc/grunt-sassdoc?branch=master)

> [SassDoc](https://github.com/SassDoc/sassdoc) Grunt task.


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```sh
npm install --save-dev grunt-sassdoc
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sassdoc');
```

*Tip: the [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) module makes it easier to load multiple grunt tasks.*


[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started



## Documentation

See the [Gruntfile](Gruntfile.js) in this repo for a full example.


## SassDoc task
_Run this task with the `grunt sassdoc` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.



## Options

Any specified option will be passed through directly to SassDoc, thus you can specify any option that SassDoc supports.
See the [SassDoc documentation](https://github.com/SassDoc/sassdoc/wiki/Customising-the-View) for a list of supported options.


#### verbose

Type: `Boolean`  
Default: `false`

Whether to enable SassDoc own logger or not.


#### config

Type: `String`  
Default: `null`

Path to a view configuration file.


#### display.access

Type: `Array`  
Default: `['public', 'private']`

Access levels that should be displayed.


#### display.alias

Type: `Boolean`  
Default: `false`

Enable/disable display of alias items.


#### display.watermark

Type: `Boolean`  
Default: `true`

Enable/disable display of SassDoc watermark in footer.


#### package

Type: `String | Object`  
Default: `null`

Pass your project informations to the generated view.
Either a path to your `package.json` or an object.

Following keys will be looked for:
`title`
`name`
`version`
`license`
`homepage`
`description`


#### theme


Type: `String`  
Default: `'default'`  
Since: `sassdoc@1.2.0`

Name of a custom theme, either a published package or a local one.
Check the [doc](https://github.com/SassDoc/sassdoc/wiki/Using-Your-Own-Theme) for more infos.


#### groups

Type: `Object`  
Default: `{ 'undefined': 'Ungrouped' }`  
Since: `sassdoc@1.2.0`

Give friendly names to your groups, if any.
Check the [doc](https://github.com/SassDoc/sassdoc-filter#group-name) for more infos.


#### basePath

Type: `String`  
Default: `null`  
Since: `sassdoc@1.2.0`

An URL or a path which will be transformed in a link to the source file.
Check the [doc](https://github.com/SassDoc/sassdoc/wiki/Customising-the-View) for more infos.



_**Heads up**: If a config file is passed and found, its options will prevail over defaults.
Additional options passed to the Grunt task, will complement it but not override it.
You should really manage your options in one place._



### Config examples

```js
// Bare minimum example.
grunt.initConfig({
  sassdoc: {
    default: {
      src: 'path/to/sass',
      dest: 'path/to/docs'
    }
  }
});
```

```js
// Example with external view configuration file.
grunt.initConfig({
  sassdoc: {
    default: {
      src: 'path/to/sass',
      dest: 'path/to/docs',
      options: {
        config: 'path/to/view.json'
      }
    }
  }
});
```

```js
// Example with passed in options.
// Tip: you're not required to to pass every options,
// just override the one you need.
grunt.initConfig({
  sassdoc: {
    default: {
      src: 'path/to/sass',
      dest: 'path/to/docs',
      options: {
        display: {
          access: ['public', 'private'],
          alias: true,
          watermark: true
        },
        package: './package.json',
        theme: 'sassdoc-theme-dark',
        groups: {
          'slug': 'Title',
          'helpers': 'Helpers',
          'hacks': 'Dirty Hacks & Fixes',
          'undefined': 'Ungrouped'
        },
        basePath: 'https://github.com/SassDoc/sassdoc'
      }
    }
  }
});
```


### Events

This task will emit a `start` event when compilation begins, and a `done` event on completion.
This is useful if you would like simple notifications about the compile process.
**The start and done events are not intended for replacing the standard Grunt API for configuring and running tasks.**  
Here is a simple example using them:

```js
// Examples using start and done events.
grunt.event.on('sassdoc.start', function (target, src, dest) {
  grunt.log.writeln(target + ': compiling ' + src + ' to ' + dest);
});

grunt.event.on('sassdoc.done', function (target, src, dest) {
  grunt.log.writeln(target + ': ' + src + ' compiled to ' + dest);
});
```



## Authors

[Pascal Duez](http://pascalduez.me)


## Licence

grunt-sassdoc is [unlicensed](http://unlicense.org/).
