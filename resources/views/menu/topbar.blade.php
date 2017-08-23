<header class="ui menu fixed top small">
    <div class="brand item"><h3 class="ui header inverted"><img src="{{ asset('img/logo.png') }}" class="ui image mini" alt="">{{ config('app.name') }}</h3></div>
    {{--<div class="item"><h3 class="ui header inverted">Page Header</h3></div>--}}
    <div class="menu right">
        <div class="item ui dropdown simple right">
            <i class="icon bell inverted"></i>
            <div class="menu notification">
                <div class="ui comments">
                    <h4 class="ui divider horizontal p-1">Notifikasi</h4>
                    @foreach(range(1,5) as $i)
                        <div class="p-x-1 m-b-1">
                            <a class="comment" href="#">
                                <div class="avatar">
                                    <img src="{{ asset('img/avatar.jpg') }}">
                                </div>
                                <div class="content">
                                    <span>New member joined</span>
                                    <div class="metadata">
                                        <span class="date">Today at 5:42PM</span>
                                    </div>

                                    <div class="text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    </div>
                                </div>
                            </a>
                        </div>
                    @endforeach
                </div>
                <a href="" class="item footer">Lihat Semua</a>
            </div>
        </div>
        <div class="ui item dropdown simple right">
            <img src="{{ \Laravolt\Avatar\Facade::create('Andry Botax')->toBase64() }}" alt="" class="ui image avatar">
            <i class="icon dropdown"></i>
            <div class="menu">
                <a href="{{ route('auth::logout') }}" class="item">Logout</a>
            </div>
        </div>

    </div>
</header>
