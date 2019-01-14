const mix = require('laravel-mix');
const CompressionPlugin = require('compression-webpack-plugin');

mix.ts('resources/js/app.ts', 'public/js').options({
    processCssUrls: false,
    uglify: true,
}).webpackConfig({
    output: {
        publicPath: '/',
        chunkFilename: 'js/[name].[chunkhash].js',
    },
    plugins: [
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    ],
});

if (mix.inProduction()) {
    mix.version();
}

if (!mix.inProduction()) {
    mix.browserSync('homestead.test');
    mix.sourceMaps();
}
