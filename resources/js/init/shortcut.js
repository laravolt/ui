$(function () {

    key('⌘+k, ctrl+k', function () {
        var modal = $('[data-role="quick-switcher"]');

        modal.modal({
            onHide: function () {
                $('[data-role="quick-menu-searchbox"]').val("").trigger('keyup');
            }
        }).modal('show');
    });

    $('[data-role="quick-menu-searchbox"]').on('keyup', function (e) {

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
});
