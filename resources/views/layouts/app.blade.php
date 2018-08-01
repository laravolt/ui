@extends('ui::layouts.base')

@section('body')
    <div class="layout--sidebar" data-theme="{{ config('laravolt.ui.sidebar_theme') }}">
        @include('ui::menu.sidebar')

        <div class="content">
            <div class="content__inner">

                @include('ui::menu.topbar')

                <div class="ui container-fluid content__body p-1">
                    @yield('content')
                </div>

            </div>
        </div>
    </div>
@endsection
