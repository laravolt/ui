<div class="ui accordion sidebar__accordion" data-role="sidebar-accordion">
    @foreach($items as $item)

        @if($item->hasChildren())
            <div class="title {{ Laravolt\Ui\Menu::setActiveParent($item->children(), $item->link->isActive) }}">
                <i class="left icon {{ $item->data('icon') }}"></i>
                {{ $item->title }}
                <i class="angle down icon"></i>
            </div>
            <div class="content {{ Laravolt\Ui\Menu::setActiveParent($item->children(), $item->link->isActive) }} ">
                @if($item->hasChildren())
                    <div class="ui list {{ $loop->last ? 'last':'' }} {{ Laravolt\Ui\Menu::setVisible($item->children()) }} ">
                        @foreach($item->children() as $child)
                            <a href="{{ $child->url() }}" class="item {{ ($child->link->isActive)?'active':'' }} ">{{ $child->title }}</a>
                        @endforeach
                    </div>
                @endif
            </div>
        @elseif(auth()->user()->can($item->data('permission')))
            <a class="title empty {{ Laravolt\Ui\Menu::setActiveParent($item->children(), $item->link->isActive) }}" href="{{ $item->url() }}">
                <i class="left icon {{ $item->data('icon') }}"></i>
                {{ $item->title }}
            </a>
            <div class="content"></div>
        @endif

    @endforeach
</div>
