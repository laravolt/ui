<?php
// @todo: move filter somewhere else
$items = app('laravolt.menu')->roots()->filter(function($item){
    $skipAuthorization = $item->data('permission') === null;
    return $skipAuthorization || auth()->user()->can($item->data('permission'));
});

?>

<div class="sidebar">
    <div class="sidebar__wrapper" data-role="sidebar">

        <div class="sidebar__menu">
            @include('ui::menu.sidebar_brand')
            <div class="ui attached vertical menu fluid">
                @if(!$items->isEmpty())
                    @foreach($items as $item)

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
</div>
