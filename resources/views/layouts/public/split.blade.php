@extends('ui::layouts.base')
@section('body')

    <div class="layout--split m-0 p-0">
        <div class="content__left tablet or lower hidden" style="background: black">

        </div>
        <div class="content__right">
            <div class="content__right--inner ui segment basic center aligned">
                @include('ui::components.brand-image', ['class' => 'tiny centered'])
                <h2 class="ui header" style="font-weight: 400">
                    {{ config('app.name') }}
                    <div class="sub header">{{ config('app.description') }}</div>
                </h2>

                <div class="ui divider hidden section"></div>

                @yield('content')
            </div>
        </div>
    </div>
@endsection

@push('script')
    <script>
        $(".layout--split .content__left").vegas({
            delay: 10000,
            firstTransitionDuration: 1000,
            transitionDuration: 5000,
            slides: [
                { src: "{{ asset('laravolt/img/landscape/forest.jpg') }}" },
                { src: "{{ asset('laravolt/img/landscape/borobudur.jpg') }}" },
                { src: "{{ asset('laravolt/img/landscape/borobudur-evening.jpg') }}" },
                { src: "{{ asset('laravolt/img/landscape/sky.jpg') }}" },
                { src: "{{ asset('laravolt/img/landscape/sky-2.jpg') }}" },
                { src: "{{ asset('laravolt/img/landscape/bromo-tengger.jpg') }}" }
            ]
        });
    </script>
@endpush
