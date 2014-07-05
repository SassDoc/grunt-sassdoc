# grunt-sassdoc [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Build Status: Linux](https://travis-ci.org/pascalduez/grunt-sassdoc.png?branch=master)](https://travis-ci.org/pascalduez/grunt-sassdoc)

> [SassDoc](https://github.com/HugoGiraudel/SassDoc) grunt task.


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


### Example config

```js
grunt.initConfig({
  sassdoc: {
    default: {
      src: 'test/sass',
      dest: 'test/docs',
      display: {
        title: 'My cool project'
        private: true,
        alias: true
      }
    }
  }
});

grunt.loadNpmTasks('grunt-sassdoc');
grunt.registerTask('default', ['sassdoc']);
```

## Authors

[Pascal Duez](http://pascalduez.me)


## Licence

grunt-sassdoc is [unlicensed](http://unlicense.org/).
