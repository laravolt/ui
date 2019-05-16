var UI = {
  init: function () {
    $('.ui.checkbox').checkbox();

    $('.ui.dropdown:not(.tag)').dropdown({
      forceSelection: false,
      fullTextSearch: 'exact'
    });

    var sidebar = $('[data-role="sidebar"]');
    if (sidebar.length > 0) {
      new SimpleBar(sidebar[0]);

      var sidebarVisibilitySwitcher = $('[data-role="sidebar-visibility-switcher"]');
      if (sidebarVisibilitySwitcher.length > 0) {
        sidebarVisibilitySwitcher.on('click', function () {
          sidebar.parent().toggleClass('show');
        });
      }

      $(document).click(function (event) {
        if ($('nav.sidebar').hasClass('show')) {
          if (!$(event.target).closest('nav.sidebar').length && !$(event.target).closest('[data-role="sidebar-visibility-switcher"]').length) {
            $('nav.sidebar').removeClass('show');
          }
        }
      });
    }

    $('[data-role="sidebar-accordion"]').accordion({
      selector: {
        trigger: '.title:not(.empty)'
      }
    });

    $('[data-role=suitable-header-searchable]').on('keypress', 'input[type=text]', function (e) {
      if (e.which == 13) {
        $('[data-role=suitable-form-searchable]').submit();
      }
    });
    $('[data-role=suitable-header-searchable] .ui.dropdown').dropdown({
      onChange: function (val) {
        $('[data-role=suitable-form-searchable]').submit();
      }
    });

    $('.ui.dropdown.tag').each(function () {

      var selected = $(this).data('value').toString().split(',');
      if (selected.length == 1 && selected[0] == '') {
        selected = false;
      }

      $(this).dropdown({
        forceSelection: false,
        allowAdditions: true,
        keys: {
          delimiter: 13
        }
      }).dropdown('set selected', selected);
    });

    $('.checkbox[data-toggle="checkall"]').each(function () {
      var $parent = $(this);
      var $childCheckbox = $(document).find($parent.data('selector'));
      var $storage = $(document).find($parent.data('storage'));

      $parent
        .checkbox({
          // check all children
          onChecked: function () {
            $childCheckbox.checkbox('check');
          },
          // uncheck all children
          onUnchecked: function () {
            $childCheckbox.checkbox('uncheck');
          }
        })
      ;

      $childCheckbox
        .checkbox({
          // Fire on load to set parent value
          fireOnInit: true,
          // Change parent state on each child checkbox change
          onChange: function () {
            var
              $parentCheckbox = $parent,
              $checkbox = $childCheckbox,
              allChecked = true,
              allUnchecked = true,
              ids = []
            ;
            // check to see if all other siblings are checked or unchecked
            $checkbox.each(function () {
              if ($(this).checkbox('is checked')) {
                allUnchecked = false;
                ids.push($(this).children().first().val());
              } else {
                allChecked = false;
              }
            });

            // change multiple delete form action, based on selected ids
            var form = $('form[data-type="delete-multiple"]');
            if (form.length > 0) {
              var url = $('form[data-type="delete-multiple"]').attr('action');
              var replaceStartFrom = url.lastIndexOf('/');
              var newUrl = url.substr(0, replaceStartFrom) + '/' + ids.join(',');
              $('form[data-type="delete-multiple"]').attr('action', newUrl);
            }

            if ($storage.length > 0) {
              $storage.val(ids.join(',')).trigger('change');
            }

            // set parent checkbox state, but dont trigger its onChange callback
            if (allChecked) {
              $parentCheckbox.checkbox('set checked');
              form.find('[type="submit"]').removeClass('disabled');
              //form.css('visibility', 'visible');
            } else if (allUnchecked) {
              $parentCheckbox.checkbox('set unchecked');
              form.find('[type="submit"]').addClass('disabled');
              //form.css('visibility', 'hidden');
            } else {
              $parentCheckbox.checkbox('set indeterminate');
              form.find('[type="submit"]').removeClass('disabled');
              //form.css('visibility', 'visible');
            }
          }
        });
    });

    key('⌘+k, ctrl+k', function () {
      var modal = $('[data-role="quick-switcher-modal"]');

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
        var matches = '';
        for (var i in result) {
          var item = result[i];
          matches += "<a class='title' href='" + item.url + "'>" + item.text + "</a>";
        }
        $('[data-role="quick-menu"] .items').append(matches);
      }
    });

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
      action: function (text, value) {
        swup.loadPage({
          url: value
        });
      }
    });

  }
};

$(function () {
  UI.init();
});
document.addEventListener('swup:contentReplaced', function (event) {
  UI.init();
  Messenger().hideAll();
});

