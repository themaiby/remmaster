const mix = require('laravel-mix');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let wpPlugins = [];
if (mix.inProduction()) {
    wpPlugins = [new CompressionPlugin({
        compressionOptions: {numiterations: 15},
        algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback);
        }
    })];
}

mix
    .ts('resources/js/app.ts', 'public/js')
    .options({
        processCssUrls: false,
    })
    .webpackConfig({
        module: {},
        resolve: {
            alias: {
                "@": require("path").resolve(__dirname, "resources/js")
            },
        },
        output: {
            publicPath: '/',
            chunkFilename: 'js/[name].[chunkhash].js',
        },
        plugins: wpPlugins,
    });

if (mix.inProduction()) {
    mix.version();
}

if (!mix.inProduction()) {
    mix.browserSync('homestead.test');
    mix.sourceMaps();
}
