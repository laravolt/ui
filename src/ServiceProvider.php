<?php

namespace Laravolt\Ui;

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Http\Kernel;
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

        // register command
        $this->commands(AssetLinkCommand::class);
    }

    /**
     * Application is booting
     *
     * @see    http://laravel.com/docs/master/providers#the-boot-method
     * @return void
     */
    public function boot()
    {
        $this->registerViews();

        $this->registerFlash();

        if (!$this->app->runningInConsole()) {
            $this->app['router']->pushMiddlewareToGroup('web', FlashMiddleware::class);
        }
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
}
