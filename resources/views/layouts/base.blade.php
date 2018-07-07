<!DOCTYPE html>
<html>
<head>
    <title>@yield('site.title', "Welcome Home") | {{ config('app.name') }}</title>

    <meta charset="UTF-8"/>
    <meta http-equiv="x-ua-compatible" content="IE=edge, chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    @stack('meta')

    <link rel="stylesheet" type="text/css" href="{{ asset('laravolt/semantic/semantic.min.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('laravolt/css/all.css') }}"/>
    @stack('style')
    @stack('head')

</head>

<body class="layout--sidebar">

@yield('body')

<script type="text/javascript" src="{{ asset('laravolt/js/all.js') }}"></script>
@stack('script')
@stack('body')

</body>
</html>
