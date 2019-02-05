const mix = require('laravel-mix');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/* DEV OPTIONS */
let wpPluginsDev = [];
let chunkNamesDev = 'js/[name].js';
if (!mix.inProduction()) {
    // hot reload
    mix.browserSync('homestead.test');
    // debug helper
    mix.sourceMaps();
}


/* PROD OPTIONS */
let wpPluginsProd = [new CompressionPlugin({
    compressionOptions: {numiterations: 15},
    test: /\.js$|\.html$|\.svg$|\.ttf$/,
    algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
    }
})];
// will prevent script caching
let chunkNamesProd = 'js/[name].[chunkhash].js';


mix
    .ts('resources/js/app.ts', 'public/js').options({processCssUrls: true})
    .styles(
        [
            'node_modules/@mdi/font/css/materialdesignicons.css',
            'node_modules/vuetify/dist/vuetify.min.css',
            'resources/js/style.css'
        ],
        'public/css/style.css'
    )
    .copy('node_modules/@mdi/font/fonts', 'public/fonts')
    .webpackConfig({
        module: {},
        resolve: {
            alias: {"@": require("path").resolve(__dirname, "resources/js")},
        },
        output: {
            publicPath: '/',
            chunkFilename: mix.inProduction() ? chunkNamesProd : chunkNamesDev,
        },

        plugins: mix.inProduction() ? wpPluginsProd : wpPluginsDev,
    });
