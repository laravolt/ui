@if (Session::has('laravolt_flash'))
    <script>
        Messenger({
            extraClasses: 'messenger-fixed messenger-on-top',
            theme: 'default'
        }).post({!! json_encode(Session::get('laravolt_flash')) !!});
    </script>
@endif
