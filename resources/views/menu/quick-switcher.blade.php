<div class="ui tiny basic modal" data-role="quick-switcher">
    <div class="content">
        <div class="ui vertical fluid menu" data-role="quick-menu">
            @include('ui::components.searchbox')
            <div class="scrolling content items"></div>
        </div>
    </div>
</div>

@push('style')
    <style>
        [data-role="quick-switcher"] {
            top: 50px;
        }
    </style>
@endpush
