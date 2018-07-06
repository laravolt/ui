<header class="ui menu small borderless fixed top b-0">
    {{--<div class="item"><h3 class="ui header">Page Header</h3></div>--}}
    {{--<div class="item">--}}
        {{--<div class="ui breadcrumb">--}}
            {{--<a class="section">Home</a>--}}
            {{--<i class="right angle icon divider"></i>--}}
            {{--<a class="section">Store</a>--}}
            {{--<i class="right angle icon divider"></i>--}}
            {{--<div class="active section">T-Shirt</div>--}}
        {{--</div>--}}
    {{--</div>--}}
    <div class="menu right">
        <div class="item ui dropdown simple right">
            <i class="icon bell"></i>
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
                <a href="" class="item footer text-center">Lihat Semua</a>
            </div>
        </div>
        <div class="ui item dropdown simple right">
            <img src="{{ \Laravolt\Avatar\Facade::create(auth()->user()->name)->toBase64() }}" alt="" class="ui image avatar">
            <i class="icon dropdown"></i>
            <div class="menu">
                <a href="{{ route('auth::logout') }}" class="item">Logout</a>
            </div>
        </div>

    </div>
</header>
