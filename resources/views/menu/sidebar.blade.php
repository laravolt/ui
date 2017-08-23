<div class="ui attached vertical menu fluid sidebar__menu">
    @if(($items = app('laravolt.menu')->roots()) && (!$items->isEmpty()))
        @foreach($items as $item)
            @if($item->hasChildren())
                <div class="item">
                    <div class="header">{{ $item->title }}</div>
                </div>
                @include('ui::menu.sidebar_items', ['items' => $item->children()])
            @else
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

@push('script')
    <script>
        $(function () {
            $('.ui.accordion').accordion({
                selector: {
                    trigger: '.title:not(.empty)'
                }
            });
        });
    </script>
@endpush
