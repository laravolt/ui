<div class="ui attached vertical menu fluid">
    @if(($items = app('laravolt.menu')->roots()) && (!$items->isEmpty()))
        @foreach($items as $item)
            @if($item->hasChildren())
            <div class="item">
                <div class="header">{{ $item->title }}</div>
            </div>
            @include('ui::menu.sidebar_items', ['items' => $item->children()])
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

@push('style')
    <style>
        #layout-sidebar .toc .toc__content, #layout-sidebar header .item.brand, #layout-sidebar .toc {
            width: 220px
        }

        #layout-sidebar .toc .toc__content {
            padding: 60px 0;
            border-right: 1px solid #eaecf0
        }

        #layout-sidebar .toc .toc__content .ui.menu > .item {
            padding: 5px 15px;
            border-bottom: 1px solid #eaecf0;
        }

        #layout-sidebar .ui.vertical.menu > .item:before {
            height: 0;
        }

        #layout-sidebar .toc .toc__content .ui.menu .item > .header {
            text-transform: uppercase;
            color: #9fa8bc;
            line-height: normal;
            padding: 0;
            margin: 20px 0 10px;
            font-weight: 500;
            font-size: .9em;
            letter-spacing: 1px;
        }

        #layout-sidebar .toc .toc__content .ui.menu .ui.accordion .title {
            display: block;
            color: #394151;
            font-weight: 700;
            text-transform: uppercase;
            line-height: 2.5em;
            padding-left: 15px;
            border-bottom: 1px solid #eaecf0;
            font-size: .9em;
            letter-spacing: .5px;
        }

        #layout-sidebar .toc .toc__content .ui.menu .ui.accordion .title.current {
            background-color: #259dab;
            color: #fff;
            border-bottom-color: #259dab;
        }

        #layout-sidebar .toc .toc__content .ui.menu .ui.accordion .title.current .icon {
            color: #fff;
        }

        #layout-sidebar .toc .toc__content .ui.menu .ui.accordion .content {
            background-color: #f6f7f8;
            border-bottom: 1px solid #eaecf0;
        }

        #layout-sidebar .toc .toc__content .ui.menu .ui.accordion .content .ui.list {
            margin: 10px 10px 0 35px;
        }

        #layout-sidebar .toc .toc__content .ui.menu .ui.accordion .content .ui.list.last {
            margin-bottom: 15px;
        }

        #layout-sidebar .toc .toc__content .ui.menu .ui.accordion .content .ui.list .item {
            line-height: 2em;
            font-size: .95em;
            color: #657390;
        }

        #layout-sidebar i.angle.down.icon {
            margin: 0 8px 0 0;
            float: right;
            color: #9fa8bc;
        }

        #layout-sidebar i.left.icon {
            color: #259dab;
            margin-right: 5px;
        }

        #layout-sidebar {
            background-color: #edf1f9
        }

        #layout-sidebar header.ui.menu.top {
            background-color: #262b36
        }

        #layout-sidebar header .item.brand {
            background-color: #20242d
        }

        #layout-sidebar .toc .toc__content {
            background-color: #ffffff
        }

        #layout-sidebar .ui.vertical.menu .active.item {
            font-weight: 700;
            color: #259dab !important;
            background-color: transparent;
        }
    </style>
@endpush
