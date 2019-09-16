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

  $('input[type=file].uploader').each(function (idx, elm) {
    $(elm).fileuploader({
      changeInput: '<div class="fileuploader-input">' +
        '<div class="fileuploader-input-inner">' +
        '<div>${captions.feedback} ${captions.or} <span>${captions.button}</span></div>' +
        '</div>' +
        '</div>',
      theme: 'simple',
      limit: 1,
      // upload: {
      //   url: $(elm).data('url-upload'),
      //   data: {'_token': $(elm).parents('form').find('input[name=_token]').val()},
      //   type: 'POST',
      //   enctype: 'multipart/form-data',
      //   start: true,
      //   synchron: true,
      //   beforeSend: null,
      //   onSuccess: function (result, item) {
      //     var data = {};
      //
      //     try {
      //       data = JSON.parse(result);
      //     } catch (e) {
      //       data.hasWarnings = true;
      //     }
      //
      //     // if success
      //     if (data.isSuccess && data.files[0]) {
      //       item.name = data.files[0].name;
      //       item.html.find('.column-title > div:first-child').text(data.files[0].name).attr('title', data.files[0].name);
      //     }
      //
      //     // if warnings
      //     if (data.hasWarnings) {
      //       for (var warning in data.warnings) {
      //         alert(data.warnings[warning]);
      //       }
      //
      //       item.html.removeClass('upload-successful').addClass('upload-failed');
      //       // go out from success function by calling onError function
      //       // in this case we have a animation there
      //       // you can also response in PHP with 404
      //       return this.onError ? this.onError(item) : null;
      //     }
      //
      //     item.html.find('.fileuploader-action-remove').addClass('fileuploader-action-success');
      //     setTimeout(function () {
      //       item.html.find('.progress-bar2').fadeOut(400);
      //     }, 400);
      //   },
      //   onError: function (item) {
      //     var progressBar = item.html.find('.progress-bar2');
      //
      //     if (progressBar.length) {
      //       progressBar.find('span').html(0 + "%");
      //       progressBar.find('.fileuploader-progressbar .bar').width(0 + "%");
      //       item.html.find('.progress-bar2').fadeOut(400);
      //     }
      //
      //     item.upload.status != 'cancelled' && item.html.find('.fileuploader-action-retry').length == 0 ? item.html.find('.column-actions').prepend(
      //       '<a class="fileuploader-action fileuploader-action-retry" title="Retry"><i></i></a>'
      //     ) : null;
      //   },
      //   onProgress: function (data, item) {
      //     var progressBar = item.html.find('.progress-bar2');
      //
      //     if (progressBar.length > 0) {
      //       progressBar.show();
      //       progressBar.find('span').html(data.percentage + "%");
      //       progressBar.find('.fileuploader-progressbar .bar').width(data.percentage + "%");
      //     }
      //   },
      //   onComplete: null,
      // },
      // onRemove: function (item) {
      //   $.post($(elm).data('url-remove'), {
      //     file: item.name
      //   });
      // },
      onSelect: function (item) {
        item.upload = null;
      },
      onRemove: function (item) {
        if (item.data.uploaded)
          $.post('./php/ajax_remove_file.php', {
            file: item.name
          });
      },
      captions: {
        feedback: 'Drag and drop files here',
        or: 'or',
        button: 'Browse Files'
      }
    });
  });

  if (typeof AutoNumeric === 'function') {
    AutoNumeric.multiple('input[data-role="rupiah"]', {
      currencySymbol: '',
      decimalCharacter: ',',
      digitGroupSeparator: '.',
      decimalPlaces: 0,
      unformatOnSubmit: true,
    });
  }

});


