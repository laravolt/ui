<?php

// @todo: move filter somewhere else
$items = app('laravolt.menu')->roots()->filter(
    function ($item) {
        $skipAuthorization = $item->data('permission') === null;

        return $skipAuthorization || auth()->user()->can($item->data('permission'));
    }
);

?>
<nav class="sidebar">
    <div class="sidebar__wrapper" data-role="sidebar">

        <div class="sidebar__menu">
            @include('ui::menu.sidebar_brand')

            <div class="ui attached vertical menu fluid list" data-role="quick-menu">
                @include('ui::components.searchbox')
                <div class="items">

                </div>
            </div>

            <div class="ui attached vertical menu fluid list" data-role="original-menu">
                @if(!$items->isEmpty())

                    @foreach($items as $item)
                        @if (! auth()->user()->can($item->data('permission')))
                            @continue
                        @endif
                        {{--check if current menu opened--}}
                        @php
                            $opened = false;
                            $validChildren = 0;
                        @endphp
                        @foreach($item->children() as $submenu)
                            @if($submenu->isActive)
                                @php
                                    $opened = true;
                                @endphp
                            @endif
                            @if(auth()->user()->can($submenu->data('permission')))
                                @php
                                    $validChildren++;
                                @endphp
                            @endif
                        @endforeach

                        @if($item->hasChildren() && $validChildren > 0)
                            <div class="item">
                                <div class="header">{{ $item->title }}</div>
                            </div>
                            @include('ui::menu.sidebar_items', ['items' => $item->children()])
                        @elseif(!$item->hasChildren() && auth()->user()->can($item->data('permission')))
                            <div class="ui accordion sidebar__accordion">
                                <a class="title empty {{ Laravolt\Ui\Menu::setActiveParent($item->children(), $item->link->isActive) }}"
                                   href="{{ $item->url() }}">
                                    <i class="left icon {{ $item->data('icon') }}"></i>
                                    {{ $item->title }}
                                </a>
                                <div class="content"></div>
                            </div>
                        @endif
                    @endforeach
                @endif
            </div>
        </div>
    </div>
</nav>

@push('script')
    <script>
        $('[data-role="sidebar"]').on('keyup', '[data-role="quick-menu"] input', function (e) {

            var keyword = $(e.currentTarget).val();
            $('[data-role="quick-menu"] .items').html("");

            if (keyword == '') {
                $('[data-role="original-menu"]').show();
            } else {
                $('[data-role="original-menu"]').hide();
                var items = [];
                $('[data-role="original-menu"] a').each(function (index, elm) {
                    items.push({text: $(elm).html(), url: $(elm).attr('href')});
                });

                var options = {
                    tokenize: true,
                    threshold: 0.5,
                    keys: ['text']
                }
                var fuse = new Fuse(items, options)
                var result = fuse.search(keyword);
                for (var i in result) {
                    var item = result[i];
                    var a = "<a class='item' href='" + item.url + "'>" + item.text + "</a>";
                    $('[data-role="quick-menu"] .items').append(a);
                }
            }
        });
    </script>
@endpush
