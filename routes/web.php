<?php

\Illuminate\Support\Facades\Route::group(
    [
        'namespace'  => '\Laravolt\Ui',
        'prefix'     => config('laravolt.ui.route.prefix'),
        'as'         => 'ui::',
        'middleware' => config('laravolt.ui.route.middleware'),
    ],
    function ($router) {
        $router->get('appearance', ['uses' => 'AppearanceController@edit', 'as' => 'appearance.edit']);
        $router->post('appearance', ['uses' => 'AppearanceController@update', 'as' => 'appearance.edit']);
    }
);
