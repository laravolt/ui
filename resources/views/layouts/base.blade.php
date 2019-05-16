<!DOCTYPE html>
<html>
<head>
    <title>@yield('site.title', "Welcome Home") | {{ config('app.name') }}</title>

    <meta charset="UTF-8"/>
    <meta http-equiv="x-ua-compatible" content="IE=edge, chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    @stack('meta')

    <link rel="stylesheet" type="text/css" href="{{ mix('semantic/semantic.min.css', 'laravolt') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ mix('css/all.css', 'laravolt') }}"/>
    @stack('style')
    @stack('head')
    {!! Assets::group('laravolt')->css() !!}
    {!! Assets::css() !!}
</head>

<body data-theme="{{ config('laravolt.ui.sidebar_theme') }}" class="{{ $bodyClass ?? '' }}">

@yield('body')


<script type="text/javascript" src="{{ mix('js/vendor.js', 'laravolt') }}"></script>
<script src="https://cdn.jsdelivr.net/npm/swup@1.9.0/dist/swup.min.js"></script>
<script type="text/javascript" src="{{ mix('js/init.js', 'laravolt') }}"></script>
<script>
  const swup = new Swup({cache: false});    // only this line when included with script tag
</script>

{!! Assets::group('laravolt')->js() !!}
{!! Assets::js() !!}
@stack('script')
@stack('body')
</body>
</html>
