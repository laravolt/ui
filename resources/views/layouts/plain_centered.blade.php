@extends('ui::layouts.base')

@section('body')
    <div class="ui container">
        <div class="ui stackable grid centered">
            <div class="eight wide column center aligned">
                <div class="ui divider section hidden"></div>
                @yield('content')
            </div>
        </div>
    </div>
@endsection
