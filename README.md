# laravolt/ui

## Install

### 1. Register package via composer

``` bash
$ composer require laravolt/ui
```

## 2. Register service provider

``` php
...
/*
 * Package Service Providers...
 */
Laravolt\Ui\ServiceProvider::class,
...
```

## 3. Link assets
`php artisan laravolt:link-assets`

## SIDEBAR MENU

publish configuration file
`php artisan vendor:publish --provider=Laravolt\Ui\ServiceProvider --tag=config`
there will be file `config/laravolt/menu.php` and example menu inside it.
```php
/**
 * Example Menu
 */
'Main Menu' => [
    'menu' => [
        // Menu 1
        'Menu 1' => [
            'data' => [
                'icon' => 'circle outline',
                'permission' => 'read post' // for authorization
            ],
            // Sub Menu 1-*
            'menu' => [
                'Sub Menu 1-1' => ['route' => 'home'],
                'Sub Menu 1-2' => ['url' => '#'],
                'Sub Menu 1-3' => ['url' => '#'],
                ]
            ],
        // Menu 2
        'Menu 2' => ['url' => '#', 'data' => ['icon' => 'circle outline']],
    ]
],
```
example above will resulted like this
```
Main Menu
|-- ○ Menu 1
|    |-- Sub Menu 1-1 (route: 'home')
|    |-- Sub Menu 1-2 (url: '#')
|    +-- Sub Menu 1-3 (url: '#')
+-- ○ Menu 2 (url: '#')
```
add your `section title` in `key of top-level array configuration`
and add menus or submenus in `['menu' => [ /* add your menus here */]`
and add data to your menu in `['data' => [/* your key => value pair of data */] ]`
