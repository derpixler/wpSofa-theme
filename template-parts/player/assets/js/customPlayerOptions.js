const applyfilters = require( 'applyfilters' );

applyfilters.addFilter('mediaPlayerOptions', (resolve, options) => {
	options.custom = 4;
	resolve(options);
}, 1);