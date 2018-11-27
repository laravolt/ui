$(function(){

    var KEY_UP = 38;
    var KEY_DOWN = 40;
    var CURRENT_INDEX = 1;

    $('[data-role="quick-menu-searchbox"]').on('keyup', function (e) {

        // var key = e.keyCode;
        // if( key == KEY_UP || key == KEY_DOWN) {
        //     var container = $('[data-role="quick-menu"] .items');
        //     var itemCount = container.find('.item').length;
        //
        //     if(key == KEY_UP) {
        //         CURRENT_INDEX--;
        //     } else{
        //         CURRENT_INDEX++;
        //     }
        //
        //     if (CURRENT_INDEX > itemCount) {
        //         CURRENT_INDEX = 1;
        //     }else if (CURRENT_INDEX < 1) {
        //         CURRENT_INDEX = itemCount;
        //     }
        //     container.find('.item').removeClass('active');
        //     container.find('.item:nth-child('+CURRENT_INDEX+')').addClass('active');
        //     console.log(CURRENT_INDEX);
        //     return;
        // }

        var keyword = $(e.currentTarget).val();
        $('[data-role="quick-menu-searchbox"]').val(keyword);

        $('[data-role="quick-menu"] .items').html("");

        if (keyword == '') {
            $('[data-role="original-menu"]').show();
        } else {
            $('[data-role="original-menu"]').hide();
            var items = [];
            $('[data-role="original-menu"] a').each(function (index, elm) {
                items.push({text: $(elm).html(), url: $(elm).attr('href')});
            });

            var options = {
                tokenize: true,
                threshold: 0.5,
                keys: ['text']
            }
            var fuse = new Fuse(items, options)
            var result = fuse.search(keyword);
            for (var i in result) {
                var item = result[i];
                var a = "<a class='item' href='" + item.url + "'>" + item.text + "</a>";
                $('[data-role="quick-menu"] .items').append(a);
            }
        }
    });

    key('⌘+k, ctrl+k', function(){
        var modal = $('[data-role="quick-switcher"]');

        modal.modal({
            onHide: function(){
                $('[data-role="quick-menu-searchbox"]').val("").trigger('keyup');
            }
        }).modal('show');
    });
});
