var webpackConf = require('./webpack.config.js');

webpackConf.entry = {};
webpackConf.module.postLoaders = [
    {
        test: /\.ts$/,
        loader: 'istanbul-instrumenter-loader',
        exclude: [
            'node_modules',
			/test/
        ]
    }
];

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', 'source-map-support'],
		logLevel: config.LOG_INFO,
		browsers: ['PhantomJS'], 
		singleRun: true,
		reporters: ['dots', 'coverage'], 
		files: [
			'node_modules/angular/angular.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'src/index.ts',
			'test/index.ts'
		],
		webpack: webpackConf,
		preprocessors: {
			'src/index.ts': ['webpack'],
			'test/index.ts': ['webpack']
		},
		coverageReporter: {
			reporters: [
				{ type: 'lcovonly', dir: 'coverage/' },
				{ type: 'text-summary' }
			]
		},
		mime: {
			'text/x-typescript': ['ts']
		}
	});
};
