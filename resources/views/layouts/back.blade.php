@extends('ui::layouts.base')

@section('page.id', 'layout-sidebar')

@section('body')

    <div class="full height">
        <div class="toc">
            <div class="toc__content">
                @include('ui::menu.sidebar')
            </div>
        </div>

        <div class="content">
            <div class="content__inner">

                @include('ui::menu.topbar')

                <div class="ui container content__body">

                    <div class="ui segment basic very padded">
                        @yield('content')
                    </div>
                </div>
                <div class="ui divider section hidden"></div>

            </div>
        </div>
    </div>

@endsection
