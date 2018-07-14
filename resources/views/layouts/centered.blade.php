@extends('ui::layouts.base')
@section('body')
    <div style="
        display: flex;
        align-items: center;
        min-height: 100vh;
        justify-content: center;"
    >
        <div style="flex: 1;">
            <div class="column six wide center aligned">
                <div class="ui segment very padded container text center aligned">
                    <h1 class="ui header">{{ config('app.name') }}</h1>
                    <div class="ui divider hidden"></div>
                    @yield('content')
                </div>
            </div>
        </div>
    </div>
@endsection

