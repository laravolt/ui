$(function () {

    $('table.unstackable.responsive').basictable();

    $('.ui.checkbox').checkbox();

    $('.ui.dropdown:not(.tag)').dropdown({
        forceSelection: false,
        fullTextSearch: 'exact'
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
            })
        ;
    });

  $('.ui.input.calendar').each(function (idx, elm) {
    elm = $(elm);

    var type = elm.data('calendar-type');
    if (!type) {
      type = 'date';
    }

    var format = elm.data('calendar-format');
    if (!format) {
      format = 'YYYY-MM-DD';
    }

    elm.calendar({
      type: type,
      ampm: false,
      formatter: {
        date: function (date, settings) {
          if (!date) {
            return '';
          }
          var DD = ("0" + date.getDate()).slice(-2);
          var MM = ("0" + (date.getMonth() + 1)).slice(-2);
          var MMMM = settings.text.months[date.getMonth()];
          var YY = date.getFullYear().toString().substr(2, 2);
          var YYYY = date.getFullYear();

          return format.replace('DD', DD).replace('MMMM', MMMM).replace('MM', MM).replace('YYYY', YYYY).replace('YY', YY);
        }
      }
    })
    ;
  });

});


