var webpackConf = {
  devtool: 'inline-source-map',
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` extension will be handled by `ts-loader`
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.ts$/,
        loader: 'istanbul-instrumenter-loader',
        enforce: 'post',
        exclude: [
          /node_modules/,
          /test/
        ]
      }
    ]
  }
};

module.exports = function (config) {
	config.set({
    client: {
      captureConsole: false,
    },
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
