Tasks generator for SASS
========================

[![build status](https://img.shields.io/travis/runner/generator-sass.svg?style=flat-square)](https://travis-ci.org/runner/generator-sass)
[![npm version](https://img.shields.io/npm/v/runner-generator-sass.svg?style=flat-square)](https://www.npmjs.com/package/runner-generator-sass)
[![dependencies status](https://img.shields.io/david/runner/generator-sass.svg?style=flat-square)](https://david-dm.org/runner/generator-sass)
[![devDependencies status](https://img.shields.io/david/dev/runner/generator-sass.svg?style=flat-square)](https://david-dm.org/runner/generator-sass?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/runner)
[![RunKit](https://img.shields.io/badge/RunKit-try-yellow.svg?style=flat-square)](https://npm.runkit.com/runner-generator-sass)


## Installation ##

```bash
npm install runner-generator-sass
```


## Usage ##

Add to the scope:

```js
const generator = require('runner-generator-sass');
```

Generate tasks according to the given config:

```js
const tasks = generator({
    file: 'src/sass/develop.scss',
    outFile: 'build/develop/main.css',
    sourceMap: 'build/develop/main.css.map'
});
```

Add generated tasks to the `runner` instance:

```js
const runner = require('runner');

Object.assign(runner.tasks, tasks);
```

The following tasks will become available:

 Task name     | Description
---------------|-------------
 `sass:config` | prints the current configuration used for generated tasks
 `sass:build`  | performs sass compilation 
 `sass:clear`  | removes compiled files

Generator accepts two arguments: base configuration and additional options.


### Base configuration ###

It's a node-sass [config](https://www.npmjs.com/package/node-sass#options) passed to the [render](https://www.npmjs.com/package/node-sass#render-callback--v300).


### Additional options ###

It's an object with the following properties:

 Name   | Description
--------|-------------
 prefix | an affix placed before a task name (default is `sass:`)  
 suffix | a string added at the end of a task name (empty by default)
 
So it's possible to change generated tasks names: 

```js
Object.assign(runner.tasks,
    generator(config, {
        prefix: 'css:',
        suffix: ':develop'
    })
);
```

It will add the following tasks:

* `css:config:develop` 
* `css:build:develop`  
* `css:clear:develop`  
 

## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/runner/generator-sass/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`runner-generator-sass` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
