let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.scripts([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/semantic-ui/dist/semantic.min.js',
    './node_modules/simplebar/dist/simplebar.js',
    'resources/assets/js/components/flash.js',
    'resources/assets/js/app.js'
], 'public/js/all.js');

mix.sass('resources/assets/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false
    });

mix.styles([
    './node_modules/simplebar/dist/simplebar.css',
    './public/css/app.css',
], 'public/css/all.css');
