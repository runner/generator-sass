/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path  = require('path'),
    name  = 'sass',
    tools = require('@runner/tools'),
    log   = require('@runner/logger').wrap(name);


function build ( config, done ) {
    var sass = require('node-sass');

    // do the magic
    sass.render(config, function ( error, result ) {
        var targets = [],
            files;

        if ( error ) {
            log.fail(error.toString());
            done(error);
        } else {
            // add folder path for css file
            targets.push(path.dirname(config.outFile));
            // add css file
            files = [{name: config.outFile, data: result.css}];

            if ( config.sourceMap && typeof config.sourceMap === 'string' && result.map ) {
                // add folder path for map file
                targets.push(path.dirname(config.sourceMap));
                // add map file
                files.push({name: config.sourceMap, data: result.map});
            }

            tools.mkdir(targets, log, function ( error ) {
                if ( error ) {
                    done(error);
                } else {
                    // save generated result
                    tools.write(files, log, done);
                }
            });
        }
    });
}


function clear ( config, done ) {
    var files = [config.outFile];

    // add map file
    config.sourceMap && files.push(config.sourceMap);

    tools.unlink(files, log, done);
}


function generator ( config, options ) {
    var tasks = {};

    // sanitize and extend defaults
    options = Object.assign(generator.options, options || {});

    tasks[options.prefix + 'config' + options.suffix] = function () {
        log.inspect(config, log);
    };

    tasks[options.prefix + 'build' + options.suffix] = function ( done ) {
        build(config, done);
    };

    tasks[options.prefix + 'clear' + options.suffix] = function ( done ) {
        clear(config, done);
    };

    return tasks;
}


// defaults
generator.options = {
    prefix: name + ':',
    suffix: ''
};


// export main actions
generator.methods = {
    build: build
};


// public
module.exports = generator;
