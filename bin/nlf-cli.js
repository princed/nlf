#!/usr/bin/env node

/**
 *
 * @description cli for nlf
 *
 * @author Ian Kelly
 * @copyright Copyright (C) Ian Kelly
 *
 * @license http://opensource.org/licenses/MIT The MIT License
 * 
 */

'use strict';

var program = require('commander'),
	pjson = require('../package.json'),
	nlf = require('../lib/nlf'),
	standardFormat = require('../lib/formatters/standard'),
	options = {
		directory: process.cwd()
	};

program
	.version(pjson.version)
	.option('-d, --no-dev', 'exclude development dependencies')
	.parse(process.argv);

options.production = !program.dev;

nlf.find(options, function (err, data) {

	if (err) {
		console.error(err);
		process.exit(1);
	}

	if (data && data.length > 0) {
		standardFormat.render(data, function (err, output) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			console.log(output);
		});
	}

});

