<div class="ui tiny basic modal" data-role="quick-switcher">
    <div class="content">
        <select class="fluid search ui big" data-role="quick-switcher-dropdown">
            <option value="">@lang('Type to find an action')</option>
        </select>
    </div>
</div>

@push('script')
    <script>
        $(function () {
            var quickSwitcherDropdown = $('[data-role="quick-switcher-dropdown"]');
            $('[data-role="original-menu"] a').each(function (index, elm) {
                var parent = $(elm).data('parent');
                var child = $(elm).html();
                var label = child;
                if (parent) {
                    label += '<div class="ui mini label right floated">' + parent + '</div>';
                }
                var option = $('<option>').attr('value', $(elm).attr('href')).html(label);
                quickSwitcherDropdown.append(option);
            });

            quickSwitcherDropdown.dropdown({
                fullTextSearch: true,
                forceSelection: false,
                selectOnKeydown: false,
                match: 'text',
                action: function(text, value) {
                    window.location.href = value;
                }
            });
        });
    </script>
@endpush
