@extends('ui::layouts.base')

@section('body')


    <div class="layout__wrapper">
        <div class="sidebar thin">
            <div class="sidebar__wrapper" data-role="sidebar">
                @include('ui::menu.sidebar')
            </div>
        </div>

        <div class="content">
            <div class="content__inner">

                @include('ui::menu.topbar')

                <div class="ui container-fluid content__body p-2">
                    @yield('content')
                </div>

            </div>
        </div>
    </div>

@endsection
