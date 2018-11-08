<?php

return [

    /**
     * Example Menu
     */
    'Main Menu' => [
        'menu' => [
            // Menu 1
            'Menu 1' => [
                'data' => [
                    'icon' => 'circle outline'
                ],
                // Sub Menu 1-*
                'menu' => [
                    'Sub Menu 1-1' => ['url' => '#'],
                    'Sub Menu 1-2' => '#', // string value is pointing to url.
                    'Sub Menu 1-3' => '#',
                    ]
                ],
            // Menu 2
            'Menu 2' => ['url' => '#', 'data' => ['icon' => 'circle outline']],
        ]
    ],
];
