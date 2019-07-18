@if (!empty($bags))
    <script>
        @foreach($bags as $bag)
        Messenger({
            extraClasses: 'messenger-fixed messenger-on-top animated',
            theme: '{{ config('laravolt.ui.flash.theme') }}'
        }).post({!! json_encode($bag) !!});
        @endforeach
    </script>
@endif
