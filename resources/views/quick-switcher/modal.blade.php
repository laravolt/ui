<div class="ui tiny basic modal" data-role="quick-switcher">
    <div class="content">
        <select class="fluid search ui big" data-role="quick-switcher-dropdown">
            <option value="">@lang('Type to find an action')</option>
        </select>
    </div>
</div>

@push('style')
    <style>
        [data-role="quick-switcher"] {
            top: 10%;
        }
        [data-role="quick-switcher"] .ui.dropdown .menu>.item>.right.floated.label {
            margin-top: -0.4em;
        }
    </style>
@endpush
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
