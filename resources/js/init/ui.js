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
    var extensions = $(elm).data('extensions');
    if (extensions) {
      extensions = extensions.split(',');
    } else {
      extensions = null;
    }

    $(elm).fileuploader({
      theme: 'simple',
      limit: $(elm).data('limit'),
      extensions: extensions,
      changeInput: '<div class="fileuploader-input">' +
        '<div class="fileuploader-input-inner">' +
        '<div><span>${captions.browse}</span></div>' +
        '</div>' +
        '</div>',
      captions: {
        browse: 'Browse or drop files here'
      },
      thumbnails: {
        removeConfirmation: false
      },
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

  if (jQuery().redactor) {
    $('[data-role="redactor"]').each(function () {
      $(this).redactor({
        plugins: [
          'fontcolor',
          'alignment',
          'video',
          'fullscreen',
          'table',
        ],
        toolbarFixedTopOffset: 50,
        minHeight: '300px',
        imageUpload: $(this).data('upload-url'),
        imageResizable: true,
        imagePosition: true,
        imageData: {
          '_token': $(this).data('token'),
        },
        fontcolors: [
          '#000000',
          '#111111',
          '#222222',
          '#333333',
          '#666666',
          '#999999',
          '#BBBBBB',
          '#CCCCCC',
          '#DDDDDD',
          '#EEEEEE',
          '#FFFFFF',
          '#f44336',
          '#f44336',
          '#E91E63',
          '#9C27B0',
          '#673AB7',
          '#3F51B5',
          '#2196F3',
          '#03A9F4',
          '#00BCD4',
          '#009688',
          '#4CAF50',
          '#8BC34A',
          '#CDDC39',
          '#FFC107',
          '#FF9800',
          '#FF5722',
          '#FF0000',
          '#b026fe',
          '#0000ff',
          '#00FF00',
          '#fff000',
          '#ff6000',
        ],
      });
    });
  }


  if (typeof google === 'object' && typeof google.maps === 'object') {
    $('[data-form-coordinate]').each(function () {
      var input = $(this);
      var long, lat;
      [lat, long] = input.val().split(',');
      lat = lat || -7.451808;
      long = long || 111.035929;

      var mapContainer = $('<div>')
        .css('width', '100%')
        .css('height', 300)
        .css('border-radius', 4)
        .css('margin-top', '5px');

      mapContainer.insertAfter($(this));

      var center = new google.maps.LatLng(lat, long);
      var options = {
        zoom: 17,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      if ($(this).is('[disabled]')) {
        $.extend(options, {
          gestureHandling: 'none',
          zoomControl: false
        });
      }
      var map = new google.maps.Map(mapContainer[0], options);

      var marker = new google.maps.Marker({
        position: center,
        map: map,
        draggable: true
      });
      google.maps.event.addListener(
        marker,
        'drag',
        function () {
          input.val(marker.position.lat() + ',' + marker.position.lng());
        }
      );
    });
  }

});


