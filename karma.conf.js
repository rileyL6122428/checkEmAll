function KarmaConfig(config) {
    var configuration = {
        frameworks: ['browserify', 'jasmine'],
        files: [
            './node_modules/babel-polyfill/dist/polyfill.js',
            './node_modules/jquery/dist/jquery.js',
            './node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            'scripts/spec/**/*.spec.*',
        ],
        preprocessors: {
            './scripts/spec/**/*.spec.*': ['browserify'],
        },
        browsers: ['PhantomJS'],
        singleRun: false,
        browserify: {
            debug: true,
            paths: ['./node_modules', './frontend/src'],
            transform: [
              ['babelify', { presets: ['es2015', 'react'] }],
              'partialify'
            ],
            extensions: ['.js', '.jsx', '.html'],
        },
    };

    config.set(configuration);
}

module.exports = KarmaConfig;
