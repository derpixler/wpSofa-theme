const config = () => {
	return {
		production : {
			onStart: {
				delete: [
					'./'+ this.packageBase + '/tmp/'+ this.moduleBase + '/player/assets'
				]
			},
			onEnd  : {
				copy  : [
					{ source: './assets/dist/'+ this.version + '/', destination: './'+ this.packageBase + '/tmp/assets/dist/' + this.version },
					{ source: './assets/fonts/', destination: './'+ this.packageBase + '/tmp/assets/fonts' },
					{ source: './functions.php', destination: './'+ this.packageBase + '/tmp' },
					{ source: './style.css', destination: './'+ this.packageBase + '/tmp' },
					{ source: './screenshot.png', destination: './'+ this.packageBase + '/tmp' },
					{ source: './composer.json', destination: './'+ this.packageBase + '/tmp' },
					{ source: './'+ this.moduleBase, destination: './'+ this.packageBase + '/tmp/'+ this.moduleBase },
				],
				mkdir  : [
					'./'+ this.packageBase + '/packages'
				],
				archive: [
					{
						source     : './'+ this.packageBase + '/tmp',
						destination: './'+ this.packageBase + '/packages/'+ this.themeName + '-' + this.version + '.tar.gz',
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
