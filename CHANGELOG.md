# 0.10.3
- New assets: `AutoNumeric`

# 0.10.2
- Set active state when loading menu from array

# 0.10.1
- Hide parent menu without URL

# 0.10.0
- Support Laravel 6

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
