const config = () => {
    const tmpFolder = '/tmp/'+ this.themeName;

	return {
		production : {
			onStart: {
				delete: [
					'./'+ this.packageBase + '/tmp/'+ this.moduleBase + '/player/assets'
				]
			},
			onEnd  : {
				copy  : [
					{ source: './assets/dist/'+ this.version + '/', destination: './'+ this.packageBase + tmpFolder + '/assets/dist/' + this.version },
					{ source: './assets/fonts/', destination: './'+ this.packageBase + tmpFolder + '/assets/fonts' },
					{ source: './functions.php', destination: './'+ this.packageBase + tmpFolder },
					{ source: './style.css', destination: './'+ this.packageBase + tmpFolder },
					{ source: './screenshot.png', destination: './'+ this.packageBase + tmpFolder },
					{ source: './composer.json', destination: './'+ this.packageBase + tmpFolder },
					{ source: './'+ this.moduleBase, destination: './'+ this.packageBase + tmpFolder + '/'+ this.moduleBase },
				],
				mkdir  : [
					'./'+ this.packageBase + '/packages'
				],
				archive: [
					{
						source     : './'+ this.packageBase + '/tmp/',
						destination: './'+ this.packageBase + '/packages/build-' + this.version + '.tar.gz',
						format     : 'tar',
						options    : {
							gzip       : true,
							gzipOptions: {
								level: 1
							},
							globOptions: {
								nomount: true
							}
						}
					}
				],
				delete : [
					'./'+ this.packageBase + '/tmp',
					'./assets/dist/' + this.version
				]
			}
		},
		development: {
			onStart: {
				delete: [ './assets/dist/' ]
			}
		}} ///
};

module.exports = ( mode, themeName, packageBase, moduleBase, version ) => {
	this.mode = mode || null;
	this.themeName = themeName || null;
	this.packageBase = packageBase || null;
	this.moduleBase = moduleBase || null;
	this.version = version || null;

	return config()[ mode ];
};
