<div class="sidebar">
    <div class="sidebar__wrapper" data-role="sidebar">

        <div class="sidebar__menu">
            <h2 class="ui header brand"><a href="#">{{ config('app.name') }}</a></h2>
            <div class="ui attached vertical menu fluid">
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
        </div>
    </div>
</div>
