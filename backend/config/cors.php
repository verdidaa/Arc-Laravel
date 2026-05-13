<?php

return [
    'paths' => ['api/*', 'oauth/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => array_filter(array_map(
        static fn (string $origin): string => trim($origin),
        explode(',', (string) env('FRONTEND_URLS', 'http://127.0.0.1:5173,http://localhost:5173'))
    )),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
