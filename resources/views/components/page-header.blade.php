<div class="ui menu secondary page-header">
    <div class="item">
        <h1 class="ui header">{!! $title !!}</h1>
    </div>
    <div class="menu right">
        <div class="item">
            @foreach($actions as $action)
                @include('ui::components.button', ['action' => $action])
            @endforeach
        </div>
    </div>
</div>
