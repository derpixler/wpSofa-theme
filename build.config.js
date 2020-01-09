const glob = require("glob");

const config = () => {
    const tmpFolder = '/tmp/'+ this.themeName;
    const moduleFiles = glob.sync('./' + this.moduleBase + '/**/*.php');

    let moduleFilesToCopy = [
        { source: './assets/dist/'+ this.version + '/', destination: './'+ this.packageBase + tmpFolder + '/assets/dist/' + this.version },
        { source: './assets/fonts/', destination: './'+ this.packageBase + tmpFolder + '/assets/fonts' },
        { source: './functions.php', destination: './'+ this.packageBase + tmpFolder },
        { source: './style.css', destination: './'+ this.packageBase + tmpFolder },
        { source: './screenshot.png', destination: './'+ this.packageBase + tmpFolder },
        { source: './inc/', destination: './'+ this.packageBase + tmpFolder + '/inc' },
        { source: './templates/', destination: './'+ this.packageBase + tmpFolder + '/templates' }
    ];

    if(moduleFiles.length > 0){
        moduleFiles.map((file, index) => {
            moduleFilesToCopy.push( {
                source: file,
                destination: './'+ this.packageBase + tmpFolder + '/' + file.replace('./','')
            });
        });
    }

	return {
		production : {
			onEnd  : {
				copy  : moduleFilesToCopy,
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
					//'./'+ this.packageBase + '/tmp',
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
