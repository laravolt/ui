<?php

namespace Laravolt\Ui;

use Illuminate\Foundation\Application;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use Lavary\Menu\Builder;

/**
 * Class PackageServiceProvider
 *
 * @package Laravolt\Ui
 * @see     http://laravel.com/docs/master/packages#service-providers
 * @see     http://laravel.com/docs/master/providers
 */
class ServiceProvider extends BaseServiceProvider
{
    /**
     * Register the service provider.
     *
     * @see    http://laravel.com/docs/master/providers#the-register-method
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            'laravolt.menu',
            function (Application $app) {
                return (new Menu())->make(
                    'sidebar',
                    function (Builder $menu) {
                        return $menu;
                    }
                );
            }
        );
    }

    /**
     * Application is booting
     *
     * @see    http://laravel.com/docs/master/providers#the-boot-method
     * @return void
     */
    public function boot()
    {
        $this->mergeConfigFrom(
            $this->packagePath('config/config.php'),
            'laravolt.ui'
        );
        $this->publishes(
            [
                $this->packagePath('config/config.php') => config_path('laravolt/ui.php'),
                $this->packagePath('config/menu.php') => config_path('laravolt/menu.php'),
            ]
        );

        $theme = $this->app['config']->get('laravolt.ui.sidebar_theme');
        $themeOptions = $this->app['config']->get('laravolt.ui.themes.'.$theme);
        $this->app['config']->set('laravolt.ui.options', $themeOptions);

        $this->registerViews();

        $this->registerFlash();

        $this->overridePaginationView();

        if (!$this->app->runningInConsole()) {
            $this->app['router']->pushMiddlewareToGroup('web', FlashMiddleware::class);
        }

        // register command
        $this->commands(AssetLinkCommand::class);

        $this->registerMenu();

        $this->registerAssets();
    }

    /**
     * Loads a path relative to the package base directory
     *
     * @param  string $path
     * @return string
     */
    protected function packagePath($path = '')
    {
        return sprintf("%s/../%s", __DIR__, $path);
    }

    /**
     * Register the package views
     *
     * @see    http://laravel.com/docs/master/packages#views
     * @return void
     */
    protected function registerViews()
    {
        // register views within the application with the set namespace
        $this->loadViewsFrom(realpath(__DIR__ . '/../resources/views'), 'ui');

        // allow views to be published to the storage directory
        $this->publishes(
            [realpath(__DIR__ . '/../resources/views') => base_path('resources/views/vendor/ui')],
            'views'
        );
    }

    protected function registerFlash()
    {
        $this->app->singleton('laravolt.flash', function (Application $app) {
            return $app->make(Flash::class);
        });

        $this->app->singleton('laravolt.flash.middleware', function (Application $app) {
            return new FlashMiddleware($app['laravolt.flash']);
        });
    }

    protected function registerMenu()
    {
        $this->mergeConfigFrom(
            $this->packagePath('config/menu.php'),
            'laravolt.menu'
        );

        $this->app->singleton('laravolt.menu.builder', function (Application $app) {
            return $app->make(MenuBuilder::class);
        });

        $this->app['laravolt.menu.builder']->loadArray(config('laravolt.menu'));
    }

    protected function overridePaginationView()
    {
        Paginator::defaultView('ui::pagination.default');
        Paginator::defaultSimpleView('ui::pagination.simple');
    }

    protected function registerAssets()
    {
        $this->app->register(\Stolz\Assets\Laravel\ServiceProvider::class);
        app('stolz.assets.group.laravolt')->add('vegas');
    }
}
