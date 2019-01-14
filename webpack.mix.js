const mix = require('laravel-mix');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');

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
            compressionOptions: { numiterations: 15 },
            algorithm(input, compressionOptions, callback) {
                return zopfli.gzip(input, compressionOptions, callback);
            }
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
