# 0.9.0
## Rename folder `lib` to `plugins`
To comply with Vega pentest.

## Add support to skip flash message for certains URI
Added new config:
```php
    'flash'          => [
        'except' => [],
    ],
```

## Move flash attributes config to their own namespace:
Old:
```php
    'flash'          => [
            'display_time' => 5000,
            'opacity' => 0.9,
            'position' => 'top center',
    ],
```
New:
```php
    'flash'          => [
        'attributes' => [
            'display_time' => 5000,
            'opacity' => 0.9,
            'position' => 'top center',
        ],
    ],
```
