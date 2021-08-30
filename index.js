/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

const
    name  = 'sass',
    tools = require('runner-tools'),
    log   = require('runner-logger').wrap(name);


function build ( config, done ) {
    const sass = require('sass');

    // do the magic
    sass.render(config, function ( error, result ) {
        if ( error ) {
            log.fail(error.toString());
            done(error);
        } else {
            // add css file
            const files = [{name: config.outFile, data: result.css}];

            // add map file
            if ( config.sourceMap && typeof config.sourceMap === 'string' && result.map ) {
                files.push({name: config.sourceMap, data: result.map});
            }

            // save generated result
            tools.write(files, log, done);
        }
    });
}


function clear ( config, done ) {
    const files = [config.outFile];

    // add map file
    config.sourceMap && files.push(config.sourceMap);

    tools.unlink(files, log, done);
}


function generator ( config = {}, options = {} ) {
    const
        tasks = {},
        {prefix = name + ':', suffix = ''} = options;

    // sanitize and extend defaults
    config = Object.assign({
        indentWidth: 4
    }, config);

    tasks[prefix + 'config' + suffix] = function () {
        log.inspect(config, log);
    };

    tasks[prefix + 'build' + suffix] = function ( done ) {
        build(config, done);
    };

    tasks[prefix + 'clear' + suffix] = function ( done ) {
        clear(config, done);
    };

    return tasks;
}


// export main actions
generator.methods = {
    build: build
};


// public
module.exports = generator;
