{{--test update view--}}
<header class="ui inverted menu fixed top small borderless">
    <div class="brand item"><img src="{{ asset('img/logo.png') }}" class="ui image small" alt=""></div>
    <div class="item"><h3 class="ui header inverted">{{ config('app.name') }} Workspace</h3></div>
    <div class="ui item link dropdown dropdown-kcdio" data-fullTextSearch="true">
        @if(session(config('app.kcdio_session_selected_id')))
            {{ session(config('app.kcdio_session_selected_title')) }}
        @else
            @if(auth()->user()->isKcdioAdmin())
            {{ session(config('app.kcdio_session_selected_title')) }}
            @else
            Switch KCDIO
            @endif
        @endif
        @if(auth()->user()->isKcdioAdmin())
            {{-- cannot switch KCDIO --}}
        @else
            <i class="angle down icon" style="margin-left: 10px"></i>
            <div class="menu kcdio-switcher">
                <div class="ui icon search input large transparent inverted">
                    <i class="search icon"></i>
                    <input type="text" placeholder="Search KCDIO...">
                </div>
                <div class="scrolling menu">
                    <a href="{{ route('comma::kcdio.select', 0) }}" class="item">
                        <i class="icon browser olive"></i>
                        All KCDIO
                    </a>
                    @foreach($kcdio_menu as $kcdio)
                        <a href="{{ route('comma::kcdio.select', $kcdio->id) }}" class="item" data-value="#{{ $kcdio->title }}">
                            <i class="icon university olive"></i>
                            {{ ucfirst($kcdio->meta['kcdio_type']) }} : {{ $kcdio->title }}
                        </a>
                    @endforeach
                </div>
            </div>
        @endif
    </div>

    <div class="menu right">
        <div class="ui item dropdown right">
            Login as {{ auth()->user()->name }}
            <i class="icon dropdown"></i>
            <div class="menu">
                <a href="{{ route('auth::logout') }}" class="item">Logout</a>
            </div>
        </div>
    </div>
</header>

@push('style')
    <style>
        .ui.menu .dropdown.item .menu.kcdio-switcher {
            background-color: #1b7680;
            border-radius: 0 !important;
        }

        .ui.menu .dropdown.item .menu.kcdio-switcher .menu {
            background-color: #259dab;
        }

        .ui.menu .ui.dropdown .menu.kcdio-switcher .menu > .item {
            color: #fff !important;
            padding: 15px 20px !important;
            border-bottom: 1px solid #22909d;
        }

        .ui.menu .ui.dropdown .menu.kcdio-switcher .menu .selected.item {
            background-color: #b5cc18 !important;
            font-weight: 500 !important;
        }

        .ui.menu .ui.dropdown .menu.kcdio-switcher .menu .selected.item .icon {
            color: #fff !important;
        }
    </style>
@endpush

@push('script')
    <script>
        $(function () {
            $('.dropdown-kcdio').dropdown({
                action: function (text, value, dropdown) {
                    window.location = value;
                },
                fullTextSearch: true
            });
        });
    </script>
@endpush
